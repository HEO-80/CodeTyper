// src/data/snippets/programming/solidity/advanced/defi.js

export default [
  {
    id: "sol-adv-001",
    title: "Aave V3 Flash Loan",
    description: "Flash loan receiver with arbitrage logic skeleton",
    difficulty: "advanced",
    code: `// FlashLoanReceiver.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPoolAddressesProvider {
    function getPool() external view returns (address);
}

interface IPool {
    function flashLoan(
        address receiverAddress,
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata interestRateModes,
        address onBehalfOf,
        bytes calldata params,
        uint16 referralCode
    ) external;
}

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/// @title FlashLoanReceiver — Aave V3 flash loan with arbitrage skeleton
contract FlashLoanReceiver {

    IPoolAddressesProvider public immutable ADDRESSES_PROVIDER;
    IPool                  public immutable POOL;
    address                public immutable owner;

    event FlashLoanExecuted(address asset, uint256 amount, uint256 premium);
    event ArbitrageProfit(address asset, uint256 profit);

    error NotPool();
    error NotOwner();
    error Unprofitable();

    constructor(address addressesProvider) {
        ADDRESSES_PROVIDER = IPoolAddressesProvider(addressesProvider);
        POOL               = IPool(IPoolAddressesProvider(addressesProvider).getPool());
        owner              = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    /// @notice Initiate the flash loan
    function executeFlashLoan(address asset, uint256 amount) external onlyOwner {
        address[] memory assets  = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        uint256[] memory modes   = new uint256[](1);

        assets[0]  = asset;
        amounts[0] = amount;
        modes[0]   = 0; // 0 = no debt (must repay in same tx)

        bytes memory params = abi.encode(asset, amount);

        POOL.flashLoan(
            address(this), assets, amounts, modes,
            address(this), params, 0
        );
    }

    /// @notice Called by Aave Pool after sending funds
    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata /*params*/
    ) external returns (bool) {
        if (msg.sender != address(POOL)) revert NotPool();

        address asset   = assets[0];
        uint256 amount  = amounts[0];
        uint256 premium = premiums[0];
        uint256 debt    = amount + premium;

        // ── Arbitrage logic goes here ────────────────────────────────────────
        // Example: buy on DEX A (cheaper), sell on DEX B (more expensive)
        // uint256 profit = _arbitrage(asset, amount);
        // if (profit <= premium) revert Unprofitable();
        // ─────────────────────────────────────────────────────────────────────

        // Approve pool to pull back loan + premium
        IERC20(asset).approve(address(POOL), debt);

        emit FlashLoanExecuted(asset, amount, premium);
        return true;
    }

    /// @notice Withdraw profits to owner
    function withdraw(address token) external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(owner, balance);
    }
}
`,
  },
  {
    id: "sol-adv-002",
    title: "DEX Price Oracle and MEV Protection",
    description: "TWAP oracle, sandwich attack protection, slippage guard",
    difficulty: "advanced",
    code: `// MEVProtection.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IUniswapV2Pair {
    function getReserves() external view returns (uint112, uint112, uint32);
    function token0() external view returns (address);
    function token1() external view returns (address);
}

interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

interface IERC20 {
    function approve(address, uint256) external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);
    function balanceOf(address) external view returns (uint256);
}

/// @title MEVProtection — TWAP oracle + slippage guard + commit-reveal
contract MEVProtection {

    uint256 public constant TWAP_PERIOD    = 30 minutes;
    uint256 public constant MAX_SLIPPAGE   = 100; // 1% in basis points
    uint256 public constant COMMIT_DELAY   = 1;   // blocks

    struct PriceObservation {
        uint256 timestamp;
        uint256 price;
    }

    struct SwapCommit {
        bytes32 hash;
        uint256 blockNumber;
        bool    executed;
    }

    mapping(address => PriceObservation[]) public observations;
    mapping(address => SwapCommit)         public commits;

    IUniswapV2Router public immutable router;

    event PriceRecorded(address pair, uint256 price, uint256 timestamp);
    event SwapCommitted(address user, bytes32 commitHash);
    event SwapExecuted(address user, uint256 amountIn, uint256 amountOut);

    error StalePrice();
    error SlippageTooHigh(uint256 expected, uint256 minimum);
    error CommitNotFound();
    error TooEarly();
    error InvalidCommit();

    constructor(address _router) {
        router = IUniswapV2Router(_router);
    }

    /// @notice Record current spot price for TWAP calculation
    function recordPrice(address pair) external {
        (uint112 reserve0, uint112 reserve1, ) = IUniswapV2Pair(pair).getReserves();
        uint256 price = (uint256(reserve1) * 1e18) / uint256(reserve0);

        observations[pair].push(PriceObservation({
            timestamp: block.timestamp,
            price:     price
        }));

        emit PriceRecorded(pair, price, block.timestamp);
    }

    /// @notice Get TWAP price over the last TWAP_PERIOD
    function getTWAP(address pair) public view returns (uint256 twap) {
        PriceObservation[] storage obs = observations[pair];
        uint256 cutoff = block.timestamp - TWAP_PERIOD;
        uint256 count;
        uint256 sum;

        for (uint256 i = obs.length; i > 0; i--) {
            if (obs[i - 1].timestamp < cutoff) break;
            sum   += obs[i - 1].price;
            count += 1;
        }

        if (count == 0) revert StalePrice();
        twap = sum / count;
    }

    /// @notice Commit to a future swap (prevents front-running)
    function commitSwap(bytes32 commitHash) external {
        commits[msg.sender] = SwapCommit({
            hash:        commitHash,
            blockNumber: block.number,
            executed:    false
        });
        emit SwapCommitted(msg.sender, commitHash);
    }

    /// @notice Execute swap after commit delay with slippage protection
    function executeSwap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 salt
    ) external {
        SwapCommit storage commit = commits[msg.sender];
        if (commit.hash == bytes32(0))      revert CommitNotFound();
        if (block.number < commit.blockNumber + COMMIT_DELAY) revert TooEarly();

        bytes32 expected = keccak256(
            abi.encodePacked(msg.sender, tokenIn, tokenOut, amountIn, salt)
        );
        if (commit.hash != expected) revert InvalidCommit();

        commit.executed = true;

        // Compute minimum output using TWAP
        address pair   = _getPair(tokenIn, tokenOut);
        uint256 twap   = getTWAP(pair);
        uint256 minOut = (amountIn * twap * (10_000 - MAX_SLIPPAGE)) / (1e18 * 10_000);

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenIn).approve(address(router), amountIn);

        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;

        uint256[] memory amounts = router.swapExactTokensForTokens(
            amountIn, minOut, path, msg.sender, block.timestamp + 60
        );

        emit SwapExecuted(msg.sender, amountIn, amounts[amounts.length - 1]);
    }

    function _getPair(address, address) internal pure returns (address) {
        // In production: compute CREATE2 address or use factory
        return address(0);
    }
}
`,
  },
  {
    id: "sol-adv-003",
    title: "Upgradeable Proxy Pattern",
    description: "EIP-1967 transparent proxy with storage slots and admin",
    difficulty: "advanced",
    code: `// UpgradeableProxy.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title UpgradeableProxy — EIP-1967 transparent upgradeable proxy
contract UpgradeableProxy {

    // EIP-1967 storage slots
    // keccak256("eip1967.proxy.implementation") - 1
    bytes32 private constant IMPLEMENTATION_SLOT =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    // keccak256("eip1967.proxy.admin") - 1
    bytes32 private constant ADMIN_SLOT =
        0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;

    event Upgraded(address indexed implementation);
    event AdminChanged(address previousAdmin, address newAdmin);

    error NotAdmin();
    error ZeroAddress();
    error DelegateCallFailed();

    constructor(address implementation, address admin, bytes memory data) {
        _setImplementation(implementation);
        _setAdmin(admin);
        if (data.length > 0) {
            (bool ok, ) = implementation.delegatecall(data);
            if (!ok) revert DelegateCallFailed();
        }
    }

    modifier onlyAdmin() {
        if (msg.sender != _getAdmin()) revert NotAdmin();
        _;
    }

    // Admin functions
    function upgradeTo(address newImpl) external onlyAdmin {
        if (newImpl == address(0)) revert ZeroAddress();
        _setImplementation(newImpl);
        emit Upgraded(newImpl);
    }

    function changeAdmin(address newAdmin) external onlyAdmin {
        if (newAdmin == address(0)) revert ZeroAddress();
        address old = _getAdmin();
        _setAdmin(newAdmin);
        emit AdminChanged(old, newAdmin);
    }

    function implementation() external view onlyAdmin returns (address) {
        return _getImplementation();
    }

    function admin() external view onlyAdmin returns (address) {
        return _getAdmin();
    }

    // Fallback — delegate all calls to implementation
    fallback() external payable {
        _delegate(_getImplementation());
    }

    receive() external payable {
        _delegate(_getImplementation());
    }

    function _delegate(address impl) internal {
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }

    function _getImplementation() internal view returns (address impl) {
        assembly { impl := sload(IMPLEMENTATION_SLOT) }
    }

    function _setImplementation(address impl) internal {
        assembly { sstore(IMPLEMENTATION_SLOT, impl) }
    }

    function _getAdmin() internal view returns (address adm) {
        assembly { adm := sload(ADMIN_SLOT) }
    }

    function _setAdmin(address adm) internal {
        assembly { sstore(ADMIN_SLOT, adm) }
    }
}
`,
  },
];

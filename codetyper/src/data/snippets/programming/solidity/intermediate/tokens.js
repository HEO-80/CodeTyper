// src/data/snippets/programming/solidity/intermediate/tokens.js

export default [
  {
    id: "sol-int-001",
    title: "ERC20 Token",
    description: "Full ERC20 token with mint, burn, allowance and transfer",
    difficulty: "intermediate",
    code: `// ERC20Token.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title ERC20Token — standard fungible token implementation
contract ERC20Token {

    string  public name;
    string  public symbol;
    uint8   public decimals = 18;
    uint256 public totalSupply;

    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);

    error InsufficientBalance();
    error InsufficientAllowance();
    error ZeroAddress();
    error NotOwner();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    constructor(string memory _name, string memory _symbol, uint256 initialSupply) {
        name   = _name;
        symbol = _symbol;
        owner  = msg.sender;
        _mint(msg.sender, initialSupply * 10 ** decimals);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        if (spender == address(0)) revert ZeroAddress();
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        if (allowed < amount) revert InsufficientAllowance();
        allowance[from][msg.sender] = allowed - amount;
        _transfer(from, to, amount);
        return true;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        if (balanceOf[msg.sender] < amount) revert InsufficientBalance();
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Burn(msg.sender, amount);
        emit Transfer(msg.sender, address(0), amount);
    }

    function _transfer(address from, address to, uint256 amount) internal {
        if (to == address(0)) revert ZeroAddress();
        if (balanceOf[from] < amount) revert InsufficientBalance();
        balanceOf[from] -= amount;
        balanceOf[to]   += amount;
        emit Transfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal {
        if (to == address(0)) revert ZeroAddress();
        totalSupply     += amount;
        balanceOf[to]   += amount;
        emit Mint(to, amount);
        emit Transfer(address(0), to, amount);
    }
}
`,
  },
  {
    id: "sol-int-002",
    title: "ERC721 NFT Collection",
    description: "NFT contract with mint, tokenURI, ownership and approvals",
    difficulty: "intermediate",
    code: `// NFTCollection.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title NFTCollection — ERC721 Non-Fungible Token implementation
contract NFTCollection {

    string public name;
    string public symbol;
    string public baseURI;

    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public mintPrice;

    address public owner;

    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public getApproved;
    mapping(address => mapping(address => bool)) public isApprovedForAll;
    mapping(uint256 => string) private _tokenURIs;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event Minted(address indexed to, uint256 indexed tokenId);

    error NotOwner();
    error NotApproved();
    error SoldOut();
    error InsufficientPayment();
    error NonExistentToken();
    error ZeroAddress();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier tokenExists(uint256 tokenId) {
        if (ownerOf[tokenId] == address(0)) revert NonExistentToken();
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint256 _maxSupply,
        uint256 _mintPrice
    ) {
        name      = _name;
        symbol    = _symbol;
        baseURI   = _baseURI;
        maxSupply = _maxSupply;
        mintPrice = _mintPrice;
        owner     = msg.sender;
    }

    function mint(address to) external payable returns (uint256) {
        if (totalSupply >= maxSupply) revert SoldOut();
        if (msg.value < mintPrice)    revert InsufficientPayment();
        if (to == address(0))         revert ZeroAddress();

        uint256 tokenId = ++totalSupply;
        ownerOf[tokenId]  = to;
        balanceOf[to]    += 1;

        emit Minted(to, tokenId);
        emit Transfer(address(0), to, tokenId);
        return tokenId;
    }

    function transferFrom(address from, address to, uint256 tokenId)
        external tokenExists(tokenId)
    {
        if (ownerOf[tokenId] != from) revert NotOwner();
        if (
            msg.sender != from &&
            msg.sender != getApproved[tokenId] &&
            !isApprovedForAll[from][msg.sender]
        ) revert NotApproved();
        if (to == address(0)) revert ZeroAddress();

        delete getApproved[tokenId];
        ownerOf[tokenId]   = to;
        balanceOf[from]   -= 1;
        balanceOf[to]     += 1;

        emit Transfer(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) external tokenExists(tokenId) {
        if (ownerOf[tokenId] != msg.sender) revert NotOwner();
        getApproved[tokenId] = to;
        emit Approval(msg.sender, to, tokenId);
    }

    function setApprovalForAll(address operator, bool approved) external {
        isApprovedForAll[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function tokenURI(uint256 tokenId)
        external view tokenExists(tokenId) returns (string memory)
    {
        return string(abi.encodePacked(baseURI, _toString(tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner).call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) { digits++; temp /= 10; }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
`,
  },
  {
    id: "sol-int-003",
    title: "Escrow Contract",
    description: "Multi-party escrow with payment split, dispute and release",
    difficulty: "intermediate",
    code: `// Escrow.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Escrow — trustless payment with configurable split
contract Escrow {

    enum State { Awaiting, Funded, Released, Refunded, Disputed }

    struct Deal {
        address payable buyer;
        address payable seller;
        address         arbiter;
        uint256         amount;
        uint256         platformFeeBps; // basis points (100 = 1%)
        address payable platform;
        State           state;
        uint256         createdAt;
        uint256         deadline;
    }

    mapping(uint256 => Deal) public deals;
    uint256 public dealCount;

    event DealCreated(uint256 indexed dealId, address buyer, address seller, uint256 amount);
    event DealFunded(uint256 indexed dealId, uint256 amount);
    event DealReleased(uint256 indexed dealId, uint256 sellerAmount, uint256 feeAmount);
    event DealRefunded(uint256 indexed dealId);
    event DealDisputed(uint256 indexed dealId);

    error NotBuyer();
    error NotArbiter();
    error WrongState();
    error WrongAmount();
    error DeadlinePassed();
    error TransferFailed();

    function createDeal(
        address payable seller,
        address arbiter,
        address payable platform,
        uint256 feeBps,
        uint256 durationDays
    ) external payable returns (uint256 dealId) {
        require(msg.value > 0, "Must fund escrow");
        require(feeBps <= 1000, "Fee too high"); // max 10%

        dealId = ++dealCount;
        deals[dealId] = Deal({
            buyer:          payable(msg.sender),
            seller:         seller,
            arbiter:        arbiter,
            amount:         msg.value,
            platformFeeBps: feeBps,
            platform:       platform,
            state:          State.Funded,
            createdAt:      block.timestamp,
            deadline:       block.timestamp + (durationDays * 1 days)
        });

        emit DealCreated(dealId, msg.sender, seller, msg.value);
        emit DealFunded(dealId, msg.value);
    }

    function release(uint256 dealId) external {
        Deal storage deal = deals[dealId];
        if (msg.sender != deal.buyer) revert NotBuyer();
        if (deal.state != State.Funded) revert WrongState();

        deal.state = State.Released;

        uint256 fee    = (deal.amount * deal.platformFeeBps) / 10_000;
        uint256 payout = deal.amount - fee;

        _transfer(deal.seller, payout);
        if (fee > 0) _transfer(deal.platform, fee);

        emit DealReleased(dealId, payout, fee);
    }

    function refund(uint256 dealId) external {
        Deal storage deal = deals[dealId];
        if (msg.sender != deal.arbiter) revert NotArbiter();
        if (deal.state != State.Funded && deal.state != State.Disputed) revert WrongState();

        deal.state = State.Refunded;
        _transfer(deal.buyer, deal.amount);
        emit DealRefunded(dealId);
    }

    function dispute(uint256 dealId) external {
        Deal storage deal = deals[dealId];
        if (msg.sender != deal.buyer && msg.sender != deal.seller) revert NotBuyer();
        if (deal.state != State.Funded) revert WrongState();
        deal.state = State.Disputed;
        emit DealDisputed(dealId);
    }

    function _transfer(address payable to, uint256 amount) internal {
        (bool ok, ) = to.call{value: amount}("");
        if (!ok) revert TransferFailed();
    }
}
`,
  },
];

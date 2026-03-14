// src/data/snippets/programming/solidity/beginner/basics.js

export default [
  {
    id: "sol-beg-001",
    title: "First Smart Contract",
    description: "pragma, contract, state variables, constructor, functions",
    difficulty: "beginner",
    code: `// SimpleStorage.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title SimpleStorage
/// @notice Stores and retrieves a single uint256 value
contract SimpleStorage {

    // State variable — stored permanently on-chain
    uint256 private storedValue;
    address public owner;

    // Events — emitted on state changes
    event ValueUpdated(address indexed by, uint256 oldValue, uint256 newValue);

    // Constructor — runs once at deployment
    constructor(uint256 initialValue) {
        storedValue = initialValue;
        owner = msg.sender;
    }

    // Modifier — reusable access control
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Write function — changes state, costs gas
    function setValue(uint256 newValue) external onlyOwner {
        uint256 old = storedValue;
        storedValue = newValue;
        emit ValueUpdated(msg.sender, old, newValue);
    }

    // Read function — free, no gas cost
    function getValue() external view returns (uint256) {
        return storedValue;
    }

    // Pure function — no state access
    function add(uint256 a, uint256 b) external pure returns (uint256) {
        return a + b;
    }
}
`,
  },
  {
    id: "sol-beg-002",
    title: "Data Types and Variables",
    description: "Solidity types: uint, int, bool, address, bytes, string, arrays, mappings",
    difficulty: "beginner",
    code: `// DataTypes.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title DataTypes — overview of Solidity primitive and complex types
contract DataTypes {

    // Unsigned integers
    uint8  public smallNum = 255;
    uint256 public bigNum  = 1e18;

    // Signed integers
    int256 public signed = -42;

    // Boolean
    bool public isActive = true;

    // Address — 20-byte Ethereum address
    address public owner;
    address payable public treasury;

    // Fixed-size byte arrays
    bytes32 public hash;
    bytes1  public flag = 0xFF;

    // Dynamic string
    string public name = "Solidity";

    // Fixed-size array
    uint256[3] public fixedArr = [10, 20, 30];

    // Dynamic array
    uint256[] public dynamicArr;

    // Mapping: key => value
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => bool)) public approvals;

    // Struct
    struct User {
        address wallet;
        string  username;
        uint256 balance;
        bool    active;
    }

    mapping(address => User) public users;

    // Enum
    enum Status { Pending, Active, Paused, Closed }
    Status public status = Status.Pending;

    constructor() {
        owner    = msg.sender;
        treasury = payable(msg.sender);
        hash     = keccak256(abi.encodePacked("hello"));
    }

    function pushToArray(uint256 value) external {
        dynamicArr.push(value);
    }

    function registerUser(string calldata username) external {
        users[msg.sender] = User({
            wallet:   msg.sender,
            username: username,
            balance:  0,
            active:   true
        });
        balances[msg.sender] = 0;
    }

    function activate() external {
        require(status == Status.Pending, "Not pending");
        status = Status.Active;
    }
}
`,
  },
  {
    id: "sol-beg-003",
    title: "Ether Handling and Payable",
    description: "receive, fallback, payable functions, transfer, call",
    difficulty: "beginner",
    code: `// EtherWallet.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title EtherWallet — basic Ether deposit and withdrawal
contract EtherWallet {

    address public owner;

    mapping(address => uint256) public deposits;

    event Deposited(address indexed from, uint256 amount);
    event Withdrawn(address indexed to, uint256 amount);

    error NotOwner();
    error InsufficientBalance(uint256 requested, uint256 available);
    error TransferFailed();

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    // Accept plain Ether transfers
    receive() external payable {
        deposits[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Called when msg.data is not empty and no function matches
    fallback() external payable {
        deposits[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Explicit deposit function
    function deposit() external payable {
        require(msg.value > 0, "Must send Ether");
        deposits[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Withdraw own deposits
    function withdraw(uint256 amount) external {
        uint256 available = deposits[msg.sender];
        if (amount > available) {
            revert InsufficientBalance(amount, available);
        }
        deposits[msg.sender] -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) revert TransferFailed();

        emit Withdrawn(msg.sender, amount);
    }

    // Owner drains contract
    function drain() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner).call{value: balance}("");
        if (!success) revert TransferFailed();
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
`,
  },
];

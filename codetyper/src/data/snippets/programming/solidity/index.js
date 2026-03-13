// ─── SOLIDITY SNIPPETS ────────────────────────────────────────────────────────

const beginner = [
  {
    id: "sol-beg-001",
    title: "Smart Contract básico",
    description: "Contrato simple con estado y funciones",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Almacen {
    uint256 private valor;
    address public propietario;

    constructor() {
        propietario = msg.sender;
    }

    modifier soloPropietario() {
        require(msg.sender == propietario, "No autorizado");
        _;
    }

    function guardar(uint256 _valor) public soloPropietario {
        valor = _valor;
    }

    function obtener() public view returns (uint256) {
        return valor;
    }
}`,
  },
  {
    id: "sol-beg-002",
    title: "Contrato con eventos",
    description: "Emitir y escuchar eventos on-chain",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Contador {
    uint256 public count;

    event Incrementado(address indexed usuario, uint256 nuevoValor);
    event Reseteado(address indexed usuario);

    function incrementar() public {
        count += 1;
        emit Incrementado(msg.sender, count);
    }

    function resetear() public {
        count = 0;
        emit Reseteado(msg.sender);
    }

    function obtener() public view returns (uint256) {
        return count;
    }
}`,
  },
];

const intermediate = [
  {
    id: "sol-int-001",
    title: "Token ERC-20",
    description: "Implementación estándar ERC-20",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MiToken {
    string public name = "MiToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 _supply) {
        totalSupply = _supply * 10 ** decimals;
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Saldo insuficiente");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
}`,
  },
  {
    id: "sol-int-002",
    title: "NFT ERC-721 básico",
    description: "Contrato NFT con mint y tokenURI",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MiNFT is ERC721, Ownable {
    uint256 public tokenCount;
    uint256 public maxSupply = 10000;
    uint256 public precio = 0.05 ether;

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("MiNFT", "MNFT") {}

    function mint(string memory uri) public payable {
        require(msg.value >= precio, "ETH insuficiente");
        require(tokenCount < maxSupply, "Supply agotado");

        tokenCount++;
        _mint(msg.sender, tokenCount);
        _tokenURIs[tokenCount] = uri;
    }

    function tokenURI(uint256 tokenId)
        public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}`,
  },
];

const advanced = [
  {
    id: "sol-adv-001",
    title: "Flash Loan básico (Aave)",
    description: "Implementación de flash loan con Aave V3",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoan is FlashLoanSimpleReceiverBase {

    constructor(address _addressProvider)
        FlashLoanSimpleReceiverBase(
            IPoolAddressesProvider(_addressProvider)
        ) {}

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        // ─── Tu lógica de arbitraje aquí ───

        uint256 totalDeuda = amount + premium;
        IERC20(asset).approve(address(POOL), totalDeuda);
        return true;
    }

    function solicitarFlashLoan(address token, uint256 monto) public {
        POOL.flashLoanSimple(address(this), token, monto, "0x", 0);
    }
}`,
  },
  {
    id: "sol-adv-002",
    title: "MEV Bot — Sandwich Attack",
    description: "Estructura básica de bot MEV para estudio",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ⚠️ Solo con fines educativos
interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function getAmountsOut(
        uint amountIn,
        address[] calldata path
    ) external view returns (uint[] memory amounts);
}

contract MEVBot {
    IUniswapV2Router public router;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }

    constructor(address _router) {
        router = IUniswapV2Router(_router);
        owner = msg.sender;
    }

    function calcularArbitraje(
        address tokenA,
        address tokenB,
        uint256 monto
    ) external view returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = tokenA;
        path[1] = tokenB;

        uint[] memory amounts = router.getAmountsOut(monto, path);
        return amounts[1];
    }
}`,
  },
];

const solidity = { beginner, intermediate, advanced };
export default solidity;

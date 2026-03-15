// src/data/snippets/programming/csharp/exam/full.js

const exam = [
  {
    id: "cs-exam-001",
    title: "C# Full — API + Service + Repository",
    difficulty: "advanced",
    description: "Variables, clases, interfaces, LINQ, async/await y API en un solo fichero",
    code: `// 1. Records & Models
public record CreateProductRequest(string Name, decimal Price, int Stock);
public record ProductDto(int Id, string Name, decimal Price, int Stock);

// 2. Interface
public interface IProductRepository
{
    Task<ProductDto?>          GetByIdAsync(int id);
    Task<IEnumerable<ProductDto>> GetAllAsync();
    Task<ProductDto>           CreateAsync(CreateProductRequest req);
    Task<bool>                 DeleteAsync(int id);
}

// 3. Service with LINQ & async
public class ProductService
{
    private readonly IProductRepository _repo;
    private readonly ILogger<ProductService> _logger;

    public ProductService(
        IProductRepository repo,
        ILogger<ProductService> logger)
    {
        _repo   = repo;
        _logger = logger;
    }

    public async Task<IEnumerable<ProductDto>> GetInStockAsync()
    {
        var all = await _repo.GetAllAsync();
        return all
            .Where(p => p.Stock > 0)
            .OrderByDescending(p => p.Price);
    }

    public async Task<ProductDto?> CreateSafeAsync(
        CreateProductRequest req)
    {
        if (req.Price <= 0 || req.Stock < 0)
        {
            _logger.LogWarning("Invalid product data: {Name}", req.Name);
            return null;
        }

        try
        {
            return await _repo.CreateAsync(req);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create product");
            return null;
        }
    }
}

// 4. Controller
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductService _service;

    public ProductsController(ProductService service)
    {
        _service = service;
    }

    [HttpGet("in-stock")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetInStock()
        => Ok(await _service.GetInStockAsync());

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create(
        [FromBody] CreateProductRequest request)
    {
        var product = await _service.CreateSafeAsync(request);
        return product is null
            ? BadRequest("Invalid product data")
            : CreatedAtAction(nameof(GetInStock), product);
    }
}

// 5. Pattern matching utility
static string ClassifyProduct(ProductDto p) => p switch
{
    { Price: > 1000 }          => "Premium",
    { Price: > 100, Stock: > 50 } => "Popular",
    { Stock: 0 }               => "Out of stock",
    _                          => "Standard",
};`,
  },
];

export default exam;

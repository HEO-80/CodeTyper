// src/data/snippets/programming/csharp/advanced/api.js

const api = [
  {
    id: "cs-adv-api-001",
    title: ".NET Web API Controller",
    difficulty: "advanced",
    description: "Controller REST completo con GET, POST, PUT, DELETE",
    code: `[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _service;
    private readonly ILogger<UsersController> _logger;

    public UsersController(
        IUserService service,
        ILogger<UsersController> logger)
    {
        _service = service;
        _logger  = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
    {
        var users = await _service.GetAllAsync();
        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserDto>> GetById(int id)
    {
        var user = await _service.GetByIdAsync(id);
        return user is null ? NotFound() : Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> Create(
        [FromBody] CreateUserRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _service.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] UpdateUserRequest request)
    {
        var success = await _service.UpdateAsync(id, request);
        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}`,
  },
  {
    id: "cs-adv-api-002",
    title: "Minimal API + Middleware",
    difficulty: "advanced",
    description: "Program.cs con Minimal API, DI y middleware",
    code: `// Program.cs — .NET 8 Minimal API
var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddDbContext<AppDbContext>(opts =>
    opts.UseSqlServer(builder.Configuration
        .GetConnectionString("Default")));

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// Minimal API endpoints
app.MapGet("/api/users", async (IUserService svc) =>
    Results.Ok(await svc.GetAllAsync()));

app.MapGet("/api/users/{id:int}", async (int id, IUserService svc) =>
    await svc.GetByIdAsync(id) is { } user
        ? Results.Ok(user)
        : Results.NotFound());

app.MapPost("/api/users", async (
    CreateUserRequest req,
    IUserService svc) =>
{
    var user = await svc.CreateAsync(req);
    return Results.Created($"/api/users/{user.Id}", user);
});

app.MapDelete("/api/users/{id:int}", async (int id, IUserService svc) =>
    await svc.DeleteAsync(id)
        ? Results.NoContent()
        : Results.NotFound());

app.Run();`,
  },
];

export default api;

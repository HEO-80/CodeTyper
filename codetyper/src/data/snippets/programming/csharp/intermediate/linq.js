// src/data/snippets/programming/csharp/intermediate/linq.js

const linq = [
  {
    id: "cs-int-linq-001",
    title: "LINQ Basics",
    difficulty: "intermediate",
    description: "Where, Select, OrderBy, GroupBy con LINQ",
    code: `var employees = new List<Employee>
{
    new(1, "Alice",   "Engineering", 75000),
    new(2, "Bob",     "Marketing",   55000),
    new(3, "Carol",   "Engineering", 85000),
    new(4, "Dave",    "Marketing",   60000),
    new(5, "Eve",     "Engineering", 90000),
};

// Filter + project
var engineers = employees
    .Where(e => e.Department == "Engineering")
    .Select(e => new { e.Name, e.Salary })
    .OrderByDescending(e => e.Salary);

// Group by department
var byDept = employees
    .GroupBy(e => e.Department)
    .Select(g => new
    {
        Department = g.Key,
        Count      = g.Count(),
        AvgSalary  = g.Average(e => e.Salary),
        TopEarner  = g.Max(e => e.Salary),
    });

foreach (var dept in byDept)
    Console.WriteLine(
        $"{dept.Department}: {dept.Count} people, avg \${dept.AvgSalary:N0}");

record Employee(int Id, string Name, string Department, double Salary);`,
  },
  {
    id: "cs-int-linq-002",
    title: "async / await",
    difficulty: "intermediate",
    description: "Task, async/await, HttpClient y manejo de errores",
    code: `using System.Net.Http.Json;

public class WeatherService
{
    private readonly HttpClient _http;

    public WeatherService(HttpClient http)
    {
        _http = http;
    }

    public async Task<WeatherDto?> GetWeatherAsync(
        string city,
        CancellationToken ct = default)
    {
        try
        {
            var url = $"https://api.weather.io/v1/{city}";
            var result = await _http.GetFromJsonAsync<WeatherDto>(url, ct);
            return result;
        }
        catch (HttpRequestException ex)
        {
            Console.Error.WriteLine($"Request failed: {ex.Message}");
            return null;
        }
        catch (TaskCanceledException)
        {
            Console.Error.WriteLine("Request timed out.");
            return null;
        }
    }

    public async Task<IEnumerable<WeatherDto>> GetMultipleAsync(
        IEnumerable<string> cities)
    {
        var tasks = cities.Select(c => GetWeatherAsync(c));
        var results = await Task.WhenAll(tasks);
        return results.Where(r => r is not null)!;
    }
}

record WeatherDto(string City, double TempC, string Description);`,
  },
];

export default linq;

// src/data/snippets/programming/csharp/advanced/patterns.js

const patterns = [
  {
    id: "cs-adv-pat-001",
    title: "Generics & Delegates",
    difficulty: "advanced",
    description: "Clases genéricas, Func, Action y expression trees",
    code: `// Generic repository base
public class Repository<T> where T : class, IEntity
{
    protected readonly List<T> _store = new();

    public T? FindById(int id) =>
        _store.FirstOrDefault(e => e.Id == id);

    public IEnumerable<T> Find(Func<T, bool> predicate) =>
        _store.Where(predicate);

    public void Save(T entity)
    {
        if (_store.Any(e => e.Id == entity.Id))
            _store[_store.FindIndex(e => e.Id == entity.Id)] = entity;
        else
            _store.Add(entity);
    }
}

// Pipeline with delegates
public class Pipeline<T>
{
    private readonly List<Func<T, T>> _steps = new();

    public Pipeline<T> AddStep(Func<T, T> step)
    {
        _steps.Add(step);
        return this;
    }

    public T Execute(T input) =>
        _steps.Aggregate(input, (current, step) => step(current));
}

// Usage
var pipeline = new Pipeline<string>()
    .AddStep(s => s.Trim())
    .AddStep(s => s.ToLower())
    .AddStep(s => s.Replace(" ", "-"));

Console.WriteLine(pipeline.Execute("  Hello World  "));`,
  },
  {
    id: "cs-adv-pat-002",
    title: "Pattern Matching",
    difficulty: "advanced",
    description: "switch expressions, when guards y record types",
    code: `// Records (C# 9+)
public record Point(double X, double Y);
public record Circle(Point Center, double Radius) : Shape;
public record Rectangle(Point TopLeft, double Width, double Height) : Shape;
public abstract record Shape;

// Pattern matching with switch expression
static double GetArea(Shape shape) => shape switch
{
    Circle c                        => Math.PI * c.Radius * c.Radius,
    Rectangle r                     => r.Width * r.Height,
    null                            => throw new ArgumentNullException(nameof(shape)),
    _                               => throw new NotSupportedException(),
};

// Property pattern + when guard
static string ClassifyEmployee(Employee e) => e switch
{
    { Salary: > 100_000, Department: "Engineering" } => "Senior Engineer",
    { Salary: > 80_000 }                             => "Senior Staff",
    { Department: "Engineering" }                    => "Engineer",
    { YearsOfService: >= 10 }                        => "Veteran",
    _                                                => "Staff",
};

var c = new Circle(new Point(0, 0), 5);
var r = new Rectangle(new Point(1, 1), 4, 6);

Console.WriteLine(GetArea(c));
Console.WriteLine(GetArea(r));`,
  },
];

export default patterns;

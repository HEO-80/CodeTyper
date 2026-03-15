// src/data/snippets/programming/csharp/intermediate/classes.js

const classes = [
  {
    id: "cs-int-cls-001",
    title: "Classes & Inheritance",
    difficulty: "intermediate",
    description: "Clases, herencia, override, propiedades y constructores",
    code: `public abstract class Shape
{
    public string Color { get; set; } = "white";

    public abstract double Area();
    public abstract double Perimeter();

    public virtual string Describe() =>
        $"{GetType().Name} [{Color}] — Area: {Area():F2}";
}

public class Circle : Shape
{
    public double Radius { get; }

    public Circle(double radius, string color = "red")
    {
        Radius = radius;
        Color = color;
    }

    public override double Area() => Math.PI * Radius * Radius;
    public override double Perimeter() => 2 * Math.PI * Radius;
}

public class Rectangle : Shape
{
    public double Width  { get; }
    public double Height { get; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public override double Area() => Width * Height;
    public override double Perimeter() => 2 * (Width + Height);
}

// Usage
var shapes = new List<Shape>
{
    new Circle(5, "blue"),
    new Rectangle(4, 6),
};

foreach (var shape in shapes)
    Console.WriteLine(shape.Describe());`,
  },
  {
    id: "cs-int-cls-002",
    title: "Interfaces",
    difficulty: "intermediate",
    description: "Interfaces, implementación múltiple y default methods",
    code: `public interface IRepository<T>
{
    T? GetById(int id);
    IEnumerable<T> GetAll();
    void Add(T entity);
    void Update(T entity);
    void Delete(int id);
}

public interface IAuditable
{
    DateTime CreatedAt { get; }
    DateTime? UpdatedAt { get; }
}

public class User : IAuditable
{
    public int    Id        { get; set; }
    public string Name      { get; set; } = "";
    public string Email     { get; set; } = "";
    public DateTime CreatedAt  { get; init; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

public class UserRepository : IRepository<User>
{
    private readonly List<User> _users = new();

    public User? GetById(int id) =>
        _users.FirstOrDefault(u => u.Id == id);

    public IEnumerable<User> GetAll() => _users.AsReadOnly();

    public void Add(User user) => _users.Add(user);

    public void Update(User user)
    {
        var index = _users.FindIndex(u => u.Id == user.Id);
        if (index >= 0) _users[index] = user;
    }

    public void Delete(int id) =>
        _users.RemoveAll(u => u.Id == id);
}`,
  },
];

export default classes;

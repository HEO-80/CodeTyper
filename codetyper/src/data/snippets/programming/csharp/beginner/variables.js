// src/data/snippets/programming/csharp/beginner/variables.js

const variables = [
  {
    id: "cs-beg-var-001",
    title: "Variables & Types",
    difficulty: "beginner",
    description: "Tipos básicos, var, const y string interpolation",
    code: `// Value types
int age = 28;
double price = 19.99;
bool isActive = true;
char grade = 'A';

// String
string name = "Ada Lovelace";
string greeting = $"Hello, {name}! You are {age} years old.";

// var — type inference
var city = "Madrid";
var year = 2024;

// Constants
const double PI = 3.14159;
const int MAX_RETRY = 3;

// Nullable types
int? score = null;
string? email = null;

Console.WriteLine(greeting);
Console.WriteLine($"City: {city}, Year: {year}");
Console.WriteLine($"Score: {score ?? 0}");`,
  },
  {
    id: "cs-beg-var-002",
    title: "Arrays & Collections",
    difficulty: "beginner",
    description: "Arrays, List y Dictionary básicos",
    code: `// Array
int[] numbers = { 1, 2, 3, 4, 5 };
string[] days = new string[7];
days[0] = "Monday";

// List<T>
var fruits = new List<string> { "apple", "banana", "cherry" };
fruits.Add("mango");
fruits.Remove("banana");

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit.ToUpper());
}

// Dictionary<K, V>
var scores = new Dictionary<string, int>
{
    { "Alice", 95 },
    { "Bob",   87 },
    { "Carol", 92 },
};

scores["Dave"] = 88;

foreach (var entry in scores)
{
    Console.WriteLine($"{entry.Key}: {entry.Value}");
}`,
  },
  {
    id: "cs-beg-var-003",
    title: "Operators & Conditionals",
    difficulty: "beginner",
    description: "Operadores, if/else, switch expression",
    code: `int a = 10, b = 3;

Console.WriteLine(a + b);
Console.WriteLine(a % b);
Console.WriteLine(a / (double)b);
Console.WriteLine(Math.Pow(a, b));

// Null coalescing
string? input = null;
string result = input ?? "default";
int length = input?.Length ?? 0;

// if / else
int score = 85;
string grade;
if (score >= 90)      grade = "A";
else if (score >= 80) grade = "B";
else if (score >= 70) grade = "C";
else                  grade = "F";

// switch expression (C# 8+)
string label = score switch
{
    >= 90 => "Excellent",
    >= 80 => "Good",
    >= 70 => "Pass",
    _     => "Fail",
};

Console.WriteLine($"Grade: {grade}, Label: {label}");`,
  },
];

export default variables;

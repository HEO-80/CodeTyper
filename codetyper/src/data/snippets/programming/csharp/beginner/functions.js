// src/data/snippets/programming/csharp/beginner/functions.js

const functions = [
  {
    id: "cs-beg-fn-001",
    title: "Methods & Parameters",
    difficulty: "beginner",
    description: "Métodos, parámetros opcionales, out y ref",
    code: `// Basic method
static string Greet(string name)
{
    return $"Hello, {name}!";
}

// Optional parameters
static double CalculateTax(double amount, double rate = 0.21)
{
    return amount * rate;
}

// out parameter
static bool TryParseAge(string input, out int age)
{
    return int.TryParse(input, out age) && age > 0 && age < 150;
}

// Expression-bodied method
static int Square(int n) => n * n;
static bool IsEven(int n) => n % 2 == 0;

// Usage
Console.WriteLine(Greet("World"));
Console.WriteLine(CalculateTax(100));
Console.WriteLine(CalculateTax(100, 0.10));

if (TryParseAge("25", out int age))
    Console.WriteLine($"Valid age: {age}");

Console.WriteLine(Square(5));
Console.WriteLine(IsEven(4));`,
  },
  {
    id: "cs-beg-fn-002",
    title: "Loops",
    difficulty: "beginner",
    description: "for, foreach, while, do-while, break y continue",
    code: `// for loop
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Index: {i}");
}

// foreach
string[] names = { "Alice", "Bob", "Carol" };
foreach (string name in names)
{
    Console.WriteLine(name.ToUpper());
}

// while
int count = 0;
while (count < 3)
{
    Console.WriteLine($"Count: {count}");
    count++;
}

// do-while
int attempts = 0;
do
{
    Console.WriteLine($"Attempt {attempts + 1}");
    attempts++;
} while (attempts < 3);

// break & continue
for (int i = 0; i < 10; i++)
{
    if (i == 7) break;
    if (i % 2 == 0) continue;
    Console.WriteLine(i);
}`,
  },
];

export default functions;

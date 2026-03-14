// src/data/snippets/programming/python/beginner/basics.js

export default [
  {
    id: "py-beg-001",
    title: "Variables and Data Types",
    description: "Basic Python types: str, int, float, bool, None",
    difficulty: "beginner",
    code: `# variables.py

# Strings
name: str = "Alice"
greeting: str = f"Hello, {name}!"
multiline: str = """
This is a
multiline string
"""

# Numbers
age: int = 30
height: float = 1.75
negative: int = -42
big_number: int = 1_000_000  # underscore separator

# Boolean
is_active: bool = True
is_admin: bool = False

# None
last_login = None

# Type checking
print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>
print(type(height))     # <class 'float'>
print(type(is_active))  # <class 'bool'>
print(type(last_login)) # <class 'NoneType'>

# String operations
print(name.upper())
print(name.lower())
print(len(name))
print(greeting)
print(f"Age: {age}, Height: {height:.2f}m")

if __name__ == "__main__":
    print("Script running directly")
`,
  },
  {
    id: "py-beg-002",
    title: "Lists and Tuples",
    description: "Creating, accessing and manipulating lists and tuples",
    difficulty: "beginner",
    code: `# lists-tuples.py
from typing import List, Tuple

# Lists — mutable, ordered
fruits: List[str] = ["apple", "banana", "cherry"]
scores: List[int] = [98, 87, 76, 100, 65]
mixed: List = [1, "hello", True, 3.14]

# List operations
fruits.append("mango")
fruits.insert(1, "blueberry")
fruits.remove("banana")
fruits.sort()

# Slicing
first_three: List[int] = scores[:3]
last_two: List[int] = scores[-2:]
reversed_scores: List[int] = scores[::-1]

# List comprehension
squared: List[int] = [x ** 2 for x in range(1, 6)]
evens: List[int] = [x for x in range(20) if x % 2 == 0]
upper_fruits: List[str] = [f.upper() for f in fruits]

# Tuples — immutable, ordered
point: Tuple[float, float] = (40.7128, -74.0060)
user: Tuple[str, int, bool] = ("Alice", 30, True)

# Unpacking
lat, lng = point
name, age, active = user

print(fruits)
print(f"Max score: {max(scores)}, Min: {min(scores)}, Avg: {sum(scores)/len(scores):.1f}")
print(f"Squared: {squared}")
print(f"Location: {lat:.4f}, {lng:.4f}")
print(f"User: {name}, {age}, {active}")

if __name__ == "__main__":
    print(upper_fruits)
`,
  },
  {
    id: "py-beg-003",
    title: "Dictionaries and Sets",
    description: "Dict operations, set theory and practical use cases",
    difficulty: "beginner",
    code: `# dicts-sets.py
from typing import Dict, Set, Any

# Dictionaries — key-value pairs
user: Dict[str, Any] = {
    "id": 1,
    "name": "Alice",
    "email": "alice@email.com",
    "age": 30,
    "active": True,
}

# Access and modify
print(user["name"])
print(user.get("phone", "N/A"))  # safe access with default

user["phone"] = "+1-555-0100"
user["age"] = 31

# Dict methods
keys = list(user.keys())
values = list(user.values())
items = list(user.items())

# Dict comprehension
squares: Dict[int, int] = {x: x ** 2 for x in range(1, 6)}
lengths: Dict[str, int] = {k: len(str(v)) for k, v in user.items()}

# Sets — unique unordered elements
tags: Set[str] = {"python", "developer", "backend"}
more_tags: Set[str] = {"python", "fullstack", "docker"}

# Set operations
union = tags | more_tags
intersection = tags & more_tags
difference = tags - more_tags

print(f"Keys: {keys}")
print(f"Squares: {squares}")
print(f"Union: {union}")
print(f"Intersection: {intersection}")
print(f"Difference: {difference}")

if __name__ == "__main__":
    for key, value in user.items():
        print(f"  {key}: {value}")
`,
  },
  {
    id: "py-beg-004",
    title: "Control Flow",
    description: "if/elif/else, for/while loops, break, continue, range",
    difficulty: "beginner",
    code: `# control-flow.py
from typing import List

# if / elif / else
def classify_score(score: int) -> str:
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

# Ternary expression
age: int = 20
status: str = "adult" if age >= 18 else "minor"

# for loop
fruits: List[str] = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits):
    print(f"[{i}] {fruit}")

# range
for n in range(1, 6):
    print(f"{n} x 3 = {n * 3}")

# while with break and continue
count: int = 0
while count < 10:
    count += 1
    if count % 2 == 0:
        continue   # skip even numbers
    if count > 7:
        break      # stop at 7
    print(f"Odd: {count}")

# List comprehension with condition
scores: List[int] = [88, 73, 91, 55, 67, 95, 42]
passing: List[int] = [s for s in scores if s >= 70]
grades: List[str] = [classify_score(s) for s in scores]

print(f"Status: {status}")
print(f"Passing: {passing}")
print(f"Grades: {grades}")

if __name__ == "__main__":
    print(f"All grades: {list(zip(scores, grades))}")
`,
  },
  {
    id: "py-beg-005",
    title: "Functions",
    description: "def, default args, *args, **kwargs, return types",
    difficulty: "beginner",
    code: `# functions.py
from typing import List, Optional, Any

def add(a: int, b: int) -> int:
    return a + b

def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

def log(message: str, level: str = "INFO") -> None:
    print(f"[{level}] {message}")

# *args — variable positional arguments
def sum_all(*numbers: int) -> int:
    return sum(numbers)

# **kwargs — variable keyword arguments
def build_profile(**kwargs: Any) -> dict:
    return {k: v for k, v in kwargs.items()}

# Optional return type
def find_user(user_id: int, users: List[dict]) -> Optional[dict]:
    return next((u for u in users if u["id"] == user_id), None)

# Lambda
square = lambda x: x ** 2
multiply = lambda a, b: a * b

# Higher order functions
numbers: List[int] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
squares = list(map(lambda x: x ** 2, numbers))

users = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]

print(add(3, 7))
print(greet("Alice"))
print(greet("Bob", "Hi"))
print(sum_all(1, 2, 3, 4, 5))
print(build_profile(name="Alice", age=30, role="admin"))
print(find_user(2, users))
print(f"Evens: {evens}")
print(f"Squares: {squares}")

if __name__ == "__main__":
    log("Application started")
    log("Low memory warning", "WARN")
`,
  },
];

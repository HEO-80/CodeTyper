// src/data/snippets/programming/python/beginner/classes.js

export default [
  {
    id: "py-beg-006",
    title: "Classes and OOP",
    description: "Class definition, __init__, methods, inheritance",
    difficulty: "beginner",
    code: `# classes.py
from typing import Optional

class Animal:
    # Class variable — shared across all instances
    kingdom: str = "Animalia"

    def __init__(self, name: str, species: str, age: int) -> None:
        self.name = name
        self.species = species
        self.age = age
        self._health: int = 100  # protected by convention

    def speak(self) -> str:
        return f"{self.name} makes a sound."

    def get_info(self) -> str:
        return f"{self.name} ({self.species}), age {self.age}"

    def __str__(self) -> str:
        return self.get_info()

    def __repr__(self) -> str:
        return f"Animal(name={self.name!r}, species={self.species!r})"


class Dog(Animal):
    def __init__(self, name: str, age: int, breed: str) -> None:
        super().__init__(name, "Canis lupus familiaris", age)
        self.breed = breed

    def speak(self) -> str:
        return f"{self.name} barks! Woof!"

    def fetch(self, item: str) -> str:
        return f"{self.name} fetches the {item}!"


class Cat(Animal):
    def __init__(self, name: str, age: int, indoor: bool = True) -> None:
        super().__init__(name, "Felis catus", age)
        self.indoor = indoor

    def speak(self) -> str:
        return f"{self.name} meows! Meow!"

    def purr(self) -> str:
        return f"{self.name} purrs... Prrrr"


dog = Dog("Rex", 4, "Labrador")
cat = Cat("Luna", 3)

print(dog)
print(dog.speak())
print(dog.fetch("ball"))
print(cat.speak())
print(cat.purr())

# Polymorphism
animals: list[Animal] = [dog, cat, Dog("Buddy", 2, "Poodle")]
for animal in animals:
    print(animal.speak())

if __name__ == "__main__":
    print(f"Kingdom: {Animal.kingdom}")
    print(repr(dog))
`,
  },
  {
    id: "py-beg-007",
    title: "Modules and Imports",
    description: "import, from...import, standard library modules",
    difficulty: "beginner",
    code: `# modules.py
import os
import sys
import math
import random
import datetime
from pathlib import Path
from collections import Counter, defaultdict
from typing import List

# os module
cwd: str = os.getcwd()
home: str = os.path.expanduser("~")
env_user: str = os.environ.get("USER", "unknown")

# math module
pi: float = math.pi
sqrt2: float = math.sqrt(2)
ceil_val: int = math.ceil(3.2)
floor_val: int = math.floor(3.8)

# random module
random_int: int = random.randint(1, 100)
random_float: float = random.uniform(0.0, 1.0)
items: List[str] = ["apple", "banana", "cherry", "mango"]
chosen: str = random.choice(items)
random.shuffle(items)

# datetime module
now: datetime.datetime = datetime.datetime.now()
today: datetime.date = datetime.date.today()
formatted: str = now.strftime("%Y-%m-%d %H:%M:%S")

# pathlib
config_path: Path = Path.home() / ".config" / "app" / "settings.json"

# collections
words: List[str] = ["apple", "banana", "apple", "cherry", "banana", "apple"]
word_count: Counter = Counter(words)
grouped: defaultdict = defaultdict(list)
for word in words:
    grouped[word[0]].append(word)

print(f"CWD: {cwd}")
print(f"Pi: {pi:.6f}, sqrt(2): {sqrt2:.6f}")
print(f"Random int: {random_int}, float: {random_float:.4f}")
print(f"Chosen: {chosen}, Shuffled: {items}")
print(f"Now: {formatted}")
print(f"Word count: {dict(word_count)}")
print(f"Grouped: {dict(grouped)}")

if __name__ == "__main__":
    print(f"Python version: {sys.version}")
    print(f"Config path: {config_path}")
`,
  },
];

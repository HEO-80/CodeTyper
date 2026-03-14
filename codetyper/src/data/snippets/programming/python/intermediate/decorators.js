// src/data/snippets/programming/python/intermediate/decorators.js

export default [
  {
    id: "py-int-001",
    title: "Decorators",
    description: "Function decorators, wraps, parametrized decorators",
    difficulty: "intermediate",
    code: `# decorators.py
import time
import functools
from typing import Callable, Any, TypeVar

F = TypeVar("F", bound=Callable[..., Any])

# Basic decorator
def logger(func: F) -> F:
    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print(f"Calling {func.__name__} with args={args} kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper  # type: ignore

# Timer decorator
def timer(func: F) -> F:
    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.6f}s")
        return result
    return wrapper  # type: ignore

# Parametrized decorator
def retry(max_attempts: int = 3, delay: float = 0.5):
    def decorator(func: F) -> F:
        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Attempt {attempt} failed: {e}")
                    if attempt < max_attempts:
                        time.sleep(delay)
            raise RuntimeError(f"{func.__name__} failed after {max_attempts} attempts")
        return wrapper  # type: ignore
    return decorator

@logger
@timer
def add(a: int, b: int) -> int:
    return a + b

@retry(max_attempts=3, delay=0.1)
def unstable_operation(value: int) -> int:
    if value < 5:
        raise ValueError(f"Value {value} too low")
    return value * 2

add(3, 7)

try:
    result = unstable_operation(10)
    print(f"Result: {result}")
except RuntimeError as e:
    print(f"Error: {e}")

if __name__ == "__main__":
    add(10, 20)
`,
  },
  {
    id: "py-int-002",
    title: "Comprehensions and Generators",
    description: "List, dict, set comprehensions and generator expressions",
    difficulty: "intermediate",
    code: `# comprehensions-generators.py
from typing import Generator, Iterator, List, Dict
import sys

# List comprehensions
squares: List[int] = [x ** 2 for x in range(1, 11)]
evens: List[int] = [x for x in range(20) if x % 2 == 0]
matrix: List[List[int]] = [[i * j for j in range(1, 4)] for i in range(1, 4)]
flat: List[int] = [n for row in matrix for n in row]

# Dict comprehensions
word_lengths: Dict[str, int] = {
    word: len(word)
    for word in ["python", "javascript", "rust", "go"]
}
squared_map: Dict[int, int] = {x: x ** 2 for x in range(1, 6)}

# Set comprehension
unique_lengths: set = {len(w) for w in ["hello", "world", "hi", "python"]}

# Generator — lazy evaluation, memory efficient
def fibonacci() -> Generator[int, None, None]:
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

def count_up(start: int, stop: int, step: int = 1) -> Iterator[int]:
    current = start
    while current <= stop:
        yield current
        current += step

# Generator expression
gen_squares = (x ** 2 for x in range(1_000_000))  # no memory overhead

# Take first n from generator
def take(n: int, gen: Generator) -> List:
    return [next(gen) for _ in range(n)]

fib = fibonacci()
first_10_fib = take(10, fib)

print(f"Squares: {squares}")
print(f"Matrix: {matrix}")
print(f"Flat: {flat}")
print(f"Word lengths: {word_lengths}")
print(f"Fibonacci: {first_10_fib}")
print(f"Count 0-10 step 2: {list(count_up(0, 10, 2))}")

# Memory comparison
list_mem = sys.getsizeof([x ** 2 for x in range(1000)])
gen_mem = sys.getsizeof(x ** 2 for x in range(1000))
print(f"List size: {list_mem} bytes, Generator size: {gen_mem} bytes")

if __name__ == "__main__":
    print(f"Unique lengths: {unique_lengths}")
`,
  },
  {
    id: "py-int-003",
    title: "Error Handling and Context Managers",
    description: "try/except/finally, custom exceptions, with statement",
    difficulty: "intermediate",
    code: `# error-handling.py
from __future__ import annotations
import contextlib
import logging
from typing import Optional
from pathlib import Path

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

# Custom exceptions
class AppError(Exception):
    """Base application exception."""
    def __init__(self, message: str, code: int = 0) -> None:
        super().__init__(message)
        self.code = code

class NotFoundError(AppError):
    """Resource not found."""

class ValidationError(AppError):
    """Input validation failed."""

# try / except / else / finally
def parse_integer(value: str) -> Optional[int]:
    try:
        result = int(value)
    except ValueError as e:
        logger.error(f"Cannot parse '{value}' as integer: {e}")
        return None
    except TypeError as e:
        logger.error(f"Invalid type: {e}")
        return None
    else:
        logger.info(f"Parsed successfully: {result}")
        return result
    finally:
        logger.debug("parse_integer completed")

# Custom context manager using class
class ManagedResource:
    def __init__(self, name: str) -> None:
        self.name = name

    def __enter__(self) -> "ManagedResource":
        logger.info(f"Opening resource: {self.name}")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:
        logger.info(f"Closing resource: {self.name}")
        if exc_type is not None:
            logger.error(f"Exception during context: {exc_val}")
        return False  # don't suppress exceptions

# Context manager using decorator
@contextlib.contextmanager
def timer(label: str):
    import time
    start = time.perf_counter()
    try:
        yield
    finally:
        elapsed = time.perf_counter() - start
        logger.info(f"{label} took {elapsed:.4f}s")

# Usage
print(parse_integer("42"))
print(parse_integer("abc"))

with ManagedResource("database") as res:
    print(f"Using {res.name}")

with timer("heavy computation"):
    total = sum(range(1_000_000))
    print(f"Sum: {total}")

try:
    raise NotFoundError("User not found", code=404)
except NotFoundError as e:
    print(f"[{e.code}] {e}")

if __name__ == "__main__":
    print("Error handling demo complete")
`,
  },
];

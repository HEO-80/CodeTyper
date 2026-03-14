// src/data/snippets/programming/python/advanced/advanced.js

export default [
  {
    id: "py-adv-001",
    title: "Dataclasses and Protocols",
    description: "dataclass, field, Protocol, structural subtyping",
    difficulty: "advanced",
    code: `# dataclasses-protocols.py
from __future__ import annotations
from dataclasses import dataclass, field, asdict
from typing import Protocol, runtime_checkable, List, ClassVar
from datetime import datetime

@dataclass
class Address:
    street: str
    city: str
    country: str = "US"
    zip_code: str = ""

    def __str__(self) -> str:
        return f"{self.street}, {self.city}, {self.country}"

@dataclass
class User:
    id: int
    name: str
    email: str
    address: Address
    tags: List[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)
    _instance_count: ClassVar[int] = 0

    def __post_init__(self) -> None:
        User._instance_count += 1
        self.email = self.email.lower().strip()
        if not self.email or "@" not in self.email:
            raise ValueError(f"Invalid email: {self.email}")

    def add_tag(self, tag: str) -> None:
        if tag not in self.tags:
            self.tags.append(tag)

    def to_dict(self) -> dict:
        return asdict(self)

# Protocol — structural subtyping (duck typing with type safety)
@runtime_checkable
class Serializable(Protocol):
    def to_dict(self) -> dict: ...

@runtime_checkable
class Identifiable(Protocol):
    id: int

def serialize(obj: Serializable) -> str:
    import json
    return json.dumps(obj.to_dict(), default=str)

addr = Address("123 Main St", "New York", zip_code="10001")
user = User(id=1, name="Alice", email="  Alice@Email.com  ", address=addr)
user.add_tag("admin")
user.add_tag("developer")

print(user)
print(f"Email normalized: {user.email}")
print(f"Tags: {user.tags}")
print(f"Is Serializable: {isinstance(user, Serializable)}")
print(serialize(user))

if __name__ == "__main__":
    print(f"Instances created: {User._instance_count}")
`,
  },
  {
    id: "py-adv-002",
    title: "Async / Await with asyncio",
    description: "async functions, gather, tasks, semaphores",
    difficulty: "advanced",
    code: `# async-python.py
import asyncio
import aiohttp
import logging
from typing import List, Optional
from dataclasses import dataclass

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class Post:
    id: int
    title: str
    body: str
    user_id: int

async def fetch_post(
    session: aiohttp.ClientSession,
    post_id: int,
    semaphore: asyncio.Semaphore,
) -> Optional[Post]:
    async with semaphore:
        url = f"https://jsonplaceholder.typicode.com/posts/{post_id}"
        try:
            async with session.get(url) as response:
                response.raise_for_status()
                data = await response.json()
                return Post(
                    id=data["id"],
                    title=data["title"],
                    body=data["body"],
                    user_id=data["userId"],
                )
        except aiohttp.ClientError as e:
            logger.error(f"Failed to fetch post {post_id}: {e}")
            return None

async def fetch_all_posts(ids: List[int], max_concurrent: int = 5) -> List[Post]:
    semaphore = asyncio.Semaphore(max_concurrent)
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_post(session, pid, semaphore) for pid in ids]
        results = await asyncio.gather(*tasks, return_exceptions=False)
        return [r for r in results if r is not None]

async def main() -> None:
    logger.info("Fetching posts concurrently...")
    posts = await fetch_all_posts(list(range(1, 6)))

    for post in posts:
        print(f"[{post.id}] {post.title[:50]}...")

    logger.info(f"Fetched {len(posts)} posts successfully")

if __name__ == "__main__":
    asyncio.run(main())
`,
  },
  {
    id: "py-adv-003",
    title: "Metaclasses and Descriptors",
    description: "Custom metaclasses, descriptors and class creation",
    difficulty: "advanced",
    code: `# metaclasses.py
from __future__ import annotations
from typing import Any, Type, Dict

# Descriptor — controls attribute access
class Validated:
    def __set_name__(self, owner: type, name: str) -> None:
        self.name = name
        self.private_name = f"_{name}"

    def __get__(self, obj: Any, objtype: type = None) -> Any:
        if obj is None:
            return self
        return getattr(obj, self.private_name, None)

    def __set__(self, obj: Any, value: Any) -> None:
        self.validate(value)
        setattr(obj, self.private_name, value)

    def validate(self, value: Any) -> None:
        pass

class PositiveNumber(Validated):
    def validate(self, value: Any) -> None:
        if not isinstance(value, (int, float)):
            raise TypeError(f"{self.name} must be a number")
        if value <= 0:
            raise ValueError(f"{self.name} must be positive, got {value}")

class NonEmptyString(Validated):
    def validate(self, value: Any) -> None:
        if not isinstance(value, str):
            raise TypeError(f"{self.name} must be a string")
        if not value.strip():
            raise ValueError(f"{self.name} cannot be empty")

# Metaclass — controls class creation
class SingletonMeta(type):
    _instances: Dict[type, Any] = {}

    def __call__(cls, *args: Any, **kwargs: Any) -> Any:
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class RegistryMeta(type):
    registry: Dict[str, Type] = {}

    def __new__(mcs, name: str, bases: tuple, namespace: dict) -> type:
        cls = super().__new__(mcs, name, bases, namespace)
        if bases:  # don't register the base class itself
            mcs.registry[name] = cls
        return cls

# Usage
class Product:
    name = NonEmptyString()
    price = PositiveNumber()
    stock = PositiveNumber()

    def __init__(self, name: str, price: float, stock: int) -> None:
        self.name = name
        self.price = price
        self.stock = stock

    def __repr__(self) -> str:
        return f"Product({self.name!r}, \${self.price:.2f}, stock={self.stock})"

class Config(metaclass=SingletonMeta):
    def __init__(self, env: str = "development") -> None:
        self.env = env
        self.debug = env != "production"

p = Product("Laptop", 999.99, 10)
print(p)

try:
    p.price = -50
except ValueError as e:
    print(f"Validation error: {e}")

cfg1 = Config("production")
cfg2 = Config("development")
print(f"Singleton: {cfg1 is cfg2}")
print(f"Env: {cfg1.env}")

if __name__ == "__main__":
    print(f"Product: {p}")
`,
  },
];

// src/data/snippets/programming/java/intermediate/streams.js

export default [
  {
    id: "java-int-001",
    title: "Streams and Lambdas",
    description: "Stream API, filter, map, reduce, collect, method references",
    difficulty: "intermediate",
    code: `// StreamsDemo.java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class StreamsDemo {

    record Person(String name, int age, String city) {}

    public static void main(String[] args) {

        List<Person> people = List.of(
            new Person("Alice",   30, "New York"),
            new Person("Bob",     25, "London"),
            new Person("Charlie", 35, "New York"),
            new Person("Diana",   28, "Paris"),
            new Person("Eve",     32, "London")
        );

        // filter + map + collect
        List<String> newYorkers = people.stream()
            .filter(p -> p.city().equals("New York"))
            .map(Person::name)
            .sorted()
            .collect(Collectors.toList());
        System.out.println("New Yorkers: " + newYorkers);

        // average age
        OptionalDouble avgAge = people.stream()
            .mapToInt(Person::age)
            .average();
        System.out.printf("Avg age: %.1f%n", avgAge.orElse(0));

        // group by city
        Map<String, List<Person>> byCity = people.stream()
            .collect(Collectors.groupingBy(Person::city));
        byCity.forEach((city, persons) -> {
            System.out.println(city + ": " + persons.stream()
                .map(Person::name)
                .collect(Collectors.joining(", ")));
        });

        // count adults
        long adultsOver30 = people.stream()
            .filter(p -> p.age() > 30)
            .count();
        System.out.println("Over 30: " + adultsOver30);

        // findFirst with Optional
        Optional<Person> youngest = people.stream()
            .min((a, b) -> Integer.compare(a.age(), b.age()));
        youngest.ifPresent(p -> System.out.println("Youngest: " + p.name()));

        // IntStream range
        int sumTo100 = IntStream.rangeClosed(1, 100).sum();
        System.out.println("Sum 1-100: " + sumTo100);

        // reduce
        int product = IntStream.rangeClosed(1, 5)
            .reduce(1, (a, b) -> a * b);
        System.out.println("5! = " + product);
    }
}
`,
  },
  {
    id: "java-int-002",
    title: "Exception Handling",
    description: "try/catch/finally, custom exceptions, multi-catch, try-with-resources",
    difficulty: "intermediate",
    code: `// ExceptionHandling.java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ExceptionHandling {

    // Custom exception hierarchy
    static class AppException extends RuntimeException {
        private final int code;

        public AppException(String message, int code) {
            super(message);
            this.code = code;
        }

        public int getCode() { return code; }
    }

    static class NotFoundException extends AppException {
        public NotFoundException(String resource) {
            super(resource + " not found", 404);
        }
    }

    static class ValidationException extends AppException {
        public ValidationException(String field, String reason) {
            super("Validation failed for '" + field + "': " + reason, 400);
        }
    }

    // Method declaring checked exception
    static int parsePositive(String value) throws ValidationException {
        try {
            int n = Integer.parseInt(value);
            if (n <= 0) throw new ValidationException("value", "must be positive");
            return n;
        } catch (NumberFormatException e) {
            throw new ValidationException("value", "must be a number");
        }
    }

    // try-with-resources (AutoCloseable)
    static String readFirstLine(String path) {
        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            return reader.readLine();
        } catch (IOException e) {
            return "Error reading file: " + e.getMessage();
        }
    }

    public static void main(String[] args) {

        // Multi-catch
        String[] inputs = {"42", "-5", "abc", "100"};
        for (String input : inputs) {
            try {
                int value = parsePositive(input);
                System.out.println("Parsed: " + value);
            } catch (ValidationException e) {
                System.out.println("[" + e.getCode() + "] " + e.getMessage());
            }
        }

        // finally block
        try {
            System.out.println("Trying...");
            throw new NotFoundException("User");
        } catch (NotFoundException e) {
            System.out.println("[" + e.getCode() + "] " + e.getMessage());
        } finally {
            System.out.println("Finally block always runs");
        }

        // try-with-resources
        String line = readFirstLine("nonexistent.txt");
        System.out.println(line);
    }
}
`,
  },
  {
    id: "java-int-003",
    title: "Optional and Functional Interfaces",
    description: "Optional, Function, Predicate, Consumer, Supplier",
    difficulty: "intermediate",
    code: `// FunctionalDemo.java
import java.util.Optional;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.function.BiFunction;

public class FunctionalDemo {

    record User(int id, String name, String email) {}

    // Simulated repository
    static Optional<User> findById(int id) {
        List<User> users = List.of(
            new User(1, "Alice", "alice@email.com"),
            new User(2, "Bob",   "bob@email.com")
        );
        return users.stream().filter(u -> u.id() == id).findFirst();
    }

    public static void main(String[] args) {

        // Optional usage
        Optional<User> found = findById(1);
        found.ifPresent(u -> System.out.println("Found: " + u.name()));

        String email = findById(2)
            .map(User::email)
            .orElse("unknown@email.com");
        System.out.println("Email: " + email);

        String missing = findById(99)
            .map(User::name)
            .orElse("Guest");
        System.out.println("Missing: " + missing);

        // Function<T, R>
        Function<String, Integer> strLen = String::length;
        Function<Integer, String> intToStr = Object::toString;
        Function<String, String> upperTrim = ((Function<String, String>) String::trim)
            .andThen(String::toUpperCase);

        System.out.println(strLen.apply("Hello"));
        System.out.println(upperTrim.apply("  hello world  "));

        // Predicate<T>
        Predicate<String> isEmail = s -> s.contains("@") && s.contains(".");
        Predicate<Integer> isAdult = age -> age >= 18;
        Predicate<Integer> isNotTooOld = age -> age < 120;
        Predicate<Integer> isValidAge = isAdult.and(isNotTooOld);

        System.out.println(isEmail.test("alice@email.com"));
        System.out.println(isValidAge.test(25));
        System.out.println(isValidAge.negate().test(25));

        // Consumer<T>
        Consumer<User> printUser = u ->
            System.out.println("User: " + u.name() + " <" + u.email() + ">");
        Consumer<User> saveUser = u ->
            System.out.println("Saving user: " + u.id());
        Consumer<User> pipeline = printUser.andThen(saveUser);

        findById(1).ifPresent(pipeline);

        // Supplier<T>
        Supplier<User> defaultUser = () -> new User(0, "Guest", "guest@email.com");
        User guest = findById(99).orElseGet(defaultUser);
        System.out.println("Guest: " + guest.name());

        // BiFunction<T, U, R>
        BiFunction<String, Integer, String> repeat = (s, n) -> s.repeat(n);
        System.out.println(repeat.apply("ha", 3));
    }
}
`,
  },
];

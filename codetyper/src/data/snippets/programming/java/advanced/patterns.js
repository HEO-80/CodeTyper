// src/data/snippets/programming/java/advanced/patterns.js

export default [
  {
    id: "java-adv-001",
    title: "Design Patterns: Builder and Observer",
    description: "Builder pattern for complex objects, Observer for event handling",
    difficulty: "advanced",
    code: `// DesignPatterns.java
import java.util.ArrayList;
import java.util.List;

public class DesignPatterns {

    // ── Builder Pattern ───────────────────────────────────────────────────────
    static final class HttpRequest {
        private final String method;
        private final String url;
        private final String body;
        private final List<String> headers;
        private final int timeoutMs;

        private HttpRequest(Builder builder) {
            this.method    = builder.method;
            this.url       = builder.url;
            this.body      = builder.body;
            this.headers   = List.copyOf(builder.headers);
            this.timeoutMs = builder.timeoutMs;
        }

        @Override
        public String toString() {
            return method + " " + url + " (timeout=" + timeoutMs + "ms)";
        }

        static class Builder {
            private String method = "GET";
            private String url;
            private String body;
            private final List<String> headers = new ArrayList<>();
            private int timeoutMs = 5000;

            public Builder url(String url)           { this.url = url; return this; }
            public Builder method(String method)     { this.method = method; return this; }
            public Builder body(String body)         { this.body = body; return this; }
            public Builder header(String header)     { headers.add(header); return this; }
            public Builder timeout(int ms)           { this.timeoutMs = ms; return this; }
            public HttpRequest build() {
                if (url == null) throw new IllegalStateException("URL is required");
                return new HttpRequest(this);
            }
        }
    }

    // ── Observer Pattern ──────────────────────────────────────────────────────
    interface EventListener<T> {
        void onEvent(T event);
    }

    static class EventBus<T> {
        private final List<EventListener<T>> listeners = new ArrayList<>();

        public void subscribe(EventListener<T> listener) {
            listeners.add(listener);
        }

        public void publish(T event) {
            listeners.forEach(l -> l.onEvent(event));
        }
    }

    record UserCreatedEvent(int id, String name, String email) {}

    public static void main(String[] args) {

        // Builder
        HttpRequest request = new HttpRequest.Builder()
            .url("https://api.example.com/users")
            .method("POST")
            .header("Content-Type: application/json")
            .header("Authorization: Bearer token123")
            .body("{\\"name\\": \\"Alice\\"}")
            .timeout(3000)
            .build();
        System.out.println(request);

        // Observer
        EventBus<UserCreatedEvent> bus = new EventBus<>();
        bus.subscribe(e -> System.out.println("Email service: welcome " + e.name()));
        bus.subscribe(e -> System.out.println("Audit log: user " + e.id() + " created"));
        bus.subscribe(e -> System.out.println("Analytics: new signup from " + e.email()));

        bus.publish(new UserCreatedEvent(1, "Alice", "alice@email.com"));
    }
}
`,
  },
  {
    id: "java-adv-002",
    title: "Concurrency: CompletableFuture",
    description: "Async tasks, thenApply, thenCompose, allOf, exception handling",
    difficulty: "advanced",
    code: `// ConcurrencyDemo.java
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

public class ConcurrencyDemo {

    record User(int id, String name) {}
    record Order(int userId, String product, double amount) {}

    // Simulated async service calls
    static CompletableFuture<User> fetchUser(int id, ExecutorService exec) {
        return CompletableFuture.supplyAsync(() -> {
            simulateDelay(200);
            return new User(id, "User-" + id);
        }, exec);
    }

    static CompletableFuture<List<Order>> fetchOrders(int userId, ExecutorService exec) {
        return CompletableFuture.supplyAsync(() -> {
            simulateDelay(300);
            return List.of(
                new Order(userId, "Laptop", 999.99),
                new Order(userId, "Mouse",  29.99)
            );
        }, exec);
    }

    static void simulateDelay(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
    }

    public static void main(String[] args) throws Exception {

        ExecutorService exec = Executors.newFixedThreadPool(4);

        // thenCompose — chain dependent async calls
        CompletableFuture<List<Order>> userOrders = fetchUser(1, exec)
            .thenCompose(user -> {
                System.out.println("Got user: " + user.name());
                return fetchOrders(user.id(), exec);
            });

        userOrders.thenAccept(orders ->
            orders.forEach(o -> System.out.printf("Order: %s - %.2f%n", o.product(), o.amount()))
        ).get();

        // allOf — run multiple tasks in parallel
        List<CompletableFuture<User>> futures = List.of(1, 2, 3).stream()
            .map(id -> fetchUser(id, exec))
            .collect(Collectors.toList());

        CompletableFuture<Void> all = CompletableFuture.allOf(
            futures.toArray(new CompletableFuture[0])
        );

        all.thenRun(() -> {
            futures.stream()
                .map(CompletableFuture::join)
                .forEach(u -> System.out.println("Fetched: " + u.name()));
        }).get();

        // exceptionally — error handling
        CompletableFuture<User> withFallback = CompletableFuture
            .supplyAsync(() -> { throw new RuntimeException("Service down"); }, exec)
            .exceptionally(ex -> {
                System.out.println("Error: " + ex.getMessage() + " — using fallback");
                return new User(0, "Guest");
            });

        System.out.println("Fallback: " + withFallback.get().name());

        exec.shutdown();
    }
}
`,
  },
];

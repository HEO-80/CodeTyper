// src/data/snippets/programming/java/beginner/classes.js

export default [
  {
    id: "java-beg-006",
    title: "Classes and OOP",
    description: "Class, constructor, encapsulation, inheritance, polymorphism",
    difficulty: "beginner",
    code: `// OopDemo.java
public class OopDemo {

    // Base class
    static abstract class Shape {
        protected String color;

        public Shape(String color) {
            this.color = color;
        }

        public abstract double area();
        public abstract double perimeter();

        @Override
        public String toString() {
            return String.format("%s[color=%s, area=%.2f]",
                getClass().getSimpleName(), color, area());
        }
    }

    static class Circle extends Shape {
        private final double radius;

        public Circle(String color, double radius) {
            super(color);
            this.radius = radius;
        }

        @Override
        public double area() {
            return Math.PI * radius * radius;
        }

        @Override
        public double perimeter() {
            return 2 * Math.PI * radius;
        }
    }

    static class Rectangle extends Shape {
        private final double width;
        private final double height;

        public Rectangle(String color, double width, double height) {
            super(color);
            this.width = width;
            this.height = height;
        }

        @Override
        public double area() {
            return width * height;
        }

        @Override
        public double perimeter() {
            return 2 * (width + height);
        }
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle("red", 5.0),
            new Rectangle("blue", 4.0, 6.0),
            new Circle("green", 3.0),
        };

        for (Shape shape : shapes) {
            System.out.println(shape);
            System.out.printf("  Perimeter: %.2f%n", shape.perimeter());
        }
    }
}
`,
  },
  {
    id: "java-beg-007",
    title: "Interfaces and Generics Basics",
    description: "Interface, implements, generic class and method",
    difficulty: "beginner",
    code: `// InterfacesGenerics.java
import java.util.ArrayList;
import java.util.List;

public class InterfacesGenerics {

    // Interface
    interface Printable {
        void print();
        default String getLabel() {
            return "[Printable]";
        }
    }

    interface Saveable {
        boolean save();
    }

    // Generic class
    static class Pair<A, B> {
        private final A first;
        private final B second;

        public Pair(A first, B second) {
            this.first = first;
            this.second = second;
        }

        public A getFirst() { return first; }
        public B getSecond() { return second; }

        @Override
        public String toString() {
            return "(" + first + ", " + second + ")";
        }
    }

    // Generic method
    static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    static <T> List<T> repeat(T item, int times) {
        List<T> result = new ArrayList<>();
        for (int i = 0; i < times; i++) result.add(item);
        return result;
    }

    // Class implementing multiple interfaces
    static class Document implements Printable, Saveable {
        private final String title;
        private final String content;

        public Document(String title, String content) {
            this.title = title;
            this.content = content;
        }

        @Override
        public void print() {
            System.out.println("=== " + title + " ===");
            System.out.println(content);
        }

        @Override
        public boolean save() {
            System.out.println("Saving: " + title);
            return true;
        }
    }

    public static void main(String[] args) {
        Document doc = new Document("Hello", "This is the content.");
        doc.print();
        doc.save();
        System.out.println(doc.getLabel());

        Pair<String, Integer> user = new Pair<>("Alice", 30);
        System.out.println("User: " + user);
        System.out.println("Name: " + user.getFirst());

        System.out.println("Max: " + max(42, 99));
        System.out.println("Max: " + max("apple", "zebra"));
        System.out.println("Repeat: " + repeat("hello", 3));
    }
}
`,
  },
];

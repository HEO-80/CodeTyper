// src/data/snippets/programming/java/beginner/basics.js

export default [
  {
    id: "java-beg-001",
    title: "Variables and Data Types",
    description: "Primitive types, String, type casting, constants",
    difficulty: "beginner",
    code: `// Variables.java
public class Variables {

    public static void main(String[] args) {

        // Primitive types
        int age = 30;
        long bigNumber = 1_000_000_000L;
        double height = 1.75;
        float score = 9.5f;
        char grade = 'A';
        boolean isActive = true;
        byte small = 127;
        short medium = 32_000;

        // String (object, not primitive)
        String name = "Alice";
        String greeting = "Hello, " + name + "!";
        String formatted = String.format("Name: %s, Age: %d, Height: %.2f", name, age, height);

        // Constants
        final double PI = 3.14159265358979;
        final int MAX_SCORE = 100;

        // Type casting
        double d = 9.99;
        int truncated = (int) d;          // explicit cast: 9
        int x = 42;
        double promoted = x;              // implicit widening

        // String methods
        System.out.println(name.toUpperCase());
        System.out.println(name.length());
        System.out.println(name.charAt(0));
        System.out.println(name.contains("li"));
        System.out.println(greeting);
        System.out.println(formatted);
        System.out.println("Truncated: " + truncated);
        System.out.println("PI: " + PI);
    }
}
`,
  },
  {
    id: "java-beg-002",
    title: "Arrays and Loops",
    description: "Arrays, for, for-each, while, do-while loops",
    difficulty: "beginner",
    code: `// ArraysLoops.java
import java.util.Arrays;

public class ArraysLoops {

    public static void main(String[] args) {

        // Array declaration and initialization
        int[] scores = {98, 87, 76, 100, 65, 92};
        String[] fruits = new String[3];
        fruits[0] = "Apple";
        fruits[1] = "Banana";
        fruits[2] = "Cherry";

        // 2D array
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // for loop
        int sum = 0;
        for (int i = 0; i < scores.length; i++) {
            sum += scores[i];
        }
        double average = (double) sum / scores.length;

        // for-each loop
        System.out.println("Fruits:");
        for (String fruit : fruits) {
            System.out.println("  - " + fruit);
        }

        // while loop
        int count = 1;
        while (count <= 5) {
            System.out.println("Count: " + count);
            count++;
        }

        // do-while loop
        int n = 0;
        do {
            System.out.println("do-while: " + n);
            n++;
        } while (n < 3);

        // Array utilities
        Arrays.sort(scores);
        System.out.println("Sorted: " + Arrays.toString(scores));
        System.out.println("Average: " + String.format("%.2f", average));

        // 2D matrix print
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }
    }
}
`,
  },
  {
    id: "java-beg-003",
    title: "Control Flow",
    description: "if/else, switch, ternary operator, break, continue",
    difficulty: "beginner",
    code: `// ControlFlow.java
public class ControlFlow {

    static String classifyScore(int score) {
        if (score >= 90) return "A";
        else if (score >= 80) return "B";
        else if (score >= 70) return "C";
        else if (score >= 60) return "D";
        else return "F";
    }

    static String getDayType(String day) {
        return switch (day.toUpperCase()) {
            case "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" -> "Weekday";
            case "SATURDAY", "SUNDAY" -> "Weekend";
            default -> "Unknown";
        };
    }

    static String getSeasonMessage(int month) {
        String season = switch (month) {
            case 12, 1, 2  -> "Winter";
            case 3, 4, 5   -> "Spring";
            case 6, 7, 8   -> "Summer";
            case 9, 10, 11 -> "Autumn";
            default        -> throw new IllegalArgumentException("Invalid month: " + month);
        };
        return "Month " + month + " is " + season;
    }

    public static void main(String[] args) {

        // Ternary operator
        int age = 20;
        String status = age >= 18 ? "Adult" : "Minor";
        System.out.println(status);

        // Score classification
        int[] scores = {95, 83, 72, 61, 45};
        for (int score : scores) {
            System.out.println(score + " -> " + classifyScore(score));
        }

        // Switch expression
        System.out.println(getDayType("Monday"));
        System.out.println(getDayType("Saturday"));

        // break and continue
        for (int i = 0; i < 10; i++) {
            if (i % 2 == 0) continue;
            if (i > 7) break;
            System.out.println("Odd: " + i);
        }

        System.out.println(getSeasonMessage(7));
    }
}
`,
  },
  {
    id: "java-beg-004",
    title: "Methods and Overloading",
    description: "Static methods, overloading, varargs, recursion",
    difficulty: "beginner",
    code: `// Methods.java
public class Methods {

    // Basic static method
    static int add(int a, int b) {
        return a + b;
    }

    // Method overloading
    static double add(double a, double b) {
        return a + b;
    }

    static int add(int a, int b, int c) {
        return a + b + c;
    }

    // Varargs
    static int sumAll(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    // Recursion — factorial
    static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // Recursion — fibonacci
    static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    // Return multiple values via array
    static int[] minMax(int[] arr) {
        int min = arr[0], max = arr[0];
        for (int val : arr) {
            if (val < min) min = val;
            if (val > max) max = val;
        }
        return new int[]{min, max};
    }

    public static void main(String[] args) {
        System.out.println(add(3, 7));
        System.out.println(add(1.5, 2.5));
        System.out.println(add(1, 2, 3));
        System.out.println(sumAll(1, 2, 3, 4, 5, 6));

        for (int i = 0; i <= 10; i++) {
            System.out.println(i + "! = " + factorial(i));
        }

        System.out.print("Fibonacci: ");
        for (int i = 0; i < 8; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();

        int[] data = {42, 7, 99, 3, 56};
        int[] result = minMax(data);
        System.out.println("Min: " + result[0] + ", Max: " + result[1]);
    }
}
`,
  },
  {
    id: "java-beg-005",
    title: "ArrayList and HashMap",
    description: "Java Collections: List, Map, Iterator, generics basics",
    difficulty: "beginner",
    code: `// Collections.java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Collections;
import java.util.Iterator;

public class Collections {

    public static void main(String[] args) {

        // ArrayList
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.add("Mango");

        fruits.remove("Banana");
        fruits.add(0, "Blueberry");

        System.out.println("Fruits: " + fruits);
        System.out.println("Size: " + fruits.size());
        System.out.println("Contains Apple: " + fruits.contains("Apple"));

        // Sort and reverse
        java.util.Collections.sort(fruits);
        System.out.println("Sorted: " + fruits);
        java.util.Collections.reverse(fruits);
        System.out.println("Reversed: " + fruits);

        // Iterator
        Iterator<String> it = fruits.iterator();
        while (it.hasNext()) {
            String fruit = it.next();
            if (fruit.startsWith("B")) {
                it.remove(); // safe removal during iteration
            }
        }
        System.out.println("After removal: " + fruits);

        // HashMap
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        scores.put("Alice", 98); // update
        scores.putIfAbsent("Diana", 88);

        System.out.println("Alice score: " + scores.get("Alice"));
        System.out.println("Unknown: " + scores.getOrDefault("Unknown", 0));

        // Iterate map
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // Keys and values
        System.out.println("Keys: " + scores.keySet());
        System.out.println("Values: " + scores.values());
    }
}
`,
  },
];

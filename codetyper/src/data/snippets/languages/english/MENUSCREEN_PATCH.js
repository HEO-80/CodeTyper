// En MenuScreen.jsx — línea donde defines difficulties:
// Cambia esto:

const difficulties = selectedCategory === "languages" ? ["b1", "b2", "c1"] : DIFFICULTIES;

// Por esto:

const difficulties = selectedCategory === "languages"
  ? ["a1", "a2", "b1", "b2", "c1", "exam"]
  : DIFFICULTIES;

// Y en handleCategoryChange, el selectedDifficulty inicial para languages:
// Cambia "b1" por "a1":

setSelectedDifficulty(cat === "languages" ? "a1" : "beginner");

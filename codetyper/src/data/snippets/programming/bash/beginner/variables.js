// src/data/snippets/programming/bash/beginner/variables.js

const variables = [
  {
    id: "bash-beg-var-001",
    title: "Variables & Types",
    difficulty: "beginner",
    description: "Variables, strings, números y arrays en Bash",
    code: `#!/bin/bash

# Variables — no spaces around =
name="Ada Lovelace"
age=28
is_active=true
pi=3.14159

# String interpolation
echo "Hello, $name!"
echo "Age: ${age}"

# Read-only
readonly MAX_RETRY=3

# Command substitution
current_date=$(date +"%Y-%m-%d")
current_user=$(whoami)
echo "Date: $current_date | User: $current_user"

# Arithmetic
result=$((10 + 5))
result2=$(( age * 2 ))
echo "Result: $result"

# String length
echo "Name length: ${#name}"

# Default value if empty
city=${CITY:-"Madrid"}
echo "City: $city"`,
  },
  {
    id: "bash-beg-var-002",
    title: "Arrays",
    difficulty: "beginner",
    description: "Arrays indexados y asociativos en Bash",
    code: `#!/bin/bash

# Indexed array
fruits=("apple" "banana" "cherry" "mango")

# Access elements
echo "${fruits[0]}"        # first
echo "${fruits[-1]}"       # last
echo "${fruits[@]}"        # all elements
echo "${#fruits[@]}"       # count

# Add element
fruits+=("strawberry")

# Iterate
for fruit in "${fruits[@]}"; do
    echo "  - $fruit"
done

# Slice
echo "${fruits[@]:1:3}"   # from index 1, 3 elements

# Associative array (Bash 4+)
declare -A user
user[name]="Alan Turing"
user[city]="London"
user[age]=41

echo "${user[name]}"
echo "${user[city]}"

# Iterate associative array
for key in "${!user[@]}"; do
    echo "$key = ${user[$key]}"
done`,
  },
  {
    id: "bash-beg-var-003",
    title: "Conditionals",
    difficulty: "beginner",
    description: "if/elif/else, test operators y case",
    code: `#!/bin/bash

score=85
name="PowerShell"
file="config.txt"

# if / elif / else
if [ $score -ge 90 ]; then
    echo "Grade: A"
elif [ $score -ge 80 ]; then
    echo "Grade: B"
elif [ $score -ge 70 ]; then
    echo "Grade: C"
else
    echo "Grade: F"
fi

# String comparison
if [ "$name" = "PowerShell" ]; then
    echo "It's PowerShell"
fi

# File tests
if [ -f "$file" ]; then
    echo "File exists"
fi

if [ -d "/tmp" ]; then
    echo "Directory exists"
fi

# case statement
day=$(date +"%A")
case $day in
    Monday)    echo "Start of week" ;;
    Friday)    echo "TGIF!" ;;
    Saturday|Sunday) echo "Weekend!" ;;
    *)         echo "Midweek" ;;
esac`,
  },
];

export default variables;

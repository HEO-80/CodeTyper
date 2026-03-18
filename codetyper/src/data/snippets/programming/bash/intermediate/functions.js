// src/data/snippets/programming/bash/intermediate/functions.js

const functions = [
  {
    id: "bash-int-fn-001",
    title: "Functions & Loops",
    difficulty: "intermediate",
    description: "Funciones, parámetros, return y bucles for/while",
    code: `#!/bin/bash

# Function definition
greet() {
    local name="$1"
    local greeting="${2:-Hello}"
    echo "$greeting, $name!"
}

# Function with return code
is_running() {
    local process="$1"
    pgrep -x "$process" > /dev/null 2>&1
    return $?
}

greet "Ada"
greet "Alan" "Hi"

if is_running "nginx"; then
    echo "nginx is running"
else
    echo "nginx is NOT running"
fi

# for loop
for i in {1..5}; do
    echo "Iteration: $i"
done

# for loop over array
servers=("web01" "web02" "db01")
for server in "${servers[@]}"; do
    echo "Checking: $server"
done

# C-style for
for (( i=0; i<5; i++ )); do
    echo "i = $i"
done

# while loop
count=0
while [ $count -lt 3 ]; do
    echo "Count: $count"
    (( count++ ))
done

# until loop
until [ $count -ge 5 ]; do
    echo "Until: $count"
    (( count++ ))
done`,
  },
  {
    id: "bash-int-fn-002",
    title: "String Processing",
    difficulty: "intermediate",
    description: "Manipulación de strings, sed, awk y tr",
    code: `#!/bin/bash

text="  Hello, World! This is Bash.  "

# String operations
echo "${text,,}"           # lowercase
echo "${text^^}"           # uppercase
echo "${text// /_}"        # replace spaces with _
echo "${text#*,}"          # remove up to first comma
echo "${text##* }"         # get last word
echo "${#text}"            # string length

# Trim whitespace
trimmed="${text#"${text%%[![:space:]]*}"}"
trimmed="${trimmed%"${trimmed##*[![:space:]]}"}"
echo "Trimmed: '$trimmed'"

# sed — stream editor
echo "Hello World" | sed 's/World/Bash/'
echo "foo bar baz" | sed 's/ /-/g'
sed -i 's/old_value/new_value/g' config.txt

# awk — column processing
echo "Alice 25 Engineer" | awk '{print $1, $3}'
ps aux | awk '{print $1, $11}' | head -5
awk -F: '{print $1}' /etc/passwd | head -10

# tr — translate characters
echo "hello world" | tr 'a-z' 'A-Z'
echo "hello   world" | tr -s ' '
echo "abc123def" | tr -d '0-9'`,
  },
];

export default functions;

// src/data/snippets/programming/bash/beginner/commands.js

const commands = [
  {
    id: "bash-beg-cmd-001",
    title: "Essential Commands",
    difficulty: "beginner",
    description: "Navegación, archivos y directorios esenciales",
    code: `#!/bin/bash

# Navigation
pwd                          # current directory
ls                           # list files
ls -la                       # list all with details
ls -lh                       # human readable sizes
cd /var/log                  # change directory
cd ~                         # home directory
cd -                         # previous directory

# Files & directories
mkdir -p projects/myapp      # create nested dirs
touch app.js config.json     # create files
cp source.txt backup.txt     # copy file
cp -r src/ dest/             # copy directory
mv old-name.txt new-name.txt # rename / move
rm file.txt                  # delete file
rm -rf old-folder/           # delete directory

# View file content
cat config.json              # print file
less app.log                 # paginate file
head -n 20 app.log           # first 20 lines
tail -n 20 app.log           # last 20 lines
tail -f app.log              # follow live

# Find files
find . -name "*.js"
find /var/log -name "*.log" -mtime -7
find . -type f -size +1M`,
  },
  {
    id: "bash-beg-cmd-002",
    title: "Pipes & Redirection",
    difficulty: "beginner",
    description: "Pipes |, redirección >, >> y comandos grep, sort, wc",
    code: `#!/bin/bash

# Pipes — pass output to next command
ls -la | grep ".js"
ps aux | grep nginx
cat /etc/passwd | head -5

# grep — search patterns
grep "error" app.log
grep -i "error" app.log          # case insensitive
grep -n "error" app.log          # show line numbers
grep -r "TODO" ./src             # recursive search
grep -v "DEBUG" app.log          # invert match

# sort & uniq
cat names.txt | sort
cat names.txt | sort | uniq
cat names.txt | sort | uniq -c | sort -rn

# wc — word/line count
wc -l app.log                    # count lines
wc -w README.md                  # count words

# Redirection
echo "Hello World" > output.txt  # overwrite
echo "New line" >> output.txt    # append
command 2> errors.log            # stderr to file
command > output.log 2>&1        # stdout + stderr

# /dev/null — discard output
command > /dev/null 2>&1`,
  },
];

export default commands;

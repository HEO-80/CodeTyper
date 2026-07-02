// ─── TOKEN COLORS ─────────────────────────────────────────────────────────────
export const TOKEN_COLORS = {
  keyword:      "var(--c-kw)",
  string:       "var(--c-str)",
  number:       "var(--c-str)",
  comment:      "var(--c-cm)",
  identifier:   "var(--c-id)",
  "class-name": "var(--c-cls)",
  function:     "var(--c-id)",
  type:         "var(--c-tp)",
  operator:     "var(--c-tp)",
  punctuation:  "var(--c-tp)",
  space:        "var(--c-sp)",
  newline:      "var(--c-nl)",
};

// ─── KEYWORDS PER LANGUAGE ────────────────────────────────────────────────────
export const KEYWORDS = {
  javascript: [
    "class","constructor","function","async","await","return","const","let","var",
    "if","else","for","while","try","catch","new","this","of","in","typeof",
    "import","export","default","extends","super","null","undefined","true","false",
    "throw","from","switch","case","break","continue","do","delete","instanceof",
  ],
  typescript: [
    "class","constructor","function","async","await","return","const","let","var",
    "if","else","for","while","try","catch","new","this","interface","type","enum",
    "extends","implements","import","export","default","null","undefined","true","false",
    "number","string","boolean","void","any","never","readonly","private","public",
    "protected","abstract","static","override","keyof","typeof","as","is",
  ],
  python: [
    "class","def","return","if","else","elif","for","while","try","except","finally",
    "import","from","as","with","in","not","and","or","True","False","None","self",
    "super","raise","pass","break","continue","lambda","yield","global","nonlocal",
    "assert","del","is","async","await",
  ],
  sql: [
    "SELECT","FROM","WHERE","JOIN","INNER","LEFT","RIGHT","FULL","OUTER","ON",
    "AND","OR","NOT","IN","LIKE","BETWEEN","ORDER","BY","GROUP","HAVING","LIMIT",
    "OFFSET","INSERT","INTO","VALUES","UPDATE","SET","DELETE","CREATE","TABLE",
    "INDEX","VIEW","DATABASE","DROP","ALTER","ADD","COLUMN","PRIMARY","KEY",
    "FOREIGN","REFERENCES","UNIQUE","DEFAULT","NULL","NOT","AUTO_INCREMENT",
    "DESC","ASC","DISTINCT","AS","CASE","WHEN","THEN","ELSE","END","EXISTS",
    "PROCEDURE","FUNCTION","TRIGGER","BEGIN","DECLARE","RETURNS","RETURN",
    "IF","WHILE","LOOP","CURSOR","TRANSACTION","COMMIT","ROLLBACK","true","false",
  ],
  solidity: [
    "pragma","solidity","contract","function","returns","return","public","private",
    "internal","external","view","pure","payable","memory","storage","calldata",
    "uint","uint256","int","int256","address","bool","bytes","string","mapping",
    "struct","enum","event","emit","modifier","require","revert","assert",
    "constructor","fallback","receive","interface","library","abstract","override",
    "virtual","immutable","constant","indexed","anonymous","new","delete","this",
    "super","true","false","if","else","for","while","do","break","continue",
    "import","from","using","is","msg","block","tx","abi","keccak256","transfer",
  ],
  java: [
    "class","public","private","protected","static","final","void","return","new",
    "if","else","for","while","do","switch","case","break","continue","try","catch",
    "finally","throw","throws","extends","implements","interface","abstract","super",
    "this","import","package","null","true","false","instanceof","enum","boolean",
    "int","long","double","float","char","byte","short","String","override",
    "@RestController","@GetMapping","@PostMapping","@PutMapping","@DeleteMapping",
    "@RequestBody","@PathVariable","@Service","@Repository","@Autowired","@Bean",
    "@SpringBootApplication","@Component","@RequestMapping",
  ],
  csharp: [
    "class","public","private","protected","static","void","return","new","if","else",
    "for","foreach","while","do","switch","case","break","continue","try","catch",
    "finally","throw","using","namespace","interface","abstract","override","virtual",
    "sealed","readonly","const","this","base","null","true","false","var","async",
    "await","string","int","bool","double","float","decimal","object","List","Task",
    "[HttpGet]","[HttpPost]","[HttpPut]","[HttpDelete]","[ApiController]",
    "[Route]","[FromBody]","[FromRoute]","IActionResult","ActionResult",
    "Controller","ControllerBase",
  ],
};

// ─── DIFFICULTY LEVELS ────────────────────────────────────────────────────────
export const DIFFICULTIES = ["beginner", "intermediate", "advanced"];

// ─── LANGUAGE DISPLAY NAMES ───────────────────────────────────────────────────
export const LANGUAGE_LABELS = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python:     "Python",
  sql:        "SQL",
  solidity:   "Solidity",
  java:       "Java",
  csharp:     "C#",
  powershell: "PowerShell",
  bash:       "Bash",
  cloud:      "Cloud",
  english:    "English",
  mindset:    "Mindset",
};

// ─── LANGUAGE COLORS (for UI pills) ───────────────────────────────────────────
export const LANGUAGE_COLORS = {
  javascript: { border: "#f7df1e", color: "#f7df1e", bg: "#1a1a0a" },
  typescript: { border: "#3178c6", color: "#3178c6", bg: "#0a1020" },
  python:     { border: "#4ec994", color: "#4ec994", bg: "#0a1a10" },
  sql:        { border: "#f78c6c", color: "#f78c6c", bg: "#1a0e0a" },
  solidity:   { border: "#c792ea", color: "#c792ea", bg: "#150a1a" },
  java:       { border: "#f89820", color: "#f89820", bg: "#1a1000" },
  csharp:     { border: "#9b4993", color: "#9b4993", bg: "#150a15" },
  powershell: { border: "#5391FE", color: "#5391FE", bg: "#0a0f1e" },
  bash:        { border: "#4ec994", color: "#4ec994", bg: "#0a1a12" },
  cloud:       { border: "#f78c6c", color: "#f78c6c", bg: "#1a0f0a" },
  english:    { border: "#82aaff", color: "#82aaff", bg: "#0a1020" },
  mindset:    { border: "#ffcb6b", color: "#ffcb6b", bg: "#1a1500" },
};

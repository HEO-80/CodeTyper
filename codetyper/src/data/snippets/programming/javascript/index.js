// ─── JAVASCRIPT SNIPPETS ─────────────────────────────────────────────────────

const beginner = [
  {
    id: "js-beg-001",
    title: "React Component básico",
    description: "Componente funcional con props",
    code: `function Saludo({ nombre }) {
  return (
    <div className="saludo">
      <h1>Hola, {nombre}</h1>
      <p>Bienvenido a React</p>
    </div>
  );
}

export default Saludo;`,
  },
  {
    id: "js-beg-002",
    title: "Arrow functions",
    description: "Funciones flecha y callbacks",
    code: `const sumar = (a, b) => a + b;

const numeros = [1, 2, 3, 4, 5];
const dobles = numeros.map(n => n * 2);
const pares = numeros.filter(n => n % 2 === 0);
const suma = numeros.reduce((acc, n) => acc + n, 0);

console.log(dobles);
console.log(pares);
console.log(suma);`,
  },
  {
    id: "js-beg-003",
    title: "Destructuring y spread",
    description: "Desestructuración de objetos y arrays",
    code: `const usuario = {
  nombre: "Hector",
  edad: 30,
  ciudad: "Zaragoza",
};

const { nombre, edad } = usuario;
const copia = { ...usuario, ciudad: "Madrid" };

const colores = ["rojo", "verde", "azul"];
const [primero, ...resto] = colores;

console.log(nombre, edad);
console.log(copia);
console.log(primero, resto);`,
  },
];

const intermediate = [
  {
    id: "js-int-001",
    title: "React Hook useState",
    description: "Contador con estado en React",
    code: `import { useState } from "react";

function Contador() {
  const [count, setCount] = useState(0);

  const incrementar = () => setCount(prev => prev + 1);
  const decrementar = () => setCount(prev => prev - 1);
  const resetear = () => setCount(0);

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={incrementar}>+</button>
      <button onClick={decrementar}>-</button>
      <button onClick={resetear}>Reset</button>
    </div>
  );
}`,
  },
  {
    id: "js-int-002",
    title: "Async / Await con fetch",
    description: "Llamada a API con manejo de errores",
    code: `async function obtenerUsuarios(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return null;
  }
}

const usuarios = await obtenerUsuarios(
  "https://api.ejemplo.com/usuarios"
);`,
  },
  {
    id: "js-int-003",
    title: "Página Next.js con getServerSideProps",
    description: "Página con datos del servidor",
    code: `export default function Productos({ productos }) {
  return (
    <main>
      <h1>Productos</h1>
      <ul>
        {productos.map(p => (
          <li key={p.id}>{p.nombre}</li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://api.ejemplo.com/productos");
  const productos = await res.json();

  return {
    props: { productos },
  };
}`,
  },
];

const advanced = [
  {
    id: "js-adv-001",
    title: "Custom Hook useLocalStorage",
    description: "Hook reutilizable para persistencia",
    code: `import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;`,
  },
  {
    id: "js-adv-002",
    title: "Patrón Observer",
    description: "Implementación del patrón de diseño Observer",
    code: `class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
    return this;
  }

  off(event, listener) {
    this.events[event] = this.events[event]
      .filter(l => l !== listener);
    return this;
  }
}`,
  },
];

const javascript = { beginner, intermediate, advanced };
export default javascript;

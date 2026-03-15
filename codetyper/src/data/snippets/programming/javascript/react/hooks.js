// src/data/snippets/programming/javascript/react/hooks.js

const hooks = [
  {
    id: "js-rct-hk-001",
    title: "useState & useEffect",
    difficulty: "intermediate",
    description: "Los dos hooks más fundamentales de React",
    code: `import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <h2>{seconds}s</h2>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? "Pause" : "Start"}
      </button>
      <button onClick={() => { setSeconds(0); setRunning(false); }}>
        Reset
      </button>
    </div>
  );
}

export default Timer;`,
  },
  {
    id: "js-rct-hk-002",
    title: "Custom Hook: useFetch",
    difficulty: "intermediate",
    description: "Hook personalizado para fetch de datos",
    code: `import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;`,
  },
  {
    id: "js-rct-hk-003",
    title: "useContext & useReducer",
    difficulty: "advanced",
    description: "Estado global con Context + Reducer",
    code: `import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.item];
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}`,
  },
];

export default hooks;

// src/data/snippets/programming/javascript/react/components.js

const components = [
  {
    id: "js-rct-cmp-001",
    title: "Functional Component",
    difficulty: "beginner",
    description: "Componente funcional básico con props",
    code: `// src/components/UserCard.jsx
function UserCard({ name, role, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <div className="user-info">
        <h3>{name}</h3>
        <span className="role">{role}</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <UserCard
      name="Ada Lovelace"
      role="Engineer"
      avatar="/avatars/ada.png"
    />
  );
}

export default App;`,
  },
  {
    id: "js-rct-cmp-002",
    title: "List Rendering",
    difficulty: "beginner",
    description: "Renderizar listas con map y keys",
    code: `const tasks = [
  { id: 1, text: "Learn React", done: true },
  { id: 2, text: "Build a project", done: false },
  { id: 3, text: "Deploy to Vercel", done: false },
];

function TaskItem({ task }) {
  return (
    <li style={{ opacity: task.done ? 0.5 : 1 }}>
      {task.done ? "✓" : "○"} {task.text}
    </li>
  );
}

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default function App() {
  return <TaskList tasks={tasks} />;
}`,
  },
];

export default components;

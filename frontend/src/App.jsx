import { useState, useEffect } from 'react';
import './App.css';
import CreateTodo from './components/CreateTodo';
import ListTodo from './components/ListTodo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch('http://localhost:3001/todos');
      const json = await res.json();
      setTodos(json.todos);
    }
    fetchTodos();
  }, []);

  return (
    <>
      <CreateTodo />
      <ListTodo todos={todos} />
    </>
  );
}

export default App;

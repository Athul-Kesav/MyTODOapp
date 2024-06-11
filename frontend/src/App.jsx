import { useState, useEffect } from 'react';
import './Home.css';
import CreateTodo from './components/CreateTodo.jsx';
import ListTodo from './components/ListTodo.jsx';
import NavBar from './components/Navbar.jsx'

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



import { useState, useEffect } from 'react';
import axios from 'axios'
import './Home.css';
import CreateTodo from '../components/CreateTodo.jsx';
import ListTodo from '../components/ListTodo.jsx';

function User() {
  const [todos, setTodos] = useState([]);

  useEffect(async () => {
    const newTodos = await axios.get('http://localhost:3001/user/todos')
    setTodos((todos) => [...todos, newTodos])
  })

  return (
    <>
      <div style={{
        color:'white'
      }}>
        Hello World
      </div>
    </>
  );
}

export default User;



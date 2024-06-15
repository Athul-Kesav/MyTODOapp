import { useState, useEffect } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import './Home.css';
import CreateTodo from '../components/CreateTodo.jsx';
import ListTodo from '../components/ListTodo.jsx';

function User() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const header = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get('token').split(' ')[1]}`,
        }
        const response = await axios.get('http://localhost:3001/user/todos',{ headers: header });
        setTodos(response.data.todos);
      } catch (error) {
        console.error("There was an error fetching the todos!", error);
      }
    }

    const intervalId = setInterval(fetchTodo, 5000);
    
    // Fetch todos immediately on mount
    fetchTodo();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <>
      <ListTodo todos={todos} />
      <CreateTodo />
    </>
  );
}

export default User;



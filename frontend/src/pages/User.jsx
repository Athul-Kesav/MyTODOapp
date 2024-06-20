import { useState, useEffect } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import './Home.css';
import CreateTodo from '../components/CreateTodo.jsx';
import ListTodo from '../components/ListTodo.jsx';

const HOST = import.meta.env.VITE_HOST
const GET_TODOS_ROUTE = import.meta.env.VITE_GET_TODOS_ROUTE

function User() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const header = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get('token')?.split(' ')[1]}`, // Add optional chaining to avoid errors
        }
        const response = await axios.get(`${HOST}${GET_TODOS_ROUTE}`, { headers: header });
        setTodos(response.data.todos);
      } catch (error) {
        console.error("There was an error fetching the todos!", error);
      }
    }

    // Fetch todos immediately on mount
    fetchTodo();

    // Set up the interval to fetch todos every 3 seconds
    const intervalId = setInterval(fetchTodo, 3000);

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



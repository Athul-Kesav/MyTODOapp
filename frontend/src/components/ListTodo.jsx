import { React, memo, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './ListTodo.css'
import trashIcon from '../assets/trash-alt-solid.svg'
import clock from '../assets/clock.svg'
import repeat from '../assets/repeat.svg'
import doneIcon from '../assets/check-solid.svg'
import question from '../assets/asking-question.svg'
import allDone from '../assets/noTodos.svg'

const HOST = import.meta.env.VITE_HOST
const UPDATE_TODOS_ROUTE = import.meta.env.VITE_UPDATE_TODOS_ROUTE

const ListTodo = memo(({ todos }) => {

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  const [isExapanded, setIsExpanded] = useState(false);

  const navigate = useNavigate()

  const headers = {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${Cookies.get('token').split(' ')[1]}`,
  }

  const updateTodo = async () => {
    console.log('Updating todo')
    const response = await axios.post(`${HOST}${UPDATE_INFO_ROUTE}`, {
      title: newTitle,
      description: newDescription,
      deadline: newDeadline,
      status: false,
    }, { headers: headers });
    console.log(response.data);
  }

  const openEditor = () => {
    console.log('Opening editor')
    setIsExpanded(true);
  }

  const getTimeFromDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}${minutes}`;
  }

  async function fetcher(todo, method) {
    try {
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get('token').split(' ')[1]}`,
      }
      await axios[method](`${HOST}${UPDATE_TODOS_ROUTE}`, {
        id: todo._id,
        status:true,
      }, { headers: header });
    } catch (error) {
      console.error("There was an error fetching the todos!", error);
    }
  }

  const setAsDone = (todo) => {
    fetcher(todo, 'put')
  }

  const removeTodo = (todo) => {
    fetcher(todo, 'post')
  }

  const renderTodo = (todo) => (
    <>
      {isExapanded ? (
      <div>
        {/* Editor View */}
      </div>) : (
        <div className='container'>
          {/* Normal View */}
          <div className='todoElement' key={todo._id}>
            <span className="todo-text">{todo.title}</span>
            <span className="todo-desc">{todo.description}</span>
            <div className="todo-icons">
              <button className="todo-button">
                <img src={clock} alt="Time" />
                {getTimeFromDate(todo.deadline)}
              </button>
              <img src={repeat} alt="Repeat" className="icon" />
              {(todo.status) ? (
                <img src={trashIcon} alt="Trash" className='icon' onClick={() => {
                  removeTodo(todo)
                }} />
              ) : (
                <img src={doneIcon} alt='done' className='icon' onClick={() => {
                  setAsDone(todo)
                }} />
              )}
            </div>
          </div>
        </div>
      )
      }
    </>
  )

  const doneTodos = todos.filter(todo => todo.status);
  const notDoneTodos = todos.filter(todo => !todo.status);

  return (
    <div className='bigContainer'>
      {/* //Render this if no todos are present */}
      {todos.length === 0 ? (
        <div className="noTodos">
          <h2>Let’s jot down all your tasks to get you up and running</h2>
          <img src={question} alt='asking question' />
        </div>
      ) : (
        <>
          {/* //Render this if todos are present */}
          {/* Render this if all todos are done */}
          {notDoneTodos.length === 0 ? (
            <div className='noTodos'>
              <h2>Hurray, you’re done with everything</h2>
              <img src={allDone} alt='done' />
            </div>
          ) : (
            <div className='notDone'>
              <h2>Here are your tasks</h2>
              {notDoneTodos.map(renderTodo)}
            </div>
          )}
          {/* //Render this if there are any done todos */}
          {doneTodos.length === 0 ? null : (<div className="done">
            <h2>Completed Tasks</h2>
            {doneTodos.map(renderTodo)}
          </div>
          )}
        </>
      )}
    </div>
  )
})
export default ListTodo

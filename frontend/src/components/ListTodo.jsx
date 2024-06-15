import { React, useEffect, useState } from 'react';
import './ListTodo.css'
import trashIcon from '../assets/trash-alt-solid.svg'
import clock from '../assets/clock.svg'
import repeat from '../assets/repeat.svg'
import doneIcon from '../assets/check-solid.svg'
import Cookies from 'js-cookie';
import axios from 'axios';

const ListTodo = ({ todos }) => {

  const getTimeFromDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}${minutes}`;
  };

  async function fetcher(todo,method){
    try {
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get('token').split(' ')[1]}`,
      }
      await axios[method]('http://localhost:3001/user/update-todo',{
        id:todo._id
      },{ headers: header });
    } catch (error) {
      console.error("There was an error fetching the todos!", error);
    }
  }
  const setAsDone = (todo) => {
    fetcher(todo,'put')
  }

  const removeTodo = (todo) => {
    fetcher(todo,'post')
  }

  const renderTodo = (todo) => (
    <div className='container'>
      <div key={todo._id} className='todoElement'>
          <span className="todo-text">{todo.title}</span>
          <div className="todo-icons">
            <button className="todo-button">
              <img src={clock} alt="Time" />
              {getTimeFromDate(todo.deadline)}
            </button>
            <img src={repeat} alt="Repeat" className="icon" />
            {(todo.status) ?(
              <img src={trashIcon} alt="Trash" className='icon' onClick={() => {
                removeTodo(todo)
              }}/>
            ) : (
              <img src={doneIcon} alt='done' className='icon' onClick={() => {
                setAsDone(todo)
              }}/>
            )}
          </div>
        </div>
    </div>
    )

  const doneTodos = todos.filter(todo => todo.status);
  const notDoneTodos = todos.filter(todo => !todo.status);

  return (
    <>
      <div className='notDone'>
        <h2>Here are your tasks,</h2>
        {notDoneTodos.map(renderTodo)}
      </div>
      <div className="done">
        <h2>Completed Tasks</h2>
        {doneTodos.map(renderTodo)}
      </div>
    </>
  );
}

export default ListTodo;

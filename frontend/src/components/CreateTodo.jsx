import React from 'react'
import axios from 'axios'
import { useState, memo } from 'react';
import './CreateTodo.css'
import Cookies from 'js-cookie';

const HOST = import.meta.env.VITE_HOST
const CREATE_TODOS_ROUTE = import.meta.env.VITE_CREATE_TODOS_ROUTE

const CreateTodo = memo(() => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState(null)



  async function sender() {
    if (title === "" || description === "" || deadline === "") {
      alert('Please fill all the fields');
      return;
    }
    setDeadline(new Date(deadline)); // Convert to human-readable date time format

    const headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${Cookies.get('token').split(' ')[1]}`,
    }

    await axios.post(`${HOST}${CREATE_TODOS_ROUTE}`, {
      title: title,
      description: description,
      deadline: deadline.toString(),
      status: false
    }, { headers: headers })
  }
  return (
    <div className='newTodoContainer'>
      <h2>Add New Task</h2>
      <input id='title' placeholder='Title' type='text' onChange={function (e) {
        setTitle(e.target.value);
      }} /> <br />
      <input id='description' placeholder='Description' type='text' onChange={function (e) {
        setDescription(e.target.value);
      }} /> <br />
      <input
        type="datetime-local"
        id="date"
        onChange={function (e) {
          setDeadline(e.target.value);
        }}
        required
      />
      {/* <p>Deadline selected: {deadline}</p> */}
      <br />
      <button type='button' onClick={sender}>Add Todo</button>
    </div>
  )
})

export default CreateTodo

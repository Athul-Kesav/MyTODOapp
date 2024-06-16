import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import './CreateTodo.css'
import Cookies from 'js-cookie';

const CreateTodo = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [deadline, setDeadline] = useState(null)



  async function sender() {
    if (title === "" || description === "" || date === "" || time === "") {
      alert('Please fill all the fields');
      return;
    }
    const combinedDateTime = `${date}T${time}`;
    const dateTime = new Date(combinedDateTime);
    const timestampValue = dateTime.getTime(); // Convert to timestamp (milliseconds since Unix Epoch)
    setDeadline(timestampValue);

    const headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${Cookies.get('token').split(' ')[1]}`,
    }

    await axios.post('https://https://done-it-six.vercel.app/create-todo', {
      title: title,
      description: description,
      deadline: ` ${deadline}`,
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
        type="date"
        id="date"
        value={date}
        onChange={function (e) {
          setDate(e.target.value);
        }}
        required
      /> <br />
      <input
        type="time"
        id="time"
        value={time}
        onChange={function (e) {
          setTime(e.target.value);
        }}
        required
      />
      <br />
      <button type='button' onClick={sender}>Add Todo</button>
    </div>
  )
}

export default CreateTodo

import React from 'react'
import './CreateTodo.css'

const CreateTodo = () => {
  async function sender() {
    await fetch('http://localhost:3001/createTodo', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: false
      })
    })
  }
  return (
    <div>
      <input id='title' placeholder='Title' type='text' /> <br />
      <input id='description' placeholder='Description' type='text' /> <br />
      <button type='button' onClick={sender}>Add Todo</button>
    </div>
  )
}

export default CreateTodo
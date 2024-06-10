import React from 'react';

const ListTodo = ({ todos }) => {

  async function updater (id){
    await fetch('http://localhost:3001/completed', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        status: true
      })
    })
  }
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button>{todo.status ? 'Completed' : 'Mark as Done'}</button>
        </div>
      ))}
    </div>
  );
}

export default ListTodo;

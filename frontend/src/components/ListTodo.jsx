import React from 'react';

const ListTodo = ({ todos }) => {

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <h3>{todo.deadline}</h3>
          <button>{todo.status ? 'Completed' : 'Mark as Done'}</button>
        </div>
      ))}
    </div>
  );
}

export default ListTodo;

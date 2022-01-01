import React, { useState } from 'react';
import { taskInsert } from '../api/tasks/tasksMethods';

export const TaskForm = () => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    taskInsert.call({ text });
    setText('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};

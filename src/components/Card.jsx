import React, { useState, useEffect } from 'react';
import { deleteCardApi, getCardByIdApi, addTaskApi } from '../Services/apicalls';

function Card({ cardDetails, setDeleteCardResponse }) {
  const { title, id, tasks: initialTasks } = cardDetails;

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(initialTasks || []);
console.log(initialTasks,"ini" );

  useEffect(() => {
    setTasks(initialTasks); // Update tasks when cardDetails changes
  }, [initialTasks]);

  const addTask = async () => {
    if (!task.trim()) {
      alert('Please enter a task.');
      return;
    }
    const updatedTasks = [...tasks, task];
    await handleTaskUpdate(updatedTasks);
    setTask('');
  };

  const deleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    await handleTaskUpdate(updatedTasks);
  };

  const handleTaskUpdate = async (updatedTasks) => {
    try {
      await addTaskApi({ title, tasks: updatedTasks, id }, id);
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error updating tasks:', err);
    }
  };

  const handleDrop = async (taskToAdd, fromCardId, onRemoveTaskFromSource) => {
    if (fromCardId === id) return; // Prevent self-drop

    // Add the task to the target card
    const updatedTasks = [...tasks, taskToAdd];
    await handleTaskUpdate(updatedTasks);

    // Inform the source card to remove the task
    if (onRemoveTaskFromSource) onRemoveTaskFromSource();
  };

  const dragOverCard = (e) => {
    e.preventDefault();
  };

  const taskDragStarted = (task, onRemoveTask) => {
    window.taskBeingDragged = { task, fromCardId: id, onRemoveTask };
  };

  const dropOnCard = (e) => {
    e.preventDefault();
    const { task, fromCardId, onRemoveTask } = window.taskBeingDragged || {};
    if (task) {
      handleDrop(task, fromCardId, onRemoveTask);
    }
  };

  return (
    <div
      className="card pb-3"
      onDrop={dropOnCard}
      onDragOver={dragOverCard}
    >
      <div className="mt-3 mx-4 d-flex align-items-center justify-content-between">
        <h2 className="text-center">{title}</h2>
        <button
          onClick={() => deleteCardApi(id).then(setDeleteCardResponse)}
          style={{ backgroundColor: 'transparent', border: 'none' }}
        >
          <i className="fa-solid fa-trash-can text-danger"></i>
        </button>
      </div>
      <hr />
      <div className="d-flex align-items-center m-3 justify-content-between">
        <input
          className="task-inp"
          value={task}
          type="text"
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="small-buton" onClick={addTask}>
          +
        </button>
      </div>
      <div>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => taskDragStarted(task, () => deleteTask(index))}
              className="d-flex justify-content-between px-2 align-items-center task"
            >
              <h5>{task}</h5>
              <button
                style={{ backgroundColor: 'transparent', border: 'none' }}
                onClick={() => deleteTask(index)}
              >
                <i className="fa-solid fa-trash-can text-danger"></i>
              </button>
            </div>
          ))
        ) : (
          <p className="ms-3"></p>
        )}
      </div>
    </div>
  );
}

export default Card;

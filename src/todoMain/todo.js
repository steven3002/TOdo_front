import React, { useState, useEffect } from 'react';

import { HelloNearContract } from '../config';

const CONTRACT = HelloNearContract;
export const TodoApp = ({ todoData, handleDelete, handleCompleted, handleInputValue }) => {


    let initialTasks = todoData.todoData;
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState(initialTasks);

    const addTask = () => {
        if (inputValue.trim() === '') {
            alert('You must write something!');
        } else {
            setTasks(inputValue);
            handleInputValue(inputValue.trim())
            setInputValue('');

        }
    };

    const toggleTask = (index, state1) => {
        if (state1) {
            alert("Task has been completed")
            return
        }
        handleCompleted(index)
    };

    const removeTask = (index) => {
        let result = confirm("Are you sure you want to delete this TODO, this can not be undone?");
        if (result) {
            handleDelete(index)

        } else {

            alert("Delete canceled.");
        }
        handleDelete(index)
    };

    return (
        <div className="container">
            <link rel="stylesheet" href="styles.css" />

            <div className="todo-app">
                <div className="app-title">
                    <h2>Todo list</h2>
                    <i className="fa-solid fa-book-bookmark"></i>
                </div>
                <div className="row">
                    <input
                        type="text"
                        id="input-box"
                        placeholder="Add your tasks"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className='button' onClick={addTask}>Add</button>
                </div>
                <ul id="list-container">
                    {todoData.map((task) => (
                        <li key={task[0]} className={task[2] ? 'checked' : ''}>
                            <div onClick={() => toggleTask(task[0], task[2])}>{task[1]}</div>
                            <span onClick={() => removeTask(task[0])}>x</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


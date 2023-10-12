
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState(null);

    const addTask = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { text: task, checked: false, dueDate: dueDate }]);
            setTask('');
            setDueDate(null);
        }
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleCheckboxChange = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, checked: !task.checked } : task
        );
        setTasks(updatedTasks);
    };
    const sortedTasks = tasks
        .sort((a, b) => {
            // Convert the dueDate strings to Date objects for comparison
            const dateA = a.dueDate ? new Date(a.dueDate) : null;
            const dateB = b.dueDate ? new Date(b.dueDate) : null;

            if ((!a.checked && !b.checked) || (a.checked && b.checked)) {
                if (dateA && dateB) {
                    if (dateA !== dateB) {
                        return dateA - dateB;
                    }
                    return a.checked - b.checked; // Sort by due date and then by checked status
                } else if (dateA) {
                    return -1; // Task with due date comes first
                } else if (dateB) {
                    return 1; // Task with due date comes first
                }
            } else if (!a.checked) {
                return -1;
            } else return 1;

            return a.checked - b.checked; // Sort by checked status
        });

    return (
        <div className="container text-center mt-4">
            <h1 className="Heading mb-4">To-Do List</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control mx-md-4"
                    placeholder="Write your task and press enter"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <DatePicker
                    //   className='form-control'
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select due date and time"
                />
                <div className="input-group-append">
                    <button className="greyish" onClick={addTask}>Add Task</button>
                </div>
            </div>
            <ul className="list-group">
                {sortedTasks.map((task, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                checked={task.checked}
                                className="form-check-input"
                                onChange={() => handleCheckboxChange(index)}
                            />
                        </div>
                        <div><h5 className={`form-check-label ${task.checked ? 'completed' : ''}`}>
                            {task.text}
                        </h5>
                            {task.dueDate && (
                                <p >
                                    Due: {new Date(task.dueDate).toLocaleString()}
                                </p>
                            )}</div>
                        <button onClick={() => deleteTask(index)} className="greyish">Erase!</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;

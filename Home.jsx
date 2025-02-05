import React, { useState } from 'react';

export default function Home() {
    const [task, setTask] = useState('');
    const [todoTasks, setTodoTasks] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    // Function to add a new task
    const handleSubmit = (event) => {
        event.preventDefault();

        if (task.trim() !== '') {
            setTodoTasks([...todoTasks, task]);
            setTask('');
        }
    };

    // Function to move a task between sections
    const moveTask = (task, fromList, setFromList, toList, setToList) => {
        setFromList(fromList.filter(t => t !== task)); // Remove from current list
        setToList([...toList, task]); // Add to new list
    };

    // Function to delete a task
    const deleteTask = (task, fromList, setFromList) => {
        setFromList(fromList.filter(t => t !== task));
    };

    return (
        <>
            <div className="home">
                {/* Input Form */}
                <form className="task-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Enter task..." 
                        className="task-input" 
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button className="add-task-button">ADD TASK</button>
                </form>

                {/* Task Sections */}
                <div className="task-sections">
                    
                    {/* TO-DO Tasks */}
                    <div className="task-section">
                        <h2>TO-DO Tasks</h2>
                        <ul>
                            {todoTasks.map((t, index) => (
                                <li key={index}>
                                    {t}
                                    <button 
                                        className="completed-button"
                                        onClick={() => moveTask(t, todoTasks, setTodoTasks, ongoingTasks, setOngoingTasks)}
                                    >➡️ Move to Ongoing</button>

                                    <button 
                                       className="delete-button"
                                        onClick={() => deleteTask(t, todoTasks, setTodoTasks)}
                                    >Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ongoing Tasks */}
                    <div className="task-section">
                        <h2>Ongoing Tasks</h2>
                        <ul>
                            {ongoingTasks.map((t, index) => (
                                <li key={index}>
                                    {t}
                                    <button 
                                       className = "completed-button"
                                        onClick={() => moveTask(t, ongoingTasks, setOngoingTasks, completedTasks, setCompletedTasks)}
                                    >✔️ Mark as Completed</button>

                                    <button 
                                        className="delete-button"
                                        onClick={() => deleteTask(t, ongoingTasks, setOngoingTasks)}
                                    >Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Completed Tasks */}
                    <div className="task-section">
                        <h2>Completed Tasks</h2>
                        <ul>
                            {completedTasks.map((t, index) => (
                                <li key={index}>
                                    {t}
                                    <button 
                                       className="delete-button" 
                                        onClick={() => deleteTask(t, completedTasks, setCompletedTasks)}
                                    >Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
}
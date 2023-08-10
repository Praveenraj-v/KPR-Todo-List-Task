import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.css';

export const Homepage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getlists');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching Lists:', error);
        }
    };

    const addTask = async () => {
        try {
            if (taskText.trim() === '') return;

            const response = await axios.post('http://localhost:3001/addlists', { list: taskText });
            setTasks([...tasks, response.data]);
            setTaskText('');
        } catch (error) {
            console.error('Error adding List:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/deletelists/${id}`);
            const updatedTasks = tasks.filter(task => task._id !== id);
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting List:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <div className='container d-flex justify-content-start align-items-top p-5 vh-100 flex-column'>
                <div className='text-center bg-primary'>
                        <h2 className='m-3 text-center'>To Do List</h2>
                    <div class="input-group mb-3 p-4">
                        <input type="text" className="form-control" placeholder="Enter Your Work Here..." aria-label="Recipient's username" aria-describedby="button-addon2" 
                        value={taskText}
                        onChange={e => setTaskText(e.target.value)}/>
                        <button class="btn btn-success" type="button" onClick={addTask} className="addBtn" id="button-addon2">Add Task</button>
                    </div>
                </div>
                <div className='container bg-dark-subtle'>
                    <ul className='listOfTasks p-1 mb-0'>
                        {tasks.map(task => (
                            <li className='p-2 d-flex justify-content-between align-items-center' key={task._id}>
                                <div>{task.list}</div>
                                <div><button className="ms-2 close btn btn-danger" onClick={() => deleteTask(task._id)}>Delete</button></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
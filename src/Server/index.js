const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());


// DB Configuration with the Node
mongoose.connect('mongodb://127.0.0.1:27017/Todo_List', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Model for the API to access DB schema
const taskSchema = new mongoose.Schema({
    list: String,
});

// Assigning variable for the Model Schema
const Task = mongoose.model('Task', taskSchema); 

// API for display the Lists that has been create by the User 
app.get('/getlists', async (req, res) => {
    try {
        const tasks = await Task.find(); 
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API for creating List by users
app.post('/addlists', async (req, res) => {
    try {
        const newTask = new Task({ list: req.body.list });
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API for delete the Lists
app.delete('/deletelists/:id', async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Assign Port number for the server.
const port = 3001;
app.listen(port, () => {
    console.log(`Server is connected on port ${port}`);
});
const express = require('express');
const router = express.Router();
//customize this for this project
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require('../controller/pets');

// router.route('/').get(getAllTasks).post(createTask);
// router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
// router.route('/api/v1/tasks/:id').patch(updateTask);

module.exports = router;
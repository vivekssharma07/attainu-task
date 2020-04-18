const express = require('express');
const router = express.Router();
const TaskController = require('../Controllers/TaskController');
const middleware = require('../middleware');

// a simple test url to check that all of our files are communicating correctly.
router.post('/create', middleware.checkToken,TaskController.createTask);
router.post('/fetchTaskByUserId',TaskController.getTaskByUserId);
router.post('/fetchAll', middleware.checkToken,TaskController.fetchAllTask);
router.post('/fetchTaskById/:id',middleware.checkToken,TaskController.fetchTaskById);
router.post('/update/:id', middleware.checkToken,TaskController.updateTask);
router.post('/delete/:id', middleware.checkToken,TaskController.deleteTask);

module.exports = router ;

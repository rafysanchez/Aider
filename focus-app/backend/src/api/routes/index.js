const express = require('express');
const taskController = require('../controllers/taskController');
const focusSessionController = require('../controllers/focusSessionController');

const router = express.Router();

router.post('/tasks', taskController.createTask);
router.post('/focus-sessions', focusSessionController.startSession);

// Additional routes can be added here

module.exports = router; 
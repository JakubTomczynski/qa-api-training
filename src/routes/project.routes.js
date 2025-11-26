const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authMiddleware } = require('../middleware/auth');
const { validateProject, validateIdParam } = require('../middleware/validation');

// All routes require authentication
router.use(authMiddleware);

// Create new project
router.post('/', validateProject, projectController.createProject);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get project by ID
router.get('/:id', validateIdParam, projectController.getProjectById);

// Update project
router.put('/:id', validateIdParam, validateProject, projectController.updateProject);

// Delete project
router.delete('/:id', validateIdParam, projectController.deleteProject);

module.exports = router;

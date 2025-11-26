const Project = require('../models/project.model');

// Create a new project
const createProject = (req, res) => {
  try {
    const { name, description, status = 'active' } = req.body;
    const createdBy = req.user.id;

    const project = Project.create(name, description, status, createdBy);

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all projects
const getAllProjects = (req, res) => {
  try {
    const projects = Project.getAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get project by ID
const getProjectById = (req, res) => {
  try {
    const { id } = req.params;
    const project = Project.findById(parseInt(id, 10));

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update project
const updateProject = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    // Check if project exists
    const existingProject = Project.findById(parseInt(id, 10));
    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check authorization - only creator or admin can update
    if (existingProject.createdBy !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to update this project' });
    }

    const updatedProject = Project.update(
      parseInt(id, 10),
      name,
      description,
      status || existingProject.status
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete project
const deleteProject = (req, res) => {
  try {
    const { id } = req.params;

    // Check if project exists
    const existingProject = Project.findById(parseInt(id, 10));
    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check authorization - only creator or admin can delete
    if (existingProject.createdBy !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to delete this project' });
    }

    Project.delete(parseInt(id, 10));

    res.status(204).send();
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
};

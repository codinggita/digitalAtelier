import axios from 'axios';

// Create an axios instance with a base URL
// The backend runs on port 5000 by default
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Project API Services
 */
export const projectService = {
  /**
   * Fetch all projects from the database
   */
  getProjects: async () => {
    try {
      const response = await API.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error.response?.data || error.message;
    }
  },

  /**
   * Fetch a single project by its ID
   */
  getProjectById: async (id) => {
    try {
      const response = await API.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error.response?.data || error.message;
    }
  },

  /**
   * Create a new project
   */
  createProject: async (projectData) => {
    try {
      const response = await API.post('/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update an existing project's content or settings
   */
  updateProject: async (id, updateData) => {
    try {
      const response = await API.put(`/projects/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete a project from the database
   */
  deleteProject: async (id) => {
    try {
      const response = await API.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error.response?.data || error.message;
    }
  }
};

export const pageService = {
  getPages: async () => {
    const response = await API.get('/pages');
    return response.data;
  },
  getProjectPages: async (projectId) => {
    const response = await API.get(`/pages/project/${projectId}`);
    return response.data;
  },
  createPage: async (pageData) => {
    const response = await API.post('/pages', pageData);
    return response.data;
  },
  updatePage: async (id, pageData) => {
    const response = await API.put(`/pages/${id}`, pageData);
    return response.data;
  },
  deletePage: async (id) => {
    const response = await API.delete(`/pages/${id}`);
    return response.data;
  }
};

export default API;

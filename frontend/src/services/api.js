import axios from 'axios';

// Create an axios instance with a base URL
// Use VITE_API_URL from .env for production, default to localhost for development
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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

export const assetService = {
  getAssets: async () => {
    const response = await API.get('/assets');
    return response.data;
  },
  createAsset: async (assetData) => {
    const response = await API.post('/assets', assetData);
    return response.data;
  },
  updateAsset: async (id, assetData) => {
    const response = await API.put(`/assets/${id}`, assetData);
    return response.data;
  },
  deleteAsset: async (id) => {
    const response = await API.delete(`/assets/${id}`);
    return response.data;
  }
};

export const analyticsService = {
  getAnalytics: async () => {
    const response = await API.get('/analytics');
    return response.data;
  }
};

export const productService = {
  getProducts: async () => {
    const response = await API.get('/products');
    return response.data;
  },
  createProduct: async (productData) => {
    const response = await API.post('/products', productData);
    return response.data;
  },
  updateProduct: async (id, productData) => {
    const response = await API.put(`/products/${id}`, productData);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await API.delete(`/products/${id}`);
    return response.data;
  }
};

export const templateService = {
  getTemplates: async () => {
    const response = await API.get('/templates');
    return response.data;
  }
};

export default API;

import { projectService } from '../services/api';

/**
 * Service to manage dashboard statistics and aggregations
 */
export const dashboardService = {
  getOverviewStats: async () => {
    try {
      // In a real app, this would hit a specific dashboard endpoint
      // For now, we simulate by fetching projects
      const response = await projectService.getProjects();
      const projects = response.data || [];
      
      const liveProjects = projects.filter(p => p.status === 'Live').length;
      
      return {
        success: true,
        data: {
          totalProjects: projects.length,
          liveProjects: liveProjects,
          totalViews: liveProjects * Math.floor(Math.random() * 1000), // Simulated
          totalSales: liveProjects > 0 ? '$' + (Math.random() * 5000).toFixed(2) : '$0.00',
        }
      };
    } catch (error) {
      return { success: false, error: 'Failed to fetch dashboard stats' };
    }
  },

  getRecentActivity: async () => {
    try {
      const response = await projectService.getProjects();
      const projects = response.data || [];
      
      // Sort by updatedAt and take top 5
      const recent = [...projects].sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt)
      ).slice(0, 5);
      
      return { success: true, data: recent };
    } catch (error) {
      return { success: false, error: 'Failed to fetch recent activity' };
    }
  }
};

export default dashboardService;

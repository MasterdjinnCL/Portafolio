




import { defineStore } from 'pinia';

export const useProjectsStore = defineStore('projects', {
  
  state: () => ({
    projects: [], 
    selectedProject: null, 
    loading: false, 
    error: null, 
    filters: {
      technology: null, 
      searchTerm: ''
    }
  }),

  getters: {
    allProjects: (state) => state.projects,

    isLoading: (state) => state.loading,

    hasError: (state) => state.error,

    getProjectById: (state) => {
      return (id) => state.projects.find(project => project.id === parseInt(id));
    },

    filteredProjects: (state) => {
      let filtered = [...state.projects];

      if (state.filters.technology) {
        filtered = filtered.filter(project =>
          project.technologies?.includes(state.filters.technology)
        );
      }

      if (state.filters.searchTerm) {
        const term = state.filters.searchTerm.toLowerCase();
        filtered = filtered.filter(project =>
          project.title?.toLowerCase().includes(term) ||
          project.description?.toLowerCase().includes(term)
        );
      }

      return filtered;
    },

    projectCount: (state) => state.projects.length,

    allTechnologies: (state) => {
      const techSet = new Set();
      state.projects.forEach(project => {
        project.technologies?.forEach(tech => techSet.add(tech));
      });
      return [...techSet].sort();
    },

    featuredProjects: (state) => state.projects.slice(0, 3)
  },

  actions: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;

      try {
        const { get } = useApi();
        const response = await get('/projects.json');
        
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Formato de datos inválido');
        }

        this.projects = response.data;
        console.log(`[Store] ${this.projects.length} proyectos cargados exitosamente`);
        
      } catch (err) {
        console.error('[Store] Error al cargar proyectos:', err);
        this.error = err.message || 'No se pudieron cargar los proyectos. Por favor, intenta nuevamente.';
        this.projects = []; 
      } finally {
        this.loading = false;
      }
    },


    async fetchProjectById(id) {
      
      if (this.projects.length > 0) {
        this.selectedProject = this.getProjectById(id);
        return;
      }

      
      await this.fetchProjects();
      this.selectedProject = this.getProjectById(id);
    },

    



    setTechnologyFilter(technology) {
      this.filters.technology = technology || null;
    },

    



    setSearchTerm(term) {
      this.filters.searchTerm = term ? term.trim() : '';
    },

    clearFilters() {
      this.filters = {
        technology: null,
        searchTerm: ''
      };
    },

    


    clearError() {
      this.error = null;
    }
  }
});


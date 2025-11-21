
<template>
  <div id="main" role="main">
    <Hero />

    
    <About />

    
    <Skills />

    
    <section 
      id="projects" 
      aria-labelledby="projects-heading"
      class="projects-section"
    >
      <h2 id="projects-heading" class="section-heading">Mis Proyectos</h2>
      <p class="section-intro">
        Explora algunos de mis proyectos recientes desarrollados con Vue, Nuxt y
        APIs reales. Filtra por tecnología o busca por palabras clave para ver
        cómo abordo distintos desafíos frontend.
      </p>

      <ProjectsFilter
        :technologies="technologies"
        :selected-technology="selectedTechnology"
        :search-term="searchTerm"
        @update:technology="handleTechnologyChange"
        @update:search="handleSearchChange"
        @clear="handleClearFilters"
      />

      
      <LoadingSpinner 
        v-if="isLoading" 
        message="Cargando proyectos..."
        size="large"
      />

      
      <ErrorMessage
        v-else-if="hasError"
        :message="hasError"
        title="Error al cargar proyectos"
        @retry="handleRetry"
      />

      
      <Projects 
        v-else-if="filteredProjects.length > 0" 
        :projects="filteredProjects" 
      />

      
      <div v-else class="empty-state">
        <p>No hay proyectos disponibles en este momento.</p>
      </div>

      <div class="projects-footer">
        <BaseButton
          variant="outline"
          size="medium"
          @click="goToProjects"
          aria-label="Ver todos los proyectos"
        >
          Ver todos los proyectos
        </BaseButton>
      </div>
    </section>

    <Contact />
  </div>
</template>

<script setup>




import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '~/store/projects';


import Hero from '~/components/Hero.vue';
import About from '~/components/About.vue';
import Skills from '~/components/Skills.vue';
import Projects from '~/components/Projects.vue';
import Contact from '~/components/Contact.vue';
import LoadingSpinner from '~/components/common/LoadingSpinner.vue';
import ErrorMessage from '~/components/common/ErrorMessage.vue';
import ProjectsFilter from '~/components/ProjectsFilter.vue';
import BaseButton from '~/components/common/BaseButton.vue';




const projectsStore = useProjectsStore();
const router = useRouter();

const { isLoading, hasError } = storeToRefs(projectsStore);





const filteredProjects = computed(() => projectsStore.filteredProjects.slice(0, 3));
const technologies = computed(() => projectsStore.allTechnologies);
const selectedTechnology = computed(() => projectsStore.filters.technology ?? '');
const searchTerm = computed(() => projectsStore.filters.searchTerm ?? '');

onMounted(async () => {
  console.log('[Index] Componente montado, cargando proyectos...');
  await projectsStore.fetchProjects();
});

const handleRetry = async () => {
  console.log('[Index] Reintentando cargar proyectos...');
  projectsStore.clearError();
  await projectsStore.fetchProjects();
};

const handleTechnologyChange = (value) => {
  projectsStore.setTechnologyFilter(value || null);
};

const handleSearchChange = (value) => {
  projectsStore.setSearchTerm(value);
};

const handleClearFilters = () => {
  projectsStore.clearFilters();
};

const goToProjects = () => {
  router.push('/projects');
};




useHead({
  title: 'Inicio | Juan Pablo Berrios',
  meta: [
    {
      name: 'description',
      content: 'Portafolio de desarrollador Frontend Trainee. Proyectos en Vue.js, Nuxt 3, y más.'
    }
  ]
});
</script>

<style scoped>
#main {
  
  min-height: 100vh;
  width: 100%;
  position: relative;
  z-index: 1;
}

.projects-section {
  padding: 3rem 0;
  max-width: 100%;
  margin: 0;
  position: relative;
}

.projects-section .section-heading {
  text-align: center;
  border-bottom: 3px solid var(--accent-primary);
  padding-bottom: 0.5rem;
  display: inline-block;
  width: 100%;
}

.section-intro {
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.05rem;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666666;
  font-size: 1.125rem;
}

.projects-footer {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
}


@media (max-width: 1280px) {
  #main {
    padding: 2rem;
    max-width: 100%;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  #main {
    padding: 2.5rem;
    max-width: 100%;
  }

  .projects-section {
    max-width: 1200px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  #main {
    padding: 1rem;
  }

  .projects-section {
    padding: 2rem 0;
  }

  .section-intro {
    font-size: 1rem;
    padding: 0 1rem;
  }
}
</style>


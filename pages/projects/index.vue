<template>
  <section class="projects-page" aria-labelledby="projects-page-heading">
    <header class="projects-header">
      <div>
        <p class="eyebrow">Portafolio</p>
        <h1 id="projects-page-heading">Proyectos construidos con Vue, Nuxt y APIs</h1>
        <p class="lead">
          Cada proyecto demuestra cómo abordo el proceso completo: desde el diseño
          responsivo y la arquitectura de componentes, hasta la integración de
          APIs y el manejo de estado global con Pinia.
        </p>
      </div>
      <BaseButton
        variant="text"
        size="small"
        @click="goHome"
        aria-label="Volver al inicio"
      >
        ← Volver al inicio
      </BaseButton>
    </header>

    <ProjectsFilter
      :technologies="technologies"
      :selected-technology="selectedTechnology"
      :search-term="searchTerm"
      @update:technology="handleTechnologyChange"
      @update:search="handleSearchChange"
      @clear="handleClearFilters"
    />

    <section aria-live="polite">
      <LoadingSpinner
        v-if="isLoading"
        message="Cargando proyectos del portafolio..."
        size="large"
      />

      <ErrorMessage
        v-else-if="hasError"
        :message="hasError"
        title="No pudimos cargar los proyectos"
        @retry="handleRetry"
      />

      <Projects
        v-else-if="filteredProjects.length"
        :projects="filteredProjects"
      />

      <div v-else class="empty-state">
        <h2>No encontramos resultados</h2>
        <p>Revisa los filtros aplicados o intenta con nuevas palabras clave.</p>
        <BaseButton
          variant="outline"
          size="medium"
          @click="handleClearFilters"
        >
          Reiniciar filtros
        </BaseButton>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '~/store/projects';
import ProjectsFilter from '~/components/ProjectsFilter.vue';
import Projects from '~/components/Projects.vue';
import LoadingSpinner from '~/components/common/LoadingSpinner.vue';
import ErrorMessage from '~/components/common/ErrorMessage.vue';
import BaseButton from '~/components/common/BaseButton.vue';

const projectsStore = useProjectsStore();
const route = useRoute();
const router = useRouter();

const { isLoading, hasError } = storeToRefs(projectsStore);

const filteredProjects = computed(() => projectsStore.filteredProjects);
const technologies = computed(() => projectsStore.allTechnologies);
const selectedTechnology = computed(() => projectsStore.filters.technology ?? '');
const searchTerm = computed(() => projectsStore.filters.searchTerm ?? '');

const applyQueryFilters = () => {
  const { tech, q } = route.query;
  const techValue = typeof tech === 'string' && tech.length > 0 ? tech : null;
  const queryValue = typeof q === 'string' ? q : '';
  projectsStore.setTechnologyFilter(techValue);
  projectsStore.setSearchTerm(queryValue);
};

onMounted(async () => {
  if (!projectsStore.projects.length) {
    await projectsStore.fetchProjects();
  }
  applyQueryFilters();
});

watch(
  () => route.query,
  () => {
    applyQueryFilters();
  }
);

watch(
  [selectedTechnology, searchTerm],
  ([tech, query]) => {
    const params = new URLSearchParams();
    if (tech) params.set('tech', tech);
    if (query) params.set('q', query);

    const queryString = params.toString();
    const current = new URLSearchParams(route.fullPath.split('?')[1] ?? '');
    if (queryString === current.toString()) {
      return;
    }

    router.replace({
      query: {
        tech: tech || undefined,
        q: query || undefined
      }
    });
  }
);

const handleTechnologyChange = (value) => {
  projectsStore.setTechnologyFilter(value || null);
};

const handleSearchChange = (value) => {
  projectsStore.setSearchTerm(value);
};

const handleClearFilters = () => {
  projectsStore.clearFilters();
};

const handleRetry = async () => {
  projectsStore.clearError();
  await projectsStore.fetchProjects();
};

const goHome = () => {
  router.push('/');
};

useHead({
  title: 'Proyectos | Juan Pablo Berrios',
  meta: [
    {
      name: 'description',
      content:
        'Listado completo de proyectos construidos con Vue 3, Nuxt, Pinia y consumo de APIs. Incluye filtros por tecnología y búsqueda por texto.'
    }
  ]
});
</script>

<style scoped>
.projects-page {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: flex-start;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-primary);
}

h1 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  margin: 0.75rem 0 0.5rem;
  line-height: 1.2;
  color: var(--text-primary);
}

.lead {
  color: var(--text-secondary);
  max-width: 720px;
  font-size: 1.05rem;
}

.empty-state {
  margin-top: 3rem;
  background: var(--bg-secondary);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  padding: 2.5rem;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.empty-state h2 {
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .projects-header {
    flex-direction: column;
  }
}
</style>

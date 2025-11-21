
<template>
  <div class="project-detail-page">
    
    <nav class="detail-nav" aria-label="Navegación de proyecto">
      <BaseButton
        variant="text"
        size="small"
        @click="goBack"
        aria-label="Volver a todos los proyectos"
      >
        ← Volver a todos los proyectos
      </BaseButton>
    </nav>

    
    <LoadingSpinner 
      v-if="isLoading" 
      message="Cargando detalles del proyecto..."
      size="large"
    />

    
    <ErrorMessage
      v-else-if="!project"
      title="Proyecto no encontrado"
      message="El proyecto que buscas no existe o ha sido eliminado."
      type="warning"
      :showRetry="false"
    >
      <template #default>
        <BaseButton
          variant="primary"
          @click="goBack"
          aria-label="Volver a la página principal"
        >
          Volver al inicio
        </BaseButton>
      </template>
    </ErrorMessage>

    
    <article 
      v-else 
      class="project-detail"
      itemscope 
      itemtype="https://schema.org/CreativeWork"
    >
      
      <header class="project-header">
        <h1 itemprop="name">{{ project.title }}</h1>
        
        
        <div class="project-meta">
          <span class="meta-item">
            <span class="meta-icon" aria-hidden="true">📅</span>
            <span>2024</span>
          </span>
          <span class="meta-item">
            <span class="meta-icon" aria-hidden="true">🏷️</span>
            <span>Frontend Development</span>
          </span>
        </div>
      </header>

      
      <figure class="project-image-container">
        <img 
          :src="getFullImageUrl(project.imageUrl)" 
          :alt="`Captura de pantalla completa del proyecto ${project.title}`"
          class="project-main-image"
          itemprop="image"
          loading="eager"
        />
        <figcaption class="sr-only">
          Vista completa del proyecto {{ project.title }}
        </figcaption>
      </figure>

      
      <section class="project-section">
        <h2>Descripción</h2>
        <p class="project-description" itemprop="description">
          {{ project.description }}
        </p>
      </section>

      
      <section v-if="project.details" class="project-section">
        <h2>Detalles del Proyecto</h2>
        <div class="project-details" v-html="sanitizeHtml(project.details)"></div>
      </section>

      
      <section v-if="project.technologies" class="project-section">
        <h2>Tecnologías Utilizadas</h2>
        <ul class="technologies-list" role="list">
          <li 
            v-for="(tech, index) in project.technologies" 
            :key="index"
            class="tech-item"
          >
            <span class="tech-icon" aria-hidden="true">✓</span>
            <span>{{ tech }}</span>
          </li>
        </ul>
      </section>

      
      <section class="project-section features-section">
        <h2>Características Destacadas</h2>
        <div class="features-grid">
          <div class="feature-card">
            <span class="feature-icon" aria-hidden="true">🎨</span>
            <h3>Diseño Responsivo</h3>
            <p>Adaptado para todos los dispositivos y tamaños de pantalla</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon" aria-hidden="true">⚡</span>
            <h3>Rendimiento Optimizado</h3>
            <p>Carga rápida y experiencia fluida</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon" aria-hidden="true">♿</span>
            <h3>Accesible</h3>
            <p>Siguiendo estándares WCAG para inclusión</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon" aria-hidden="true">🔧</span>
            <h3>Código Limpio</h3>
            <p>Mantenible y siguiendo mejores prácticas</p>
          </div>
        </div>
      </section>

      
      <section class="project-actions">
        <BaseButton
          v-if="project.repoUrl && project.repoUrl !== '#'"
          variant="outline"
          size="large"
          @click="openExternalLink(project.repoUrl)"
          aria-label="Ver repositorio en GitHub"
        >
          <span aria-hidden="true">🔗</span> Ver Repositorio
        </BaseButton>

        <BaseButton
          v-if="project.liveUrl && project.liveUrl !== '#'"
          variant="primary"
          size="large"
          @click="openExternalLink(project.liveUrl)"
          aria-label="Ver demostración en vivo"
        >
          <span aria-hidden="true">🚀</span> Ver Demo en Vivo
        </BaseButton>
      </section>

      
      <nav class="project-navigation" aria-label="Navegación entre proyectos">
        <BaseButton
          v-if="previousProject"
          variant="outline"
          @click="navigateToProject(previousProject.id)"
          aria-label="Ir al proyecto anterior"
        >
          ← Proyecto Anterior
        </BaseButton>
        
        <BaseButton
          v-if="nextProject"
          variant="outline"
          @click="navigateToProject(nextProject.id)"
          aria-label="Ir al siguiente proyecto"
        >
          Siguiente Proyecto →
        </BaseButton>
      </nav>
    </article>
  </div>
</template>

<script setup>








import { useRoute, useRouter } from 'vue-router';
import { useProjectsStore } from '~/store/projects';
import { onMounted, computed } from 'vue';
import BaseButton from '~/components/common/BaseButton.vue';
import LoadingSpinner from '~/components/common/LoadingSpinner.vue';
import ErrorMessage from '~/components/common/ErrorMessage.vue';




const route = useRoute();
const router = useRouter();




const projectsStore = useProjectsStore();
const { sanitizeHtml } = useUtils();





const projectId = computed(() => Number(route.params.id));





onMounted(async () => {
  console.log(`[ProjectDetail] Cargando proyecto ID: ${projectId.value}`);
  await projectsStore.fetchProjectById(projectId.value);
});




const project = computed(() => projectsStore.getProjectById(projectId.value));
const isLoading = computed(() => projectsStore.isLoading);
const allProjects = computed(() => projectsStore.allProjects);




const currentIndex = computed(() => {
  return allProjects.value.findIndex(p => p.id === projectId.value);
});

const previousProject = computed(() => {
  if (currentIndex.value > 0) {
    return allProjects.value[currentIndex.value - 1];
  }
  return null;
});

const nextProject = computed(() => {
  if (currentIndex.value < allProjects.value.length - 1) {
    return allProjects.value[currentIndex.value + 1];
  }
  return null;
});







const getFullImageUrl = (imageUrl) => {
  return imageUrl?.replace('thumbs', 'fulls') || imageUrl;
};




const goBack = () => {
  router.push('/');
};





const navigateToProject = (id) => {
  router.push(`/projects/${id}`);
};





const openExternalLink = (url) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
};





useHead(() => ({
  title: project.value ? `${project.value.title} | Portafolio` : 'Proyecto | Portafolio',
  meta: [
    {
      name: 'description',
      content: project.value?.description || 'Detalle de proyecto'
    },
    {
      property: 'og:title',
      content: project.value?.title || 'Proyecto'
    },
    {
      property: 'og:description',
      content: project.value?.description || ''
    },
    {
      property: 'og:image',
      content: project.value ? getFullImageUrl(project.value.imageUrl) : ''
    }
  ]
}));
</script>

<style scoped>
.project-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}


.detail-nav {
  margin-bottom: 2rem;
}


.project-header {
  text-align: center;
  margin-bottom: 3rem;
}

.project-header h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.project-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 1rem;
}

.meta-icon {
  font-size: 1.25rem;
}


.project-image-container {
  margin: 0 0 3rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.project-main-image {
  width: 100%;
  height: auto;
  display: block;
}


.project-section {
  margin-bottom: 3rem;
}

.project-section h2 {
  font-size: 1.75rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--accent-primary);
  padding-left: 1rem;
}

.project-description,
.project-details {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.project-details :deep(p) {
  margin-bottom: 1rem;
}


.technologies-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: color-mix(in srgb, var(--accent-primary) 15%, var(--bg-secondary));
  border-radius: 0.375rem;
  font-weight: 500;
  color: var(--accent-primary);
}

.tech-icon {
  color: var(--accent-primary);
  font-weight: bold;
}


.features-section {
  background: var(--gradient-card);
  padding: 3rem;
  border-radius: 0.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.5;
}


.project-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 3rem 0;
  padding: 2rem 0;
  border-top: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
}


.project-navigation {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
}


.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}


@media (max-width: 768px) {
  .project-detail-page {
    padding: 1rem;
  }

  .project-header h1 {
    font-size: 2rem;
  }

  .project-meta {
    gap: 1rem;
  }

  .project-section h2 {
    font-size: 1.5rem;
  }

  .project-description,
  .project-details {
    font-size: 1rem;
  }

  .technologies-list {
    grid-template-columns: 1fr;
  }

  .features-section {
    padding: 2rem 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .project-actions {
    flex-direction: column;
  }

  .project-actions :deep(.base-button) {
    width: 100%;
  }

  .project-navigation {
    flex-direction: column;
  }
}
</style>


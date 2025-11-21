
<template>
  <div class="projects-grid" role="list">
    <article 
      v-for="project in projects" 
      :key="project.id"
      class="project-card"
      role="listitem"
    >
      
      <NuxtLink 
        :to="`/projects/${project.id}`" 
        class="project-image-link"
        :aria-label="`Ver detalles del proyecto ${project.title}`"
      >
        <div class="project-image-wrapper">
          <img 
            :src="project.imageUrl" 
            :alt="`Captura de pantalla del proyecto ${project.title}`"
            class="project-image"
            loading="lazy"
          />
          <div class="project-overlay" aria-hidden="true">
            <span class="overlay-text">Ver Detalles</span>
          </div>
        </div>
      </NuxtLink>

      
      <div class="project-info">
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-description">{{ truncateText(project.description, 100) }}</p>

        
        <div v-if="project.technologies" class="project-technologies">
          <span 
            v-for="(tech, index) in project.technologies.slice(0, 3)" 
            :key="index"
            class="tech-tag"
          >
            {{ tech }}
          </span>
          <span 
            v-if="project.technologies.length > 3"
            class="tech-tag more"
          >
            +{{ project.technologies.length - 3 }}
          </span>
        </div>

        
        <div class="project-actions">
          <BaseButton
            variant="primary"
            size="small"
            @click="navigateToProject(project.id)"
            :aria-label="`Ver más detalles del proyecto ${project.title}`"
          >
            Ver Detalles
          </BaseButton>
          
          <BaseButton
            v-if="project.liveUrl && project.liveUrl !== '#'"
            variant="outline"
            size="small"
            @click="openExternalLink(project.liveUrl)"
            :aria-label="`Abrir demo en vivo del proyecto ${project.title}`"
          >
            Demo 🔗
          </BaseButton>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import BaseButton from './common/BaseButton.vue';





const props = defineProps({
  projects: {
    type: Array,
    required: true,
    default: () => []
  }
});




const router = useRouter();
const { truncateText } = useUtils();





const navigateToProject = (projectId) => {
  router.push(`/projects/${projectId}`);
};





const openExternalLink = (url) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0;
  margin: 0;
}


@media (min-width: 1440px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 2.5rem;
  }

  .project-card {
    max-width: 480px;
  }

  .project-info {
    padding: 2rem;
  }

  .project-title {
    font-size: 1.375rem;
  }

  .project-description {
    font-size: 1.0625rem;
  }
}

@media (min-width: 1920px) {
  .projects-grid {
    gap: 3rem;
  }
}


.project-card {
  background: var(--bg-secondary);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}


.project-image-link {
  display: block;
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.project-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-image-link:hover .project-image {
  transform: scale(1.05);
}


.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-hover));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-image-link:hover .project-overlay,
.project-image-link:focus .project-overlay {
  opacity: 1;
}

.overlay-text {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}


.project-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}


.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  background-color: var(--bg-tertiary);
  color: var(--accent-primary);
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.tech-tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.tech-tag.more {
  background-color: var(--bg-tertiary);
  color: var(--text-tertiary);
}


.project-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}


@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .project-info {
    padding: 1.25rem;
  }

  .project-title {
    font-size: 1.125rem;
  }

  .project-description {
    font-size: 0.9375rem;
  }
}

@media (max-width: 480px) {
  .project-actions {
    flex-direction: column;
  }

  .project-actions :deep(.base-button) {
    width: 100%;
  }
}
</style>


<template>
  <section
    id="inicio"
    class="hero-section py-12 lg:py-16"
    aria-labelledby="hero-heading"
  >
    <div class="hero-container grid gap-10 xl:gap-16 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div class="hero-content flex flex-col gap-7">
        <span class="hero-pill">Disponible para oportunidades Trainee</span>
        <h1 id="hero-heading">
          ¡Hola! Soy <span>Juan Pablo Berrios</span>, desarrollador frontend
          enfocado en crear experiencias accesibles con Vue y Nuxt.
        </h1>
        <p class="hero-description">
          Me entusiasma transformar ideas en productos reales utilizando
          componentes mantenibles, APIs bien diseñadas y flujos de usuario
          claros. Trabajo con <strong>Vue 3</strong>, <strong>Nuxt 3</strong>,
          <strong>Pinia</strong> y <strong>Tailwind</strong> para entregar
          interfaces responsivas, accesibles y fáciles de escalar.
        </p>
        <div class="hero-actions flex flex-wrap gap-4">
          <BaseButton
            variant="primary"
            size="large"
            @click="goToProjects"
            aria-label="Ver proyectos destacados"
          >
            Ver proyectos
          </BaseButton>
          <BaseButton
            variant="outline"
            size="large"
            @click="downloadCV"
            aria-label="Descargar Curriculum Vitae"
          >
            Descargar CV
          </BaseButton>
        </div>
        <dl class="hero-stats grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-label="Estadísticas del portafolio">
          <div>
            <dt>+20</dt>
            <dd>Interfaces responsive prototipadas</dd>
          </div>
          <div>
            <dt>+10</dt>
            <dd>Proyectos Vue y Nuxt publicados</dd>
          </div>
          <div>
            <dt>100%</dt>
            <dd>Enfoque en accesibilidad y buenas prácticas</dd>
          </div>
        </dl>
      </div>
      <div
        class="hero-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-blue-700 p-8 text-white"
        role="complementary"
        aria-label="Resumen profesional"
      >
        <div class="hero-badge">Frontend Trainee</div>
        <p>
          Actualmente busco mi primera oportunidad profesional para seguir
          creciendo en desarrollo frontend. Me adapto rápido, disfruto colaborar
          con equipos multidisciplinarios y amo documentar lo que construyo.
        </p>
        <ul class="hero-list" role="list">
          <li>
            <span>✔</span>
            <span>Componentes reutilizables con Composition API</span>
          </li>
          <li>
            <span>✔</span>
            <span>Integración de APIs con Axios y manejo de errores</span>
          </li>
          <li>
            <span>✔</span>
            <span>Estados globales confiables con Pinia</span>
          </li>
        </ul>
        <NuxtLink
          to="/projects"
          class="hero-link"
          aria-label="Ir a la sección de proyectos"
        >
          Explorar portafolio completo →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import BaseButton from '~/components/common/BaseButton.vue';

const router = useRouter();
const config = useRuntimeConfig();

const goToProjects = () => {
  router.push('/projects');
};

const downloadCV = () => {
  if (typeof window === 'undefined') {
    return;
  }
  const url = config.public.cvUrl || '#';
  window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<style scoped>
.hero-container {
  align-items: stretch;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  background: rgba(74, 144, 226, 0.12);
  color: var(--accent-primary);
  border: 1px solid rgba(74, 144, 226, 0.3);
}

h1 {
  font-size: clamp(2rem, 5vw, 2.75rem);
  line-height: 1.2;
  color: var(--text-primary);
  font-weight: 700;
}

h1 span {
  color: var(--accent-primary);
}

.hero-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 640px;
}

.hero-stats {
  margin: 1rem 0 0;
}

.hero-stats div {
  padding: 1.25rem;
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  text-align: center;
}

dl dt {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent-primary);
}

dl dd {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.hero-card {
  border-radius: 1.25rem;
  border: 1px solid rgba(74, 144, 226, 0.25);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-badge {
  align-self: flex-start;
  padding: 0.4rem 0.9rem;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  border-radius: 9999px;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.hero-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  color: white;
}

.hero-list li {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  font-weight: 500;
}

.hero-list span:first-child {
  font-size: 1rem;
  display: inline-flex;
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
}

.hero-link {
  color: white;
  text-decoration: underline;
  font-weight: 600;
  width: fit-content;
}

.hero-link:hover {
  text-decoration: none;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0;
  }

  .hero-card {
    order: -1;
  }

  .hero-actions {
    width: 100%;
  }

  .hero-actions :deep(.base-button) {
    flex: 1;
    justify-content: center;
  }
}
</style>

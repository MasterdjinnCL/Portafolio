
<template>
  <section 
    id="skills" 
    aria-labelledby="skills-heading"
    class="skills-section"
  >
    <h2 id="skills-heading" class="section-heading">Mis Habilidades</h2>
    <p class="skills-intro">
      Estas son las tecnologías y herramientas con las que tengo experiencia:
    </p>

    
    <div class="skills-grid" role="list">
      
      <article class="skill-card" role="listitem">
        <div class="skill-icon" aria-hidden="true">
          <span class="icon-emoji">🌐</span>
        </div>
        <h3 class="skill-title">HTML5 & CSS3</h3>
        <p class="skill-description">
          Creación de sitios web semánticos, accesibles y estilizados con CSS moderno, 
          Flexbox y Grid.
        </p>
        <div class="skill-tags">
          <span class="tag">HTML5</span>
          <span class="tag">CSS3</span>
          <span class="tag">Sass</span>
        </div>
      </article>

      
      <article class="skill-card" role="listitem">
        <div class="skill-icon" aria-hidden="true">
          <span class="icon-emoji">📱</span>
        </div>
        <h3 class="skill-title">Diseño Responsivo</h3>
        <p class="skill-description">
          Interfaces que se adaptan perfectamente a cualquier dispositivo, 
          mobile-first approach.
        </p>
        <div class="skill-tags">
          <span class="tag">Responsive</span>
          <span class="tag">Mobile First</span>
        </div>
      </article>

      
      <article class="skill-card" role="listitem">
        <div class="skill-icon" aria-hidden="true">
          <span class="icon-emoji">⚡</span>
        </div>
        <h3 class="skill-title">JavaScript (ES6+)</h3>
        <p class="skill-description">
          Lógica interactiva y moderna con arrow functions, destructuring, 
          async/await y más.
        </p>
        <div class="skill-tags">
          <span class="tag">ES6+</span>
          <span class="tag">DOM</span>
          <span class="tag">Async</span>
        </div>
      </article>

      
      <article class="skill-card" role="listitem">
        <div class="skill-icon" aria-hidden="true">
          <span class="icon-emoji">💚</span>
        </div>
        <h3 class="skill-title">Vue.js & Nuxt 3</h3>
        <p class="skill-description">
          Desarrollo de aplicaciones SPA y SSR con componentes reutilizables 
          y reactivos.
        </p>
        <div class="skill-tags">
          <span class="tag">Vue 3</span>
          <span class="tag">Nuxt 3</span>
          <span class="tag">Composition API</span>
        </div>
      </article>

      
      <article class="skill-card" role="listitem">
        <div class="skill-icon" aria-hidden="true">
          <span class="icon-emoji">🔧</span>
        </div>
        <h3 class="skill-title">Pinia & Axios</h3>
        <p class="skill-description">
          Manejo eficiente de estado global y consumo de APIs REST con 
          control de errores.
        </p>
        <div class="skill-tags">
          <span class="tag">Pinia</span>
          <span class="tag">Axios</span>
          <span class="tag">REST API</span>
        </div>
      </article>

      
      <article class="skill-card" role="listitem">
        <div class="skill-icon" aria-hidden="true">
          <span class="icon-emoji">🔄</span>
        </div>
        <h3 class="skill-title">Git & GitHub</h3>
        <p class="skill-description">
          Control de versiones, trabajo colaborativo y mejores prácticas 
          de desarrollo.
        </p>
        <div class="skill-tags">
          <span class="tag">Git</span>
          <span class="tag">GitHub</span>
          <span class="tag">Workflow</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>




</script>

<style scoped>
.skills-section {
  padding: 3rem 0;
  background: transparent;
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
}

.skills-section .section-heading {
  text-align: center;
  border-bottom: 3px solid var(--accent-primary);
  padding-bottom: 0.5rem;
  display: inline-block;
  width: 100%;
}

.skills-intro {
  text-align: center;
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
}


.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.75rem;
  max-width: 100%;
  margin: 0;
  padding: 0 2rem;
}


@media (min-width: 1440px) {
  .skills-section {
    max-width: 1600px;
  }
  
  .skills-grid {
    gap: 2.5rem;
    padding: 0 3rem;
  }
}


.skill-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-top: 4px solid var(--accent-primary);
  border: 1px solid var(--border-color);
}

.skill-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

.skill-icon {
  text-align: center;
  margin-bottom: 1rem;
}

.icon-emoji {
  font-size: 3rem;
  filter: grayscale(0);
  transition: transform 0.3s ease;
}

.skill-card:hover .icon-emoji {
  transform: scale(1.2) rotate(5deg);
}

.skill-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-align: center;
}

.skill-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
}


.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tag {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  background-color: var(--bg-tertiary);
  color: var(--accent-primary);
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}


@media (max-width: 768px) {
  .skills-section {
    padding: 2rem 0;
    max-width: 100%;
  }

  .skills-intro {
    font-size: 1rem;
    padding: 0 1.5rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1.5rem;
  }

  .skill-card {
    padding: 1.5rem;
  }

  .icon-emoji {
    font-size: 2.5rem;
  }

  .skill-title {
    font-size: 1.25rem;
  }

  .skill-description {
    font-size: 0.9375rem;
  }
}

@media (min-width: 1920px) {
  .skills-section {
    max-width: 1800px;
  }
  
  .skills-grid {
    padding: 0 4rem;
  }
}
</style>


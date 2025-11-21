
<template>
  <section 
    id="about" 
    aria-labelledby="about-heading"
    class="about-section"
  >
    <h2 id="about-heading" class="section-heading">Sobre Mí</h2>
    
    <article class="about-content">
      <p>
        Soy un <strong>desarrollador web Frontend Trainee</strong> con gran interés 
        en la creación de experiencias de usuario atractivas, funcionales y accesibles. 
        Aunque estoy en una etapa inicial de mi carrera, tengo una base sólida en 
        tecnologías web modernas y un fuerte deseo de aprender y crecer profesionalmente.
      </p>
      
      <p>
        Mi enfoque se centra en escribir <em>código limpio y mantenible</em>, 
        seguir las mejores prácticas de desarrollo y mantenerme actualizado con 
        las últimas tendencias en tecnología web. Busco oportunidades para aplicar 
        mis habilidades, colaborar en proyectos desafiantes y contribuir al desarrollo 
        de soluciones web innovadoras.
      </p>

      
      <div class="about-highlights">
        <h3 class="sr-only">Características destacadas</h3>
        <ul class="highlights-list" role="list">
          <li>
            <span class="highlight-icon" aria-hidden="true">🎯</span>
            <span>Enfoque en <strong>diseño responsivo</strong> y accesibilidad</span>
          </li>
          <li>
            <span class="highlight-icon" aria-hidden="true">💡</span>
            <span>Aprendizaje continuo de nuevas tecnologías</span>
          </li>
          <li>
            <span class="highlight-icon" aria-hidden="true">🤝</span>
            <span>Trabajo en equipo y comunicación efectiva</span>
          </li>
          <li>
            <span class="highlight-icon" aria-hidden="true">🚀</span>
            <span>Pasión por crear productos de calidad</span>
          </li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script setup>




</script>

<style scoped>
.about-section {
  padding: 0 0 3rem;
  max-width: 100%;
  margin: 0;
  position: relative;
  z-index: 1;
}

.about-container {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.about-section .section-heading {
  margin-top: 0;
  border-bottom: 3px solid var(--accent-primary);
  padding-bottom: 0.5rem;
}

.about-content {
  line-height: 1.8;
  color: var(--text-secondary);
}

.about-content p {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  color: var(--text-secondary);
}

.about-content strong {
  color: var(--text-primary);
  font-weight: 600;
}

.about-content em {
  color: var(--accent-primary);
  font-style: normal;
  font-weight: 500;
}


.about-highlights {
  margin-top: 2.5rem;
  padding: 2.5rem;
  background: transparent;
  border-radius: 1rem;
  box-shadow: none;
  border: none;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  font-weight: 600;
}

.highlights-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.highlights-list li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border-color);
  box-shadow: none;
}

.highlights-list li:hover {
  transform: translateY(-3px);
  box-shadow: none;
  border-color: var(--accent-primary);
  background: var(--bg-tertiary);
}

.highlight-icon {
  font-size: 2rem;
  flex-shrink: 0;
  filter: grayscale(0);
  transition: transform 0.3s ease;
}

.highlights-list li:hover .highlight-icon {
  transform: scale(1.2);
}

.highlights-list li span:last-child {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.5;
}

.highlights-list li strong {
  color: var(--text-primary);
  font-weight: 600;
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


@media (min-width: 1440px) {
  .about-container {
    max-width: 1400px;
  }

  .about-content p {
    font-size: 1.2rem;
  }
}


@media (max-width: 768px) {
  .about-section {
    padding: 1rem 1rem 2rem;
  }

  .about-content p {
    font-size: 1rem;
  }

  .about-highlights {
    padding: 1.5rem;
  }

  .highlights-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>


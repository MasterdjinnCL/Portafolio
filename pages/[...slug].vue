<template>
  <section class="not-found" aria-labelledby="not-found-heading">
    <div class="not-found-card">
      <p class="status-code">404</p>
      <h1 id="not-found-heading">La página que buscas no existe</h1>
      <p>
        Puede que el enlace esté desactualizado o que el contenido haya sido movido.
        Vuelve al inicio o explora mis proyectos destacados.
      </p>
      <div class="actions">
        <BaseButton variant="primary" size="medium" @click="goHome">
          Ir al inicio
        </BaseButton>
        <BaseButton variant="outline" size="medium" @click="goProjects">
          Ver proyectos
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import BaseButton from '~/components/common/BaseButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const goProjects = () => {
  router.push('/projects');
};

useHead({
  title: 'Página no encontrada | Juan Pablo Berrios'
});
</script>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-card {
  max-width: 540px;
  background: var(--bg-secondary);
  padding: 3rem;
  border-radius: 1.5rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.status-code {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin: 0;
}

h1 {
  font-size: 1.75rem;
  color: var(--text-primary);
  margin: 0;
}

p {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .not-found-card {
    padding: 2rem;
  }
}
</style>

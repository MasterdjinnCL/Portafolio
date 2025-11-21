
<template>
  <div 
    class="loading-spinner" 
    :class="sizeClass"
    role="status" 
    :aria-label="ariaLabel"
  >
    <div class="spinner"></div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';




const props = defineProps({
  
  message: {
    type: String,
    default: 'Cargando...'
  },
  
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  
  ariaLabel: {
    type: String,
    default: 'Cargando contenido'
  }
});




const sizeClass = computed(() => `loading-spinner--${props.size}`);
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 200px;
}


.spinner {
  border: 4px solid rgba(74, 144, 226, 0.1);
  border-left-color: #4A90E2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}


.loading-spinner--small .spinner {
  width: 24px;
  height: 24px;
  border-width: 3px;
}

.loading-spinner--medium .spinner {
  width: 48px;
  height: 48px;
  border-width: 4px;
}

.loading-spinner--large .spinner {
  width: 72px;
  height: 72px;
  border-width: 5px;
}


.loading-message {
  margin-top: 1rem;
  color: #6C757D;
  font-size: 1rem;
  text-align: center;
}

.loading-spinner--small .loading-message {
  font-size: 0.875rem;
}

.loading-spinner--large .loading-message {
  font-size: 1.125rem;
}


@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    border-left-color: #4A90E2;
    border-top-color: #4A90E2;
  }
}
</style>

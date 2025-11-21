
<template>
  <div 
    class="error-message" 
    :class="typeClass"
    role="alert" 
    aria-live="polite"
  >
    <div class="error-content">
      
      <div class="error-icon" aria-hidden="true">
        {{ iconEmoji }}
      </div>
      
      <div class="error-text">
        <h3 v-if="title" class="error-title">{{ title }}</h3>
        <p class="error-description">{{ message }}</p>
      </div>
    </div>

    
    <BaseButton
      v-if="showRetry"
      variant="outline"
      size="small"
      @click="handleRetry"
      aria-label="Intentar nuevamente"
    >
      Intentar nuevamente
    </BaseButton>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import BaseButton from './BaseButton.vue';




const props = defineProps({
  
  message: {
    type: String,
    required: true
  },
  
  title: {
    type: String,
    default: 'Ha ocurrido un error'
  },
  
  type: {
    type: String,
    default: 'error',
    validator: (value) => ['error', 'warning', 'info'].includes(value)
  },
  
  showRetry: {
    type: Boolean,
    default: true
  }
});




const emit = defineEmits(['retry']);




const typeClass = computed(() => `error-message--${props.type}`);




const iconEmoji = computed(() => {
  const icons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  return icons[props.type] || icons.error;
});





const handleRetry = () => {
  emit('retry');
};
</script>

<style scoped>
.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #FFF5F5;
  border: 2px solid #FC8181;
  margin: 2rem 0;
}

.error-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
  width: 100%;
}

.error-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.error-text {
  flex: 1;
}

.error-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #C53030;
}

.error-description {
  margin: 0;
  font-size: 1rem;
  color: #742A2A;
  line-height: 1.5;
}


.error-message--warning {
  background-color: #FFFAF0;
  border-color: #F6AD55;
}

.error-message--warning .error-title {
  color: #C05621;
}

.error-message--warning .error-description {
  color: #7C2D12;
}

.error-message--info {
  background-color: #EBF8FF;
  border-color: #4A90E2;
}

.error-message--info .error-title {
  color: #2C5282;
}

.error-message--info .error-description {
  color: #2A4365;
}


@media (max-width: 768px) {
  .error-message {
    padding: 1.5rem;
  }

  .error-content {
    flex-direction: column;
    text-align: center;
  }

  .error-icon {
    font-size: 1.5rem;
  }

  .error-title {
    font-size: 1.125rem;
  }

  .error-description {
    font-size: 0.9375rem;
  }
}
</style>

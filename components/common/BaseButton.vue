
<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :aria-busy="loading"
    @click="handleClick"
  >
    
    <span v-if="loading" class="button-spinner" aria-hidden="true">⏳</span>
    
    
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';





const props = defineProps({
  
  label: {
    type: String,
    default: 'Button'
  },
  
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'text'].includes(value)
  },
  
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  
  disabled: {
    type: Boolean,
    default: false
  },
  
  loading: {
    type: Boolean,
    default: false
  },
  
  fullWidth: {
    type: Boolean,
    default: false
  },
  
  ariaLabel: {
    type: String,
    default: null
  }
});





const emit = defineEmits(['click']);





const buttonClasses = computed(() => {
  return [
    'base-button',
    `base-button--${props.variant}`,
    `base-button--${props.size}`,
    {
      'base-button--full-width': props.fullWidth,
      'base-button--loading': props.loading,
      'base-button--disabled': props.disabled
    }
  ];
});






const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style scoped>

.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}


.base-button--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.base-button--medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.base-button--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}


.base-button--primary {
  background-color: var(--accent-primary);
  color: var(--bg-secondary);
  border-color: var(--accent-primary);
}

.base-button--primary:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: var(--accent-hover);
  border-color: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.base-button--secondary {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border-color: var(--bg-tertiary);
}

.base-button--secondary:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: var(--text-secondary);
  color: var(--bg-secondary);
  border-color: var(--text-secondary);
  transform: translateY(-2px);
}

.base-button--outline {
  background-color: transparent;
  color: var(--accent-primary);
  border-color: var(--accent-primary);
}

.base-button--outline:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: var(--accent-primary);
  color: var(--bg-secondary);
}

.base-button--text {
  background-color: transparent;
  color: var(--accent-primary);
  border-color: transparent;
}

.base-button--text:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: rgba(0, 0, 0, 0.05);
}


.base-button--full-width {
  width: 100%;
}

.base-button--disabled,
.base-button--loading {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.button-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


.base-button:focus-visible {
  outline: 3px solid var(--accent-primary);
  outline-offset: 2px;
}


@media (max-width: 768px) {
  .base-button--large {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
}
</style>

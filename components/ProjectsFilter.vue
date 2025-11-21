<template>
  <div class="filter-card" role="region" aria-label="Filtros de proyectos">
    <form class="filter-form" @submit.prevent>
      <div class="filter-field">
        <label for="project-search">Buscar proyectos</label>
        <div class="filter-input-group">
          <span class="filter-icon" aria-hidden="true">🔍</span>
          <input
            id="project-search"
            v-model="localSearch"
            type="search"
            name="search"
            placeholder="Explora por nombre o descripción"
            autocomplete="off"
          />
        </div>
      </div>

      <div class="filter-field">
        <label for="project-tech">Tecnologías</label>
        <select
          id="project-tech"
          name="technology"
          :value="selectedTechnology"
          @change="onTechnologyChange"
        >
          <option value="">Todas</option>
          <option
            v-for="tech in technologies"
            :key="tech"
            :value="tech"
          >
            {{ tech }}
          </option>
        </select>
      </div>

      <div class="filter-actions">
        <BaseButton
          variant="outline"
          size="small"
          type="button"
          @click="handleClearFilters"
          aria-label="Limpiar filtros"
        >
          Limpiar filtros
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import BaseButton from '~/components/common/BaseButton.vue';

const props = defineProps({
  technologies: {
    type: Array,
    default: () => []
  },
  selectedTechnology: {
    type: String,
    default: ''
  },
  searchTerm: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:technology', 'update:search', 'clear']);

const { debounce } = useUtils();

const localSearch = ref(props.searchTerm);

watch(
  () => props.searchTerm,
  (value) => {
    if (value !== localSearch.value) {
      localSearch.value = value;
    }
  }
);

const emitSearch = debounce((value) => {
  emit('update:search', value);
}, 300);

watch(localSearch, (value) => {
  emitSearch(value.trim());
});

const onTechnologyChange = (event) => {
  emit('update:technology', event.target.value);
};

const handleClearFilters = () => {
  emit('clear');
};
</script>

<style scoped>
.filter-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.filter-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  align-items: end;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: var(--text-primary);
}

.filter-input-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  background: var(--bg-primary);
  transition: border-color 0.2s ease;
}

.filter-input-group:focus-within {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.12);
}

.filter-icon {
  font-size: 1rem;
  color: var(--text-tertiary);
}

input[type='search'] {
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  width: 100%;
  color: var(--text-primary);
}

select {
  padding: 0.85rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

select:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.12);
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .filter-form {
    grid-template-columns: 1fr;
  }

  .filter-actions {
    justify-content: flex-start;
  }
}
</style>

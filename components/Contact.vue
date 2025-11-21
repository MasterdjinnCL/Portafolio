
<template>
  <section 
    id="contact" 
    aria-labelledby="contact-heading"
    class="contact-section"
  >
    <h2 id="contact-heading" class="section-heading">Contacto</h2>
    <p class="contact-intro">
      ¿Interesado en colaborar o tienes alguna pregunta? ¡Me encantaría saber de ti!
    </p>

    <div class="contact-container">
      
      <div class="contact-form-wrapper">
        <form 
          @submit.prevent="handleSubmit" 
          novalidate
          aria-label="Formulario de contacto"
        >
          <div class="form-grid">
            
            <div class="form-group">
              <label for="name" class="form-label">
                Nombre <span class="required" aria-label="requerido">*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name"
                name="name"
                class="form-input"
                :class="{ 'error': errors.name }"
                placeholder="Tu nombre completo"
                required
                aria-required="true"
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'name-error' : null"
                @blur="validateField('name')"
              />
              <span 
                v-if="errors.name" 
                id="name-error" 
                class="error-message" 
                role="alert"
              >
                {{ errors.name }}
              </span>
            </div>

            
            <div class="form-group">
              <label for="email" class="form-label">
                Email <span class="required" aria-label="requerido">*</span>
              </label>
              <input 
                type="email" 
                id="email"
                v-model="formData.email"
                name="email" 
                class="form-input"
                :class="{ 'error': errors.email }"
                placeholder="tu@email.com"
                required
                aria-required="true"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'email-error' : null"
                @blur="validateField('email')"
              />
              <span 
                v-if="errors.email" 
                id="email-error" 
                class="error-message" 
                role="alert"
              >
                {{ errors.email }}
              </span>
            </div>

            
            <div class="form-group full-width">
              <label for="message" class="form-label">
                Mensaje <span class="required" aria-label="requerido">*</span>
              </label>
              <textarea 
                id="message"
                v-model="formData.message"
                name="message" 
                class="form-textarea"
                :class="{ 'error': errors.message }"
                placeholder="Escribe tu mensaje aquí..."
                rows="5"
                required
                aria-required="true"
                :aria-invalid="!!errors.message"
                :aria-describedby="errors.message ? 'message-error' : null"
                @blur="validateField('message')"
              ></textarea>
              <span 
                v-if="errors.message" 
                id="message-error" 
                class="error-message" 
                role="alert"
              >
                {{ errors.message }}
              </span>
            </div>
          </div>

          
          <BaseButton 
            type="submit"
            variant="primary"
            size="large"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            aria-label="Enviar mensaje de contacto"
          >
            {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
          </BaseButton>

          
          <div 
            v-if="successMessage" 
            class="success-message" 
            role="status" 
            aria-live="polite"
          >
            ✅ {{ successMessage }}
          </div>
        </form>
      </div>

      
      <aside class="contact-info" aria-label="Información de contacto">
        <h3>Información de Contacto</h3>
        <ul class="info-list">
          <li class="info-item">
            <span class="info-icon" aria-hidden="true">📍</span>
            <div class="info-content">
              <strong>Ubicación</strong>
              <span>Santiago, Chile</span>
            </div>
          </li>
          <li class="info-item">
            <span class="info-icon" aria-hidden="true">📧</span>
            <div class="info-content">
              <strong>Email</strong>
              <a href="mailto:juanpablo@berriosi.cl">juanpablo@berriosi.cl</a>
            </div>
          </li>
          <li class="info-item">
            <span class="info-icon" aria-hidden="true">💼</span>
            <div class="info-content">
              <strong>LinkedIn</strong>
              <a 
                href="https://www.linkedin.com/in/jpberriosi/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                linkedin.com/in/jpberriosi
              </a>
            </div>
          </li>
          <li class="info-item">
            <span class="info-icon" aria-hidden="true">🐙</span>
            <div class="info-content">
              <strong>GitHub</strong>
              <a 
                href="https://github.com/MasterdjinnCL/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                github.com/MasterdjinnCL
              </a>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import BaseButton from './common/BaseButton.vue';




const { validateEmail } = useUtils();
const { post } = useApi();
const config = useRuntimeConfig();




const formData = reactive({
  name: '',
  email: '',
  message: ''
});

const errors = reactive({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const successMessage = ref('');

const validateField = (field) => {
  errors[field] = '';

  switch (field) {
    case 'name':
      if (!formData.name.trim()) {
        errors.name = 'El nombre es requerido';
      } else if (formData.name.trim().length < 2) {
        errors.name = 'El nombre debe tener al menos 2 caracteres';
      }
      break;

    case 'email':
      if (!formData.email.trim()) {
        errors.email = 'El email es requerido';
      } else if (!validateEmail(formData.email)) {
        errors.email = 'El email no es válido';
      }
      break;

    case 'message':
      if (!formData.message.trim()) {
        errors.message = 'El mensaje es requerido';
      } else if (formData.message.trim().length < 10) {
        errors.message = 'El mensaje debe tener al menos 10 caracteres';
      }
      break;
  }
};





const validateForm = () => {
  validateField('name');
  validateField('email');
  validateField('message');

  return !errors.name && !errors.email && !errors.message;
};





const handleSubmit = async () => {
  successMessage.value = '';

  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim()
    };

    if (!config.public.contactEndpoint || config.public.contactEndpoint.includes('tu-form-id')) {
      console.warn('[Contacto] Endpoint de contacto no configurado. Simulando respuesta.');
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } else {
      await post(config.public.contactEndpoint, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    successMessage.value = '¡Mensaje enviado exitosamente! Te contactaré pronto.';
    Object.keys(errors).forEach((key) => {
      errors[key] = '';
    });

    Object.keys(formData).forEach((key) => {
      formData[key] = '';
    });

  } catch (error) {
    console.error('Error al enviar formulario:', error);
    errors.message = error.message || 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-section {
  padding: 3rem 0;
  background-color: transparent;
  position: relative;
  z-index: 1;
  max-width: 100%;
  margin: 0;
}

.contact-section .section-heading {
  text-align: center;
  border-bottom: 3px solid var(--accent-primary);
  padding-bottom: 0.5rem;
  display: inline-block;
  width: 100%;
}

.contact-intro {
  text-align: center;
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}


.contact-form-wrapper {
  background: var(--bg-secondary);
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.required {
  color: #E53E3E;
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-input.error,
.form-textarea.error {
  border-color: #E53E3E;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.error-message {
  color: #E53E3E;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #C6F6D5;
  color: #22543D;
  border-radius: 0.375rem;
  border-left: 4px solid #38A169;
}


.contact-info {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  height: fit-content;
  border: 1px solid var(--border-color);
}

.contact-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  font-weight: 600;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.info-item:last-child {
  border-bottom: none;
}

.info-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-content strong {
  color: var(--text-primary);
  font-size: 0.9375rem;
  font-weight: 600;
}

.info-content span,
.info-content a {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  transition: color 0.2s ease;
}

.info-content a:hover {
  color: var(--accent-primary);
  text-decoration: underline;
}


@media (max-width: 968px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 2rem 1rem;
  }

  .contact-form-wrapper,
  .contact-info {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .form-group.full-width {
    grid-column: 1;
  }
}
</style>


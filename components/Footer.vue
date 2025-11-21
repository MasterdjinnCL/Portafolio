<template>
  <footer class="footer" role="contentinfo">
    <div class="footer-container">
      
      <div class="footer-section social-section">
        <div class="social-links">
          <a 
            href="https://github.com/MasterdjinnCL" 
            target="_blank" 
            rel="noopener noreferrer"
            class="social-link"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/jpberriosi/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="social-link"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a 
            href="mailto:juanpablo@berriosi.cl"
            class="social-link"
            aria-label="Email"
            title="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>

      
      <div class="footer-section footer-info">
        <span class="footer-text">
          © {{ currentYear }} Juan Pablo Berrios
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 0.75rem 0;
  margin-top: auto;
  width: 100%;
  margin-left: 300px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.footer-section {
  display: flex;
  align-items: center;
}

.social-section {
  flex-shrink: 0;
}

.footer-info {
  flex: 1;
  justify-content: flex-end;
}


.social-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.social-link {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  color: var(--text-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  flex-shrink: 0;
}

.social-link:hover {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.social-link svg {
  transition: transform 0.3s ease;
}

.social-link:hover svg {
  transform: scale(1.1);
}


.footer-text {
  color: var(--text-secondary);
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;
}


@media (max-width: 768px) {
  .footer {
    padding: 0.75rem 0;
    margin-left: 0;
  }

  .footer-container {
    flex-direction: column;
    gap: 0.75rem;
    padding: 0 2rem;
  }
  
  .footer-info {
    justify-content: center;
  }
  
  .footer-text {
    white-space: normal;
    text-align: center;
  }
}

@media (max-width: 1024px) {
  .footer-text {
    font-size: 0.688rem;
  }
}

@media (min-width: 1440px) {
  .footer {
    padding: 0.75rem 0;
    margin-left: 320px;
  }
}

@media (min-width: 1920px) {
  .footer {
    margin-left: 340px;
  }
}
</style>


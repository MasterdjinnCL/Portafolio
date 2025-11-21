<template>
  <header id="header" role="banner">
    <div class="inner">
      <NuxtLink
        to="/"
        class="image avatar"
        aria-label="Volver a la página de inicio"
      >
        <img
          src="/images/pic01.jpg"
          alt="Foto de perfil de Juan Pablo Berrios - Desarrollador Frontend"
          loading="lazy"
        />
      </NuxtLink>

      <h1>
        <strong>Juan Pablo Berrios</strong>
        <span class="subtitle">
          Desarrollador Frontend Trainee<br />
          Técnico en Conectividad y Redes<br />
          Apasionado por crear<br />
          experiencias web modernas
        </span>
      </h1>

      <button
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Abrir menú de navegación"
        type="button"
      >
        <span class="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <nav aria-label="Navegación principal" class="header-nav" :class="{ 'mobile-open': isMobileMenuOpen }">
        <ul class="nav-list">
          <li>
            <a href="#inicio" @click.prevent="scrollToSection('inicio')" aria-label="Ir a sección de inicio">
              Inicio
            </a>
          </li>
          <li>
            <a href="#about" @click.prevent="scrollToSection('about')" aria-label="Ir a sección Sobre Mí">
              Sobre Mí
            </a>
          </li>
          <li>
            <a href="#skills" @click.prevent="scrollToSection('skills')" aria-label="Ir a sección Habilidades">
              Habilidades
            </a>
          </li>
          <li>
            <a href="#projects" @click.prevent="scrollToSection('projects')" aria-label="Ir a sección Proyectos">
              Proyectos
            </a>
          </li>
          <li>
            <a href="#contact" @click.prevent="scrollToSection('contact')" aria-label="Ir a sección Contacto">
              Contacto
            </a>
          </li>
        </ul>

        <div class="theme-switch-wrapper">
          <label class="theme-switch" :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
            <input
              type="checkbox"
              :checked="isDark"
              @change="toggleTheme"
              aria-label="Toggle tema oscuro/claro"
            />
            <span class="slider">
              <span class="slider-icon moon">🌙</span>
              <span class="slider-icon sun">☀️</span>
            </span>
          </label>
        </div>

        <div class="font-size-control">
          <button
            @click="decreaseFontSize"
            class="font-btn"
            aria-label="Disminuir tamaño de fuente"
            title="Disminuir tamaño de fuente"
          >
            A-
          </button>
          <span class="font-size-label">{{ fontSize }}%</span>
          <button
            @click="increaseFontSize"
            class="font-btn"
            aria-label="Aumentar tamaño de fuente"
            title="Aumentar tamaño de fuente"
          >
            A+
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTheme } from '~/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
const router = useRouter();
const route = useRoute();

const isMobileMenuOpen = ref(false);

const fontSize = ref(100);
const minFontSize = 80;
const maxFontSize = 120;

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleClickOutside = (event) => {
  if (isMobileMenuOpen.value) {
    const header = document.getElementById('header');
    if (header && !header.contains(event.target)) {
      isMobileMenuOpen.value = false;
    }
  }
};

const increaseFontSize = () => {
  if (fontSize.value < maxFontSize) {
    fontSize.value += 10;
    applyFontSize();
  }
};

const decreaseFontSize = () => {
  if (fontSize.value > minFontSize) {
    fontSize.value -= 10;
    applyFontSize();
  }
};

const applyFontSize = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = `${fontSize.value}%`;
    localStorage.setItem('fontSize', fontSize.value.toString());
  }
};

const loadFontSize = () => {
  if (typeof window !== 'undefined') {
    const savedSize = localStorage.getItem('fontSize');
    if (savedSize) {
      fontSize.value = parseInt(savedSize);
      applyFontSize();
    }
  }
};

const scrollToSection = (sectionId) => {
  const performScroll = () => {
    const element = typeof document !== 'undefined' ? document.getElementById(sectionId) : null;
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      isMobileMenuOpen.value = false;
    }
  };

  if (route.path !== '/') {
    router.push({ path: '/', hash: `#${sectionId}` }).then(() => {
      nextTick(() => {
        setTimeout(performScroll, 150);
      });
    });
  } else {
    performScroll();
  }
};

onMounted(() => {
  loadFontSize();
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleClickOutside);
  }
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleClickOutside);
  }
});
</script>

<style scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  min-width: 300px;
  max-width: 300px;
  height: 100vh;
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 2.5rem 1.75rem;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
  border-right: none;
}

#header::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

#header {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

@media (min-width: 1440px) {
  #header {
    width: 320px;
    min-width: 320px;
    max-width: 320px;
    padding: 2.5rem 1.75rem;
  }
}

@media (min-width: 1920px) {
  #header {
    width: 340px;
    min-width: 340px;
    max-width: 340px;
    padding: 3rem 2rem;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 100%;
}

.image.avatar img {
  border-radius: 50%;
  width: 130px;
  height: 130px;
  object-fit: cover;
  border: 3px solid var(--accent-primary);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.image.avatar:hover img {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.5);
}

h1 {
  margin: 1.5rem 0 0.75rem;
  font-size: 1.4rem;
  line-height: 1.3;
  color: var(--text-primary);
  font-weight: 700;
}

h1 strong {
  color: var(--text-primary);
  font-weight: 800;
}

.subtitle {
  display: block;
  font-weight: normal;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  line-height: 1.6;
}

.header-nav {
  margin-top: 2rem;
  width: 100%;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 0.5rem;
}

.nav-list a {
  display: block;
  padding: 0.7rem 1rem;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid transparent;
  text-align: center;
}

.nav-list a:hover,
.nav-list a:focus {
  background-color: var(--accent-primary);
  color: white;
  transform: translateX(3px);
  outline: none;
  box-shadow: 0 3px 10px rgba(74, 144, 226, 0.4);
  border-color: var(--accent-primary);
}

.nav-list a:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

.theme-switch-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.75rem;
  padding: 0.5rem 0;
}

.theme-switch {
  position: relative;
  display: inline-block;
  width: 68px;
  height: 32px;
  flex-shrink: 0;
}

.theme-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #334155;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  overflow: hidden;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 3px;
  background-color: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.slider-icon {
  font-size: 0.9rem;
  line-height: 1;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-icon.moon {
  opacity: 0.5;
  filter: grayscale(0.5);
}

.slider-icon.sun {
  opacity: 0.3;
  filter: grayscale(0.8);
}

input:checked + .slider {
  background-color: var(--accent-primary);
}

input:checked + .slider:before {
  transform: translateX(38px);
}

input:checked + .slider .moon {
  opacity: 1;
  filter: grayscale(0);
}

input:checked + .slider .sun {
  opacity: 0.3;
  filter: grayscale(1);
}

input:not(:checked) + .slider .sun {
  opacity: 1;
  filter: grayscale(0);
}

input:not(:checked) + .slider .moon {
  opacity: 0.3;
  filter: grayscale(1);
}

.slider:hover {
  box-shadow: 0 0 12px rgba(74, 144, 226, 0.4);
}

input:focus + .slider {
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
}

.font-size-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  margin-top: 1rem;
  padding: 0.5rem 0;
}

.font-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid var(--accent-primary);
  background-color: #ffffff;
  color: var(--accent-primary);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.font-btn:hover {
  background-color: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.font-btn:active {
  transform: translateY(0);
}

.font-btn:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

.font-size-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 600;
  min-width: 45px;
  text-align: center;
}

html.dark-mode .font-btn {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  position: relative;
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 30px;
  height: 24px;
}

.hamburger-icon span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: var(--text-primary);
  border-radius: 3px;
  transition: all 0.3s ease;
}

@media (max-width: 1280px) {
  #header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: auto;
    padding: 1.5rem;
    z-index: 1000;
    background-color: var(--bg-secondary);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    max-width: 100%;
    flex-wrap: wrap;
    position: relative;
  }

  .image.avatar {
    order: 1;
  }

  .image.avatar img {
    width: 70px;
    height: 70px;
  }

  h1 {
    margin: 0;
    font-size: 1.125rem;
    order: 2;
    flex: 1;
    padding: 0 1rem;
  }

  .subtitle {
    font-size: 0.8rem;
    display: block;
  }

  .mobile-menu-toggle {
    display: block;
    order: 3;
  }

  .header-nav {
    display: none;
    width: 100%;
    margin-top: 1.5rem;
    order: 4;
    background-color: var(--bg-secondary);
    padding: 1rem 0;
  }

  .header-nav.mobile-open {
    display: block;
  }

  .nav-list {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    align-items: center;
  }

  .nav-list li {
    margin-bottom: 0;
    width: 100%;
    text-align: center;
  }

  .nav-list a {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    width: 100%;
    display: block;
    text-align: center;
  }

  .theme-switch-wrapper {
    margin-top: 1rem;
  }

  .font-size-control {
    justify-content: center;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  #header {
    padding: 1.5rem 2rem;
  }

  .image.avatar img {
    width: 80px;
    height: 80px;
  }

  h1 {
    font-size: 1.25rem;
  }

  .subtitle {
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  #header {
    padding: 1rem;
  }

  .image.avatar img {
    width: 60px;
    height: 60px;
  }

  h1 {
    font-size: 1rem;
  }

  .subtitle {
    font-size: 0.75rem;
  }

  .nav-list a {
    font-size: 0.9375rem;
    padding: 0.75rem;
  }
}
</style>



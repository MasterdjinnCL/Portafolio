
<template>
  <div id="wrapper">
    <Header />
    
    
    <a href="#main-content" class="skip-link" aria-label="Saltar al contenido principal">
      <span class="skip-text">Saltar al contenido</span>
    </a>

    
    <main id="main-content" role="main" tabindex="-1">
      <slot />
    </main>

    
    <Footer />

    
      
      <div v-show="showScrollTop" class="scroll-buttons">
        <button
          @click="scrollToPrevSection"
          class="scroll-btn"
          aria-label="Sección anterior"
          title="Sección anterior"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </button>
        <button
          @click="scrollToNextSection"
          class="scroll-btn"
          aria-label="Siguiente sección"
          title="Siguiente sección"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';



const showScrollTop = ref(false);


const sectionIds = ['inicio', 'about', 'skills', 'projects', 'contact'];





function getCurrentSectionIndex() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  let closestIdx = 0;
  let minDist = Infinity;

  for (let i = 0; i < sectionIds.length; i++) {
    const el = document.getElementById(sectionIds[i]);
    if (el) {
      const top = el.getBoundingClientRect().top + scrollY;
      const dist = Math.abs(scrollY - top);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = i;
      }
    }
  }
  return closestIdx;
}





function scrollToSection(idx) {
  const el = document.getElementById(sectionIds[idx]);
  if (el) {
    const headerOffset = 72; 
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}




function scrollToNextSection() {
  const idx = getCurrentSectionIndex();
  if (idx < sectionIds.length - 1) {
    scrollToSection(idx + 1);
  }
}




function scrollToPrevSection() {
  const idx = getCurrentSectionIndex();
  if (idx > 0) {
    scrollToSection(idx - 1);
  } else {
    scrollToSection(0); 
  }
}




const handleScroll = () => {
  
  showScrollTop.value = true;
};



onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style>

:root {
  
  --bg-primary: #f0f2f5;
  --bg-secondary: #ffffff;
  --bg-tertiary: #e4e7eb;
  --text-primary: #1a1a1a;
  --text-secondary: #4a5568;
  --text-tertiary: #718096;
  --border-color: #d1d5db;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);
  --accent-primary: #4A90E2;
  --accent-hover: #357ABD;
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-card: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
}


html.dark-mode {
  --bg-primary: #0f1419;
  --bg-secondary: #1a1f2e;
  --bg-tertiary: #252b3b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --border-color: #2d3748;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.7);
  --accent-primary: #60a5fa;
  --accent-hover: #3b82f6;
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-card: linear-gradient(135deg, #1a1f2e 0%, #252b3b 100%);
}


*,
*::before,
*::after {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}


html {
  background-color: var(--bg-primary);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-secondary);
}
</style>

<style scoped>
#wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}


.skip-link {
  position: absolute;
  top: -60px;
  left: 1rem;
  background: linear-gradient(90deg, #4A90E2 0%, #357ABD 100%);
  color: #ffffff;
  padding: 0.5rem 0.9rem;
  text-decoration: none;
  z-index: 200;
  border-radius: 0.5rem;
  box-shadow: 0 6px 18px rgba(74, 144, 226, 0.18);
  font-weight: 600;
  transition: top 180ms ease, transform 180ms ease, opacity 180ms ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}


.skip-link:focus {
  top: 1rem;
  outline: none;
}

.skip-text {
  font-size: 0.95rem;
  line-height: 1;
}


#main-content {
  margin-left: 300px;
  padding: 2.5rem 3.5rem;
  max-width: calc(100vw - 300px);
  width: 100%;
  position: relative;
  z-index: 1;
  flex: 1;
}

@media (min-width: 1440px) {
  #main-content {
    margin-left: 320px;
    max-width: calc(100vw - 320px);
    padding: 3rem 4rem;
  }
}

@media (min-width: 1920px) {
  #main-content {
    margin-left: 340px;
    max-width: calc(100vw - 340px);
    padding: 3.5rem 5rem;
  }
}


@media (max-width: 1280px) {
  #main-content {
    margin-left: 0;
    max-width: 100%;
    padding: 1.5rem;
    padding-top: 160px; 
  }
}

@media (max-width: 768px) {
  #main-content {
    padding: 1rem;
    padding-top: 180px; 
  }
}

@media (max-width: 480px) {
  #main-content {
    padding: 1rem;
    padding-top: 200px; 
  }
}


.scroll-to-top {
  position: fixed !important;
  bottom: 30px !important;
  right: 30px !important;
  width: 50px !important;
  height: 50px !important;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%) !important;
  color: white !important;
  border: none !important;
  border-radius: 12px !important;
  cursor: pointer !important;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  z-index: 99999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  pointer-events: auto !important;
  opacity: 0.95 !important;
  animation: slideIn 0.3s ease-out forwards;
}

.scroll-buttons {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 99999;
  display: flex;
  gap: 0.75rem;
}

.scroll-btn {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.95;
  padding: 0;
  pointer-events: auto;
  backdrop-filter: blur(10px);
}

.scroll-btn:hover {
  background: linear-gradient(135deg, #357ABD 0%, #2868a8 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(74, 144, 226, 0.6);
  opacity: 1;
}

.scroll-btn:active {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 0.95;
    transform: translateY(0) scale(1);
  }
}

.scroll-to-top svg {
  width: 24px;
  height: 24px;
  stroke-width: 2.5;
  transition: transform 0.3s ease;
}

.scroll-to-top:hover {
  background: linear-gradient(135deg, #357ABD 0%, #2868a8 100%) !important;
  transform: translateY(-5px) !important;
  box-shadow: 0 8px 25px rgba(74, 144, 226, 0.6) !important;
  opacity: 1 !important;
}

.scroll-to-top:hover svg {
  transform: translateY(-3px);
}

.scroll-to-top:active {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4) !important;
}

.scroll-to-top:hover {
  background: #357ABD;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.scroll-to-top:focus-visible {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
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


@media (max-width: 768px) {
  .scroll-to-top {
    bottom: 20px !important;
    right: 20px !important;
    width: 45px !important;
    height: 45px !important;
  }

  .scroll-to-top svg {
    width: 20px;
    height: 20px;
  }
}


@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>

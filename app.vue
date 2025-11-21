
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>




</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  
  --primary-color: #4A90E2;
  --secondary-color: #357ABD;
  --text-color: #1f1f1f;
  --text-light: #666666;
  --background: #ffffff;
  --background-alt: #f5f7fa;
  --error-color: #E53E3E;
  --success-color: #38A169;
  
  
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  
  
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  color: var(--text-color);
  background: var(--background);
  overflow-x: hidden;
  overflow-y: auto;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}


*:focus-visible {
  outline: 3px solid var(--primary-color);
  outline-offset: 2px;
}


::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--background-alt);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-color);
}


.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-sm);
}

.text-center {
  text-align: center;
}

.mt-1 { margin-top: var(--spacing-xs); }
.mt-2 { margin-top: var(--spacing-sm); }
.mt-3 { margin-top: var(--spacing-md); }
.mt-4 { margin-top: var(--spacing-lg); }

.mb-1 { margin-bottom: var(--spacing-xs); }
.mb-2 { margin-bottom: var(--spacing-sm); }
.mb-3 { margin-bottom: var(--spacing-md); }
.mb-4 { margin-bottom: var(--spacing-lg); }
</style>


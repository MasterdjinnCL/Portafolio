import { defineNuxtConfig } from 'nuxt/config';
import { readFileSync } from 'node:fs';


const isGithubPages = process.env.DEPLOY_TARGET === 'GH_PAGES' || process.env.GITHUB_PAGES === 'true';
const repositoryName = 'Portafolio';
const baseURL = process.env.NUXT_APP_BASE_URL || (isGithubPages ? `/${repositoryName}/` : '/');

let projectRoutes: string[] = [];
try {
  const projectsData = JSON.parse(
    readFileSync(new URL('./public/data/projects.json', import.meta.url), 'utf-8')
  );
  projectRoutes = Array.isArray(projectsData)
    ? projectsData.map((project: { id: string | number }) => `/projects/${project.id}`)
    : [];
} catch (error) {
  console.warn('[nuxt.config] No se pudieron leer las rutas de projects.json', error);
}


export default defineNuxtConfig({
  devtools: { enabled: true },
  
  
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  
  
  css: [
    '~/assets/css/tailwind.css'
  ],
  
  
  
  devServer: {
    host: '127.0.0.1',
    port: 3002
  },
  
  
  
  vite: {
    server: {
      hmr: {
        port: 24679
      }
    }
  },
  
  
  app: {
    baseURL,
    buildAssetsDir: 'assets',
    head: {
      title: 'Juan Pablo Berrios - Portafolio Frontend Trainee',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Portafolio personal de desarrollador Frontend Trainee especializado en Vue.js, Nuxt 3 y diseño responsivo. Proyectos y experiencia en desarrollo web moderno.' 
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#4A90E2' },
        
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Portafolio Frontend Trainee' },
        { property: 'og:description', content: 'Desarrollador Frontend especializado en Vue.js y Nuxt 3' },
        
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || `${baseURL}data`,
      contactEndpoint: 'https://formspree.io/f/tu-form-id',
      cvUrl: '#'
    }
  },
  
  
  experimental: {
    payloadExtraction: false
  },
  
  
  routeRules: {
    '/**': { prerender: true }
  },

  nitro: {
    
    compatibilityDate: '2025-11-09',
    preset: isGithubPages ? 'github-pages' : 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects', ...projectRoutes]
    }
  }
})

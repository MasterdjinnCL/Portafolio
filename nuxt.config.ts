import { defineNuxtConfig } from 'nuxt/config';


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
      apiBase: process.env.API_BASE_URL || '/data',
      contactEndpoint: 'https://formspree.io/f/tu-form-id',
      cvUrl: '#'
    }
  },
  
  
  experimental: {
    payloadExtraction: false
  },
  
  
  nitro: {
    
    compatibilityDate: '2025-11-09',
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects']
    }
  }
})





import { ref, onMounted, watch } from 'vue';

export const useTheme = () => {
  const isDark = ref(false);
  const THEME_KEY = 'portfolio-theme';

  


  const initTheme = () => {
    if (typeof window === 'undefined') return;

    
    const savedTheme = localStorage.getItem(THEME_KEY);
    
    if (savedTheme) {
      isDark.value = savedTheme === 'dark';
    } else {
      
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    applyTheme();
  };

  


  const applyTheme = () => {
    if (typeof document === 'undefined') return;
    
    if (isDark.value) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  };

  


  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light');
    applyTheme();
  };

  


  const setTheme = (dark) => {
    isDark.value = dark;
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    applyTheme();
  };

  
  onMounted(() => {
    initTheme();

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        
        if (!localStorage.getItem(THEME_KEY)) {
          isDark.value = e.matches;
          applyTheme();
        }
      };

      
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
      }
    }
  });

  return {
    isDark,
    toggleTheme,
    setTheme
  };
};

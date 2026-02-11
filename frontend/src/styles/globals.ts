// src/styles/globals.ts
import { css } from '@linaria/core';

export const globals = css`
  :global() {
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    /* Reset completo */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
    
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #1a1a2e;
      overflow-x: hidden;
    }
    
    #root {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100vh;
    }
    
    h1, h2, h3, h4, h5, h6, p {
      margin: 0;
      padding: 0;
    }
  }
`;

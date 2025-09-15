import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './header/header.jsx'
import Main from './cont_app/app.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <div className='body'>
        <Header/>
        <Main/>
      </div>
    </StrictMode>,
)

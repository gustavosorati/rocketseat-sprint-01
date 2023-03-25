import { Router } from './routes'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyles from './styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/theme'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Router />
          <ToastContainer />
        </BrowserRouter>

        <GlobalStyles />
      </ThemeProvider>
    </>
  )
}

export default App

import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

//Configuracao padrão para todos os componentes + reset css
const GlobalStyle = createGlobalStyle`
  /*Reset css*/  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /*Config geral*/
  body {
    font-family: sans-serif;
    background-color: #D9E6F6;
  }
  /*Config nextjs*/
  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  /*Config img*/
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

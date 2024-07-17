import { ChakraProvider } from "@chakra-ui/react"
import HeaderComponent from "./components/HeaderComponent"
import ContentComponent from "./components/ContentComponent"
import theme from './util/theme';

function App() {

  return (
    <>
      <ChakraProvider theme={theme}>
        <HeaderComponent></HeaderComponent>
        <ContentComponent></ContentComponent>
      </ChakraProvider>
    </>
  )
}

export default App

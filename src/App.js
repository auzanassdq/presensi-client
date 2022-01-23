import { ChakraProvider, Container, theme } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Routing from './components/Routing';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl">
        <Navbar />
        <Routing />
      </Container>
    </ChakraProvider>
  );
}

export default App;

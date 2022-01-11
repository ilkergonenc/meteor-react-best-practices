import React from 'react';

import { 
  Center, 
  Container 
} from '@chakra-ui/react';

export const LayoutProvider = (props) => (
  <Container>
    <header>
      <nav>
        {props.nav}
      </nav>
    </header>
    <main>
      {props.routes}
    </main>
    <footer>
      <Center py={4}>B2A © 2022</Center>
    </footer>
  </Container>
);
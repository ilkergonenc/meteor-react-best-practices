import React from 'react';
import { extendTheme, ChakraProvider, CSSReset } from '@chakra-ui/react';

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

import { Application } from '/imports/ui/Application';

export const ThemeApp = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Application />
  </ChakraProvider>
);
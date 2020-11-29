import React from "react";

import { ChakraProvider, CSSReset } from "@chakra-ui/react";

export const WebThemeProvider: React.FC = ({ children }) => (
  <ChakraProvider>
    <CSSReset />

    {children}
  </ChakraProvider>
);

export default WebThemeProvider;

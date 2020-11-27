import React from 'react';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';

export const WebThemeProvider: React.FC = ({ children }) => (
    <ThemeProvider>
        <CSSReset />

        {children}
    </ThemeProvider>
);

export default WebThemeProvider;

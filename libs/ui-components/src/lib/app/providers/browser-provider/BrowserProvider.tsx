import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

export const BrowserProvider: React.FC = ({ children }) => (
    <BrowserRouter>
        <HelmetProvider>{children}</HelmetProvider>
    </BrowserRouter>
);

export default BrowserProvider;

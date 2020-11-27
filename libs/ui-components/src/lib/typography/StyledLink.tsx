import React from 'react';
import { Link as ChakLink } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

interface LinkProps {
  to: string;
}
export const StyledLink: React.FC<LinkProps> = ({ children, to }) => {
  return (
    <ChakLink color={'blue.500'} as={'span'}>
      <Link to={to} component={ChakLink}>
        {children}
      </Link>
    </ChakLink>
  );
};

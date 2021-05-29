import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const RouterIcon = (icon: IconDefinition) => () => (
  <FontAwesomeIcon size="lg" icon={icon} />
);

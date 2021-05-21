/**
 * Importing Node Modules
 */
import React from 'react';

export interface LoadingBarProps {
  show: boolean;
}

export const LoadingBar: React.FC<LoadingBarProps> = (props) => {
  const { show } = props;
  if (!show) return null;
  return <p>Loading Bar</p>;

  /* <LinearProgress
                        className={classes.blurOverly}
                        color="secondary"
                    />
                    <LinearProgress
                        className={classes.progressBar}
                        color="secondary"
                    /> */
};

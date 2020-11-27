/**
 * Importing Node Modules
 */
import React from 'react';

export interface LoadingBarProps {
  show: boolean;
}

export const LoadingBar: React.FC<LoadingBarProps> = (props) => {
  const { show } = props;
  return (
    <>
      {show && (
        <>
          <p>Loading Bar</p>
          {/* <LinearProgress
                        className={classes.blurOverly}
                        color="secondary"
                    />
                    <LinearProgress
                        className={classes.progressBar}
                        color="secondary"
                    /> */}
        </>
      )}
    </>
  );
};

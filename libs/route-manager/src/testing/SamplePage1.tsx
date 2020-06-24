import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';

const SamplePage1 = () => {
  return (
    <>
      <Helmet>
        <title>Sample Page 1</title>
        <meta name="description" content={`Sample Page 1`} />
      </Helmet>
      <p>Sample Page 1</p>
    </>
  );
};

export default SamplePage1;
//

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SamplePage2 = () => {
    return (
        <>
            <Helmet>
                <title>Sample Page 2</title>
                <meta name="description" content={`Sample Page 2`} />
            </Helmet>
            <p>Sample Page 2</p>
        </>
    );
};

export default SamplePage2;

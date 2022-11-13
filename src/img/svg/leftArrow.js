import React from 'react';

const LeftArrow = (...props) => {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                data-name="arrow-left-Filled"
                d="M22 12a1 1 0 0 1-1 1H5.414l5.293 5.293a1 1 0 1 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 1 1 1.414 1.414L5.414 11H21a1 1 0 0 1 1 1Z"
                style={{
                    fill: "#000000",
                }}
            />
        </svg>
    );
};

export default LeftArrow;
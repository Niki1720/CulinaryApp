import React from 'react';

const DeleteIcon = ({ onClick }) => {
    return (
        <img
            src="/delete-outline.svg"
            alt="Delete Icon"
            style={{
                maxWidth: '28px',
                maxHeight: '28px',
                verticalAlign: 'middle',
                marginRight: '8px',
                cursor: 'pointer',
            }}
            onClick={onClick}
        />
    );
};

export default DeleteIcon;

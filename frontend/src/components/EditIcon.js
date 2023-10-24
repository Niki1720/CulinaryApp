import React from 'react';

const EditIcon = ({ onClick }) => {
    return (
        <img
            src="/fa-regular_edit.svg"
            alt="Edit Icon"
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

export default EditIcon;

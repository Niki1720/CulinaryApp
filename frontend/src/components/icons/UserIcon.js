import React from 'react';

const UserIcon = ({ onClick }) => {
    return (
        <img
            src="/users.svg"
            alt="User Icon"
            style={{
                maxWidth: '28px',
                maxHeight: '28px',
                marginRight: '8px',
                cursor: 'pointer',
            }}
            onClick={onClick}
        />
    );
};

export default UserIcon;

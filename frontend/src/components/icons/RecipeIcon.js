import React from 'react';

const RecipeIcon = () => {
    return (
        <img
            src="/recipe_icon.svg"
            alt="Recipe Icon"
            style={{
                maxWidth: '28px',
                maxHeight: '28px',
                marginRight: '8px',
                cursor: 'pointer',

            }}
        />
    );
};

export default RecipeIcon;

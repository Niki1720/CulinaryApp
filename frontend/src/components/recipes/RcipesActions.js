import axios from 'axios';

export const loadRecipes = (callback) => {
    const config = {
        url: '/recipes',
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

export const getRecipe = (id, callback) => {
    const config = {
        url: `/recipes/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

export const saveRecipe = (data, callback) => {
    const url = data.id ? `/recipes/${data.id}` : '/recipes';
    const method = data.id ? 'PUT' : 'POST';

    const config = {
        url,
        method,
        data: {
            recipe: data
        },
    };

    axios.request(config).then(response => callback(response.data));
};

export const deleteRecipe = (id, callback) => {
    const config = {
        method: 'delete',
        url: `/recipes/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

export const loadRecipeTypes = (callback) => {
    const config = {
        url: '/recipe_types',
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

export const loadIngredients = (callback) => {
    const config = {
        url: '/ingredients',
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

export const loadTags = (callback) => {
    const config = {
        url: '/tags',
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

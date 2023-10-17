import axios from 'axios';

export const loadRecipeTypes = (callback) => {
    const config = {
        url: '/recipe_types',
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

export const getRecipeType = (id, callback) => {
    const config = {
        url: `/recipe_types/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

export const saveRecipeType = (data, callback) =>  {
    const config = {
        url: data.id ? `/recipe_types/${data.id}` : '/recipe_types',
        method: data.id ? 'PUT' : 'POST',
        data: {
            recipe_type: data
        },
    };
    axios.request(config).then(
      response => callback(response.data)
    );
};

export const deleteRecipeType = (id, callback) => {
    const config = {
        method: 'delete',
        url: `/recipe_types/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

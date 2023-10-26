import axios from "axios";

export const login = (data, callback) => {
    const config = {
        url: '/users/sign_in',
        method: 'POST',
        data: {
            user: data
        },
    }
    axios.request(config)
        .then(response => {
            callback(response.data, response.headers.authorization, null);
            window.location.reload();
        }).catch(error => {
        callback(null, null, error
        );
    });

}

export const logout = () => {
    localStorage.removeItem('token');

    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/login';
}

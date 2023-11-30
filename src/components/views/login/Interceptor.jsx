const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    if (token) {
        if (!options.headers) {
            options.headers = {};
        }
        options.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export default fetchWithToken;
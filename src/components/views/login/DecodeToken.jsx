const decodeToken = (token) => {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        throw new Error('Token inválido');
    }

    const payloadBase64 = tokenParts[1];
    const decodedPayload = atob(payloadBase64);

    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload;
};

export default decodeToken;
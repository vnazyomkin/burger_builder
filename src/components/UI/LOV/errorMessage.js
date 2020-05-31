const errorMessage = {
    INVALID_PASSWORD: "Неверный пароль",
    INVALID_EMAIL: "Неверный email",
    EMAIL_EXISTS: "Email уже зарегистрирован",
    EMAIL_NOT_FOUND: "Не найден email",
};

const getErrorMessage = (error) => {
    if (errorMessage[error]) return errorMessage[error];
    return error;
};

export default getErrorMessage;
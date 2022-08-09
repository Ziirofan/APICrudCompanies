export const ExceptionNotFound = (message: string) => {
    return {
        status: 404,
        message
    }
}

export const ExceptionRequestError = (message: string) => {
    return {
        status: 400,
        message
    }
}

export const ExceptionServerError = (message: string) => {
    return {
        status: 500,
        message
    }
}
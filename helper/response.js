module.exports = {
    ok: (values, res, message = "Request was successfully processed and returned") => {
        let status_code = 200;
        return res.status(status_code).send({ code:"2000", message, ...values})
    },
    created: (values, res, message = "Request was successfully processed and returned") => {
        let status_code = 201;
        return res.status(status_code).send({ code:"2010", message, ...values})
    },
    bad: (values, res, message = "Missing or invalid parameter(s)") => {
        let status_code = 400;
        return res.status(status_code).send({ code:"4000", message, ...values})
    },
    unauthorized: (values, res, message = "Unauthorized") => {
        let status_code = 401;
        return res.status(status_code).send({ code:"4010", message, ...values})
    },
    accessDenied: (values, res, message = "Access Forbidden") => {
        let status_code = 403;
        return res.status(status_code).send({ code:"4030", message, ...values})
    },
    notFoundRecord: (values, res, message = "Ops... Not Found") => {
        let status_code = 404;
        return res.status(status_code).send({ code:"4040", message, ...values})
    },
    notFound: (values, res, message = "Ops... Not Found") => {
        let status_code = 404;
        return res.status(status_code).send({ code:"4041", message, ...values})
    },
    timeout: (values, res, message = "Ops... Request Timeout") => {
        let status_code = 408;
        return res.status(status_code).send({ code:"4080", message, ...values})
    },
    duplicated: (values, res, message = "Ops... Duplicated data") => {
        let status_code = 409;
        return res.status(status_code).send({ code:"", message, ...values})
    },
    entityLarge: (values, res, message = "Request Entity Too Large") => {
        let status_code = 413;
        return res.status(status_code).send({ code:"4130", message, ...values})
    },
    error: (values, res, message = "Ops... Internal server error, please contact support") => {
        let status_code = 500;
        return res.status(status_code).send({ code:"5000", message, ...values})
    },
    errorCognito: (values, res, message = "Ops... Internal server error, please contact support") => {
        let status_code = 422;
        return res.status(status_code).send({ code:"4220", message, ...values})
    }
}
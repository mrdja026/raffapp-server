export const HTTP_UNAUTHORIZED = 401;
export const HTTP_OK = 401;
export const HTTP_SERVER_ERROR  = 500;
export const HTTP_RA_EXCEPTION = 420;

export const checkAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        let error = new Error('Auth failed');
        error.status = HTTP_UNAUTHORIZED;
        return next(error);
    }
}

export const responseHeader = (req, res, next) => {
    res.setHeader('MyAppTestHeader' , 'Test/Value')
    res.setHeader('Content-Type', 'application/json');
    next();
}
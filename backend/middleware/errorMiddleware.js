// Middleware is function that execute during the request response circle!!

const errorHandler = (err, req, res, next) => {
    const  statusCode = res.statusCode ? res.statusCode : 500 // This a ternary: a compact way of writing 'if-else' statem...

    res.status(statusCode)

    res.json({
        message: err.message, 
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // This give us any addition information
    })
}


module.exports = {
    errorHandler,
}
const jwt = require('jsonwebtoken');

const secretForJWT = 'SwuyyZ2wOOS27b4mwpJXTQBkFCFRAathMbV7qm9YyZQHAmGpesy/rZj0ByxWN58wyWhjkIPjuPbcN6YmPrDi1iDxab3lsmkjs/v8zG+q3IhU6dy5A+mSzY0PsB5Qd5cTRhViqh/LHMNNvPZ25zKV+3/nWZa22SEYwtuMmN0xgQ2ekwef5reNeLlCQN01gfrU+3qR3sMY1ITwSJRlucgAEBKzpTq4pI9l7II6TQWrvF0rnk73SOt4dvqvzvS5eGb2CUUEDa1WlAjDXdrDqiRQdZ1W7i1TWR7BctpF11lPsohRtLqKU211lE7zYSqnJ9Po8Epua4poZ5//cI1jlXSG2Q==';

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, secretForJWT);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};
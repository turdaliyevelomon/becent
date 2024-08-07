const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'your-secret-key'); // Secret keyni o'zgartiring

        const user = await User.findOne({ where: { id: decoded.id, 'tokens.token': token } });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Autentifikatsiyadan otish kerak' });
    }
};

module.exports = authenticateUser;

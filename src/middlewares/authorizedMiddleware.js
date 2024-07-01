const Role = require('../models/Role');
const User = require('../models/User');

const authorizedMiddleware = (...roles) => {
    return async (req, res, next) => {
        try {
            const { id } = req.user;
            const user = await User.findByPk(id, {
                include: {
                    model: Role,
                    attributes: ['name']
                }
            });

            if (!user || !user.Role || !roles.includes(user.Role.name)) {
                return res.status(403).json({
                    status: 'false',
                    message: 'Forbidden'
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                status: 'false',
                message: 'Internal Server Error'
            });
        }
    };
};

module.exports = authorizedMiddleware;

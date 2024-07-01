const { DB_MODELS } = require("../constants/models.constant");

const authenticateToken = async (req, res, next) => {    

    try {
        next();

    } catch (error) {
        return res.sendStatus(403);
    }
}

module.exports = {
    authenticateToken,
};
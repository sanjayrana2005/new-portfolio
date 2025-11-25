const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");
require("dotenv").config();

const authUser = async (req, res, next) => {
    try {
        const { portfolioToken } = req.cookies;
        if (!portfolioToken) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decode = jwt.verify(portfolioToken, process.env.JWT_TOKEN_SECRET);
        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const { id } = decode;

        const user = await userModel.findById({ _id: id });
        req.user = user;

        next();
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = authUser;
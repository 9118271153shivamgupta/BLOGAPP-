const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const USER_SCHEMA = require("../models/users.model")

exports.authenticate = async (req, res, next) => {
    // console.log(req)
    console.log(req.cookies);
    // console.log(req.cookies.myCookies);
    // console.log()


    let token = req?.cookies?.myCookies;

    if (!token) {
        res.status(400).json({ success: false, massage: "please login to access this resourse" })
    }
    next()
    let decoded = jwt.verify(token, JWT_SECRET);
    // 
    let user = await USER_SCHEMA.findById(decoded.id);
    console.log(user)
    req.myUser = user
    console.log(decoded)
    next()


}


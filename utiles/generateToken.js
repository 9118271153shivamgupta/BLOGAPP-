const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "1d"
    })
}
module.exports = { generateToken }
//! to generate token we use sign() , the first parameter inside sign()


//! JWT==> JWT (JSON Web Token) is an open standard (RFC 7519) used to securely transmit information between two parties — typically a client and a server — as a JSON object. The token is signed using a cryptographic algorithm (e.g., HMAC SHA256 or RSA) to ensure that the information cannot be tampered with.

// ?  JWT is commonly used for authentication and authorization in web applications.
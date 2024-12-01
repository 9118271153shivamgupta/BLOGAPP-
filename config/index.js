 require("dotenv").config()

// ! == dotenv Module==> this modules helps us to read the contents of .env file
//  ! config ==> it will parse the data.

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URL : process.env.MONGODB_URL,
    JWT_SECRET : process.env.JWT_SECRET
}

const express = require("express");
const { PORT } = require("./config");
const { connectDB } = require("./config/database")
const blogRouter = require("./routers/blogs.router")
const userRouter = require("./routers/users.router");
const cookieParser = require("cookie-parser");

connectDB()

const app = express();

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/blogs", blogRouter)

app.use("/users", userRouter)



app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("server is running on PORT:", PORT)
})
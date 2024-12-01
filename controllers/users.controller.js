const USER_SCHEMA = require("../models/users.model");
const { generateToken } = require("../utiles/generateToken");



exports.addUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        let existingUser = await USER_SCHEMA.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ success: false, massage: "already exist user", })
        }
        let newUser = await USER_SCHEMA.create({ username, email, password });


        res.status(200).json({ success: true, massage: "user added sussfully", newUser })

    } catch (error) {
        console.log("error while creating a user");

        res.status(500).json({ success: true, massage: "error" })
    }
}

exports.fetchAllUser = async (req, res) => {
    try {let allUser = await USER_SCHEMA.find()
        res.status(200).json({success:true, massage:"fetch all users data", data:allUser} )
        
    } catch (error) {
        console.log("Error while fetching All user data")
        res.status(500).json({
            success: false, massage:"Error"
        })
        
    }
 }

exports.fetchOneUser = async (req, res) => {
    try {
        let {id} = req.params;
    console.log(id);
    let user = await USER_SCHEMA.findOne({_id: id});
    if (!user) 
        return res.json({massage:"id is not present in our data base"})
        
    res.status(200).json({success:true, massage:" fetch One User Data",user})
        
    } catch (error) {
        console.log(" eror while fetching one user data ");
        res.status(500).json({success:false, massage:"error" })
        
    }
 }

exports.updateUser = async (req, res) => { 
   try {
    let {id} = req.params;
    let findOneUser = await USER_SCHEMA.findOne({_id: id});
    if (!findOneUser) {
        return res.status(404),json({success:false, massage:"user not exist"})
        }
        // ! 1 way  updating data
        // await USER_SCHEMA.updateOne(
        //     {_id: id},
        //     {
        //     $set: {title:req.body.title,
        //     email:req.body.email,
        //     password:req.body.password}
        // }
    // )

    // ! 2 way updating data
    findOneUser.username =req?.body?.username || findOneUser.username
    findOneUser.email =req?.body?.email || findOneUser.email
    findOneUser.password =req?.body?.password || findOneUser.password
    
    await findUser.save();
    
     
    res.status(200).json({success:true , massage:"update user data", data: findOneUser})
    
   } catch (error) {
    console.log("error while Update ")
    res.status(500).json({success:false, massage:error})
    
   }
}


exports.deleteUser = async (req, res) => { 
    try { let {id} = req.params;
    let user = await USER_SCHEMA.findOne({_id: id});
    if (!user) 
        return res.status(404),json({success:false, massage:"user not exist", data:user})
        
     
    res.status(200).json({success:true , massage:"Delete user Successfully"})
        
    } catch (error) {
        console.log("This  user_id  is not present in our database")
        res.status(500).json({success:false, massage: "error"})
        
    }
}


exports.login = async (req,res)=>{
    let{email, password} = req.body;
    let findUser = await USER_SCHEMA.findOne({email});
    if (!findUser)return res.status(401).json({success:false, massage:"please register first"})

    let isMatched = await findUser.verifyPassword(password);
    console.log(isMatched)
    if (!isMatched) return res.status(401).json({massage:"wrong Password"});

    let token = generateToken(findUser._id);
    console.log(token)
    
    res.cookie("myCookie", token, {
        maxAge : 1*60*60*1000, // value gin=ve in mili second
        httpOnly:true,// it can not modify by the browser
    })
    

    res.status(200).json({success:true, massage:"user Logged in",token:token})
}

exports.logout = async (req,res)=>{
    res.clearCookie("myCookie", " ",{
        maxAge:0,
    });

    res.status(200).json({success:true, massage:"user logged out"})
}
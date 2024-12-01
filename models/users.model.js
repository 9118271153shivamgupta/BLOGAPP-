const mongoose =require("mongoose");
const bcrypt =require("bcrypt");

const userSchema =new mongoose.Schema(
    {
        username:{
            type:String,
            require: true,
        },
        email:{
            type:String,
            require: true,
            unique: true, //? this will make sure that no duplicates email are store.
        },
        password:{
            type:String,
            require: true,
        }
    },
    {timestamps:true}
);
// ! time stamp true will add two extra fields.
    // 1)createdAT => store the time at which document was crreated
    // 1)modiftedAT => store the time at which document was modified.
// ! this will excute before any saving 
userSchema.pre("save" , async function(){
let randomString = await bcrypt.genSalt(10);
// genSalt(n)=>this method will generate a random string with n number after many number of itterations
let hashedPassword = await bcrypt.hash(this.password,randomString);
//? hash()==> will take input password and random string as input and generate a hashed password.
this.password =hashedPassword;
//?  then we assessing the hashed password to uout password field
})

userSchema.methods.verifyPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);

};
module.exports =mongoose.model("Users", userSchema)
const mongoose =require("mongoose");
// ? here we are creating a Schema / structure for the input data
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        trim:true,
        // unique:true,

    },
    discription:{
        type:String,
        require:true,

        trim:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"Users"
    }
})

// ? after that 
module.exports = mongoose.model("Blog", blogSchema) //blogs ==> it will convert  name into lowercase and plural
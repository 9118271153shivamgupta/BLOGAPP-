const BLOG_SCHEMA = require("../models/blogs.model");

//?  importing the collection from the models folder to perforem CRUD operation
exports.addBlog = async (req, res) => {
    try {
        let { title, discription } = req.body;

        let newBlog = await BLOG_SCHEMA.create({
            title,
            discription,
            createdBy: req.myUser._id,
          });
        // if (newBlog.length === 0) {
        //     res.json({ massage: " no data " })
        // }

        // res.send("data submitted");
        res.status(201).json({ success: true, massage: "data added  successfully", newBlog })

    } catch (error) {
        console.log("error while adding a blog");
        res.json({ success: false, massage: error });
    }


};

exports.fetchOneBlog = async (req, res) => {
    try {
        console.log(req.params);
        let { id } = req.params;
        console.log(id);
        let blog = await BLOG_SCHEMA.findOne({ _id: id });
        if (!blog) {
            res.json({ massage: "no data presend" })
        }
        res.status(201).json({ success: true, massage: "data fetched", data: blog });


    } catch (error) {
        console.log("error get while fetchinf oneBlog")
        res.json({ success: false, message: error });
    }
    
};

exports.fetchAllBlog = async (req, res) => {
    try {
        let allBlog = await BLOG_SCHEMA.find();

        res.status(201).json({ success: true, message: "all Blog fetched", data: allBlog })
    } catch (error) {
        console.log("error while fetching all Blog")

        res.status(500).json({ success: false, massage: error });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        console.log(req.params);
        let { id } = req.params;
        console.log(id);
        let blog = await BLOG_SCHEMA.findOne({ _id: id });
        if (!blog) {
            res.status(400).json({ success: false, massage: "no data presend" })
        }
        await BLOG_SCHEMA.deleteOne({ _id: id })
        res.status(201).json({ success: true, massage: "data deleted", data: blog });


    } catch (error) {
        console.log("error get while fetchinf oneBlog")
        res.status(500).json({ success: false, message: error });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        // console.log(req.params);
        let { id } = req.params;
        console.log(id);
        let findOneBlog = await BLOG_SCHEMA.findOne({ _id: id });
        console.log(findOneBlog)
        if (!findOneBlog) {
            return res.status(404).json({ success: false, massage: "no data present" })
        }
        // console.log("hi")
        await BLOG_SCHEMA.updateOne({ _id: id }, {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        })
        res.status(201).json({ success: true, massage: "data updated" });


    } catch (error) {
        console.log("error get while updating data oneBlog")
        console.log(error)
        res.status(500).json({ success: false, message: error });
    }

};
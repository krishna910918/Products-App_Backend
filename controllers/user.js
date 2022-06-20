const User = require('../models/user');

exports.getuserList = async(req,res) => {

    try {

        let users = await User.find();

        return res.status(200).json({users});

    } catch (error) {
        return res.status(500).json({message : "Something went wrong"})
    }
}

exports.userdetails = async(req, res) => {

    let {id} = req.params

    try {

        let user = await User.findById(id);

        if (! user) return res.status(401).json({message : "User not found"});

        return res.status(200).json({user})

    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }

}
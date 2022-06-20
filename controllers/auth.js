const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async(req,res) => {

    const {firstName,lastName,username,password} = req.body;

    try {

        let existingUser = await User.findOne({username});

        if( existingUser) return res.status(400).json({message : "User with this username alredy exists, please change the username"});

        let result = await User.create({firstName,lastName,username,password});

        return res.status(201).json({result,message:"Sign Up successful"})

    } catch (error) {

        return res.status(500).json({message : "Something went wrong"})
    }
}

exports.login = async(req,res) => {

    const {username,password} = req.body

    try {

        let existingUser = await User.findOne({username});

        if( ! existingUser) return res.status(404).json({message:"User not found"});

        let isPasswordCorrect = (existingUser.password === password);

        if (! isPasswordCorrect) return res.status(400).json({message:"User credentials not found"});

        const token = jwt.sign({id:existingUser._id, username},'test',{expiresIn:"1h"});

        return res.status(200).json({token});
        
    } catch (error) {

        return res.status(500).json({message:"Something went wrong"})
    }
}
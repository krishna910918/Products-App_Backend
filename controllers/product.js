const Product = require('../models/product');
const csv = require('csv-parser');
const fs = require('fs');
const csvtojson = require('csvtojson');


exports.getProducts = async(req,res) => {

    try {   

        let products = await Product.find();

        return res.status(200).json({products})

    } catch (error) {
        return res.status(500).json({message : "Something went wrong"})
    }
}


exports.uploadProducts = async(req,res) => {

    
    try {

        console.log(req.file.filename);
        csvtojson()
        .fromFile('./uploads/' + req.file.filename)
        .then(csvData => {
            
            for (let i = 0;i < csvData.length;i++ ){
                csvData[i]['createdBy'] = req.user.username;
                csvData[i]['createdById'] = req.user.id;
            }


            Product.insertMany(csvData).then( function () {
                return res.status(201).json({message : 'File uploaded successfully'})
            })
            .catch((error) => {
                console.log(error.message);
            })
        })

    } catch (error) {
        return res.status(500).json({message:"Something went wrong"});
    }
}
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const env = require('dotenv');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

const app = express();

env.config();

let url = 'mongodb://localhost:27017/Products';

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',authRoutes);
app.use('/',userRoutes);
app.use('/',productRoutes);


mongoose.connect(url,{useNewUrlParser : true, useUnifiedTopology : true})
.then( () => {
    console.log('Database connected ...')
})
.catch((error) => {
    console.log(error.message)
});

app.listen(process.env.PORT,() => {
    console.log(`Server is running on the port ${process.env.PORT}`)
})
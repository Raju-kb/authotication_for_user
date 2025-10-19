const express = require ('express');
const dotenv = require ('dotenv');
mongoose = require ('mongoose');
const vendorroutes = require ('./routes/vendorroutes'); 
const bodyparser = require('body-parser');

const app = express();

const port = 4000;
dotenv.config();
mongoose.connect(process.env.mongo_url).then(() =>{
    console.log('connected to mongodb database');
    app.use(bodyparser.json());
    app.use('/vendor', vendorroutes);
}).catch((err) =>{
    console.log('error connecting to database', err);
});

app.listen(port,() =>{
    console.log('server is running on port ' + port);

});
app.get('/home',(req,res) =>{
    res.send('welcome to home page');
});
const express = require('express')
const mongoose = require('mongoose')
const { findById, findByIdAndUpdate } = require('./model/productModel')
const Product = require('./model/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


//defining port number
const port = 3000

//nodemon is used to prevent site from loading it again and again
//add//    dev : nodemon server.js    //in pakage.json


//middleware so that app can understand json format
app.use(express.json());            //to use json format
app.use(express.urlencoded({extended:false}));     //to use form url encoded (another format like json )


//connecting to mongodb
mongoose.connect("mongodb+srv://shrijit:shrijit@cluster0.susyslh.mongodb.net/?retryWrites=true&w=majority")

.then(()=>{
    console.log("connected to mongodb")
}).catch((error)=>{
    console.log(error);
})





// route 
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.get('/hello', (req, res) => {
      res.send('Hello!')
    })
  
  app.get('/world', (req, res) => {
      res.send('world!')
    })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


  //route for saving data in the database (create operation)
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//getting all data from the server (read operation)

app.get('/getproduct', async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

//for getting a single data 

app.get('/product/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})


//updating data (update operation)

app.put('/product/:id',async(req,res)=>{                    //same URI used when fetching a single data
    try{
        const{id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            res.status(404).json({message:`connot find the product by id ${id}`});    
        }

        const updateProduct = await Product.findById(id);

        res.status(200).json(updateProduct);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})           

//to delete a product(delete operation)

app.delete('/deleteproduct/:id',async(req,res)=>{                           
    try{
        const {id}=req.params;
        const product = await Product.findByIdAndDelete(id); 
        if(!product){
            return res.status(404).json({message:"cannot find any product"});
        }
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
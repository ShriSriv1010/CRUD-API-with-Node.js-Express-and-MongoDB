const mongoose = require("mongoose");


//determing database object type (Schema)


const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter it"]
        },
        quantity:{
            type:Number,
            required:[true,"Please enter it"],
            default:0
        },
        price:{
            type:Number,
            required:[true,"Please enter it"],
            default:0
        },
        Image:{
            type:String,
            required:false
        }
    },
    {
        timestamps: true
    }
)

//creating model

const Product = mongoose.model("Product",productSchema);

module.exports = Product;

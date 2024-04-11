const mongoose = require("mongoose");
const hallSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    currentbookings:[],
    imageurls:[],
    maxcount:{type:Number , required:true},
    phonenumber:{type:Number, required:true},
    rentperday:{type:Number, required:true},
    type:{type:String, required:true}

})

const hallModel = mongoose.model('halls' , hallSchema)

module.exports = hallModel
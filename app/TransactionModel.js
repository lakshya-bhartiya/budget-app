const mongoose =  require("mongoose")
const transactionSchema = mongoose.Schema({
    amount:{
        type: Number,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    remark:{
        type: String,
        required: true,
    },
    userId:{
        type:String
      }
}, {timestamps: true})
module.exports = mongoose.model("transaction", transactionSchema)
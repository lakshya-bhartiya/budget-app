const mongoose = require("mongoose")
const TransitionSchema = mongoose.Schema({
    amount : {
        type : String,
        required : true
    },
    type: {
        type : String,
        required : true
    },
    remark : {
        type : String,
        required : true
    },
},{timestamps:true})
module.exports = mongoose.model("transition", TransitionSchema)



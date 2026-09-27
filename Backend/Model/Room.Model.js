const mongoose = require("mongoose")
const roomSchema = mongoose.Schema({
    player1:String,
    player2:String,
    rid:{type:Number,required:true},
    created:{type:Number,required:true}
},{
    versionKey:false
})


const RoomModel = mongoose.model("room",roomSchema)

module.exports={RoomModel}
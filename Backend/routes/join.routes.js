const express = require("express")


const { joinValidator } = require("../Middleware/join.middleware")
const { RoomModel } = require("../Model/Room.Model")

const joinRouter = express.Router()


joinRouter.patch("/:id",joinValidator,async(req,res)=>{
    const {id} = req.params
    const {key} = req.headers
    let newPlayer = {
        [key]:JSON.stringify(req.body)
    }
    console.log(newPlayer)
 try {
    await RoomModel.updateOne({rid:id},newPlayer)
    res.send({
        message:"Player joined",
        status:1,
        error:false
    })
 } catch (error) {

    res.send({
        message:"Failed: "+error.message,
        status:0,
        error:true
    })
    
 }
   

})

module.exports ={
    joinRouter
}
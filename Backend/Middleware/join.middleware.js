const { RoomModel } = require("../Model/Room.Model")


 async function joinValidator(req,res,next){

    let {id} = req.params
    try {
        let data = await RoomModel.find({rid:id})
        if(data.length>0){

            let {player1,player2,rid,created} = data[0]

            if(JSON.parse(player1).id==req.body.id||JSON.parse(player2).id==req.body.id){
                res.send({
                    message:"You are already in the room",
                    status:2,
                    error:true
                })
                return
            }

            if(JSON.parse(player2).id==null){
                req.body.score = 0
                req.body.rid = rid
                req.headers.key = "player2"
                next()


            }else{
                res.send({
                    message:"Room is full",
                    status:3,
                    error:true

                })
            }

        }else{
            res.send({
                message:"Room doesn't exist",
                status:4,
                error:true
            })
        }
    } catch (error) {

        res.send({
            message:"Something went wrong",
            status:0,
            error:true
        })
        
    }

}

module.exports ={
    joinValidator
}
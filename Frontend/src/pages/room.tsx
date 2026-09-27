import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import axios from "axios";
import { sync } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RoomsCard } from "../components/RoomsCard";
import { room } from "../components/RoomsCard/RoomsCard";
import { BASE_URL } from "../constants/config";
import { FILL_PARENT } from "../constants/constants";
import "./homepage.css";

export const Room = () => {


    const [rooms,setrooms]= useState([])
    const [loading,setLoading] =useState(false)
    const [refresh,setRefresh] = useState(false)

    const createRoom =async()=>{
        setLoading(true)
        const playerId = localStorage.getItem("userId")
        const rid =  Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("rid",String(rid))

        let roomObj ={
            p1:JSON.stringify({id:playerId,score:0,rid:rid}),
            p2:JSON.stringify({id:null,score:0,rid:rid}),
            rid:Number(rid),
            created:Date.now()
        } 




        try {
            let res = await axios({
                method:"post",
                url:BASE_URL+"/room",
                data:roomObj
            })

            if(res.data.status===1){
                setLoading(false)
                setRefresh((prev)=>!prev)

            }else{
                setLoading(false)
                alert(res.data.message)
                setRefresh((prev)=>!prev)

            }
        } catch (error) {
            setRefresh((prev)=>!prev)
            setLoading(false)
            console.log(error)
            
        }
        

    }


    useEffect(()=>{
        const getRooms =async()=>{

       try {
        let res = await axios({
            method:"get",
            url:BASE_URL+"/room"
        })

        if(res.data.status===1){
            setrooms(res.data.data)
        }else{
            console.log(res.data.message)
        }

       } catch (error) {

        console.log(error)
        
       }


        }

        getRooms()


    },[refresh])


    useEffect(()=>{
        setLoading(true)
        // console.log("yes")
    const deleteRoom =()=>{
        rooms?.forEach(async({created,rid})=>{
            console.log(Date.now()-created)
            if(Date.now()-Number(created)>300000){
                 await axios({
                    method:"delete",
                    url:BASE_URL+`/room/${rid}`
                })
                
            }
        })

        setLoading(false)
    }
    deleteRoom()


    },[rooms,refresh])



  return (
    <Box className="home">
      <img src="https://media2.giphy.com/media/dHuKqGHoq4Cef54Ggf/200w.webp?cid=ecf05e47bv81au4yotk5eqoxekxft8ek6srhzfrzunafnq99&rid=200w.webp&ct=g" />

      <div  className="homeButtons">
        <Flex justifyContent={"end"}>
      
            <Button isLoading={loading} className="button-85" onClick={createRoom}>Create Room</Button>
        </Flex>

        <VStack w={FILL_PARENT} bg={"yellow.600"} borderRadius={"21px"} border={"none"} >

            {rooms?.map((el:room)=>{

                if(Number(Date.now())-Number(el.created)<300000){
                    return <RoomsCard {...el} setRefresh={setRefresh} />
                }

            })}

        </VStack>
      

      </div>
    </Box>
  );
};

import { Badge, Box, Button, Card, CardBody, Text } from "@chakra-ui/react";
import { FILL_PARENT, GREEN, TRANSPARENT } from "../../constants/constants";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export interface room {
    rid: Number,
    p1: string,
    p2: string,
    p3: string,
    p4: string,
    created: Number,
    setRefresh: Function
}

export default function RoomsCard({ rid, p1, p2, created, setRefresh }: room) {

    let [timer, setTimer] = useState<Number>()
    let nav = useNavigate()


    useEffect(() => {

        setInterval(() => {

            setTimer(Date.now())

        }, 1000)


    }, [])

    console.log(timer)





    return <Card border={"1px solid white"} w={FILL_PARENT} bg={TRANSPARENT}>

        <CardBody>

            <Box w={FILL_PARENT}>

                <Badge>{"Room ID " + String(rid) + " | "}</Badge>
                <Badge colorScheme={"red"}>{"Time: " + String(300 - Math.floor((Number(timer) - Number(created)) / 1000)) + " sec left"}</Badge>
                <Text>Player 1: {JSON.parse(p1).id}</Text>
                <Text>Player 2: {JSON.parse(p2).id ? JSON.parse(p2).id : "Waiting"}</Text>


                <Button variant={"outline"} colorScheme={"pink"} display={JSON.parse(p1).id == localStorage.getItem("userId") ? "block" : "none"} onClick={() => {
                    sessionStorage.setItem("rid", String(rid))
                    nav("/play")

                }}>Enter Room</Button>

            </Box>


        </CardBody>
    </Card>
}
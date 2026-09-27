import { Box, Button, Input, useDisclosure } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { Game } from "../scripts/Game";
import "./homepage.css";
import "../styles/button.css";
import { Link, useNavigate } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { BLACK, GREEN, PINK, TRANSPARENT, WHITE, WHITESMOKE } from "../constants/constants";
import axios from "axios";
import { BASE_URL } from "../constants/config";

export default function Homepage({ }) {
  const id = localStorage.getItem("userId");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [roomId, setRoomId] = useState("")
  const nav = useNavigate()


  const handleClick = () => {
    onOpen()
  };


  return (
    <Box className="home">
      <img src="https://media2.giphy.com/media/dHuKqGHoq4Cef54Ggf/200w.webp?cid=ecf05e47bv81au4yotk5eqoxekxft8ek6srhzfrzunafnq99&rid=200w.webp&ct=g" />

      <div className="homeButtons">
        <p>Your Player ID: {id}</p>
        <div>
          <Link to="/room">
            <button className="button-85" onClick={() => handleClick()}>
              CREATE A ROOM
            </button>
          </Link>


          <>
            <button className="button-85" onClick={() => handleClick()}>
              JOIN A ROOM
            </button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent color={BLACK} bg={PINK}>
                <ModalHeader>Enter Room ID</ModalHeader>
                <ModalCloseButton />
                <ModalBody bg={TRANSPARENT}>
                  <Input border={"1px solid black"} color={BLACK} _placeholder={{ color: BLACK }} placeholder="Enter room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)}></Input>





                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={async () => {

                    try {
                      let res = await axios({
                        method: "patch",
                        data: { id: Number(localStorage.getItem("userId")) },
                        url: BASE_URL + "/join/" + roomId
                      })

                      let { status, message } = res.data

                      if (status == 1) {
                        sessionStorage.setItem("rid", roomId)
                        onClose()
                        nav("/play")

                      } else if (status == 2) {
                        sessionStorage.setItem("rid", roomId)
                        onClose()
                        nav("/play")
                      } else if (status == 3) {
                        alert("Room is full")
                      } else if (status == 4) {
                        alert(message)
                      } else {
                        alert("Something went wrong: " + message)
                      }

                    } catch (error) {

                      alert(error)


                    }



                  }}>Join Room</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>


        </div>
      </div>
    </Box>
  );
}

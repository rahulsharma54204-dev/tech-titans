import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
  ABSOLUTE,
  AUTO,
  BLACK,
  COLUMN,
  FILL_25PARENT,
  FILL_75PARENT,
  FILL_90PARENT,
  FILL_PARENT,
  GREEN,
  LARGE,
  MEDIUM,
  PINK,
  RED,
  START,
  TRANSPARENT,
  WHITE,
  YELLOW,
} from "../constants/constants";
import { Game } from "../scripts/Game";
import laser_cannon from "../assets/laser_cannon.mp3";
import blaster from "../assets/blaster.mp3";
import destroyed from "../assets/destroyed.mp3";
import { ChatBar } from "../components/ChatBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/config";
import "./room.css"
import Payment from "../components/Payment";

const obj = {};

export default function Playpage() {
  let nav = useNavigate();

  const [score, setScore] = useState(0);
  const [active, setActive] = useState(true);
  const [value, setValue] = useState("");
  const [chats, setChats] = useState([]);
  const socketRef = useRef(null);
  const [timer, setTimer] = useState(0);
  const [room, setRoom] = useState({});
  const [maker, setMaker] = useState("");
  const [leaderboard, setLeaderBoard] = useState(obj);
  const [player, setPlayer] = useState("");
  const [player2, setPlayer2] = useState("");
  const [p2Score, setP2Score] = useState(0)
  const [over, setOver] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const toast = useToast()


  useEffect(() => {

    if (localStorage.getItem("starttime") != null) {
      if (Number(Date.now()) - Number(localStorage.getItem("starttime")) > 20000) {
        localStorage.setItem("start", 0)
      }
    }

  }, [])

  useEffect(() => {
    socketRef.current = io.connect("wss://covid-blaster-game.onrender.com/");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useState(() => {
    if (localStorage.getItem("start") == null) {
      localStorage.setItem("start", 0);
    } else {
      if (localStorage.getItem("start") == 1) {
      } else {
      }
    }
  }, []);

  useEffect(() => {
    socketRef.current.on("receive_message", (data) => {
      if (data.value) {
        setChats((prev) => {
          console.log(data);
          if (prev) {
            return [...prev, data.value];
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("rid") == null) {
      nav("/room");
    }
    console.log(sessionStorage.getItem("rid"));
  }, []);


  useEffect(() => {
    socketRef.current.on(sessionStorage.getItem("rid"), (data) => {
      if (localStorage.getItem("start") == 1) {
        setP2Score(data.score)
      } else {
        setP2Score(0)
      }
      console.log(data)

    });
  }, []);



  useEffect(() => {
    socketRef.current.on(sessionStorage.getItem("rid") + "start", (data) => {

      localStorage.setItem("start", 1)
      localStorage.setItem("starttime", Date.now())
      window.location.reload()
      console.log("60 sec timer")
      console.log(data)

    });
  }, []);

  useEffect(() => {
    if (active) {
      try {
        let audio = new Audio();
        audio.src = blaster;
        audio.play();

      } catch (error) { }
    }
    if (localStorage.getItem("userId") == maker.id) {
      socketRef.current.emit("score", {
        rid: sessionStorage.getItem("rid"),
        score: score
      });

    } else {

      socketRef.current.emit("score1", {
        rid: sessionStorage.getItem("rid"),
        score: score
      });

    }

  }, [score]);

  useEffect(() => {
    if (player2.id != null) {
      toast({
        title: 'Player Joined',
        description: "You can start the match",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top"
      })
    }

  }, [room])

  useEffect(() => {
    if (chats?.length > 4) {
      setChats((prev) => prev.slice(1));
    }
  }, [chats]);

  useEffect(() => {
    window.document.body.style.overflow = "hidden";
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      socketRef.current.emit("send_message", { value });
      if (value !== "") {
        setChats((prev) => [...prev, value]);
      }
      setValue("");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("start") == 1) {
      let id = setInterval(() => {
        setTimer((prev) => {
          if (prev == 20) {
            localStorage.setItem("start", 0);
            setOver(true)
            clearInterval(id);
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }
  }, []);
  /////////////////////////
  useEffect(() => {
    if (over == true) {

      window.location.href = "/results"
    }

  }, [over])

  useEffect(() => {

    localStorage.setItem("p1", score)
    localStorage.setItem("p2", p2Score)

  }, [score, p2Score])



  useEffect(() => {
    let getRoom = async () => {
      let res = await axios({
        method: "get",
        url: BASE_URL + `/room/${sessionStorage.getItem("rid")}`,
      });
      console.log(res);

      if (res.data.status == 1) {
        setMaker(JSON.parse(res.data.data.p1));
        setPlayer2(JSON.parse(res.data.data.p2));
        console.log(JSON.parse(res.data.data.p2));
        setRoom(res.data.data);
        if (
          JSON.parse(res.data.data.p1)?.id == localStorage.getItem("userId")
        ) {
          setPlayer("p1");
        }
        if (
          JSON.parse(res.data.data.p2)?.id === localStorage.getItem("userId")
        ) {
          setPlayer("p2");
        }


      } else {
      }
    };
    if (player2.id == null) {
      getRoom();
    }

  }, [refresh]);

  // console.log(player);

  useEffect(() => {
    let id = setInterval(() => {

      if (player2.id == null) {
        setRefresh((prev) => !prev)
        console.log("yes")
      } else {
        clearInterval(id)
      }

    }, 2000)


  }, [])



  return (
    <Flex m={AUTO} w={FILL_90PARENT} bg={"green.200"}  >
      <Box w={FILL_75PARENT} bg={"green.200"} >{Game({ setScore, setActive, active })}</Box>
      <VStack
        className="bg"
        h={"100vh"}
        position={ABSOLUTE}
        borderLeft={"1px dotted white"}
        top={2}
        right={4}
        w={FILL_25PARENT}
      >
        <VStack gap={2}>
          <HStack mt={"20px"}>
            <Badge fontSize={LARGE} colorScheme={GREEN}>Playre1</Badge>
            <Badge fontSize={LARGE} color={WHITE} colorScheme={PINK}>
              Your Score: {score}
            </Badge>
            <Badge fontSize={LARGE} color={YELLOW} colorScheme={RED}>Timer: {timer}</Badge>
          </HStack>

          <Heading fontSize={LARGE} >Realtime Leaderboard</Heading>

          <VStack w={FILL_PARENT}>
            <Card bg={TRANSPARENT} border={"1px solid white"} w={FILL_PARENT}>
              <CardBody>
                <VStack alignItems={START} justifyContent={START} w={FILL_PARENT}>
                  <HStack colorscheme={GREEN}>
                    <Badge bg={GREEN}>{"You"}</Badge>
                    <Text>{score}</Text>
                  </HStack>

                  <HStack>
                    <Badge bg={RED}>Player 2</Badge>
                    <Text>{player2.id ? p2Score : "Wating..."}</Text>
                  </HStack>

                </VStack>
              </CardBody>
            </Card>
          </VStack>
          <Button
            // colorScheme={GREEN}
            bg={"yellow.600"}
            width={FILL_PARENT}
            display={
              room
                ? maker.id == localStorage.getItem("userId")
                  ? "block"
                  : "none"
                : "none"
            }
            onClick={() => {
              localStorage.setItem("start", 1)
              localStorage.setItem("starttime", Date.now())
              socketRef.current.emit("start", {
                rid: sessionStorage.getItem("rid"),
              });
              window.location.reload()
            }}
          >
            Start Match
          </Button>
          <Button w={"100%"} bg={"yellow.600"}  > <Payment/>  </Button>

          <VStack w={FILL_PARENT} position={ABSOLUTE} bottom={10} mt={100}>
            <Flex
              w={FILL_PARENT}
              justifyContent={START}
              direction={COLUMN}
            >
              {chats?.map((el) => (
                <ChatBar chat={el} />
              ))}
            </Flex>
            <HStack>
              <Input
                onKeyDown={handleKeyDown}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Let's chat"
              ></Input>
              <Button
                onClick={() => {
                  socketRef.current.emit("send_message", { value });
                  if (value !== "") {
                    setChats((prev) => [...prev, value]);
                  }
                  setValue("");
                }}
              >
                Send
              </Button>


            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
}

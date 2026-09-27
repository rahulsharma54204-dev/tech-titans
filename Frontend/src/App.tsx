import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, useColorMode } from "@chakra-ui/react";
import AllRoutes from "./routes/Allroutes";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import {useEffect} from "react"


function App() {

  const { colorMode, toggleColorMode } = useColorMode();

  // useEffect(()=>{
  //   if(page==HOME_TAB_ID){
  //     mainBoxRef.current.scrollIntoView({ behavior: 'smooth' })
  //   }
  // },[page])

  useEffect(() => {
    if (colorMode == "light") {
      toggleColorMode();
    }
  }, []);

  useEffect(() => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    if(!localStorage.getItem("userId")){
      localStorage.setItem("userId", String(randomNumber));
    }
  }, []);
  


  return (
    <Box className="App">
      
      <Navbar />
      <AllRoutes />

      {/* <Footer /> */}
    </Box>
  );
}

export default App;

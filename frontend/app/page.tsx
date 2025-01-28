'use client'
import React,{useState} from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";

interface Props{
}

const Page=(props:Props)=>{
  const [open, setopen] = useState(false);
  const [activeItem, setactiveItem] = useState(0) 
  const [route, setroute] = useState("Login")

  return(
    <div>
      <Heading 
      title="EdVentura"
      description="Learning Platform for student  s"
      keywords="Redux,Programming"
      />
      <Header
      open={open}
      setOpen={setopen}
      activeItem={activeItem}
      setRoute={setroute}
      route={route}
      />

      <Hero/>
    </div>
  )
};

export default Page;
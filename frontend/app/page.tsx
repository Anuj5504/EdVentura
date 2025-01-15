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
  return(
    <div>
      <Heading 
      title="EdVentura"
      description="Learning Platform for students"
      keywords="Redux,Programming"
      />

      <Header
      open={open}
      setOpen={setopen}
      activeItem={activeItem}
      />

      <Hero/>
    </div>
  )
};

export default Page;
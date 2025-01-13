'use client'
import React,{FC,useState} from "react";
import Heading from "./utils/Heading";

interface Props{

}

const Page:FC<Props>=(props)=>{
  return(
    <div>
      <Heading 
      title="EdVentura"
      description="Learning Platform for students"
      keywords="Redux,Programming"
      />
    </div>
  )
};

export default Page;
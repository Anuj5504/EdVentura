'use client'
import React, { useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from "../utils/Heading";
import Header from '../components/Header'
import Profile from '../components/Profile/Profile';
import { useSelector } from 'react-redux';

type Props = {}

const page:React.FC<Props> = (props: Props) => {
    const [open, setopen] = useState(false);
    const [activeItem, setactiveItem] = useState(0)
    const [route, setroute] = useState("Login");

    const {user}=useSelector((state:any)=>state.auth);
    return (
        <div>
            <Protected>
                <Heading
                    title={user?.name}
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
                <Profile/>
            </Protected>
        </div>
    )
}

export default page
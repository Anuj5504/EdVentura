'use client'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BiMoon, BiSun } from 'react-icons/bi'


export const ThemeSwitcher = () => {
    const [mounted, setmounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setmounted(true)
    }, [])

    if (!mounted) return null;

    return (
        <div className='flex items-center justify-center mr-4'>
            {
                theme==="light"?(
                    <BiMoon
                    className='cursor-pointer'
                    fill="black"
                    size={25}
                    onClick={()=>setTheme("dark")}
                    />
                ):(
                    <BiSun
                    className='cursor-pointer'
                    fill="white"
                    size={25}
                    onClick={()=>setTheme("light")}
                    />
                )
            }
        </div>
    )
}

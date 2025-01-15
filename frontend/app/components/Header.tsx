'use client'
import React, { useEffect, useState } from 'react'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    activeItem: number,
}


const Header = (props: Props) => {
    const [active, setactive] = useState(false)
    const [openSlider, setopenSlider] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setactive(true);
            } else {
                setactive(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='w-full relative'>
            <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 w-full h-[80px] z-[80] border-b dark:border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}></div>
        </div>
    )
}

export default Header
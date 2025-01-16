'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavItems from '../utils/NavItems'
import { ThemeSwitcher } from '../utils/ThemeSwitcher'
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    activeItem: number,
}

const Header = ({ activeItem, setOpen }: Props) => {
    const [active, setactive] = useState(false)
    const [openSlidebar, setopenSlidebar] = useState(false)

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

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setopenSlidebar(false)
        }
    }
    return (
        <div className='w-full relative'>
            <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 w-full h-[80px] z-[80] border-b dark:border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}>
                <div className='w-[95%] 800px:w-[92%] m-auto h-full' >
                    <div className='w-full h-[80px] flex items-center justify-between p-3'>
                        <div>
                            <Link href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>EdVentura</Link>

                        </div>
                        <div className="flex items-center">
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false}
                            />
                            <ThemeSwitcher />
                            {/* Mobile only */}

                            <div className='800px:hidden'>
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setopenSlidebar(true)}
                                />
                            </div>

                            <HiOutlineUserCircle
                                size={25}
                                className='hidden 800px:block cursor-pointer dark:text-white text-black'
                                onClick={() => setOpen(true)}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile sidebar */}

                {
                    openSlidebar && (
                        <div className='fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]'
                            onClick={handleClose}
                            id="screen"
                        >
                            <div className='absolute w-[70%] z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                                <NavItems activeItem={activeItem} isMobile={true} />
                                <HiOutlineUserCircle
                                    className=" cursor-pointer ml-5 my-2 text-black dark:text-white"
                                    size={25}
                                    onClick={() => setOpen(true)}
                                />
                                
                                <p className='text-[14px] px-2 pl-5 text-black dark:text-white'>Copyright @ 2025 EdVentura</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Header
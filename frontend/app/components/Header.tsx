'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavItems from '../utils/NavItems'
import { ThemeSwitcher } from '../utils/ThemeSwitcher'
import { HiOutlineMenuAlt3, HiOutlineUserCircle, HiSearch, HiX } from 'react-icons/hi'

import Login from './auth/Login'
import CustomModal from '../utils/CustomModal'
import Signup from './auth/Signup'
import Verification from './auth/Verification'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useSocialAuthMutation } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    activeItem: number,
    route: string,
    setRoute?: (route: string) => void,
}

const Header = ({ activeItem, setOpen, route, open, setRoute }: Props) => {
    const [active, setactive] = useState(false)
    const [openSlidebar, setopenSlidebar] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useSelector((state: any) => state.auth);
    const {data}=useSession();
    const [socialAuth,{isSuccess,error}]=useSocialAuthMutation();

    useEffect(() => {
        if(!user) {
            if(data) {
                 socialAuth({email:data.user?.email,name:data.user?.name,avatar:data.user?.image})
            }
        }

        if(isSuccess) {
            toast.success("Login Successfull");
        }
    }, [data,user])
    


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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Add your search logic here
        console.log('Searching for:', searchQuery)
    }

    console.log(user);
    return (
        <div className='w-full relative'>
            <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 w-full h-[80px] z-[80] border-b dark:border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}>
                <div className='w-[95%] 800px:w-[92%] m-auto h-full' >
                    <div className='w-full h-[80px] flex items-center justify-between p-3'>
                        <div className="flex items-center gap-2">
                            <Link
                                href={"/"}
                                className="group flex items-center gap-2"
                            >
                                <span className="text-[25px] font-Poppins font-[600] bg-gradient-to-r from-blue-600 via-violet-500 to-purple-500 text-transparent bg-clip-text transition-all duration-300">
                                    EdVentura
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-6">
                            {/* Expandable Search Bar */}
                            <form
                                onSubmit={handleSearch}
                                className={`hidden 800px:flex items-center ${isSearchOpen ? 'w-[300px]' : 'w-[44px]'} transition-all duration-300 ease-in-out`}
                            >
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder={isSearchOpen ? "Search courses..." : ""}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchOpen(true)}
                                        className={`
                                            w-full h-[44px] px-4 py-2 ${isSearchOpen ? 'pr-12' : 'pr-4'}
                                            rounded-full bg-gray-100 dark:bg-gray-800/90
                                            border-2 border-transparent
                                            focus:border-blue-500 dark:focus:border-blue-400
                                            focus:ring-2 focus:ring-blue-500/20
                                            text-gray-900 dark:text-gray-100
                                            placeholder-gray-500
                                            shadow-sm hover:shadow-md
                                            transition-all duration-300
                                        `}
                                    />
                                    {isSearchOpen ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsSearchOpen(false)
                                                setSearchQuery('')
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                        >
                                            <HiX className="w-5 h-5" />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setIsSearchOpen(true)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                        >
                                            <HiSearch className="w-4 h-5" />
                                        </button>
                                    )}
                                </div>
                            </form>

                            <NavItems
                                activeItem={activeItem}
                                isMobile={false}
                            />
                            <div className="flex items-center ">
                                <ThemeSwitcher />

                                <button
                                    className="800px:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 text-gray-500 hover:text-blue-500 transition-all"
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                >
                                    <HiSearch className="w-5 h-5" />
                                </button>

                                <div className='800px:hidden'>
                                    <button
                                        onClick={() => setopenSlidebar(true)}
                                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all"
                                    >
                                        <HiOutlineMenuAlt3
                                            size={25}
                                            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                        />
                                    </button>
                                </div>

                               <button
                                    onClick={() => setOpen(true)}
                                    className="hidden 800px:flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all group"
                                >

                                        {user?(
                                        <div className='800px:flex items-center gap-2'>
                                            {user.avatar? (
                                                <Image
                                                src={user.avatar}
                                                alt=''
                                                />
                                            ):(
                                                <HiOutlineUserCircle
                                                size={22}
                                                className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
                                            />
                                            )}
                                        <span className=" flex justify-center text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 font-medium transition-colors">
                                           {user.name}
                                        </span>
                                    </div>
                                    ):(
                                        <div  className='800px:flex items-center gap-2'>
                                        <HiOutlineUserCircle
                                            size={22}
                                            className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
                                        />
                                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 font-medium transition-colors">
                                            Sign In
                                        </span>
                                    </div>
                                    )}
                                </button>

                                
                            </div>
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
                            <div className=' absolute w-[70%] z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 shadow-xl'>
                                <NavItems activeItem={activeItem} isMobile={true} />
                                <div className="flex items-center">

                                    <HiOutlineUserCircle
                                        className="cursor-pointer ml-5 my-2 text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                        size={25}
                                        onClick={() => setOpen(true)}
                                    />
                                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 font-medium transition-colors">
                                        {user.name}
                                    </span>
                                </div>
                                <p className='text-[14px] px-2 pl-5 text-black dark:text-white opacity-80'>Copyright @ 2025 EdVentura</p>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                route === "Login" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Login}
                                />
                            )
                        }
                    </>
                )
            }

            {
                route === "Sign-Up" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Signup}
                                />
                            )
                        }
                    </>
                )
            }
            {
                route === "Verification" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Verification}
                                />
                            )
                        }
                    </>
                )
            }

            {/* Mobile Search Bar */}
            {isSearchOpen && (
                <div className="800px:hidden px-3 pb-3">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-gray-100 placeholder-gray-500"
                        />
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <HiX className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Header
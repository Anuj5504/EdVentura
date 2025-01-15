import Link from 'next/link';
import React from 'react'

export const navItemsData = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Courses",
        url: "/courses"
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "Policy",
        url: "/policy"
    },
    {
        name: "FAQ",
        url: "faq"
    }
];
type Props = {
    activeItem: number,
    isMobile: boolean
}

const NavItems = ({ activeItem, isMobile }: Props) => {
    return (
        <>
          {!isMobile &&   <div className='hidden 800px:flex'>
                {
                    navItemsData && navItemsData.map((items, index) => (
                        <Link href={items.url} key={index} passHref>
                            <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>
                                {items.name}
                            </span>
                        </Link>
                    ))
                }
            </div>}
            {
                isMobile && (
                    <div className='800px:hidden mt-5'>
                        <div className={`text-[25px] flex justify-center items-center font-Poppins font-[500] text-black dark:text-white`}>EdVentura</div>
                            {
                                navItemsData && navItemsData.map((items, index) => (
                                    <Link href={"/"} key={index} passHref>
                                        <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} block text-[18px] px-6 py-6 font-Poppins font-[400]`}>
                                        {items.name}
                                        </span>
                                    </Link>
                                ))
                            }
                        </div>
                )
            }
        </>
    )
}

export default NavItems
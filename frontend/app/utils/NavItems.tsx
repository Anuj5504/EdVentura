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

const linkStyles = `group relative text-gray-700 dark:text-gray-300 transition-colors duration-300
  hover:text-blue-600 dark:hover:text-blue-400
  after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
  after:bottom-0 after:left-0 after:bg-blue-500 
  after:transition-transform after:duration-300
  hover:after:scale-x-100
`;

const NavItems = ({ activeItem, isMobile }: Props) => {
    return (
        <>
            {!isMobile && (
                <div className='hidden 800px:flex'>
                    {navItemsData && navItemsData.map((items, index) => (
                        <Link
                            href={items.url}
                            key={index}
                            className="group relative px-6 py-2"
                        >
                            <span className={`
                                text-[18px] font-medium font-Poppins
                                ${activeItem === index
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-700 dark:text-gray-300"
                                }
                                group-hover:text-blue-600 dark:group-hover:text-blue-400
                                transition-all duration-300
                            `}>
                                {items.name}
                            </span>
                            <span className={`
                                absolute bottom-0 left-1/2 -translate-x-1/2
                                w-0 h-0.5 bg-blue-500
                                group-hover:w-1/2
                                transition-all duration-300
                                ${activeItem === index ? "w-1/2" : ""}
                            `} />
                        </Link>
                    ))}
                </div>
            )}

            {isMobile && (
                <div className='800px:hidden mt-5'>
                    <div className="text-[25px] text-center font-Poppins font-[500] bg-gradient-to-r from-blue-600 to-violet-500 text-transparent bg-clip-text mb-6">
                        EdVentura
                    </div>
                    {navItemsData && navItemsData.map((items, index) => (
                        <Link
                            href={items.url}
                            key={index}
                            className="block"
                        >
                            <span className={`
                                block text-[18px] px-6 py-4 font-Poppins font-medium
                                ${activeItem === index
                                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                }
                                transition-all duration-300
                            `}>
                                {items.name}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </>
    )
}

export default NavItems
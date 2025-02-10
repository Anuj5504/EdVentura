'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import AdminProtected from '../hooks/adminProtected'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>

                <Heading title="EdVentura" description="Learning Platform for students" keywords="Redux,Programming" />
                
                <div className='flex max-h-full'>
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar />
                    </div>
                    <div className='w-[85%]'>

                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default page
'use client'
import CreateCourse from '@/app/components/Admin/course/CreateCourse'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <Heading
                title="EdVentura"
                description="ELearning Platform"
                keywords="Programming"
            />

            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-[85%]">
                    <DashboardHeader />
                    <CreateCourse/>
                </div>
            </div>
        </div>
    )
}

export default page
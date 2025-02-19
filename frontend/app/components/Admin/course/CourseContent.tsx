import { styles } from '@/app/styles/style';
import React, { useState } from 'react';
import { AiFillPlusCircle, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BiLinkAlt, BiSolidPencil } from 'react-icons/bi';
import toast from 'react-hot-toast';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setcourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
};

const CourseContent: React.FC<Props> = ({ courseContentData, setcourseContentData, active, setActive, handleSubmit: handleCourseSubmit }) => {
    const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false));

    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    };

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setcourseContentData(updatedData);
    };

    const handleRemoveUrl = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setcourseContentData(updatedData);
    };

    const newContentHandler = (item: any) => {
        console.log(item)
        if (item.title === "" || item.description === "" || item.videoUrl === "") {
            toast.error("Please fill all the fields first");
        } else {
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: "Untitled Section",
                links: [{ title: "", url: "" }],
            };
            setcourseContentData([...courseContentData, newContent]);
        }
    };

    return (
        <div className='w-[80%] m-auto rounded-lg shadow-lg'>
            {courseContentData?.map((item: any, index: number) => {
                const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;
                return (
                    <div key={index} className={`w-full bg-[#cdc8c817] p-3 ${showSectionInput ? "mt-5" : "mb-0"}`}>
                        {showSectionInput && (
                            <div className='flex items-center'>
                                <input
                                    type="text"
                                    className={`text-[20px] ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-max"} font-Poppins dark:text-white text-black bg-transparent outline-none`}
                                    value={item.videoSection}
                                    onChange={(e) => {
                                        const updatedData = [...courseContentData];
                                        updatedData[index].videoSection = e.target.value;
                                        setcourseContentData(updatedData);
                                    }}
                                />
                                <BiSolidPencil className='cursor-pointer dark:text-white text-black' />
                            </div>
                        )}
                        <div className="flex w-full items-center justify-between my-0">
                            <p className='font-Poppins dark:text-white text-black'>
                                {index + 1}. {item.title || "Video Title"}
                            </p>
                            <div className="flex items-center justify-center pt-3">
                                <MdOutlineKeyboardArrowDown
                                    fontSize="large"
                                    className="dark:text-white text-black cursor-pointer"
                                    style={{ transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease-in-out" }}
                                    onClick={() => handleCollapseToggle(index)}
                                />
                                <AiOutlineDelete
                                    className={`dark:text-white text-[20px] ml-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                    onClick={() => {
                                        if (index > 0) {
                                            const updatedData = [...courseContentData];
                                            updatedData.splice(index, 1);
                                            setcourseContentData(updatedData);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        {!isCollapsed[index] && (
                            <div>
                                <div className="my-3">
                                    <label className={styles.label}>Video Title</label>
                                    <input type="text" className={styles.input} placeholder='Project Plan..'
                                        value={item.title} onChange={(e) => {
                                            const updateData = [...courseContentData];
                                            updateData[index].title = e.target.value;
                                            setcourseContentData(updateData);
                                        }}
                                    />
                                </div>
                                <div className="my-3">
                                    <label className={styles.label}>Video URL</label>
                                    <input type="text" className={styles.input} placeholder='Enter URL'
                                        value={item.videoUrl} onChange={(e) => {
                                            const updateData = [...courseContentData];
                                            updateData[index].videoUrl = e.target.value;
                                            setcourseContentData(updateData);
                                        }}
                                    />
                                </div>
                                <div className="my-3">
                                    <label className={styles.label}>Video Description</label>
                                    <textarea rows={8} cols={30} className={`${styles.input} !h-min py-2`} placeholder='Description'
                                        value={item.description} onChange={(e) => {
                                            const updateData = [...courseContentData];
                                            updateData[index].description = e.target.value;
                                            setcourseContentData(updateData);
                                        }}
                                    />
                                </div>
                                {item?.links.map((link: any, linkIndex: number) => (
                                    <div key={linkIndex} className="mb-3 block">
                                        <input type="text" placeholder="Source Code.." className={styles.input}
                                            value={link.title} onChange={(e) => {
                                                const updateData = [...courseContentData];
                                                updateData[index].links[linkIndex].title = e.target.value;
                                                setcourseContentData(updateData);
                                            }}
                                        />
                                        <input type="text" placeholder="URL" className={styles.input}
                                            value={link.url} onChange={(e) => {
                                                const updateData = [...courseContentData];
                                                updateData[index].links[linkIndex].url = e.target.value;
                                                setcourseContentData(updateData);
                                            }}
                                        />
                                        <p className='flex items-center text-[14px] dark:text-white text-black cursor-pointer' onClick={() => handleAddLink(index)}>
                                            <BiLinkAlt className='h-11 w-5 ml-3' /> Add Link
                                        </p>
                                    </div>
                                ))}
                                {index === courseContentData.length - 1 && (
                                    <p onClick={() => newContentHandler(item)} className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'>
                                        <AiFillPlusCircle className='mr-2' /> Add new course
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CourseContent;

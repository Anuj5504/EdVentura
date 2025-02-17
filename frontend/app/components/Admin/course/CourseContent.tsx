import { styles } from '@/app/styles/style';
import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FiEdit2 } from 'react-icons/fi';
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
    const [links, setLinks] = useState([{ title: '', url: '' }]);
    const [sectionTitles, setSectionTitles] = useState(courseContentData.map(() => 'Untitled Section'));
    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    };

    const handleTitleChange = (index: number, newTitle: string) => {
        const updatedTitles = [...sectionTitles];
        updatedTitles[index] = newTitle;
        setSectionTitles(updatedTitles);
    };

    const addLink = () => {
        setLinks([...links, { title: '', url: '' }]);
    };

    const removeLink = (index: number) => {
        const updatedLinks = [...links];
        updatedLinks.splice(index, 1);
        setLinks(updatedLinks);
    };

    const newContentHandler = (item: any) => {
        console.log(item);
        if (item.title === "" || item.description === "" || item.videoUrl === "") {
            toast.error("Please fill all the fields first");
        }
        else {
            let newVideoSection = "";
            if (courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }

            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: "Untitled Section",
                links: [
                    {
                        title: "",
                        url: "",
                    },
                ],
            };

            setcourseContentData([...courseContentData,newContent]);

        }
    }

    return (
        <div className='w-[80%] m-auto p-4 dark:bg-black rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit}>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;
                    return (
                        <div key={index} className={`w-full p-5 rounded-lg shadow-md transition-all duration-300 ${showSectionInput ? 'mt-10' : 'mb-0'}`}>
                            {showSectionInput && (
                                <div className='flex items-center mb-4'>
                                    <input
                                        type='text'
                                        className='text-lg font-semibold text-gray-800 bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 w-full'
                                        value={sectionTitles[index]}
                                        onChange={(e) => handleTitleChange(index, e.target.value)}
                                    />
                                    <FiEdit2 className='ml-2 text-gray-500' />
                                </div>
                            )}
                            <div className='flex w-full items-center justify-between'>
                                {!isCollapsed[index] ? (
                                    <p className='font-Poppins text-lg font-semibold text-gray-800'>
                                        {index + 1}. {item.title}
                                    </p>
                                ) : (
                                    <div></div>
                                )}
                                <div className='flex items-center'>
                                    <AiOutlineDelete
                                        className={`text-red-500 text-[24px] mr-3 transition-transform duration-200 transform hover:scale-110 ${index > 0 ? 'cursor-pointer' : 'cursor-no-drop'}`}
                                        onClick={() => {
                                            if (index > 0) {
                                                const updatedData = [...courseContentData];
                                                updatedData.splice(index, 1);
                                                setcourseContentData(updatedData);
                                            }
                                        }}
                                    />
                                    <MdOutlineKeyboardArrowDown
                                        fontSize='large'
                                        className='text-gray-600 cursor-pointer transition-transform duration-200 transform hover:scale-110'
                                        style={{
                                            transform: isCollapsed[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }}
                                        onClick={() => handleCollapseToggle(index)}
                                    />
                                </div>
                            </div>
                            {!isCollapsed[index] && (
                                <div className='mt-4'>
                                    <label className={`${styles.label} text-gray-700 font-medium`}>Video Title</label>
                                    <input type='text' className='w-full p-2 border rounded mt-2' placeholder='Enter video title' />

                                    <label className={`${styles.label} text-gray-700 font-medium mt-4`}>Video URL</label>
                                    <input type='text' className='w-full p-2 border rounded mt-2' placeholder='Enter video URL' />

                                    <label className={`${styles.label} text-gray-700 font-medium mt-4`}>Video Description</label>
                                    <textarea className='w-full p-2 border rounded mt-2' placeholder='Enter video description'></textarea>

                                    {links.map((link, linkIndex) => (
                                        <div key={linkIndex} className='mt-4'>
                                            <label className={`${styles.label} text-gray-700 font-medium`}>Link {linkIndex + 1}</label>
                                            <input type='text' className='w-full p-2 border rounded mt-2' placeholder='Source Code... (Link title)' value={link.title} onChange={(e) => {
                                                const updatedLinks = [...links];
                                                updatedLinks[linkIndex].title = e.target.value;
                                                setLinks(updatedLinks);
                                            }} />
                                            <input type='text' className='w-full p-2 border rounded mt-2' placeholder='Source Code Url... (Link URL)' value={link.url} onChange={(e) => {
                                                const updatedLinks = [...links];
                                                updatedLinks[linkIndex].url = e.target.value;
                                                setLinks(updatedLinks);
                                            }} />
                                            <AiOutlineDelete className='text-red-500 cursor-pointer mt-2' onClick={() => removeLink(linkIndex)} />
                                        </div>
                                    ))}
                                    <button type='button' onClick={addLink} className='text-blue-500 mt-4'>+ Add Link</button>
                                </div>
                            )}

                            {
                                index === courseContentData.length - 1 && (
                                    <div>
                                        <p onClick={(e: any) => newContentHandler(item)} className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'>
                                            <AiOutlinePlusCircle className='mr-2' /> Add New Content
                                        </p>
                                    </div>
                                )

                            }
                        </div>
                    );
                })}
            </form>
        </div>
    );
};

export default CourseContent;

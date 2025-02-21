import React from 'react';

type Props = {
    videoUrl: string;
    title: string;
};

const CoursePlayer: React.FC<Props> = ({ videoUrl, title }) => {
    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <video 
                controls 
                className="w-full max-w-3xl rounded-lg shadow-lg"
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default CoursePlayer;
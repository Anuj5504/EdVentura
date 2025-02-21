import { styles } from '@/app/styles/style';
import React from 'react'

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefirs: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisits: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData: React.FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisits, active, setActive }) => {
    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    };

    const handleAddBenefits = () => {
        setBenefits([...benefits, { title: "" }])
    }
    const handlePrerequistsChange = (index: number, value: any) => {
        const updatePrerequists = [...prerequisites];
        updatePrerequists[index].title = value;
        setPrerequisits(updatePrerequists);
    };

    const handleAddPrerequists = () => {
        setPrerequisits([...prerequisites, { title: "" }])
    }

    return (
        <div className="w-[80%] m-auto mt-12 block">
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    What are the benefits for students in this course?
                </label>
                <br />
                {benefits.map((benefit: any, index: number) => (
                    <input
                        type="text"
                        key={index}
                        name="benefit"
                        placeholder="You will be able to build a full stack LMS Platform..."
                        required
                        className={`${styles.input} my-2`}
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                    />
                ))}
                <span onClick={handleAddBenefits} className="material-symbols-outlined cursor-pointer mt-5">
                    add_circle
                </span>
            </div>
            <div className='mt-5'>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    What are the Prerequistes for students in this course?
                </label>
                <br />
                {prerequisites.map((benefit: any, index: number) => (
                    <input
                        type="text"
                        key={index}
                        name="benefit"
                        placeholder="You need Basic knowledge of HTML"
                        required
                        className={`${styles.input} my-2`}
                        value={benefit.title}
                        onChange={(e) => handlePrerequistsChange(index, e.target.value)}
                    />
                ))}
                <span onClick={handleAddPrerequists} className="material-symbols-outlined cursor-pointer mt-5">
                    add_circle
                </span>
            </div>

            <div className="flex justify-between mt-2">
                <button
                    onClick={()=>setActive(active-1)}
                    className={`${styles.button} w-36 hover:bg-blue-600 `}
                    
                    >
                    Prev step
                </button>
                <button
                    onClick={()=>setActive(active+1)}
                    className={`${styles.button} w-36 hover:bg-blue-600`}
                >
                    Next Step
                </button>
            </div>
        </div>
    )
}

export default CourseData
import React, { useEffect, useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai"
import { styles } from '@/app/styles/style'
import { FcGoogle } from "react-icons/fc";
import { useLoginMutation } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'

type Props = {
    setRoute: (route: string) => void
    setOpen: (route: boolean) => void
}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Please enter your email"),
    password: Yup.string().required("Please enter your Password").min(6),
})

const Login: React.FC<Props> = ({ setRoute,setOpen }) => {
    const [show, setshow] = useState(false);
    const [login,{isLoading,isSuccess,data,error}]=useLoginMutation();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({email,password});
        }
    });

    useEffect(() => {
        if(isSuccess) {
            toast.success("Login Successfully");
            setOpen(false);
            console.log(data);
        }
        
        if(error) {
            if("data" in error) {
                const errorData=error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess,error])
    
    const { errors, touched, values, handleChange, handleSubmit } = formik

    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Welcome to <span className="text-blue-500">EdVentura</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <label
                    className={`${styles.label}`}
                    htmlFor="email">
                    Login with your email
                </label>
                <input
                    type="email"
                    name=''
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    placeholder='example@gmail.com'
                    className={`${errors.email && touched.email && "border-red-500 "} ${styles.input}`}
                />

                {
                    errors.email && touched.email && (
                        <span className='text-red-500 pt-2 block'>{errors.email}</span>
                    )
                }

                <div className='w-full mt-5 relative mb-1'>
                    <label
                        className={`${styles.label}`}
                        htmlFor="password">
                        Password
                    </label>

                    <input
                        type={!show ? "password" : "text"}
                        name=''
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder='Password'
                        className={`${errors.email && touched.email && "border-red-500 "} ${styles.input}`}
                    />

                    {!show ? (
                        <AiOutlineEyeInvisible
                            className='absolute bottom-3 right-2 z-1 cursor-pointer'
                            size={20}
                            onClick={() => setshow(true)}
                        />
                    ) : (
                        <AiOutlineEye
                            className='absolute bottom-3 right-2 z-1 cursor-pointer'
                            size={20}
                            onClick={() => setshow(false)}
                        />
                    )
                    }
                    {
                        errors.password && touched.password && (
                            <span className='text-red-500 pt-2 block'>{errors.password}</span>
                        )
                    }
                </div>

                <div className='w-full mt-5'>
                    <input type="submit" value="Login" className={`${styles.button}`} />
                </div>

                <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>Or join with</h5>
                <div className='flex items-center justify-center my-3'>
                    <FcGoogle size={30} className="cursor-pointer ml-2" />

                    <AiFillGithub size={30} className='cursor-pointer ml-2' />
                </div>

                <h5 className='text-center pt-4 font-Poppins text-[14px]'>
                    Don’t have an account?
                    <span className='text-[#2190ff] pl-3 cursor-pointer' onClick={() => setRoute("Sign-Up")}>
                        Create one
                    </span>
                </h5>
            </form>
        </div>
    )
}

export default Login
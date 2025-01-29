import React, { useEffect, useRef, useState } from 'react'
import { styles } from '@/app/styles/style';
import { toast } from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { ClassNames } from '@emotion/react';
import { verify } from 'crypto';
import { useSelector } from 'react-redux';
import { useActivationMutation } from '@/redux/features/auth/authApi';

type Props = {
    setRoute: (route: string) => void
}

type VerifyNumber = {
    "0": string,
    "1": string,
    "2": string,
    "3": string,
}

const Verification: React.FC<Props> = ({ setRoute }) => {
    const { token } = useSelector((state: any) => state.auth);
    const [activation, { isSuccess, error }] = useActivationMutation();
    const [invalidError, setinvalidError] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Accout Activated Successfully");
            setRoute("Login");
        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
                setinvalidError(true);
            }
            else {
                console.log('Error occured', error);
            }
        }
    }, [isSuccess, error])

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
    })

    const VerificationHandler = async () => {
        const verificationNumber = Object.values(verifyNumber).join("");
        if (verificationNumber.length != 4) {
            setinvalidError(true);
        }

        await activation({
            activation_token: token,
            activation_code: verificationNumber,
        })
    }

    const handleInputChange = (index: number, values: string) => {
        setinvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: values };
        setVerifyNumber(newVerifyNumber);

        if (values === "" && index < 0) {
            inputRefs[index - 1].current?.focus();
        }
        else if (values.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    }
    return (
        <div >
            <h1 className={`${styles.title}`}>
                Verify your account
            </h1>

            <div className="w-full flex items-center justify-center mt-2">
                <div className="rounded-full w-[80px] h-[80px] bg-[#497DF2] flex items-center justify-center">
                    <VscWorkspaceTrusted size={40} />
                </div>
            </div>

            <div className='m-auto flex items-center justify-around py-4 gap-4'>
                {Object.keys(verifyNumber).map((key, index) => (
                    <input type="number" key={key} ref={inputRefs[index]}
                        className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invalidError ? "shake border-red-600" : "dark:border-white border-[#0000004a]"}`}
                        placeholder=''
                        maxLength={1}
                        value={verifyNumber[key as keyof VerifyNumber]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))}
            </div>

            <div className="w-full flex justify-center p-4">
                <button className={`${styles.button}`} onClick={VerificationHandler}>
                    Verify OTP
                </button>
            </div>

            <h5 className='text-center pt-4 font-Poppins text-[14px]'>
                Go back to Sign in?
                <span className='text-blue-700 pl-1 cursor-pointer' onClick={() => setRoute("Login")}>Sign in</span>
            </h5>
        </div>
    )
}

export default Verification
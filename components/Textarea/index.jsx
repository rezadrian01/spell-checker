'use client'

import { useEffect, useState } from 'react'
import { FaRegCopy } from "react-icons/fa6";
import { CiEraser } from "react-icons/ci";

const Textarea = () => {
    const [showAlert, setShowAlert] = useState({
        open: false,
        success: true
    });
    const [textInput, setTextInput] = useState("");
    const wordCount = textInput === "" ? 0 : textInput.trim().split(" ").length;


    const handleChangeInput = (value) => {
        if (value.trim() === " ") {
            // request to api
        }
        setTextInput(value);
    }

    const handleCopy = async () => {
        if (textInput.trim() === "") return
        try {
            await navigator.clipboard.writeText(textInput);
            setShowAlert({ success: true, open: true });
        } catch (err) {
            setShowAlert({ success: false, open: true });
        }
    }

    useEffect(() => {
        let timer;
        if (showAlert.open) {
            timer = setTimeout(() => {
                setShowAlert({ open: false, success: true });
            }, 3000);
        }

        return () => {
            clearTimeout(timer);
        }


    }, [showAlert])

    return (
        <>
            {/* Alert */}
            <div className='text-white text-center w-56 py-4 fixed top-2  rounded transition-all ease-in-out' style={{
                right: showAlert.open ? '.5rem' : '-14rem',
                backgroundColor: showAlert.success ? '#22c55e' : '#ef4444'
            }}>
                {showAlert.success ? "Text copied" : "Failed to copy"}
            </div>

            <div className=' max-w-[50rem] mx-auto flex flex-col gap-2'>
                <textarea
                    value={textInput}
                    onChange={({ target }) => handleChangeInput(target.value)}
                    placeholder='Masukan Text...'
                    className='w-full outline-2 outline-slate-200 p-2 rounded outline-none focus:outline-slate-700 min-h-[20rem]'
                    name='words' />

                <div className='flex gap-4 justify-end text-sm'>
                    <div>
                        Error count: 0
                    </div>
                    <div>
                        Word Count: {wordCount}
                    </div>
                </div>

                <div className='flex gap-6 justify-center'>

                    <button onClick={() => setTextInput("")} className='flex gap-2 items-center bg-slate-100 rounded p-1 hover:bg-slate-200 transition-all'>Clear
                        <CiEraser />
                    </button>

                    <button onClick={handleCopy} className='flex gap-2 items-center bg-slate-100 rounded p-1 hover:bg-slate-200 transition-all'>Copy
                        <FaRegCopy size={14} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Textarea
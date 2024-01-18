import {useContext, useEffect, useState} from 'react'
import { IoBackspaceOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import {UserContext, userInfoContext} from '../App'

function EmployeeLogin() {

    const [userInfo, setUserInfo] = useContext(userInfoContext)

    const [isVerified, setIsVerified] = useContext(UserContext)

    const navigate = useNavigate()

    const [code, setCode]= useState("")

    //Is a valid user?
    const [verified, setVerified] = useState(false)

    const currUrl = "http://localhost:4000"

    useEffect(() => {
        if(code.length >= 4){
            handleLogin()
        }
    }, [code])

    useEffect(() => {
        if (userInfo[0].name != ""){
            setVerified(true)
        }
    }, [userInfo])

    useEffect(() => {
        if (verified) {
            setIsVerified(true)
            navigate("/home")
        }

    }, [verified])

    const [isNotUser, setIsNotUser] = useState(false);

    const handleLogin = async () => {

        const codeData = {
            code: code,
        }

        try {

            const data = await fetch(`${currUrl}/code`, {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(codeData),
            })

            const dataRes = await data.json();

            if(dataRes.length > 0){
                setUserInfo(dataRes)
            }

            setCode("")

            if (dataRes.length == 0){
                setIsNotUser(true)
            }

        } catch(err) {
            setCode("")
            console.log(err)
        }
    }

  return (
    <div className="h-screen bg-gray-800 w-full flex justify-center items-center">
      <div className="bg-white w-[80%] md:w-1/2 rounded-2xl shadow-2xl flex-col flex justify-between py-10 items-center">
        {
            isNotUser ? <div className='mb-2'>Usuario no registrado...</div> : null
        }
        <div className='w-full flex justify-center items-center'>
            <div className={code.length >= 1 ? 'w-[10px] shadow-inner h-[10px] rounded-full bg-gray-400' : 'w-[10px] shadow-inner h-[10px] rounded-full bg-gray-100'}></div>
            <div className={code.length >= 2 ? 'w-[10px] ml-3 shadow-inner h-[10px] rounded-full bg-gray-400' : 'w-[10px] shadow-inner h-[10px] ml-3 rounded-full bg-gray-100'}></div>
            <div className={code.length >= 3 ? 'w-[10px] ml-3 shadow-inner h-[10px] rounded-full bg-gray-400' : 'w-[10px] shadow-inner h-[10px] ml-3 rounded-full bg-gray-100'}></div>
            <div className={code.length >= 4 ? 'w-[10px] ml-3 shadow-inner h-[10px] rounded-full bg-gray-400' : 'w-[10px] shadow-inner h-[10px] ml-3 rounded-full bg-gray-100'}></div>
        </div>
        <div className='w-full mt-10 flex flex-col justify-center items-center'>

            <div className='w-full flex justify-between px-10'>
                <button className='h-14 w-14 bg-slate-300 rounded-full' onClick={() => setCode(code + "1")}>1</button>
                <button className='h-14 w-14 bg-slate-300 rounded-full' onClick={() => setCode(code + "2")}>2</button>
                <button className='h-14 w-14 bg-slate-300 rounded-full' onClick={() => setCode(code + "3")}>3</button>
            </div>

            <div className='w-full flex justify-between px-10 mt-10'>
                <button className='h-14 w-14 bg-slate-300 rounded-full' onClick={() => setCode(code + "4")}>4</button>
                <button className='h-14 w-14 bg-slate-300 rounded-full' onClick={() => setCode(code + "5")}>5</button>
                <button className='h-14 w-14 bg-slate-300 rounded-full' onClick={() => setCode(code + "6")}>6</button>
            </div>

            <div className='w-full flex justify-between px-10 mt-10'>
                <button className='h-14 w-14 bg-slate-300 rounded-full' onClick={() => setCode(code + "7")}>7</button>
                <button className='h-14 w-14 bg-slate-300 rounded-full' onClick={() => setCode(code + "8")}>8</button>
                <button className='h-14 w-14 bg-slate-300 rounded-full' onClick={() => setCode(code + "9")}>9</button>
            </div>

            <div className='w-full flex justify-between px-10 mt-10'>
                <button className='h-14 w-14 rounded-full'></button>
                <button className='h-14 w-14 bg-slate-300 rounded-full' onClick={() => setCode(code + "0")}>0</button>
                <button className='h-14 w-14 bg-slate-300 rounded-full flex justify-center items-center'><IoBackspaceOutline className='size-6' onClick={() => {
                    if(code.length > 0){
                        setCode(code.slice(0,-1))
                    }
                }}/></button>
            </div>

        </div>
      </div>
    </div>
  )
}

export default EmployeeLogin
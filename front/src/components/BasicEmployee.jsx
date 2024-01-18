import React, { useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import profile from '../assets/profile.jpeg';

import { UserContext, userInfoContext } from '../App';

import { useContext, useState } from 'react';

import { FaCartShopping } from "react-icons/fa6";
import { IoMdPricetag } from "react-icons/io";

import { json, useNavigate } from 'react-router-dom';





function BasicEmployee() {


  const currUrl = "http://localhost:4000"

  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useContext(userInfoContext)

  const [isVerified, setIsVerified] = useContext(UserContext)


  const [addingProduct, setAddingProduct] = useState(false)

  const [okProduct, setOkProduct] = useState(false)

  const [allAreas, setAllAreas] = useState([])


  const [newProd, setNewProd] = useState({
    name: "",
    provider: "",
    org_id: userInfo[0].org_id,
    area: userInfo[0].area
  })

  if (!isVerified) {
      return (
          <div>
              Not an user.
          </div>
      )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProd((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(newProd)
  };


  const handleAllAreas = async () => {

    const dummy = {
      org_id: userInfo[0].org_id
    }

    try {
      
      const response = await fetch(`${currUrl}/allareas`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dummy)
      })

      const data = await response.json()

      if (Array.isArray(data)) {
        setAllAreas(data);
      } else {
        console.error("La respuesta del servidor no es un array:", data);
      }

    } catch(err) {
      console.log(err)
    }

  }


  const handleNewProduct = async () => {

    try {

      const response = await fetch(`${currUrl}/newprod`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newProd)
      })

      const data = await response.json()

      console.log(data)

      if (data == "OK"){
        setAddingProduct(false)
      } else {
        alert("Ocurrió un error...")
        console.log("Error")
      }

      setNewProd({
        name: "",
        provider: "",
        org_id: userInfo[0].org_id,
        area: ""
      })

    } catch(err) {
      console.log(err)
    }

  }

  useEffect(() => {
    handleAllAreas()
  }, [])

  return (
    <div className="h-screen bg-gray-800 w-full flex-col flex justify-start items-center">

      <div className='w-[90%] bg-white rounded-full flex justify-between items-center p-2 mt-5'>
          <button className='ml-3' onClick={() => {
            setUserInfo([{
              name: "",
              photo_url: ""
            }])
            navigate("/employeelogin")
          }}>
              <FaArrowLeft className='text-2xl'/>
          </button>
          
          <div className='flex justify-between items-center'>
            <div className='flex-col flex mr-5 items-end justify-between'>
              <span className=''>{userInfo[0].name}</span>
              <span className='font-light text-gray-700'>{userInfo[0].area}</span>
            </div>
            <img src={userInfo[0].photo_url} className='rounded-full h-16'/>
          </div>
      </div>


      <div className='w-[90%] bg-white rounded-2xl flex flex-col items-center justify-between mt-5 p-3'>
        
        <div className='bg-gray-400 rounded-xl py-3 w-full flex-col flex justify-between px-5 items-center mb-3 hover:bg-gray-500 transitions'><div className='w-full flex justify-between items-center' onClick={() => {
          setAddingProduct(!addingProduct)
        }}>Add Product<IoMdPricetag className='text-xl'/></div>
          {addingProduct ?
          <div className='w-full flex-col flex mt-3 justify-between items-center'>
            <input placeholder='Name' name="name" className='w-full bg-gray-100 rounded-xl px-3 py-2 mb-3' onChange={handleInputChange}></input>  
            <input placeholder='Provider' name="provider" className='w-full bg-gray-100 rounded-xl px-3 py-2 mb-3' onChange={handleInputChange}></input>
            <select name="area" onChange={handleInputChange} className='mb-3 w-full rounded-xl px-2 py-1'>
              {allAreas.map((x) => (
                <option key={x.area_name}>{x.area_name}</option>
              ))}
            </select>
            <button className='w-full bg-green-700 rounded-xl px-3 py-2' onClick={handleNewProduct}>Save</button>
          </div> : null}
        </div>
        <button className='bg-gray-400 rounded-xl py-3 w-full flex justify-between px-5 items-center hover:bg-gray-500 transitions' onClick={() => {
          navigate("/shoppinglist")
        }}>Shopping List <FaCartShopping className='text-xl'/></button>

      </div>



    </div>
  )
}

export default BasicEmployee
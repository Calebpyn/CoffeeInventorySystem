import React, { useContext, useEffect, useState } from 'react'
import profile from '../assets/profile.jpeg';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";


import { UserContext, userInfoContext } from '../App';

function ShoppingList() {

    const navigate = useNavigate()

    const [isVerified, setIsVerified] = useContext(UserContext)
    const [userInfo, setUserInfo] = useContext(userInfoContext)

    const [allProds, setAllProds] = useState([])


    const currentUrl = "https://cis-api-fx90.onrender.com/"


    const [reload, setReload] = useState([])

    
    const [filter, setFilter] = useState("")

    const [filterList, setFilterList] = useState([])

    const [areas, setAreas] = useState([])


    const handleReload = () => {
        for(let i = 0; i < allProds.length; i ++) {
            const dummy = {
                "id": allProds[i].id,
                "name": allProds[i].name,
                "provider": allProds[i].provider,
                "org_id": allProds[i].org_id,
                "area": allProds[i].area,
                "state": ""
            }
            setReload(current => [...current, dummy])
        }
    }

    const handleData = async () => {

        const dummy = {
            orgId: userInfo[0].org_id
        }


        try {   

            const response = await fetch(`${currentUrl}getprods`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(dummy)
            })

            const data = await response.json()

            setAllProds(data)

        } catch {
            console.log(err)
        }


    }

    // const handleAreas = () => {
    //     setAreas([...new Set(reload.map(producto => producto.area))])
    // }


    const handleSaveList = async () => {

        const dummy = {
            list: filterList
        }
        console.log(filterList)

        try {

            const response = await fetch(`${currentUrl}savelist`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(dummy)
            })  

            const data = await response.json()

            if(data == "OK"){
                navigate("/home")
            } else {
                alert("Error al guardar...")   
            }


        } catch(err) {
            console.log(err)
        }

    }



    const handleSelection = (id, option) => {
        setFilterList(current => {
            return current.map(prod => {
                if (prod.id == id) {
                    return {
                        ...prod,
                        state: prod.state === option ? "" : option
                    };
                }
                return prod;
            });
        });
    };

    const handleFilterChange = (e) => {
        const { value } = e.target;
        setFilter(value)
    }


    if (!isVerified) {
        return (
            <div>
                Not an user.
            </div>
        )
    }

    const handleFilter = () => {
        for (let i  = 0; i < reload.length; i ++) {
            if(reload[i].area == userInfo[0].area){
                setFilterList(current => [...current, reload[i]])
            }
        }
    }



    useEffect(() => {
        handleData()
    }, [])

    useEffect(() => {
        handleReload()
    }, [allProds.length])

    useEffect(() => {
        handleFilter()
        // handleAreas()
    }, [reload.length])


  return (
    <div className="h-screen bg-gray-800 w-full flex-col flex justify-between items-center">

        <div className='w-[90%] bg-white rounded-full flex justify-between items-center p-2 mt-5'>
            <button className='ml-3' onClick={() => {
                navigate("/home")
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

        <div className='w-[90%] bg-white rounded-xl h-[75%] flex-col flex justify-start items-center p-4'>
            
            <div className='w-full h-[10%] flex justify-center items-center'>

                <input className='border-2 border-gray-500 rounded-full w-full px-3 py-1' onChange={handleFilterChange}></input>
                {/* <select className='w-[40%] ml-5'>
                    <option>None</option>
                    {areas.map(x => (
                        <option key={x}>{x}</option>
                    ))}
                </select> */}

                <IoSearchSharp className='ml-3 text-3xl'/>
            </div>
            
            <div className='w-full overflow-scroll h-[90%]'>
                {filterList.filter((product) => product.name.toLowerCase().includes(filter.toLowerCase())).map((prod) => (
                    <div key={prod.id} className='flex flex-col justify-between items-center w-full bg-gray-300 mb-4 rounded-xl p-3'>
                        <div className='w-full mb-2'>
                            <h1 className='text-xl'>{prod.name}</h1>
                        </div>
                        <div className='flex justify-between items-center bg-gray-400 w-full rounded-xl py-1 px-3'>
                            <div className={prod.state == "RO" ? "bg-yellow-200 rounded-full px-3 py-1" : "rounded-full px-3 py-1"} onClick={() => {
                                handleSelection(prod.id, "RO")
                            }}><span>Running Out</span></div>
                            <div className={prod.state == "OS" ? "bg-red-500 rounded-full px-3 py-1" : "rounded-full px-3 py-1"} onClick={() => {
                                handleSelection(prod.id, "OS")
                            }}><span>Out of Stock</span></div>
                        </div>
                    </div>
                ))}
            </div>

            

        </div>

        <div className='w-[90%] bg-white rounded-full mb-5 flex justify-end p-2'>
            <button className='bg-blue-900 px-4 py-2 rounded-full text-white' onClick={handleSaveList}>Save</button>
        </div>

    </div>
  )
}

export default ShoppingList
import {useContext, useState} from 'react'
import Products from './Products';
import profile from '../assets/profile.jpeg';
import Inventory from './Inventory';
import Home from './Home';

import { UserContext } from '../App';

function Employee() {

    const [selected, setSelected] = useState(0);

    const [user, setUser] = useState("Caleb");

    const [isVerified, setIsVerified] = useContext(UserContext)

    if (!isVerified) {
        return (
            <div>
                Not an user
            </div>
        )
    }

  return (
    <div className='bg-gray-800 h-screen w-full flex flex-col items-center justify-around py-5'>

        <div className='bg-white shadow-2xl rounded-full w-[85%] py-5 flex justify-between px-5 text-gray-800 font-light mb-10'>
            <button onClick={() => {
                setSelected(0);
            }}>
                <span className={selected == 0 ? "bg-gray-400 rounded-full px-4 py-1 transitions" : "rounded-full px-4 py-1 transitions" }>Home</span>
            </button>
            <button onClick={() => {
                setSelected(1);
            }}>
                <span className={selected == 1 ? "bg-gray-400 rounded-full px-4 py-1 transitions" : "rounded-full px-4 py-1 transitions" }>Inventory</span>
            </button>
            <button onClick={() => {
                setSelected(2);
            }}>
                <span className={selected == 2 ? "bg-gray-400 rounded-full px-4 py-1 transitions" : "rounded-full px-4 py-1 transitions" }>Products</span>
            </button>
        </div>

        <div className='w-[85%] h-[80%]'>
            {selected == 0 ? <Home/> : null}
            {selected == 1 ? <Inventory/> : null}
            {selected == 2 ? <Products/> : null}
        </div>

        <div className='h-[15%] w-full items-end flex justify-center'>

            <div className='w-[85%] flex justify-between items-center bg-white rounded-full p-1'>

                <span className='ml-5 font-light'>{user}</span>

                <img src={profile} className='rounded-full h-16'/>

            </div>

        </div>

    </div>
  )
}

export default Employee
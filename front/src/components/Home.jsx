import React from 'react'

function Home() {
  return (
    <div className='bg-white rounded-2xl w-full h-full shadow-2xl'>

      <div className='flex-col flex justify-start items-center w-full h-full p-5'>

        <button className='bg-gray-400 w-[90%] rounded-full py-3 hover:w-[95%] transitions'>Shopping List</button>
        <button className='bg-gray-400 w-[90%] rounded-full py-3 hover:w-[95%] transitions mt-5'>New Inventory</button>
        <button className='bg-gray-400 w-[90%] rounded-full py-3 hover:w-[95%] transitions mt-5'>Settings</button>


      </div>

    </div>
  )
}

export default Home
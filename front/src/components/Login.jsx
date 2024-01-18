import React from 'react'

function Login() {
  return (
    <div className="h-screen bg-gray-800 w-full flex justify-center items-center">
      <div className="bg-white w-[60%] md:w-1/2 rounded-2xl shadow-2xl flex-col flex justify-between py-10 items-center">
        {/* <div className="flex justify-center p-5">
          <span className="font-light">Login</span>
        </div> */}
        <div className="flex justify-center w-[80%] mb-8">
          <input placeholder="User" className="px-5 py-3 w-full rounded-2xl shadow-inner bg-gray-50"></input>
        </div>

        <div className="flex justify-center w-[80%] mb-8">
          <input type="password" placeholder="Password" className="px-5 py-3 w-full rounded-2xl shadow-inner bg-gray-50"></input>
        </div>

        <div className="flex justify-center w-[80%]">
          <button className="bg-green-600 w-full rounded-full py-2 text-green-950 hover:bg-green-700 transitions">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
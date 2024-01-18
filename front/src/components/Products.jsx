import React from 'react'

function Products() {

    const categories = [
        {
            id: "1",
            name: "Cocina"
        }, {
            id: "2",
            name: "Barista"
        }, {
            id: "3",
            name: "Caja"
        }
    ]


    


  return (
    <div className='bg-white rounded-2xl w-full h-full shadow-2xl'>

        <div className='flex justify-between p-5 items-center'>
            <select className='shadow-xl rounded-full px-2 py-1'>
                <option>All Products</option>
                {categories.map((cat) => (
                    <option key={cat.id}>{cat.name}</option>
                ))}
            </select>
            <button className='bg-green-600 px-2 text-green-900 rounded-full hover:bg-green-700 py-1 transitions'>
                <span>Add Product</span>
            </button>
        </div>

        <div className='overflow-scroll'>

        </div>

    </div>
  )
}

export default Products
import React from 'react'
import Image from 'next/image'
const Card = () => {
  return (
    <div  className='gap-6 h-[415px] sm:w-[300px] w-auto  bg-black rounded-lg shadow-md relative'>
        <div className='w-20 h-10 bg-purple-400 top-0 right-0 absolute rounded-bl-lg'>
            <p className='text-white text-sm'>Technical</p>
        </div>
    
    <div className='caret-primary-100 py-5'>
    <Image 
        src='/robot.png'
        alt='cover-image'
        width={90}
        height={90}
        className='rounded-full py-5 object-fit size-[90px]' />
    </div>
 
    <div className='flex py-1 px-2 flex-row gap-3'>
        <h2>Feb,2025</h2>
        <h2>  14/34 </h2>
    </div>
    <p>
        lorem ipsum dolor sit amet, consectetur adipiscing elit.
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>

<div className='flex flex-row justify-between'>
<h2>Role</h2>
<h2>Score</h2>
</div>

     

    </div>
  )
}

export default Card
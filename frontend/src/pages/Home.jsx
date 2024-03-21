import React, { useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import MessageContainer from '../components/messages/MessageContainer'
import { ImMenu } from "react-icons/im";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <ImMenu onClick={toggleSidebar}/>
      {showSidebar && <Sidebar/>}
      <MessageContainer/>
    </div>
  )
}

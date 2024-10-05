import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import LeftSide from './components/LeftSide'
import RightSide from './components/RightSide'
import UserInputProvider  from './store/Input_data'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserInputProvider>

    <div className='App'>
      
       <div className='LeftSide'>
       <LeftSide></LeftSide>

       </div>
       <div className='RightSide'>
       
       <RightSide></RightSide>
       </div>
       
    </div>
    </UserInputProvider>
    
  )
}

export default App

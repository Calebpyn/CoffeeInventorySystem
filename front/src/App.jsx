import {HashRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Employee from './components/Employee'
import EmployeeLogin from './components/EmployeeLogin'
import ShoppingList from './components/ShoppingList'
import BasicEmployee from './components/BasicEmployee'
import { createContext, useState } from 'react'

export const UserContext = createContext()
export const userInfoContext = createContext()

function App() {

  //Change to default => false
  const [isVerified, setIsVerified] = useState(false);
  const [userInfo, setUserInfo] = useState([{
    name: "",
    photo_url: "",
    org_id: ""
  }])

  return (
    <userInfoContext.Provider value={[userInfo, setUserInfo]}>
      <UserContext.Provider value={[isVerified, setIsVerified]}>
        <HashRouter>
          <div>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/employee' isVerified={isVerified} element={<Employee/>}/>
              <Route path='/' isVerified={isVerified} userInfo={userInfo} element={<EmployeeLogin/>}/>
              <Route path='/shoppinglist' isVerified={isVerified} element={<ShoppingList/>}/>
              <Route path='/home' isVerified={isVerified} userInfo={userInfo} element={<BasicEmployee/>}/>
            </Routes>
          </div>
        </HashRouter>
      </UserContext.Provider>
    </userInfoContext.Provider>
    
  )
}

export default App

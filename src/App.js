import './App.css';
import React  from 'react';
import NavSideBar from './components/NavSidebar'
import HomeNavBar from './components/HomeNavBar'
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import SignupPage from './pages/SignupPage';
import {Routes,Route,HashRouter  as Router,  useLocation} from 'react-router-dom'
import Profile from './pages/Profile'
import Nutrition from './pages/Nutrition'
import Fitness from './pages/Fitness'
import AccountSettings from './pages/AccountSettings';

function Wrapper(){
  const location = useLocation();
  return (<>
      {["/","/login","/signup"].includes(location.pathname)?<HomeNavBar/>:<NavSideBar />}
  <Routes>
    <Route  path="/profile" element={<Profile />} />
    <Route path="/nutrition" element={<Nutrition />} />
    <Route path="/fitness" element={<Fitness />} />
    <Route path ='/accountsettings' element={<AccountSettings/>}></Route>
    <Route  path="/" element={<HomePage />} />
    <Route path="/login" element={<LogInPage />} />
    <Route path="/signup" element={<SignupPage />} />
  </Routes>
  </>)

}

function App() {
  return (
    <div className="App"  >
      <Router>
        <Routes>
          <Route path="*" element={<Wrapper />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

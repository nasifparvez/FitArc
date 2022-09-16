import './App.css';
import React  from 'react';
import NavSideBar from './components/NavSidebar'
import {Routes,Route,HashRouter  as Router} from 'react-router-dom'
import Profile from './pages/Profile'
import Nutrition from './pages/Nutrition'
import Fitness from './pages/Fitness'


function App() {
  return (
    <div className="App"  style={{
      backgroundColor: '#F1EFEF'}}>
      <Router>
        <NavSideBar />
        <Routes>
          <Route exact path="/" element={<Profile />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/fitness" element={<Fitness />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

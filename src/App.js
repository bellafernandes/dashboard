import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


import TopBar from './components/TopBar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import CalendarTasks from './pages/CalendarTasks';
import Team from './pages/Team';
import Invoices from './pages/Invoices';


function App() {
  return (
    <Router>
      
      
        {/* <Header /> */}
        <TopBar />
       
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Tasks" element={<Tasks />} />
          <Route path="/CalendarTasks" element={<CalendarTasks />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/Invoices" element={<Invoices />} />
        </Routes>
    </Router>
  );
}

export default App;

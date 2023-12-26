import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Forgotpassword from './components/Forgotpassword';
import ResetPassword from './components/Resetpassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/home' element={<Home />}/>
        <Route path='/forgotPassword' element={<Forgotpassword />}/>
        <Route path='/reset-password/:id/:token' element={<ResetPassword />}/>
      </Routes>
    </div>
  );
}

export default App;

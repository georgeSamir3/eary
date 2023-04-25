import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar/navbar';
// import Home from './pages/home';
// import Test from './pages/testfolder/test';
// import Login from './pages/login/login';
// import SignUP from './pages/signup/signup';
// import ManageUSers from './pages/manageUsers/ManageUSers';
// import ManageQuestions from './pages/manageQuestions/ManageQuestions';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      {/* <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<SignUP></SignUP>}></Route>
        <Route path='/test' element={<Test></Test>}></Route>
        <Route path='/mngUsers' element={<ManageUSers></ManageUSers>}></Route>
        <Route path='/mngQuestions' element={<ManageQuestions></ManageQuestions>}></Route>
      </Routes> */}
    <Outlet></Outlet>
    </div>
  );
}

export default App;

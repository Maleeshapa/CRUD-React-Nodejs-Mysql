import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from '../src/pages/Home';
import Create from '../src/pages/Create';

import 'bootstrap/dist/css/bootstrap.min.css';
import Read from '../src/pages/Read';
import Update from './pages/Update';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/create' element = {<Create/>} />
        <Route path='/read/:id' element = {<Read/>} />
        <Route path='/edit/:id' element = {<Update/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

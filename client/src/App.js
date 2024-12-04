import './App.css';
import Decleration from './components/Decleration';
import Form from './components/Form';
import Search from './components/Search';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
   <Router>
      <Routes>
      <Route path='/' exect element={<Form />} />
        <Route path='/find' element={<Search />} />
        <Route path='/declerations/:decId' element={<Decleration />} />
      </Routes>
   </Router>
  );
}

export default App;

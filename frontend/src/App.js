import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<ShowList/>}/>
          <Route path="/show/:id" element={<ShowDetails/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

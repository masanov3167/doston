

import { Route, Routes } from 'react-router-dom';
import './index.css'
import Form from './pages/form';
import View from './pages/view';

function App() {
  return (
   <Routes>
      <Route path='/view' element={<View />} />
      <Route path='/*' element={<Form />} /> 
   </Routes>
  );
}

export default App;

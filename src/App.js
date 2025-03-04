import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Manage from './pages/Manage'
import Song from './pages/Song'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/manage' element={<Manage />} />
          <Route path='/song/:id' element={<Song />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

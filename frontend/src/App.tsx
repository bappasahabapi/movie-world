
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import Footer from './components/shared/Footer';
import Navbar from './components/shared/Navbar';

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
              {/* <Route path="/movie/:id/edit" element={<EditMovie />} /> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

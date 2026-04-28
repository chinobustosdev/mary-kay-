import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openBooking = () => setModalOpen(true);
  const closeBooking = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onBooking={openBooking} />
      <Hero onBooking={openBooking} />
      <Services onBooking={openBooking} />
      <Booking />
      <Testimonials />
      <About />
      <Footer />
      <BookingModal isOpen={modalOpen} onClose={closeBooking} />
    </div>
  );
}

export default App;

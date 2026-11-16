import { Route, Routes } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './page/Home';

function App() {
  return (
    <section className="flex flex-col min-h-screen">
      
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      
    </section>
  );
}

export default App;

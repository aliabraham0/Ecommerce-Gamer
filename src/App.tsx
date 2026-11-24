import { Route, Routes } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './page/Home';
import Error404 from './components/Error404';

function App() {
  return (
    <section className="flex flex-col min-h-screen">
      
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      
      <Footer />
      
    </section>
  );
}

export default App;

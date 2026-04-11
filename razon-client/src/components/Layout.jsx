import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100">
      <NavBar />
      <main className="flex-grow pt-20 pb-16">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
import { Outlet } from 'react-router';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header/Header';

export const AppLayout = () => {
  return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

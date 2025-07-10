import { Outlet } from 'react-router';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header/Header';
import './AppLayout.scss';

export const AppLayout = () => {
  return (
    <div className="page">
      <Header />

      <main className="main page-container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

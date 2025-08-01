import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header/Header';
import { SignupOfferModal } from '../../components/SignupOfferModal';
import './AppLayout.scss';

export const AppLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <div className="page">
      <Header />

      <SignupOfferModal />

      <main className="main page-container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

import { Hero } from '../../components/Hero';
import { ShopByCategory } from './components/ShopByCategory';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ShopByCategory />
    </>
  );
};

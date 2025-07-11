import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { Product } from '../../types/types';
import { ProductCard } from '../ProductCard';
import { SliderButton } from '../../ui/components/SliderButton';
import { ArrowLeftIcon } from '../../ui/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../ui/icons/ArrowRightIcon';

import 'swiper/css';
import 'swiper/css/navigation';
import './ProductSlider.scss';

type Props = {
  title: string;
  products: Product[];
  isInCart: (product: Product) => boolean;
  isAddedToFavourites: (product: Product) => boolean;
  addToCart: (product: Product) => void;
  addToFavourites: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeFromFavourites: (product: Product) => void;
};

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  isInCart,
  isAddedToFavourites,
  addToCart,
  addToFavourites,
  removeFromCart,
  removeFromFavourites,
}) => {
  const prevBtnClass = `slider-btn-prev-${title.replace(/\s/g, '-')}`;
  const nextBtnClass = `slider-btn-next-${title.replace(/\s/g, '-')}`;

  return (
    <section className="product-slider">
      <div className="product-slider__header">
        <h2 className="product-slider__title">{title}</h2>
        <div className="product-slider__controls">
          <SliderButton
            icon={<ArrowLeftIcon />}
            className={prevBtnClass}
          />
          <SliderButton
            icon={<ArrowRightIcon />}
            className={nextBtnClass}
          />
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${prevBtnClass}`,
          nextEl: `.${nextBtnClass}`,
        }}
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              isInCart={isInCart}
              isAddedToFavourites={isAddedToFavourites}
              addToCart={addToCart}
              addToFavourites={addToFavourites}
              removeFromCart={removeFromCart}
              removeFromFavourites={removeFromFavourites}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

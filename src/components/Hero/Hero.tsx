import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ArrowLeftIcon } from '../../ui/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../ui/icons/ArrowRightIcon';
import './Hero.scss';

const slides = [
  {
    id: 1,
    alt: 'iPhone 14 Pro',
    responsive: true,
    desktop: '/img/main-hero-banner-desk.png',
    tablet: '/img/main-hero-banner-tab.png',
    mobile: '/img/main-hero-banner-mob.png',
  },
  {
    id: 2,
    alt: 'banner-accessories',
    responsive: false,
    desktop: '/img/banner-accessories.png',
  },
  {
    id: 3,
    alt: 'banner-phones',
    responsive: false,
    desktop: '/img/banner-phones.png',
  },
  {
    id: 4,
    alt: 'banner-tablets',
    responsive: false,
    desktop: '/img/banner-tablets.png',
  },
];

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="hero">
      <h1 className="hero__title">{t('home.title')}</h1>

      <button
        className="hero__arrow hero__arrow--prev"
        id="hero-prev"
      >
        <ArrowLeftIcon />
      </button>
      <button
        className="hero__arrow hero__arrow--next"
        id="hero-next"
      >
        <ArrowRightIcon />
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: '#hero-prev',
          nextEl: '#hero-next',
        }}
        pagination={{
          el: '#hero-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="hero__bullet ${className}"></span>`;
          },
        }}
        loop
        className="hero__swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero__slide">
              {slide.responsive ?
                <>
                  <img
                    className="hero__banner hero__banner--desktop"
                    src={slide.desktop}
                    alt={slide.alt}
                  />
                  <img
                    className="hero__banner hero__banner--tablet"
                    src={slide.tablet}
                    alt={slide.alt}
                  />
                  <img
                    className="hero__banner hero__banner--mobile"
                    src={slide.mobile}
                    alt={slide.alt}
                  />
                </>
              : <img
                  className="hero__banner"
                  src={slide.desktop}
                  alt={slide.alt}
                />
              }
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="hero__pagination"
        id="hero-pagination"
      ></div>
    </div>
  );
};

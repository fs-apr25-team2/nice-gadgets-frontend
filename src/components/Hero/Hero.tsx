import { useTranslation } from 'react-i18next';

import React from 'react';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { ArrowLeftIcon } from '../../ui/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../ui/icons/ArrowRightIcon';
import './Hero.scss';

const slides = [
  {
    id: 1,
    alt: 'iPhone 14 Pro',
    desktop: '/img/main-hero-banner-desk.png',
    tablet: '/img/main-hero-banner-tab.png',
    mobile: '/img/main-hero-banner-mob.png',
  },
  {
    id: 2,
    alt: 'Phones',
    desktop: '/img/banner-slider-2-desktop.png',
    tablet: '/img/banner-slider-2-tablet.png',
    mobile: '/img/banner-slider-2-mobile.png',
    link: '/phones',
  },
  {
    id: 3,

    alt: 'Accessories',
    desktop: '/img/banner-slider-3-desktop.png',
    tablet: '/img/banner-slider-3-tablet.png',
    mobile: '/img/banner-slider-3-mobile.png',
    link: '/accessories',
  },
  {
    id: 4,
    alt: 'Tablets',
    desktop: '/img/banner-slider-1-desktop.png',
    tablet: '/img/banner-slider-1-tablet.png',
    mobile: '/img/banner-slider-1-mobile.png',
    link: '/tablets',
  },
];

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <h1 className="hero__title">{t('home.title')}</h1>

      <div className="hero__slider">
        <button className="hero__arrow hero__arrow--prev">
          <ArrowLeftIcon />
        </button>

        <div className="hero__sliderContent">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            navigation={{
              prevEl: '.hero__arrow--prev',
              nextEl: '.hero__arrow--next',
            }}
            pagination={{
              el: '.hero__pagination',
              clickable: true,
              renderBullet: (_, className) =>
                `<span class="hero__bullet ${className}"></span>`,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect="slide"
            speed={800}
            loop
            className="hero__swiper"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="hero__slide">
                  {slide.link ?
                    <Link to={slide.link}>
                      <picture>
                        <source
                          media="(max-width: 575px)"
                          srcSet={slide.mobile}
                        />
                        <source
                          media="(max-width: 766px)"
                          srcSet={slide.tablet}
                        />
                        <img
                          className="hero__banner"
                          src={slide.desktop}
                          alt={slide.alt}
                        />
                      </picture>
                    </Link>
                  : <picture>
                      <source
                        media="(max-width: 575px)"
                        srcSet={slide.mobile}
                      />
                      <source
                        media="(max-width: 1023px)"
                        srcSet={slide.tablet}
                      />
                      <img
                        className="hero__banner"
                        src={slide.desktop}
                        alt={slide.alt}
                      />
                    </picture>
                  }
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <button className="hero__arrow hero__arrow--next">
          <ArrowRightIcon />
        </button>
      </div>
      <div
        className="hero__pagination"
        id="hero-pagination"
      ></div>
    </section>
  );
};

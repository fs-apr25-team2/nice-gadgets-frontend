import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Product, ProductOptions } from '../../types/types';
import { Loader } from '../../components/Loader';
import { useProductDetails } from '../../hooks/useProductDetails';
import { Breadcrumbs } from '../../ui/components/Breadcrumbs';
import { GoBack } from '../../ui/components/GoBack';
import { ColorSelectorsButton } from '../../ui/components/ColorSelectorsButton';
import { Button } from '../../ui/components/Button';
import { AddToFavouritesButton } from '../../ui/components/AddToFavouritesButton';
import { HeartFilledIcon } from '../../ui/icons/HeartFilledIcon';
import { HeartIcon } from '../../ui/icons/HeartIcon';
import { PageError } from '../../components/PageError';
import { ProductNotFound } from './components/ProductNotFound';
import { useProductStorage } from '../../hooks/useProductStorage';
import { ProductSlider } from '../../components/ProductSlider';
import './styles/ProductPage.scss';
import { toast } from 'react-toastify';

const getSuggestedProducts = (
  products: Product[],
  productId: string | undefined,
  count: number,
) => {
  const filteredProducts = products.filter(
    (product) => product.itemId !== productId,
  );

  const shuffledProducts = [...filteredProducts].sort(
    () => 0.5 - Math.random(),
  );

  return shuffledProducts.slice(0, count);
};

export const ProductPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    category,
    products,
    product,
    productDetails,
    productsBySelectedModel,
    isLoading,
    hasError,
    selectedImage,
    setSelectedImage,
  } = useProductDetails();
  const {
    isInCart,
    isAddedToFavourites,
    addToCart,
    removeFromCart,
    addToFavourites,
    removeFromFavourites,
  } = useProductStorage();

  const handleProductChange = (options: ProductOptions) => {
    const targetProduct = productsBySelectedModel.find(
      (p) =>
        (options.color ?
          p.color === options.color
        : p.color === productDetails?.color) &&
        (options.capacity ?
          p.capacity === options.capacity
        : p.capacity === productDetails?.capacity),
    );

    if (targetProduct && targetProduct.id !== productDetails?.id) {
      navigate(`/${category}/${targetProduct.id}`);
    }
  };

  console.log('error', hasError);
  console.log('isLoading', isLoading);
  console.log('product', productDetails);
  const suggestedProducts = useMemo(() => {
    return getSuggestedProducts(products, productDetails?.id, 12);
  }, [productDetails?.id, products]);

  return (
    <div className="product-page">
      <Breadcrumbs
        productName={productDetails?.name}
        modification="product"
      />
      <GoBack />
      {isLoading && <Loader />}
      {!productDetails && !isLoading && hasError && <PageError />}
      {!productDetails && !hasError && !isLoading && <ProductNotFound />}
      {productDetails && product && !hasError && !isLoading && (
        <>
          <h2 className="typography typography--h2 product-page__title">
            {productDetails.name}
          </h2>

          <section className="main-info">
            <div className="images">
              <div className="images__main">
                <img
                  className="images__img"
                  src={selectedImage}
                  alt={productDetails.name}
                />
              </div>

              <div className="images__slider">
                {productDetails?.images.map((image) => (
                  <div
                    key={image}
                    className="images__slider__img-wrapper"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      className="images__slider__img"
                      src={image}
                      alt={productDetails.name}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="features">
              <div className="features__head">
                <div className="colors">
                  <span className="colors__label">
                    {t('buttons.actions.product.colors')}
                  </span>
                  <div className="colors__list">
                    {productDetails.colorsAvailable.map((color) => (
                      <ColorSelectorsButton
                        key={color}
                        selected={color === productDetails.color}
                        color={color.split(' ').join('').toLowerCase()}
                        onClick={() => handleProductChange({ color })}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="features__line"></div>

              <div className="capacity">
                <span className="capacity__label">
                  {t('buttons.actions.product.capacity')}
                </span>
                <div className="capacity__list">
                  {productDetails.capacityAvailable.map((capacity) => (
                    <div
                      key={capacity}
                      className={classNames('capacity__memory', {
                        'capacity__memory--active':
                          capacity === productDetails?.capacity,
                      })}
                      onClick={() => handleProductChange({ capacity })}
                    >
                      {capacity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="features__line"></div>

              <div className="prices">
                <span className="prices__discount">
                  {productDetails.priceDiscount}
                </span>
                <span className="prices__regular">
                  ${productDetails?.priceRegular}
                </span>
              </div>

              <div className="buttons">
                <Button
                  variant="product"
                  selected={isInCart(product)}
                  onClick={() => {
                    toast.dismiss(`cart-add-${product.id}`);
                    toast.dismiss(`cart-remove-${product.id}`);
                    if (isInCart(product)) {
                      removeFromCart(product);
                      toast.error(
                        t('toast.removedFromCart', { name: product.name }),
                        {
                          toastId: `cart-remove-${product.id}`,
                          className: 'toast-add-and-remove',
                        },
                      );
                    } else {
                      addToCart(product);
                      toast.success(
                        t('toast.addedToCart', { name: product.name }),
                        {
                          toastId: `cart-add-${product.id}`,
                          className: 'toast-add-and-remove',
                        },
                      );
                    }
                  }}
                >
                  {isInCart(product) ?
                    t('buttons.actions.product.inCart')
                  : t('buttons.actions.product.toCart')}
                </Button>

                <AddToFavouritesButton
                  selected={isAddedToFavourites(product)}
                  variant="product"
                  icon={
                    isAddedToFavourites(product) ?
                      <HeartFilledIcon />
                    : <HeartIcon />
                  }
                  onClick={() => {
                    toast.dismiss(`fav-add-${product.id}`);
                    toast.dismiss(`fav-remove-${product.id}`);
                    if (isAddedToFavourites(product)) {
                      removeFromFavourites(product);
                      toast.error(
                        t('toast.removedFromFavourites', {
                          name: product.name,
                        }),
                        {
                          toastId: `fav-remove-${product.id}`,
                          className: 'toast-add-and-remove',
                        },
                      );
                    } else {
                      addToFavourites(product);
                      toast.success(
                        t('toast.addedToFavourites', { name: product.name }),
                        {
                          toastId: `fav-add-${product.id}`,
                          className: 'toast-add-and-remove',
                        },
                      );
                    }
                  }}
                />
              </div>

              <div className="descriptions">
                <div className="description">
                  <span className="description__label">
                    {t('product.specifications.screen')}
                  </span>
                  <span className="description__value">
                    {productDetails.screen}
                  </span>
                </div>
                <div className="description">
                  <span className="description__label">
                    {t('product.specifications.resolution')}
                  </span>
                  <span className="description__value">
                    {productDetails.resolution}
                  </span>
                </div>
                <div className="description">
                  <span className="description__label">
                    {t('product.specifications.processor')}
                  </span>
                  <span className="description__value">
                    {productDetails.processor}
                  </span>
                </div>
                <div className="description">
                  <span className="description__label">
                    {t('product.specifications.ram')}
                  </span>
                  <span className="description__value">
                    {productDetails.ram}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="details">
            <div className="about">
              <h3 className="about__title">{t('product.about.title')}</h3>

              <div className="details__line"></div>

              <div className="about__content">
                {productDetails.description.map((desc) => (
                  <article
                    key={desc.title}
                    className="about__article"
                  >
                    <h4 className="about__article-title">{desc.title}</h4>
                    {desc.text.map((text) => (
                      <p
                        key={text}
                        className="about__article-description"
                      >
                        {text}
                      </p>
                    ))}
                  </article>
                ))}
              </div>
            </div>

            <div className="tech-specs">
              <h3 className="tech-specs__title">
                {t('product.specifications.label')}
              </h3>

              <div className="details__line"></div>

              <div className="tech-specs__features">
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">
                    {t('product.specifications.screen')}
                  </span>
                  <span className="tech-specs__feature-value">
                    {productDetails.screen}
                  </span>
                </div>
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">
                    {t('product.specifications.resolution')}
                  </span>
                  <span className="tech-specs__feature-value">
                    {productDetails.resolution}
                  </span>
                </div>
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">
                    {t('product.specifications.processor')}
                  </span>
                  <span className="tech-specs__feature-value">
                    {productDetails.processor}
                  </span>
                </div>
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">
                    {t('product.specifications.ram')}
                  </span>
                  <span className="tech-specs__feature-value">
                    {productDetails.ram}
                  </span>
                </div>
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">
                    {t('product.specifications.builtInMemory')}
                  </span>
                  <span className="tech-specs__feature-value">
                    {productDetails.capacity}
                  </span>
                </div>
                {productDetails.camera && (
                  <div className="tech-specs__feature">
                    <span className="tech-specs__feature-label">
                      {t('product.specifications.camera')}
                    </span>
                    <span className="tech-specs__feature-value">
                      {productDetails.camera}
                    </span>
                  </div>
                )}
                {productDetails.zoom && (
                  <div className="tech-specs__feature">
                    <span className="tech-specs__feature-label">
                      {t('product.specifications.screen')}
                    </span>
                    <span className="tech-specs__feature-value">
                      {productDetails.zoom}
                    </span>
                  </div>
                )}
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">
                    {t('product.specifications.cell')}
                  </span>
                  <span className="tech-specs__feature-value">
                    {productDetails.cell.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <ProductSlider
        title={t('slider.suggested')}
        products={suggestedProducts}
        isInCart={isInCart}
        isAddedToFavourites={isAddedToFavourites}
        addToCart={addToCart}
        addToFavourites={addToFavourites}
        removeFromCart={removeFromCart}
        removeFromFavourites={removeFromFavourites}
      />
    </div>
  );
};

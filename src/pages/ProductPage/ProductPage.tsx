import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { CartProduct, Product, ProductOptions } from '../../types/types';
import './styles//ProductPage.scss';

import { Loader } from '../../components/Loader';
import { useProductDetails } from '../../hooks/useProductDetails';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Breadcrumbs } from '../../ui/components/Breadcrumbs';
import { GoBack } from '../../ui/components/GoBack';
import { ColorSelectorsButton } from '../../ui/components/ColorSelectorsButton';
import { Button } from '../../ui/components/Button';
import { AddToFavouritesButton } from '../../ui/components/AddToFavouritesButton';
import { HeartFilledIcon } from '../../ui/icons/HeartFilledIcon';
import { HeartIcon } from '../../ui/icons/HeartIcon';
import { PageError } from '../../components/PageError';
import { ProductNotFound } from './components/ProductNotFound';

export const ProductPage = () => {
  const navigate = useNavigate();
  const {
    category,
    product,
    productDetails,
    productsBySelectedModel,
    isLoading,
    hasError,
    selectedImage,
    setSelectedImage,
  } = useProductDetails();
  const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>('cart', []);
  const [favouritesItems, setFavouritesItems] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );

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

  const isProductInCart = () => {
    const foundProduct = cartItems.find(
      (cartItem) => cartItem.itemId === productDetails?.id,
    );

    return Boolean(foundProduct);
  };

  const isProductAddedToFavourites = () => {
    const foundProduct = favouritesItems.find(
      (favouritesItem) => favouritesItem.itemId === productDetails?.id,
    );

    return Boolean(foundProduct);
  };

  const handleAddToCart = () => {
    if (product) {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.itemId !== product.itemId),
      );
    }
  };

  const handleAddToFavourites = () => {
    if (product) {
      setFavouritesItems((prev) => [...prev, product]);
    }
  };

  const handleRemoveFromFavourites = () => {
    if (product) {
      setFavouritesItems(
        favouritesItems.filter(
          (favouritesItem) => favouritesItem.itemId !== product.itemId,
        ),
      );
    }
  };

  console.log('error', hasError);
  console.log('isLoading', isLoading);
  console.log('product', productDetails);

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
      {productDetails && !hasError && !isLoading && (
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
                  <span className="colors__label">Available colors</span>
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
                <span className="capacity__label">Capacity</span>
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
                  selected={isProductInCart()}
                  onClick={
                    isProductInCart() ? handleRemoveFromCart : handleAddToCart
                  }
                >
                  {isProductInCart() ? 'Added to Cart' : 'Add to Cart'}
                </Button>

                <AddToFavouritesButton
                  selected={isProductAddedToFavourites()}
                  variant="product"
                  icon={
                    isProductAddedToFavourites() ?
                      <HeartFilledIcon />
                    : <HeartIcon />
                  }
                  onClick={
                    isProductAddedToFavourites() ?
                      handleRemoveFromFavourites
                    : handleAddToFavourites
                  }
                />
              </div>

              <div className="descriptions">
                <div className="description">
                  <span className="description__label">Screen</span>
                  <span className="description__value">
                    {productDetails.screen}
                  </span>
                </div>
                <div className="description">
                  <span className="description__label">Resolution</span>
                  <span className="description__value">
                    {productDetails.resolution}
                  </span>
                </div>
                <div className="description">
                  <span className="description__label">Processor</span>
                  <span className="description__value">
                    {productDetails.processor}
                  </span>
                </div>
                <div className="description">
                  <span className="description__label">RAM</span>
                  <span className="description__value">
                    {productDetails.ram}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="details">
            <div className="about">
              <h3 className="about__title">About</h3>

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
              <h3 className="tech-specs__title">Tech specs</h3>

              <div className="details__line"></div>

              <div className="tech-specs__features">
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">Screen</span>
                  <span className="tech-specs__feature-value">
                    {productDetails.screen}
                  </span>
                </div>
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">Resolution</span>
                  <span className="tech-specs__feature-value">
                    {productDetails.resolution}
                  </span>
                </div>
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">Processor</span>
                  <span className="tech-specs__feature-value">
                    {productDetails.processor}
                  </span>
                </div>
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">RAM</span>
                  <span className="tech-specs__feature-value">
                    {productDetails.ram}
                  </span>
                </div>
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">
                    Build in memory
                  </span>
                  <span className="tech-specs__feature-value">
                    {productDetails.capacity}
                  </span>
                </div>
                {productDetails.camera && (
                  <div className="tech-specs__feature">
                    <span className="tech-specs__feature-label">Camera</span>
                    <span className="tech-specs__feature-value">
                      {productDetails.camera}
                    </span>
                  </div>
                )}
                {productDetails.zoom && (
                  <div className="tech-specs__feature">
                    <span className="tech-specs__feature-label">Zoom</span>
                    <span className="tech-specs__feature-value">
                      {productDetails.zoom}
                    </span>
                  </div>
                )}
                <div className="tech-specs__feature">
                  <span className="tech-specs__feature-label">Cell</span>
                  <span className="tech-specs__feature-value">
                    {productDetails.cell.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

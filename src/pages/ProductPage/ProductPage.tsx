import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { CartProduct, Product, ProductOptions } from '../../types/types';
import './styles//ProductPage.scss';

import { Loader } from '../../components/Loader';
import { useProductDetails } from '../../hooks/useProductDetails';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ColorSelectorsButton } from '../../ui/components/ColorSelectorsButton';
import { Button } from '../../ui/components/Button';
import { AddToFavouritesButton } from '../../ui/components/AddToFavouritesButton';
import { ArrowLeftIcon } from '../../ui/icons/ArrowLeftIcon';
import { HeartFilledIcon } from '../../ui/icons/HeartFilledIcon';
import { HeartIcon } from '../../ui/icons/HeartIcon';

export const ProductPage = () => {
  const navigate = useNavigate();
  const {
    category,
    product,
    productDetails,
    productsBySelectedModel,
    isLoading,
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

  const handleAddToFavourites = () => {
    if (product) {
      setFavouritesItems((prev) => [...prev, product]);
    }
  };

  return (
    <div className="page">
      {!productDetails && isLoading && <Loader />}
      {!productDetails && !isLoading && <div>Product not found</div>}
      {productDetails && !isLoading && (
        <>
          <button
            className="page__back"
            onClick={() => navigate(-1)}
          >
            {ArrowLeftIcon()}
            <span className="page__back-text">Back</span>
          </button>

          <h2 className="typography typography--h2 page__title">
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
                        color={color}
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
                  onClick={handleAddToCart}
                  disabled={isProductInCart()}
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
                  onClick={handleAddToFavourites}
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
        </>
      )}
    </div>
  );
};

import './CatalogPage.scss';
import { ProductCategory } from '../../types/types';
import { Heading } from '../../ui/components/Heading';
import { CATALOG_TITLES } from '../../constants';
import { Navigate, useParams } from 'react-router';
import { BreadcrumbButton } from '../../ui/components/BreadcrumbButton';
import { ArrowRightIcon } from '../../ui/icons/ArrowRightIcon';
import { ArrowLeftIcon } from '../../ui/icons/ArrowLeftIcon';
import { HomeIcon } from '../../ui/icons/HomeIcon';
import { Dropdown } from '../../ui/components/Dropdown';
import { useEffect, useState } from 'react';
import { Product } from '../../types/types';
import { getProducts } from '../../utils/api';
import { PaginationButton } from '../../ui/components/PaginationButton';

const categories: ProductCategory[] = ['phones', 'tablets', 'accessories'];

function isProductCategory(value: string): value is ProductCategory {
  return categories.includes(value as ProductCategory);
}

export const CatalogPage: React.FC = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isProductCategory(category as string)) {
    return <Navigate to={'/not-found'} />;
  }

  // load data and add logic

  return (
    <section className="catalog-page">
      <nav className="catalog-page__breadcrumb">
        <BreadcrumbButton
          icon={<HomeIcon />}
          onClick={() => console.log('Go home')}
        />
        <BreadcrumbButton
          icon={<ArrowRightIcon />}
          onClick={() => console.log('Category clicked')}
          iconColor="var(--secondary-color)"
        >
          Phones
        </BreadcrumbButton>
      </nav>
      <Heading
        tag="h1"
        title={CATALOG_TITLES[category as ProductCategory]}
      />
      <p className="catalog-page__subtitle">95 models</p>
      <div className="catalog-page__top-controls">
        <div className="catalog-page__control">
          <p className="catalog-page__control-label">Sort by</p>
          <Dropdown
            label="Newest"
            options={[
              { label: 'Newest' },
              { label: 'Alphabetically' },
              { label: 'Cheapest' },
            ]}
          />
        </div>

        <div className="catalog-page__control">
          <p className="catalog-page__control-label">Items on page</p>
          <Dropdown
            label="16"
            options={[
              { label: '4' },
              { label: '8' },
              { label: '16' },
              { label: 'All' },
            ]}
          />
        </div>
      </div>

      {isLoading && <p>Loading...</p>}

      {hasError && (
        <div>
          <p>Something went wrong</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )}

      {!isLoading && !hasError && (
        <div className="product-list">
          {products.slice(0, 16).map((product) => (
            <div
              key={product.itemId}
              className="product-card-placeholder"
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
      {/* <div>Catalog page</div> */}

      <div className="catalog-page__pagination">
        <PaginationButton onClick={() => console.log('Prev')}>
          <ArrowLeftIcon />
        </PaginationButton>

        <div className="catalog-page__pagination-numbers">
          <PaginationButton selected>1</PaginationButton>
          <PaginationButton>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
          <PaginationButton>4</PaginationButton>
        </div>

        <PaginationButton onClick={() => console.log('Next')}>
          <ArrowRightIcon />
        </PaginationButton>
      </div>
    </section>
  );
};

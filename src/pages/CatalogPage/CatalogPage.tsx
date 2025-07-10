import './CatalogPage.scss';
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router';

import { ProductCategory, Product } from '../../types/types';
import { getProducts } from '../../utils/api';

import { ProductList } from '../../components/ProductList';
import { Heading } from '../../ui/components/Heading';
import { CATALOG_TITLES } from '../../constants';

import { BreadcrumbButton } from '../../ui/components/BreadcrumbButton';
import { ArrowRightIcon } from '../../ui/icons/ArrowRightIcon';
import { ArrowLeftIcon } from '../../ui/icons/ArrowLeftIcon';
import { HomeIcon } from '../../ui/icons/HomeIcon';
import { Dropdown } from '../../ui/components/Dropdown';
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
  const [sortBy, setSortBy] = useState('Newest');
  const [itemsPerPage, setItemsPerPage] = useState<number | 'All'>(16);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isProductCategory(category as string)) {
    return <Navigate to="/not-found" />;
  }

  const filteredProducts = products.filter(
    (product) => product.category === category,
  );

  const sortProducts = (productsToSort: Product[]) => {
    switch (sortBy) {
      case 'Alphabetically':
        return [...productsToSort].sort((firstProduct, secondProduct) =>
          firstProduct.name.localeCompare(secondProduct.name),
        );
      case 'Cheapest':
        return [...productsToSort].sort(
          (firstProduct, secondProduct) =>
            firstProduct.price - secondProduct.price,
        );
      default:
        return productsToSort;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  const itemsCount =
    itemsPerPage === 'All' ? sortedProducts.length : itemsPerPage;
  const pageCount = Math.ceil(sortedProducts.length / itemsCount);
  const currentItems = sortedProducts.slice(
    currentPage * itemsCount,
    currentPage * itemsCount + itemsCount,
  );

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const visiblePagesCount = 4;
    const totalPageCount = pageCount;
    const currentPageIndex = currentPage;

    let startPageIndex = Math.max(
      0,
      currentPageIndex - Math.floor(visiblePagesCount / 2),
    );
    let endPageIndex = startPageIndex + visiblePagesCount;

    if (endPageIndex > totalPageCount) {
      endPageIndex = totalPageCount;
      startPageIndex = Math.max(0, endPageIndex - visiblePagesCount);
    }

    const renderedPages = [];

    for (
      let pageIndex = startPageIndex;
      pageIndex < endPageIndex;
      pageIndex++
    ) {
      renderedPages.push(
        <PaginationButton
          key={pageIndex}
          selected={pageIndex === currentPageIndex}
          onClick={() => handlePageClick(pageIndex)}
        >
          {pageIndex + 1}
        </PaginationButton>,
      );
    }

    return renderedPages;
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

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
          {category}
        </BreadcrumbButton>
      </nav>

      <Heading
        tag="h1"
        title={CATALOG_TITLES[category]}
      />
      <p className="catalog-page__subtitle">{filteredProducts.length} models</p>

      <div className="catalog-page__top-controls">
        <div className="catalog-page__control">
          <p className="catalog-page__control-label">Sort by</p>
          <Dropdown
            label={sortBy}
            options={[
              { label: 'Newest' },
              { label: 'Alphabetically' },
              { label: 'Cheapest' },
            ]}
            onSelect={(option) => {
              setSortBy(option.label);
              setCurrentPage(0);
            }}
          />
        </div>

        <div className="catalog-page__control">
          <p className="catalog-page__control-label">Items on page</p>
          <Dropdown
            label={itemsPerPage === 'All' ? 'All' : itemsPerPage.toString()}
            options={[
              { label: '4' },
              { label: '8' },
              { label: '16' },
              { label: 'All' },
            ]}
            onSelect={(option) => {
              setItemsPerPage(
                option.label === 'All' ? 'All' : Number(option.label),
              );
              setCurrentPage(0);
            }}
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
      {!isLoading && !hasError && <ProductList products={currentItems} />}

      {pageCount > 1 && (
        <div className="catalog-page__pagination">
          <PaginationButton
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            <ArrowLeftIcon />
          </PaginationButton>

          {renderPageNumbers()}

          <PaginationButton
            onClick={handleNext}
            disabled={currentPage === pageCount - 1}
          >
            <ArrowRightIcon />
          </PaginationButton>
        </div>
      )}
    </section>
  );
};

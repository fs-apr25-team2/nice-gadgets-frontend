import './CatalogPage.scss';

import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate, useSearchParams } from 'react-router';

import { ProductCategory, Product } from '../../types/types';
import { getProducts } from '../../utils/api';

import { ProductList } from '../../components/ProductList';
import { Heading } from '../../ui/components/Heading';
import { CATALOG_TITLES } from '../../constants';

import { ArrowRightIcon } from '../../ui/icons/ArrowRightIcon';
import { ArrowLeftIcon } from '../../ui/icons/ArrowLeftIcon';
import { Dropdown } from '../../ui/components/Dropdown';
import { PaginationButton } from '../../ui/components/PaginationButton';
import { Breadcrumbs } from '../../ui/components/Breadcrumbs';
import { PageError } from '../../components/PageError';
import { Loader } from '../../components/Loader';
import { CatalogEmpty } from './components/CatalogEmpty/CatalogEmpty';

const categories: ProductCategory[] = ['phones', 'tablets', 'accessories'];

function isProductCategory(value: string): value is ProductCategory {
  return categories.includes(value as ProductCategory);
}

const sortOptionsMap: Record<string, string> = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
};

const sortLabelToParam: Record<string, string> = {
  Newest: 'age',
  Alphabetically: 'title',
  Cheapest: 'price',
};

export const CatalogPage: React.FC = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const categoryParam = category as string;

  const sortParam = searchParams.get('sort') || 'age';
  const pageParam = Number(searchParams.get('page')) || 1;

  const perPageParam = searchParams.get('perPage') || '16';
  const initialPerPage = perPageParam === 'All' ? 'All' : Number(perPageParam);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'All'>(
    initialPerPage,
  );

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isProductCategory(categoryParam)) {
    return <Navigate to="/not-found" />;
  }

  const safeCategory: ProductCategory = categoryParam;

  const filteredProducts = products.filter(
    (product) => product.category === safeCategory,
  );

  const sortProducts = (productsToSort: Product[]) => {
    switch (sortParam) {
      case 'title':
        return [...productsToSort].sort((firstProduct, secondProduct) =>
          firstProduct.name.localeCompare(secondProduct.name),
        );
      case 'price':
        return [...productsToSort].sort(
          (firstProduct, secondProduct) =>
            firstProduct.price - secondProduct.price,
        );
      case 'age':
        return [...productsToSort].sort((a, b) => b.year - a.year);
      default:
        return productsToSort;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  const itemsCount =
    itemsPerPage === 'All' ? sortedProducts.length : itemsPerPage;
  const pageCount = Math.ceil(sortedProducts.length / itemsCount);
  const currentItems = sortedProducts.slice(
    (pageParam - 1) * itemsCount,
    (pageParam - 1) * itemsCount + itemsCount,
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageParam]);

  const handlePageClick = (page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.set('page', page.toString());
      return newParams;
    });
  };

  const renderPageNumbers = () => {
    const visiblePagesCount = 4;
    const totalPageCount = pageCount;
    const currentPageIndex = pageParam;

    let startPageIndex = Math.max(
      1,
      currentPageIndex - Math.floor(visiblePagesCount / 2),
    );
    let endPageIndex = startPageIndex + visiblePagesCount;

    if (endPageIndex > totalPageCount) {
      endPageIndex = totalPageCount;
      startPageIndex = Math.max(1, endPageIndex - visiblePagesCount);
    }

    const renderedPages = [];

    for (
      let pageIndex = startPageIndex;
      pageIndex <= endPageIndex;
      pageIndex++
    ) {
      renderedPages.push(
        <PaginationButton
          key={pageIndex}
          selected={pageIndex === currentPageIndex}
          onClick={() => handlePageClick(pageIndex)}
        >
          {pageIndex}
        </PaginationButton>,
      );
    }

    return renderedPages;
  };

  const handlePrevious = () => {
    if (pageParam > 1) {
      handlePageClick(pageParam - 1);
    }
  };

  const handleNext = () => {
    if (pageParam < pageCount) {
      handlePageClick(pageParam + 1);
    }
  };

  return (
    <section className="catalog-page">
      <div className="catalog-page__breadcrumb">
        <Breadcrumbs />
      </div>

      <Heading
        tag="h1"
        title={CATALOG_TITLES[safeCategory]}
      />

      {isLoading && <Loader />}
      {!isLoading && hasError && <PageError />}
      {!isLoading && !hasError && products.length === 0 && (
        <CatalogEmpty category={safeCategory} />
      )}
      {!isLoading && !hasError && filteredProducts.length > 0 && (
        <>
          <p className="catalog-page__subtitle">
            {filteredProducts.length} models
          </p>

          <div className="catalog-page__top-controls">
            <div className="catalog-page__control">
              <p className="catalog-page__control-label">Sort by</p>
              <Dropdown
                label={sortOptionsMap[sortParam]}
                options={[
                  { label: 'Newest' },
                  { label: 'Alphabetically' },
                  { label: 'Cheapest' },
                ]}
                onSelect={(option) => {
                  const param = sortLabelToParam[option.label] || 'age';
                  setSearchParams((prev) => {
                    const newParams = new URLSearchParams(prev.toString());
                    newParams.set('sort', param);
                    newParams.delete('page');
                    return newParams;
                  });
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
                  const newValue =
                    option.label === 'All' ? 'All' : Number(option.label);
                  setItemsPerPage(newValue);
                  setSearchParams((prev) => {
                    const newParams = new URLSearchParams(prev.toString());
                    newParams.set('perPage', option.label);
                    newParams.delete('page');
                    return newParams;
                  });
                }}
              />
            </div>
          </div>

          <ProductList products={currentItems} />

          {pageCount > 1 && (
            <div
              ref={paginationRef}
              className="catalog-page__pagination"
            >
              <PaginationButton
                onClick={handlePrevious}
                disabled={pageParam === 1}
              >
                <ArrowLeftIcon />
              </PaginationButton>

              {renderPageNumbers()}

              <PaginationButton
                onClick={handleNext}
                disabled={pageParam === pageCount}
              >
                <ArrowRightIcon />
              </PaginationButton>
            </div>
          )}
        </>
      )}
    </section>
  );
};

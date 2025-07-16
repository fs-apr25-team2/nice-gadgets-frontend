import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ProductCategory, Product } from '../../types/types';
import { getProducts } from '../../utils/api';

import { ProductList } from '../../components/ProductList';
import { Heading } from '../../ui/components/Heading';

import { ArrowRightIcon } from '../../ui/icons/ArrowRightIcon';
import { ArrowLeftIcon } from '../../ui/icons/ArrowLeftIcon';
import { Dropdown } from '../../ui/components/Dropdown';
import { PaginationButton } from '../../ui/components/PaginationButton';
import { Breadcrumbs } from '../../ui/components/Breadcrumbs';
import { PageError } from '../../components/PageError';
import { Loader } from '../../components/Loader';
import { CatalogEmpty } from './components/CatalogEmpty/CatalogEmpty';

import './CatalogPage.scss';
import { SearchInput } from '../../ui/components/SearchInput.tsx';
import { Button } from '../../ui/components/Button';

const categories: ProductCategory[] = ['phones', 'tablets', 'accessories'];

function isProductCategory(value: string): value is ProductCategory {
  return categories.includes(value as ProductCategory);
}

const sortOptions = [
  { labelKey: 'catalog.dropdown.sortBy.options.newest', value: 'age' },
  {
    labelKey: 'catalog.dropdown.sortBy.options.alphabetically',
    value: 'title',
  },
  { labelKey: 'catalog.dropdown.sortBy.options.cheapest', value: 'price' },
];

const perPageOptions = [
  { labelKey: 'catalog.dropdown.perPage.options.4', value: '4' },
  { labelKey: 'catalog.dropdown.perPage.options.8', value: '8' },
  { labelKey: 'catalog.dropdown.perPage.options.16', value: '16' },
  { labelKey: 'catalog.dropdown.perPage.options.all', value: 'All' },
];

export const CatalogPage: React.FC = () => {
  const { t } = useTranslation();
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

  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const filteredProducts = products.filter((product) => {
    const matchesCategory = product.category === safeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const sortProducts = (productsToSort: Product[]) => {
    switch (sortParam) {
      case 'title':
        return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return [...productsToSort].sort((a, b) => a.price - b.price);
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
    let endPageIndex = startPageIndex + visiblePagesCount - 1;

    if (endPageIndex > totalPageCount) {
      endPageIndex = totalPageCount;
      startPageIndex = Math.max(1, endPageIndex - visiblePagesCount + 1);
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
        title={t(`catalog.${safeCategory}.title`)}
      />

      {isLoading && <Loader />}
      {!isLoading && hasError && <PageError />}
      {!isLoading && !hasError && products.length === 0 && (
        <CatalogEmpty category={safeCategory} />
      )}
      {!isLoading && !hasError && (
        <>
          <p className="catalog-page__subtitle">
            {t('models.total', { count: filteredProducts.length })}
          </p>

          <div className="catalog-page__top-controls">
            <div className="catalog-page__control">
              <p className="catalog-page__control-label">
                {t('catalog.dropdown.sortBy.label')}
              </p>
              <Dropdown
                label={t(
                  sortOptions.find((opt) => opt.value === sortParam)
                    ?.labelKey || '',
                )}
                options={sortOptions.map((opt) => ({
                  label: t(opt.labelKey),
                  value: opt.value,
                }))}
                onSelect={(option) => {
                  setSearchParams((prev) => {
                    const newParams = new URLSearchParams(prev.toString());
                    newParams.set('sort', option.value as string);
                    newParams.delete('page');
                    return newParams;
                  });
                }}
              />
            </div>

            <div className="catalog-page__control">
              <p className="catalog-page__control-label">
                {t('catalog.dropdown.perPage.label')}
              </p>
              <Dropdown
                label={t(
                  perPageOptions.find((opt) => opt.value === perPageParam)
                    ?.labelKey || '',
                )}
                options={perPageOptions.map((opt) => ({
                  label: t(opt.labelKey),
                  value: opt.value,
                }))}
                onSelect={(option) => {
                  const newValue =
                    option.value === 'All' ? 'All' : Number(option.value);
                  setItemsPerPage(newValue);
                  setSearchParams((prev) => {
                    const newParams = new URLSearchParams(prev.toString());
                    newParams.set('perPage', option.value as string);
                    newParams.delete('page');
                    return newParams;
                  });
                }}
              />
            </div>

            <div className="catalog-page__control">
              <p className="catalog-page__control-label">
                {t('catalog.search.label')}
              </p>
              <SearchInput />
            </div>
          </div>

          {filteredProducts.length > 0 ?
            <ProductList products={currentItems} />
          : <div className="catalog-page__not-found">
              <p className="catalog-page__not-found-message">
                {t('catalog.search.noResults')}
              </p>

              <Button
                variant="empty"
                onClick={() => {
                  const newParams = new URLSearchParams(
                    searchParams.toString(),
                  );
                  newParams.delete('search');
                  newParams.delete('page');
                  setSearchParams(newParams);
                }}
              >
                {t('catalog.search.clear')}
              </Button>
            </div>
          }

          {pageCount > 1 && filteredProducts.length > 0 && (
            <div
              ref={paginationRef}
              className="catalog-page__pagination"
            >
              <PaginationButton
                onClick={handlePrevious}
                disabled={pageParam === 1}
                isArrow
              >
                <ArrowLeftIcon />
              </PaginationButton>

              <div className="catalog-page__pagination-numbers">
                {renderPageNumbers()}
              </div>

              <PaginationButton
                onClick={handleNext}
                disabled={pageParam === pageCount}
                isArrow
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

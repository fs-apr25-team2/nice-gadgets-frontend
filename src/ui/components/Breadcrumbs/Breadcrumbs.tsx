import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowRightIcon } from '../../../ui/icons/ArrowRightIcon';
import { HomeIcon } from '../../../ui/icons/HomeIcon';
import cn from 'classnames';
import './Breadcrumbs.scss';
import { ProductCategory } from '../../../types/types';
import { useTranslation } from 'react-i18next';

interface BreadcrumbsProps {
  productName?: string;
  modification?: string;
}

export const Breadcrumbs = ({
  productName,
  modification,
}: BreadcrumbsProps) => {
  const { t } = useTranslation();
  const { category } = useParams();
  const location = useLocation();

  const safeCategory = category as ProductCategory;

  const staticRoutes: Record<string, string> = {
    register: t('breadcrumbs.register'),
    login: t('breadcrumbs.login'),
  };

  const pathSegment = location.pathname.split('/').filter(Boolean)[0];
  const staticTitle = staticRoutes[pathSegment];

  const categoryTitle =
    category && !staticTitle ? t(`breadcrumbs.${safeCategory}`) : staticTitle;

  return (
    <nav
      className={cn('breadcrumbs', {
        [`breadcrumbs--${modification}`]: Boolean(modification),
      })}
      aria-label="breadcrumbs"
    >
      <Link
        to="/"
        className="breadcrumbs__link-to-home"
      >
        {HomeIcon()}
      </Link>

      {productName ?
        <span className="breadcrumbs__item">
          <span className="breadcrumbs__separator">{ArrowRightIcon()}</span>
          <Link
            to={`/${safeCategory}`}
            className={`breadcrumbs__link ${
              !productName ? 'breadcrumbs__link--active' : ''
            }`}
          >
            {categoryTitle}
          </Link>
        </span>
      : <>
          <span className="breadcrumbs__separator">{ArrowRightIcon()}</span>
          <span className="breadcrumbs__current">{categoryTitle}</span>
        </>
      }

      {productName && (
        <>
          <span className="breadcrumbs__separator">{ArrowRightIcon()}</span>
          <span className="breadcrumbs__current">{productName}</span>
        </>
      )}
    </nav>
  );
};

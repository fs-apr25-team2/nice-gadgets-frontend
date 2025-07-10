import { Link, useLocation } from 'react-router';

import { ArrowRightIcon } from '../../../ui/icons/ArrowRightIcon';
import { HomeIcon } from '../../../ui/icons/HomeIcon';

import './Breadcrumbs.scss';

interface BreadcrumbsProps {
  productName?: string;
}

export const Breadcrumbs = ({ productName }: BreadcrumbsProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <nav
      className="breadcrumbs"
      aria-label="breadcrumbs"
    >
      <Link
        to="/"
        className="breadcrumbs__link"
      >
        {HomeIcon()}
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;
        const isSecondLast = index === pathnames.length - 2;

        const shouldHighlight = productName ? isSecondLast : isLast;

        return (
          <span
            key={routeTo}
            className="breadcrumbs__item"
          >
            <span className="breadcrumbs__separator">{ArrowRightIcon()}</span>

            {isLast && !productName ?
              <span className="breadcrumbs__current breadcrumbs__current--disabled">
                {capitalize(name)}
              </span>
            : <Link
                to={routeTo}
                className={`breadcrumbs__link ${
                  shouldHighlight ? 'breadcrumbs__link--active' : ''
                }`}
              >
                {capitalize(name)}
              </Link>
            }
          </span>
        );
      })}

      {productName && (
        <>
          <span className="breadcrumbs__separator">
            <ArrowRightIcon />
          </span>
          <span className="breadcrumbs__current breadcrumbs__current--disabled">
            {productName}
          </span>
        </>
      )}
    </nav>
  );
};

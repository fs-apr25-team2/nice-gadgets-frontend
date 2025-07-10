import { Link, useLocation } from 'react-router';
import { ArrowRightIcon } from '../../../ui/icons/ArrowRightIcon';
import { HomeIcon } from '../../../ui/icons/HomeIcon';
import cn from 'classnames';
import './Breadcrumbs.scss';

interface BreadcrumbsProps {
  productName?: string;
  modification?: string;
}

export const Breadcrumbs = ({
  productName,
  modification,
}: BreadcrumbsProps) => {
  const location = useLocation();

  const rawPathnames = location.pathname.split('/').filter(Boolean);
  const pathnames = productName ? rawPathnames.slice(0, -1) : rawPathnames;

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <nav
      className={cn('breadcrumbs', {
        [`breadcrumbs--${modification}`]: Boolean(modification),
      })}
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

        return (
          <span
            key={routeTo}
            className="breadcrumbs__item"
          >
            <span className="breadcrumbs__separator">{ArrowRightIcon()}</span>
            <Link
              to={routeTo}
              className={`breadcrumbs__link ${
                isLast && !productName ? 'breadcrumbs__link--active' : ''
              }`}
            >
              {capitalize(name)}
            </Link>
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

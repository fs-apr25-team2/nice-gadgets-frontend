import { rightsText } from './rightsText';
import { GoBack } from '../../ui/components/GoBack';
import './RightsPage.scss';

export const RightsPage = () => {
  return (
    <div className="rights__wrapper">
      <GoBack />

      <h1 className="rights__title typography typography--h1">
        Welcome to Nice Gadgets!
      </h1>

      <p className="rights__text">
        By using this website, you agree to the following terms and policies.
        Please read them carefully before using the site.
      </p>

      {rightsText.map(({ title, content, id }) => (
        <div
          key={id}
          className="rights__section"
        >
          <h2 className="rights__section-title typography typography--h3">
            {title}
          </h2>
          <p className="rights__text">{content}</p>
        </div>
      ))}
    </div>
  );
};

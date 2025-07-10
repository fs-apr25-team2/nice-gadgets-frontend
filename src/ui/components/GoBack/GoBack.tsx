import { ArrowLeftIcon } from '../../../ui/icons/ArrowLeftIcon';
import { useNavigate } from 'react-router';
import './GoBack.scss';

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <button
      className="backButton"
      onClick={() => navigate(-1)}
    >
      {ArrowLeftIcon()}
      <span className="backButton__text">Back</span>
    </button>
  );
};

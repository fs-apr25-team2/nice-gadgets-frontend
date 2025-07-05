import './Heading.scss';

type Props = {
  title: string;
};

// eslint-disable-next-line react/prop-types
export const Heading: React.FC<Props> = ({ title }) => {
  return <h1>{title}</h1>;
};

import classNames from 'classnames';
import './Heading.scss';

type Tag = 'h1' | 'h2' | 'h3' | 'h4';

type Props = {
  tag: Tag;
  title: string;
};

// eslint-disable-next-line react/prop-types
export const Heading: React.FC<Props> = ({ tag, title }) => {
  const Tag = tag;

  return (
    <Tag className={classNames('typography', `typography--${tag}`)}>
      {title}
    </Tag>
  );
};

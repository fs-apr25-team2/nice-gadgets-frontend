import { LinkedinIcon } from '../../../ui/icons/LinkedinIcon';
import { TelegramIcons } from '../../../ui/icons/TelegramIcons';
import { GmailIcon } from '../../../ui/icons/GmailIcons';
import { GithubIcon } from '../../../ui/icons/GithubIcon';
import { TeamMember } from '../../../types/types';

import './TeamCard.scss';

interface TeamCardProps {
  person: TeamMember;
}

export const TeamCard = ({ person }: TeamCardProps) => {
  const {
    name,
    photo,
    position,
    description,
    github,
    linkedin,
    telegram,
    email,
  } = person;
  return (
    <div className="team-card">
      <img
        src={photo}
        alt={name}
        className="team-card__photo"
      />
      <h3 className="team-card__name">{name}</h3>
      <p className="team-card__position">{position}</p>
      <p className="team-card__description">{description}</p>

      <ul className="team-card__socials">
        <li>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
        </li>
        <li>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon />
          </a>
        </li>
        <li>
          <a
            href={telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcons />
          </a>
        </li>
        <li>
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GmailIcon />
          </a>
        </li>
      </ul>
    </div>
  );
};

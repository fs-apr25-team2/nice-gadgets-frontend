import { useEffect, useState } from 'react';
import { GoBack } from '../../ui/components/GoBack';
import { Button } from '../../ui/components/Button';
import { Loader } from '../../components/Loader';
import { TeamCard } from './Components';
import { getTeamMembers } from '../../utils/api';
import { TeamMember } from '../../types/types';

import './ContactsPage.scss';

export const ContactsPage = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTeamMembers()
      .then(setTeam)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="contacts">
      <GoBack />
      <h1 className="contacts__title">Our Team</h1>
      <p className="contacts__about">
        We are a team of passionate Front-End Developers who collaborated on
        this project following real-life workflows and role distributions. Our
        team combined strengths in UI/UX, state management, component
        architecture, and project coordination, simulating a professional
        development environment.
      </p>
      {isLoading && <Loader />}
      {hasError && (
        <div className="contacts__error">
          <p>Something went wrong</p>
          <Button
            variant="product"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </div>
      )}
      <div className="contacts__cards">
        {team.map((person) => (
          <TeamCard
            person={person}
            key={person.id}
          />
        ))}
      </div>
    </div>
  );
};

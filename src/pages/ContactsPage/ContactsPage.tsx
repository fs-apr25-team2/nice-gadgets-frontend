/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoBack } from '../../ui/components/GoBack';
import { PageError } from '../../components/PageError';
import { Loader } from '../../components/Loader';
import { LANG_KEY } from '../../constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Language, TeamMember } from '../../types/types';
import { TeamCard } from './Components';
import { getTeamMembersEN, getTeamMembersUA } from '../../utils/api';

import './ContactsPage.scss';

export const ContactsPage = () => {
  const { t } = useTranslation();
  const [lang] = useLocalStorage<Language>(LANG_KEY, Language.EN);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = null;
        if (lang === Language.UA) {
          data = await getTeamMembersUA();
        } else {
          data = await getTeamMembersEN();
        }
        setTeam(data);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  return (
    <div className="contacts">
      <GoBack />
      {isLoading && <Loader />}
      {hasError && <PageError />}
      {!isLoading && !hasError && team.length > 0 && (
        <div className="contacts__cards">
          {team.map((person) => (
            <TeamCard
              person={person}
              key={person.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

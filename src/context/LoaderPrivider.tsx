import { LoaderContext } from './LoaderContext';
import { ReactNode, useState } from 'react';

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  return (
    <LoaderContext.Provider
      value={{
        isFirstVisit,
        setIsFirstVisit,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

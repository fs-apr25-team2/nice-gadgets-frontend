/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

export type LoaderContextType = {
  isFirstVisit: boolean;
  setIsFirstVisit: (value: boolean) => void;
};

export const LoaderContext = createContext<LoaderContextType>({
  isFirstVisit: true,
  setIsFirstVisit: (_: boolean) => {},
});

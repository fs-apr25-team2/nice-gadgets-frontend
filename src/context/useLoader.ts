import { useContext } from 'react';
import { LoaderContext } from './LoaderContext';

export const useLoader = () => useContext(LoaderContext);

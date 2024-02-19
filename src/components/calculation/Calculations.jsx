import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { calculationManager } from './service/calculationManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { CalculationList } from './CalculationList';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { SpeedDialSection } from './SpeedDialSection';

export const Calculations = () => {
  const [query, setQuery] = useState(''); // query for search
  const { data, isLoading, isError } = useQuery(
    ['calculation'],
    calculationManager.getCalculationList
  ); // fetch all calculations

  const loadingIndicator = isLoading && <Loader />;
  const errorIndicator = isError && (
    <Error message={'Failed to fetch calculations. Please try again later!'} />
  );
  const calculationListComponent = data && <CalculationList query={query} calculationList={data} />;

  return (
    <div>
      <Header />
      <SearchBar query={query} setQuery={setQuery} />
      <SpeedDialSection />
      {loadingIndicator}
      {errorIndicator}
      {calculationListComponent}
    </div>
  );
};

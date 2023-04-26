import { apiClient } from '../apiClient/apiClient';
import { BeerList, GetBeers } from './types';

export const getBeers = async ({ limit, offset }: GetBeers) => {
  console.log(offset);

  if (typeof limit !== 'number') {
    throw new Error('getBeers: limit is not a number');
  }

  if (typeof offset !== 'number') {
    throw new Error('getBeers: offset is not a number');
  }

  const { data } = await apiClient.get(
    `/beers?page=${offset}&per_page=${limit}`
  );

  return data as BeerList | undefined;
};

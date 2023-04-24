import { apiClient } from '../apiClient/apiClient';
import { BeerList } from './types';

export type GetBeers = {
  limit: number;
  offset: number;
};

export const getBeers = async ({ limit, offset }: GetBeers) => {
  if (typeof limit !== 'number') {
    throw new Error("replaceExpert: limit is not a number");
  }

  if (typeof offset !== 'number') {
    throw new Error("replaceExpert: offset is not a number");
  }

  const { data } = await apiClient.get(
    `/beers?page=${offset}&per_page=${limit}`
  );

  return data as BeerList | undefined;
};

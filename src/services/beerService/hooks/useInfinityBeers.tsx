import { useInfiniteQuery } from '@tanstack/react-query';

import { getBeers } from '../beerService';
import { BeerList, BeerServiceQueryKey } from '../types';

const ITEM_LIMIT = 30;

export const useInfinityBeers = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [BeerServiceQueryKey.GetBeers],
      queryFn: ({ pageParam }) =>
        getBeers({
          limit: ITEM_LIMIT,
          offset: pageParam || 1,
        }),
      getNextPageParam: (lastPage) => lastPage?.length !== 0,
    });

  const pages = data?.pages;
  const pagesData = pages?.map((page) => page).flat() as BeerList | undefined;

  return {
    data: pagesData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isUpdating: isFetchingNextPage,
  };
};

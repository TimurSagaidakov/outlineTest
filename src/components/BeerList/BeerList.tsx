import { useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { PageLoader } from '../../componentsUI/PageLoader/PageLoader';

import { useInfinityBeers } from '../../services/beerService/hooks/useInfinityBeers';
import { Beer, BeerItemData } from './Beer/Beer';
import styles from './beerList.module.scss';
import { BeerListUpdating } from './BeerListUpdating/BeerListUpdating';

export const BeerList = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isUpdating } =
    useInfinityBeers();
  const [page, setPage] = useState<number>(1);

  const listRef = useRef<List<BeerItemData> | null>(null);
  const rowHeights = useRef<Record<number, number>>({});

  const getRowHeight = (index: number) => {
    return rowHeights.current[index] + 12 || 82;
  };

  const setRowHeight = (index: number, size: number) => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
      rowHeights.current = { ...rowHeights.current, [index]: size };
    }
  };

  const update = async () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
      await fetchNextPage({ pageParam: page + 1 });
    }
  };

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className={styles.autoSizerWrapper}>
      {data && (
        <AutoSizer className={styles.autoSizer}>
          {({ height, width }) => (
            <div className={styles.listWrapper}>
              <InfiniteLoader
                isItemLoaded={(index: number) => data[index] !== undefined}
                loadMoreItems={update}
                itemCount={data?.length + 1}
              >
                {({ onItemsRendered }) => (
                  <List
                    height={height || 0}
                    itemCount={data.length}
                    itemSize={getRowHeight}
                    width={width || '80vw'}
                    itemKey={(index) => data[index].id}
                    itemData={{ list: data, setRowHeight }}
                    onItemsRendered={onItemsRendered}
                    ref={listRef}
                  >
                    {Beer}
                  </List>
                )}
              </InfiniteLoader>
            </div>
          )}
        </AutoSizer>
      )}
      {isUpdating && <BeerListUpdating />}
    </div>
  );
}

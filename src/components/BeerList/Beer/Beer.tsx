import { CSSProperties, useEffect, useRef, useState } from 'react';

import { BeerList } from '../../../services/beerService/types';
import styles from './beer.module.scss';

export type BeerItemData = {
  list: BeerList;
  setRowHeight: (index: number, size: number) => void;
};
export type BeerProps = {
  data: BeerItemData;
  index: number;
  style: CSSProperties;
};

export const Beer = ({ index, data, style }: BeerProps) => {
  const { list, setRowHeight } = data;
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const beer = list[index];
  const rowRef = useRef<HTMLDivElement | null>(null);

  const onLoad = () => {
    setIsImgLoaded(true);
  };

  useEffect(() => {
    if (rowRef.current !== null) {
      setRowHeight(index, rowRef.current.clientHeight);
    }
  }, [rowRef, isImgLoaded, setRowHeight, index]);

  if (!beer) {
    return null;
  }

  return (
    <div key={beer.id} style={style}>
      <div ref={rowRef} className={styles.beer}>
        <div className={styles.dFlex}>
          <img
            src={beer.image_url}
            style={{ width: 50, ...(!isImgLoaded && { display: 'none' }) }}
            onLoad={onLoad}
            alt={`${beer.name}_pic`}
          />
          {isImgLoaded ? (
            <div className={styles.beerDescription}>
              <div>
                <span className={styles.beerName}>{beer.name}</span>
                <div>{beer.description}</div>
              </div>
              <div className={styles.contributed}>
                Contributed by {beer.contributed_by}
              </div>
            </div>
          ) : (
            <div className={styles.loading}> loading..</div>
          )}
        </div>
      </div>
    </div>
  );
};

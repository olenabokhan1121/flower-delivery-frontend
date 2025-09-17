import css from './FlowerShopsPage.module.css';
import { FlowerList } from '../../components/FlowersList/FlowersList';
import Loading from '../../components/Loading/Loading';
import { useState, useEffect, useRef } from 'react';
import { fetchShops, fetchAllFlowers, fetchFlowersByShop } from '../../utils';

import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

export function FlowerShopsPage() {
  const [shops, setShops] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    const getShops = async () => {
      try {
        const response = await fetchShops();
        setShops(response.data);
      } catch (error) {
        console.error('Something went wrong!', error);
      }
    };
    getShops();
  }, []);

  useEffect(() => {
    const getFlowers = async () => {
      setLoading(true);
      try {
        const params = { page, perPage };
        const response = selectedShopId
          ? await fetchFlowersByShop(selectedShopId, params)
          : await fetchAllFlowers(params);

        const flowersData = selectedShopId
          ? response.data.data.flowers
          : response.data.data.enrichedFlowers;

        setFlowers(flowersData);
      } catch (error) {
        console.error('Something went wrong!', error);
      } finally {
        setLoading(false);
      }
    };
    getFlowers();
  }, [selectedShopId, page]);

  const totalItems = flowers.length;

  const [startIndex, setStartIndex] = useState(null);

  const flowersListRef = useRef(null);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    setStartIndex((nextPage - 1) * perPage);
  };

  useEffect(() => {
    if (
      !loading &&
      startIndex !== null &&
      flowers[startIndex] &&
      flowersListRef.current
    ) {
      flowersListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setStartIndex(null);
    }
  }, [loading, flowers, startIndex]);

  return (
    <div className={css.container}>
      <aside className={css.aside}>
        <h2>Shops:</h2>
        <ul className={css.ul}>
          <li
            className={!selectedShopId ? css.activeLi : css.li}
            onClick={() => {
              setSelectedShopId(null);
              setPage(1);
            }}
          >
            All Flowers
          </li>
          {shops.map(shop => (
            <li
              key={shop._id}
              className={selectedShopId === shop._id ? css.activeLi : css.li}
              onClick={() => {
                setSelectedShopId(shop._id);
                setPage(1);
              }}
            >
              {shop.name}
            </li>
          ))}
        </ul>
      </aside>

      {loading ? (
        <Loading />
      ) : (
        <>
          <FlowerList
            flowers={flowers}
            loading={false}
            ref={flowersListRef}
            startIndex={startIndex}
          />
          {page * perPage < totalItems && <LoadMoreBtn onClick={loadMore} />}
        </>
      )}
    </div>
  );
}

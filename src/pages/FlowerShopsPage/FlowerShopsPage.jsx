import css from './FlowerShopsPage.module.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { fetchShops, fetchAllFlowers, fetchFlowersByShop } from '../../utils';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { FlowerList } from '../../components/FlowersList/FlowersList';
import Loading from '../../components/Loading/Loading';

export function FlowerShopsPage() {
  const [shops, setShops] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 6;
  const navigate = useNavigate();
  const { shopId } = useParams();
  const { sortBy } = useOutletContext();
  const handleToggleFavorite = id => {
    setFlowers(prev =>
      prev.map(f => (f._id === id ? { ...f, isFavorite: !f.isFavorite } : f))
    );
  };
  useEffect(() => {
    if (shopId) setSelectedShopId(shopId);
  }, [shopId]);

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
        const params = { page, perPage, sortBy };

        const response = selectedShopId
          ? await fetchFlowersByShop(selectedShopId, params)
          : await fetchAllFlowers(params);

        const flowersData = selectedShopId
          ? response.data.data.flowers
          : response.data.data.enrichedFlowers;
        const pagination = selectedShopId
          ? response.data.data.pagination
          : response.data.data;
        console.log('full response', response.data);

        if (page === 1) {
          setFlowers(flowersData);
        } else {
          setFlowers(prev => [...prev, ...flowersData]);
        }
        setTotalItems(pagination.totalItems);
      } catch (error) {
        console.error('Something went wrong!', error);
      } finally {
        setLoading(false);
      }
    };
    getFlowers();
  }, [selectedShopId, page, sortBy]);
  useEffect(() => {
    setPage(1);
    setFlowers([]);
  }, [sortBy, selectedShopId]);

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
                setFlowers([]);
                navigate(`/flowers/${shop._id}`);
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
        <div className={css.content}>
          <FlowerList
            flowers={flowers}
            loading={false}
            ref={flowersListRef}
            startIndex={startIndex}
            onToggleFavorite={handleToggleFavorite}
          />
          {page * perPage < totalItems && <LoadMoreBtn onClick={loadMore} />}
        </div>
      )}
    </div>
  );
}

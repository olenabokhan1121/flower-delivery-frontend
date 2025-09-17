/*import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import css from './HomePage.module.css';

import Hero from '../../components/Hero/Hero';
import RecipesList from '../../components/RecipesList/RecipesList';
import Filters from '../../components/Filters/Filters';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Pagination from '../../components/Pagination/Pagination.jsx';

import {
  fetchRecipes,
  fetchRecipesByQuery,
  
} from '../../redux/recipes/operations';
import { clearRecipes, clearNotFound } from '../../redux/recipes/slice';
import { changeFilter } from '../../redux/filters/slice';
import Loading from '../../components/Loading/Loading.jsx';*/

export function FlowerShopsPage() {
  /*
  const dispatch = useDispatch();
  const location = useLocation();

  const recipes = useSelector(state =>
    Array.isArray(state.recipes.items) ? state.recipes.items : []
  );
  const totalItems = useSelector(state => state.recipes.totalItems);
  const searchQuery = useSelector(state => state.filters.name);
  const [startIndex, setStartIndex] = useState(null);
  const [page, setPage] = useState(1);
  const recipesPerPage = 12;

  const loading = useSelector(state => state.recipes.loading);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    ingredient: '',
  });

  // Новый флаг: включён ли поиск/фильтрация? (логика замены LoadMoreBtn на Pagination "Илья")
  const [isFiltering, setIsFiltering] = useState(false);
  const [isPagination, setIsPagination] = useState(false);
  const recipesListRef = useRef(null);

  const handleFilterChange = useCallback(filters => {
    setSelectedFilters(prevFilters => {
      if (
        prevFilters.category === filters.category &&
        prevFilters.ingredient === filters.ingredient
      ) {
        return prevFilters;
      }
      return filters;
    });
    setPage(1);
    setIsPagination(false);

    // проверка активен ли хоть один фильтр. (логика замены LoadMoreBtn на Pagination "Илья")
    const filterActive =
      filters.category.trim() !== '' || filters.ingredient.trim() !== '';
    setIsFiltering(filterActive);
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(changeFilter({ name: '' }));
      dispatch(clearNotFound());
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (searchQuery) return;

    dispatch(
      fetchRecipes({
        page,
        perPage: recipesPerPage,
        category: selectedFilters.category,
        ingredient: selectedFilters.ingredient,

        append: page > 1 && (searchQuery || isFiltering),
      })
    ).unwrap();
  }, [dispatch, page, selectedFilters, searchQuery, isFiltering]);

  useEffect(() => {
    if (!searchQuery) return;

    setIsFiltering(true);
    setIsPagination(false);
    setPage(1);
    dispatch(clearRecipes());
    dispatch(fetchRecipesByQuery(searchQuery)).unwrap();
  }, [dispatch, searchQuery]);

  const loadMore = () => {
    setIsPagination(false);
    const nextPage = page + 1;
    setPage(nextPage);

    setStartIndex((nextPage - 1) * recipesPerPage);
  };

  useEffect(() => {
    if (!loading && isPagination) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [loading, isPagination]);

  useEffect(() => {
    if (
      !loading &&
      startIndex !== null &&
      recipes[startIndex] &&
      recipesListRef.current
    ) {
      recipesListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setStartIndex(null);
    }
  }, [loading, recipes, startIndex]);
  const recipesToShow = recipes.slice(0, page * recipesPerPage);*/

  return /*
    <div className={css.homePage}>
      <Hero setIsFiltering={setIsFiltering} />
      <section className={css.container}>
        <div>
    <h2 />className={css.title}>
      {searchQuery ? `Search Results for "${searchQuery}"` : 'Recipes'}
    </h2>*/ Hello /*
        </div>
        <Filters
          totalItems={totalItems}
          onChange={handleFilterChange}
          setIsFiltering={setIsFiltering}
        />
        {loading && isPagination && <Loading />}
        <RecipesList
          recipes={recipesToShow}
          loading={false}
          ref={recipesListRef}
          startIndex={startIndex}
        />

        {loading && !isPagination && (
          <div className={css.loaderWrapper}>
            <Loading />
          </div>
        )}
        {searchQuery || isFiltering ? (
          <div>
            {page * recipesPerPage < totalItems && !loading && (
              <LoadMoreBtn onClick={loadMore} />
            )}
          </div>
        ) : (
          <Pagination
            page={page}
            perPage={recipesPerPage}
            totalItems={totalItems}
            onPageChange={newPage => {
              setIsPagination(true);
              setStartIndex(0);
              setPage(newPage);
            }}
          />
        )}
      </section>
    </div>*/;
}

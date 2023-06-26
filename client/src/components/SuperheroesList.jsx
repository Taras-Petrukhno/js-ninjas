import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// Styles
import '../styles/components/SuperheroesList.scss'
import styles from '../styles/components/PaginationSuperheroesList.module.scss'
// Components
import SuperheroItem from './SuperheroItem'
import Pagination from './Pagination'

// Action Creators
import { fetchPage } from '../store/reducers/superheroAsyncThunk'

export default function SuperheroesList() {
  const dispatch = useDispatch();
  const { currentPage, pageCount, pageItems } = useSelector(state => state.superhero);

  useEffect(() => {
    dispatch(fetchPage({ pageNumber: 1, countPerPage: 5 }))
  }, [])

  function paginationHandler(e) {
    dispatch(fetchPage({ pageNumber: e.target.getAttribute('data-num') }));
  }

  return (
    <div className="superhero-list">
      <div className="superhero-list__inner">
        {!!pageItems && pageItems.map((hero) => {
          return <SuperheroItem key={hero._id} hero={hero} />
        })}
      </div>
      {pageCount > 1 && <Pagination pageCount={pageCount} currentPage={currentPage} styles={styles} handler={paginationHandler} />}
    </div>
  )
}

import React from 'react'


export default function Pagination({ pageCount: pageCountProps = 0, currentPage, styles, handler }) {
  let pageCount = (pageCountProps < 0) ? 0 : pageCountProps;
  let pagArr = new Array(pageCount).fill(1);
  pagArr.forEach((_, index, array) => {
    array[index] = index + 1;
  })

  function onClickHandler(e) {
    if (e.currentTarget.dataset.num == currentPage) return;
    handler(e);
  }

  return (
    <ul className={styles.pagination}>
      {(pageCount > 1) && pagArr.map((num) => {
        return (num == currentPage)
          ? <li className={`${styles.pagination__item} ${styles.pagination__item_active}`} key={num} data-num={num} onClick={onClickHandler}>{num}</li>
          : <li className={styles.pagination__item} key={num} data-num={num} onClick={onClickHandler}>{num}</li>
      }
      )}
    </ul>
  )
}

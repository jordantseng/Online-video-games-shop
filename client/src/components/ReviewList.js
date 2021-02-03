import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import {
  List,
  WindowScroller,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

import { RESET_CREATE_REVIEW } from '../types/reviews';
import { fetchReviews } from '../actions/reviews';
import Message from './Message';
import Review from './Review';
import Loader from './Loader';

const ReviewList = ({ productId }) => {
  const {
    loading: loadingReview,
    data: productReview,
    hasMore,
    creating: creatingReview,
    success: createReviewSuccess,
    error: createReviewError,
  } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const observer = useRef();
  const pageNumber = useRef(1);
  const list = useRef();
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 50,
    })
  );

  const lastReviewEleRef = useCallback(
    (node) => {
      if (loadingReview) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setTimeout(() => {
            pageNumber.current += 1;
            dispatch(fetchReviews(productId, pageNumber.current));
          }, 2000);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [dispatch, loadingReview, hasMore, productId]
  );

  const rowRenderer = ({ key, index, style, parent }) => {
    const review = productReview.reviews[index];

    return index + 1 === productReview.reviews.length ? (
      <CellMeasurer
        key={key}
        cache={cache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}>
        <Review
          review={review}
          style={style}
          lastReviewEleRef={lastReviewEleRef}
        />
      </CellMeasurer>
    ) : (
      <CellMeasurer
        key={key}
        cache={cache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}>
        <Review review={review} style={style} />
      </CellMeasurer>
    );
  };

  // force update react-virtaulized list
  // to make row height update dynamically
  useEffect(() => {
    if (createReviewSuccess) {
      cache.current.clearAll();
      list.current.forceUpdateGrid();
      dispatch({ type: RESET_CREATE_REVIEW });
    }
  }, [createReviewSuccess]);

  return (
    <>
      {productReview.page && <h2>Reviews</h2>}
      {!loadingReview &&
        !createReviewError &&
        productReview.reviews &&
        productReview.reviews.length === 0 && (
          <Message variant='primary'>No Reviews</Message>
        )}
      {createReviewError && (
        <Message variant='danger'>{createReviewError}</Message>
      )}

      {creatingReview ? <Loader width='30px' height='30px' /> : null}
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => {
          return (
            <AutoSizer disableHeight>
              {({ width }) => (
                <ListGroup>
                  <List
                    ref={list}
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={productReview.reviews.length}
                    rowHeight={cache.current.rowHeight}
                    deferredMeasurementCache={cache.current}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                    width={width}
                  />
                </ListGroup>
              )}
            </AutoSizer>
          );
        }}
      </WindowScroller>

      <div>{loadingReview && <Loader width='30px' height='30px' />}</div>
    </>
  );
};

export default ReviewList;

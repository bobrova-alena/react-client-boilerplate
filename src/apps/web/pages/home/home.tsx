import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RandomService } from 'src/services';
import { NumericPanel } from 'src/components';
import { GET_NUMBER, NumberRequest, POST_NUMBER } from 'src/ducks';
import { selectNumber } from '../../state';

export default function HomePage(): JSX.Element {
  const dispatch = useDispatch();
  const number = useSelector(selectNumber);

  useEffect(() => {
    dispatch(GET_NUMBER());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memoizedService = useMemo(
    () =>
      new RandomService({
        onNumberChanged: (number: number): void => {
          dispatch(POST_NUMBER(new NumberRequest(number)));
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <div>Home</div>
      <NumericPanel service={memoizedService} number={number} />
    </>
  );
}

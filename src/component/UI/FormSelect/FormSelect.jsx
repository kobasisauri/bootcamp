import { useState, useEffect, useRef } from 'react';
import { ReactComponent as ChevronDowm } from 'assets/images/chevron-down.svg';
import styles from './FormSelect.module.scss';

const FormSelect = ({
  endpoint,
  fetchData,
  selected,
  valChange,
  placeholder,
  isInvalid,
  className,
}) => {
  const [visible, setVisible] = useState();
  const nodeRef = useRef();
  const [data, setData] = useState([]);
  const [intialLoading, setInitialLoading] = useState(false);

  // get initial data
  useEffect(() => {
    if (endpoint) {
      setInitialLoading(true);
      endpoint()
        .then(({ data }) => setData(data.data))
        .finally(() => setInitialLoading(false));
    }
  }, [endpoint]);

  // get fetched data
  useEffect(() => {
    if (fetchData) {
      setData(fetchData);
    }
  }, [fetchData]);

  useEffect(() => {
    const windowListener = (e) => {
      if (nodeRef && !nodeRef.current.contains(e.target) && visible) {
        setVisible(false);
      }
    };

    window.addEventListener('mousedown', windowListener);

    return () => {
      window.removeEventListener('mousedown', windowListener);
    };
  }, [visible]);

  const onSelect = (item) => {
    valChange(item);
    setVisible(false);
  };

  return (
    <>
      <div
        className={`${styles['dropdown-wrapper']} ${
          className ? className : ''
        }`}
        ref={nodeRef}
      >
        <div
          className={`${styles.select} ${isInvalid ? styles.error : ''}`}
          onMouseDown={() => setVisible(!visible)}
        >
          <span>{selected ? selected.name : placeholder}</span>

          <ChevronDowm />
        </div>

        {visible && (
          <div className={styles['dropdown-menu']}>
            <div>
              {data?.map((item) => (
                <div
                  key={item.id}
                  className={styles['dropdown-item']}
                  onClick={() => onSelect(item)}
                >
                  {item.name}
                </div>
              ))}

              {!data?.length && (
                <div className={styles['dropdown-item']}>
                  მონაცემები არ მოიძებნა
                </div>
              )}
            </div>
          </div>
        )}
        {intialLoading && <div className={styles.loader} />}
      </div>
    </>
  );
};

export default FormSelect;

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLaptops } from 'services/laptops';
import styles from './LaptopsList.module.scss';

function LaptopsList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    getLaptops().then(({ data }) => {
      setList(data.data);
    });
  }, []);

  const openDetails = (id) => {
    navigate('./' + id);
  };

  return (
    <div>
      <div className={styles.header}>
        <Link to="/" className={styles.back}>
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.85769 0.352185C9.0832 0.577756 9.20988 0.883657 9.20988 1.20262C9.20988 1.52157 9.0832 1.82747 8.85769 2.05305L2.90348 8.00726L8.85769 13.9615C9.0768 14.1883 9.19805 14.4922 9.19531 14.8076C9.19257 15.123 9.06606 15.4247 8.84304 15.6477C8.62002 15.8707 8.31832 15.9972 8.00293 16C7.68754 16.0027 7.3837 15.8815 7.15683 15.6623L0.352185 8.85769C0.126681 8.63212 0 8.32622 0 8.00726C0 7.6883 0.126681 7.3824 0.352185 7.15683L7.15683 0.352185C7.3824 0.126681 7.6883 0 8.00726 0C8.32622 0 8.63212 0.126681 8.85769 0.352185Z"
              fill="#797979"
            />
          </svg>
        </Link>

        <h3>ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</h3>
      </div>

      <div className={styles.list}>
        {!!list.length &&
          list.map((item) => (
            <div className={styles.col} key={item.laptop.id}>
              <div className={styles.item}>
                <img
                  src={'https://pcfy.redberryinternship.ge' + item.laptop.image}
                  alt="computer"
                />

                <div>
                  <div
                    className={styles['user-name']}
                  >{`${item.user.name} ${item.user.surname}`}</div>

                  <div className={styles.laptop}>{item.laptop.name}</div>

                  <span
                    className={styles.details}
                    onClick={() => openDetails(item.laptop.id)}
                  >
                    მეტის ნახვა
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default LaptopsList;

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeams, getPositions, getLaptopBrands } from 'services/dropdowns';
import { getLaptop } from 'services/laptops';
import { useIsMobile } from 'helpers/hooks/useIsMobile';
import styles from './LaptopDetails.module.scss';

function LaptopDetails() {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const [laptopData, setLaptopData] = useState();
  const [userData, setUserData] = useState();
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [brand, setBrand] = useState('');

  useEffect(() => {
    getLaptop(id).then(({ data }) => {
      const details = data.data;
      setLaptopData(details.laptop);
      setUserData(details.user);
    });
  }, [id]);

  useEffect(() => {
    getTeams()
      .then(({ data }) => {
        const teams = data.data;
        setTeam(teams.filter((item) => item.id === userData?.team_id)[0]?.name);

        return getPositions();
      })
      .then(({ data }) => {
        const positions = data.data;
        setPosition(
          positions.filter((item) => item.id === userData?.position_id)[0]?.name
        );

        return getLaptopBrands();
      })
      .then(({ data }) => {
        const brands = data.data;
        setBrand(
          brands.filter((item) => item.id === laptopData?.brand_id)[0]?.name
        );
      });
  }, [userData, laptopData]);

  return (
    <div>
      <div className={styles.header}>
        <Link to="../laptops" className={styles.back}>
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

        <h3>???????????????????????? ????????????</h3>
      </div>

      {laptopData && userData && (
        <div className={styles.main}>
          <div className={styles['first-section']}>
            <img
              className={styles.laptop}
              src={'https://pcfy.redberryinternship.ge' + laptopData?.image}
              alt="computer"
            />

            <div className={styles.details}>
              <ul className={styles.labels}>
                <li>??????????????????:</li>
                <li>????????????:</li>
                <li>?????????????????????:</li>
                <li>???????????????:</li>
                <li>?????????. ??????????????????:</li>
              </ul>

              <ul className={styles.values}>
                <li>{`${userData.name} ${userData.surname}`}</li>
                <li>{team}</li>
                <li>{position}</li>
                <li>{userData.email}</li>
                <li>{userData.phone_number}</li>
              </ul>
            </div>
          </div>

          <div className={styles['second-section']}>
            <div className={styles.details}>
              <ul className={styles.labels}>
                <li>???????????????????????? ??????????????????:</li>
                <li>???????????????????????? ??????????????????:</li>
                <li>RAM:</li>
                <li>????????????????????????????????? ????????????:</li>
              </ul>

              <ul className={styles.values}>
                <li>{laptopData.name}</li>
                <li>{brand}</li>
                <li>{laptopData.ram}</li>
                <li>{laptopData.hard_drive_type}</li>
              </ul>
            </div>

            <div className={styles.details}>
              <ul className={styles.labels}>
                <li>CPU:</li>
                <li>CPU-??? ??????????????????:</li>
                <li>CPU-??? ??????????????????:</li>
              </ul>

              <ul className={styles.values}>
                <li>{laptopData.cpu.name}</li>
                <li>{laptopData.cpu.cores}</li>
                <li>{laptopData.cpu.threads}</li>
              </ul>
            </div>
          </div>

          <div className={styles['last-section']}>
            <div className={styles.details}>
              <ul className={styles.labels}>
                <li>{isMobile ? '??????????????????????????????:' : '???????????????????????? ??????????????????????????????:'}</li>
                <li>???????????????????????? ????????????:</li>
              </ul>

              <ul className={styles.values}>
                <li>{laptopData.state === 'new' ? '???????????????' : '?????????????????????'}</li>
                <li>{laptopData.price} ???</li>
              </ul>
            </div>

            <div className={styles.details}>
              <ul className={styles.labels}>
                <li>????????????????????? ??????????????????:</li>
              </ul>

              <ul className={styles.values}>
                <li>
                  {laptopData.purchase_date
                    ? laptopData.purchase_date.replaceAll('-', ' / ')
                    : ''}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LaptopDetails;

import { Link, Outlet, useLocation } from 'react-router-dom';
import LeftArrow from 'assets/images/left.png';
import FoooterLogo from 'assets/images/footer-logo.png';
import styles from './FormLayout.module.scss';

const pathEnum = {
  employee: '/add-records/employee',
  laptop: '/add-records/laptop',
};

function FormLayout() {
  const { pathname } = useLocation();

  return (
    <div className={styles.wrapper}>
      <Link to="/">
        <div className={styles['arrow-container']}>
          <img src={LeftArrow} alt="arrowleft" />
        </div>
      </Link>

      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${
            pathname === pathEnum.employee ? styles.active : ''
          }`}
        >
          თანამშრომლის ინფო
        </div>
        <div
          className={`${styles.tab} ${
            pathname === pathEnum.laptop ? styles.active : ''
          }
          `}
        >
          ლეპტოპის მახასიათებლები
        </div>
        <span className={styles.step}>
          {pathname === pathEnum.employee ? 1 : 2}/2
        </span>
      </div>

      <div
        className={`${styles['form-wrapper']} ${
          pathname === pathEnum.laptop ? styles.laptop : ''
        }`}
      >
        <Outlet />
      </div>

      <div className={styles.logo}>
        <img src={FoooterLogo} alt="logo" />
      </div>
    </div>
  );
}

export default FormLayout;

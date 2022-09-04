import { Link } from 'react-router-dom';
import Logo from 'assets/images/logo.png';
import LandingPic from 'assets/images/landing-pic.png';
import SmallLanding from 'assets/images/small-landing.png';
import styles from './Landing.module.scss';

const Landing = () => {
  return (
    <div className={styles.container}>
      <img src={Logo} alt="brand-logo" className={styles.logo} />

      <picture>
        <source media="(min-width:992px)" srcSet={LandingPic} />
        <img
          className={styles['landing-img']}
          src={SmallLanding}
          alt="landing"
        />
      </picture>

      <div className={styles.items}>
        <Link to="/add-records/employee" className={styles.item}>
          ჩანაწერის დამატება
        </Link>
        <Link to="/laptops" className={styles.item}>
          ჩანაწერების სია
        </Link>
      </div>
    </div>
  );
};

export default Landing;

import { Link, useNavigate } from 'react-router-dom';
import SuccessImage from 'assets/images/success-img.png';
import styles from './SuccessModal.module.scss';

function SuccessModal() {
  const navigate = useNavigate();

  const navigateToList = () => {
    navigate('../../laptops');
    clearLocalStorage();
  };

  const clearLocalStorage = () => {
    window.localStorage.removeItem('form');
    window.localStorage.removeItem('form-2');
  };

  return (
    <div className={styles['modal-container']}>
      <div className={styles.modal}>
        <img src={SuccessImage} alt="success" />

        <h3 className={styles['success-message']}>ჩანაწერი დამატებულია!</h3>

        <button className={styles['list-button']} onClick={navigateToList}>
          სიაში გადაყვანა
        </button>

        <Link to="/" className={styles.main} onClick={clearLocalStorage}>
          მთავარი
        </Link>
      </div>
    </div>
  );
}

export default SuccessModal;

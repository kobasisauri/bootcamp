import { Field } from 'formik';
import styles from './RadioButton.module.scss';

const RadioButton = ({ label, name, value }) => {
  return (
    <label className={styles.container}>
      {label}
      <Field type="radio" name={name} value={value} />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default RadioButton;

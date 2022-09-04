import { useRef } from 'react';
import styles from './FormControl.module.scss';

const FormControl = ({
  label,
  name,
  value,
  type,
  className,
  isInvalid,
  errorMSG,
  handleChange,
  handleBlur,
  handleClick,
  disabled,
  placeholder,
  prefix,
  suffix,
  autoComplete,
  readOnly,
  hint,
  ...rest
}) => {
  const inputEl = useRef();
  const onFocus = () => inputEl.current.focus();

  return (
    <div
      className={`${styles.container} ${className ? className : ''}`}
      {...rest}
    >
      {label && (
        <label className={`${styles.label} ${isInvalid ? styles.invalid : ''}`}>
          {label}
        </label>
      )}

      <div
        className={`${styles.wrapper} ${isInvalid ? styles.warning : ''} `}
        onClick={onFocus}
      >
        {prefix && <div className={styles.prefix}>{prefix}</div>}

        <input
          ref={inputEl}
          className={disabled ? styles.disabled : ''}
          type={type || 'text'}
          name={name}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          onClick={handleClick}
          disabled={disabled || false}
          readOnly={readOnly}
          autoComplete={autoComplete || 'off'}
        />

        {suffix && <div className={styles.suffix}>{suffix}</div>}
      </div>

      {isInvalid && <div className={styles['error-msg']}>{errorMSG}</div>}
      {hint && !isInvalid && <div className={styles.hint}>{hint}</div>}
    </div>
  );
};

export default FormControl;

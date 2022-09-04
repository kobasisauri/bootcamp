import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as Camera } from 'assets/images/camera.svg';
import { ReactComponent as SuccessIcon } from 'assets/images/upload.svg';
import { ReactComponent as ErrorIcon } from 'assets/images/error-icon.svg';
import styles from './DropZone.module.scss';

const Dropzone = ({
  setImageValue,
  isInvalid,
  name,
  handleBlur,
  handleClick,
}) => {
  const [images, setImages] = useState('');

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const [file] = acceptedFiles;
      const reader = new FileReader();
      reader.onload = () => {
        setImages(() => reader.result);
        setImageValue(file);
      };
      reader.readAsDataURL(file);
    },
    [setImageValue]
  );

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    multiple: false,
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
  });

  const files = acceptedFiles.map((file) => (
    <div key={file.path} className={styles.details}>
      <SuccessIcon className={styles['success-icon']} />

      <div className={styles.path}>
        <p>{file.path}</p>

        <span className={styles['file-size']}>
          {(file.size / 1000000).toFixed(3)} mb
        </span>
      </div>
    </div>
  ));

  const imageReset = () => {
    setImages('');
    setImageValue('');
    setTimeout(open(), 800);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.container} ${!!images ? styles.image : ''} ${
          isInvalid ? styles.error : ''
        }`}
      >
        {!!images.length ? (
          <img className={styles['drop-image']} src={images} alt="pic" />
        ) : (
          <div {...getRootProps({ className: `${styles.dropzone}` })}>
            <input
              {...getInputProps()}
              name={name}
              onBlur={handleBlur}
              onClick={handleClick}
            />

            <Camera className={styles.camera} />

            <ErrorIcon className={styles['error-icon']} />

            <p className={styles['dropzone-content']}>
              ჩააგდე ან ატვირთე <br /> ლეპტოპის ფოტო
            </p>

            <p className={styles['dropzone-content-mobile']}>
              ლეპტოპის ფოტოს <br /> ატვირთვა
            </p>

            <button type="button" className={styles.btn}>
              ატვირთვა
            </button>
          </div>
        )}
      </div>

      {!!files.length && (
        <div className={styles['files-wrapper']}>
          <div className={styles.files}>{files}</div>

          <div className={styles.again} onClick={imageReset}>
            თავიდან ატვირთე
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;

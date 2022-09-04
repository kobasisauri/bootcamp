import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Persist } from 'formik-persist';
import * as Yup from 'yup';
import config from 'config';
import { formatDate } from 'utils/date';
import { getLaptopBrands, getCpu } from 'services/dropdowns';
import { createLaptop } from 'services/laptops';
import {
  FormControl,
  FormSelect,
  DropZone,
  RadioButton,
  SuccessModal,
  FormDate,
} from 'component/UI';
import gelSymbol from 'assets/images/lari.png';
import { ReactComponent as ErrorIcon } from 'assets/images/error-icon.svg';
import styles from '../AddRecords.module.scss';

const initialValues = {
  laptopImage: '',
  laptopName: '',
  laptopBrand: null,
  cpu: null,
  cpuCore: null,
  cpuThreads: null,
  laptopRam: null,
  hardDrive: '',
  buyDate: '',
  price: null,
  leptopState: '',
};

const validationSchema = Yup.object().shape({
  laptopImage: Yup.string().required('სავალდებულო ველი'),
  laptopName: Yup.string()
    .matches(/^[0-9a-zA-Z!@#$%^&*()_+=\s]+$/, 'არასწორი ფორმატი')
    .required('სავალდებულო ველი'),
  laptopBrand: Yup.object().required('სავალდებულო ველი'),
  cpu: Yup.object().required('სავალდებულო ველი'),
  cpuCore: Yup.number()
    .nullable('სავალდებულო ველი')
    .typeError('მხოლოდ ციფრები')
    .required('სავალდებულო ველი'),
  cpuThreads: Yup.number()
    .nullable('სავალდებულო ველი')
    .typeError('მხოლოდ ციფრები')
    .required('სავალდებულო ველი'),
  laptopRam: Yup.number()
    .nullable('სავალდებულო ველი')
    .typeError('მხოლოდ ციფრები')
    .required('სავალდებულო ველი'),
  hardDrive: Yup.string().required('სავალდებულო ველი'),
  price: Yup.number()
    .nullable('სავალდებულო ველი')
    .typeError('მხოლოდ ციფრები')
    .required('სავალდებულო ველი'),
  leptopState: Yup.string().required('სავალდებულო ველი'),
});

const LaptopForm = () => {
  const { state } = useLocation();
  const [success, setSuccess] = useState(false);

  const onSubmit = (values) => {
    const model = new FormData();
    model.append('name', state.firstName);
    model.append('surname', state.lastName);
    model.append('team_id', state.team.id);
    model.append('position_id', state.position.id);
    model.append('phone_number', `+995${state.phoneNumber}`);
    model.append('email', state.email);
    model.append('token', config.token);
    model.append('laptop_name', values.laptopName);
    model.append('laptop_brand_id', values.laptopBrand.id);
    model.append('laptop_cpu', values.cpu.name);
    model.append('laptop_cpu_cores', +values.cpuCore);
    model.append('laptop_cpu_threads', +values.cpuThreads);
    model.append('laptop_ram', +values.laptopRam);
    model.append('laptop_hard_drive_type', values.hardDrive);
    model.append('laptop_state', values.leptopState);
    model.append(
      'laptop_purchase_date',
      values.buyDate ? formatDate(values.buyDate) : ''
    );
    model.append('laptop_price', +values.price);
    model.append('laptop_image', values.laptopImage);

    createLaptop(model).then(() => setSuccess(true));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          validateForm,
        }) => (
          <form onSubmit={handleSubmit} id="2">
            <div className={styles['inner-wrapper']}>
              <DropZone
                setImageValue={(value) => setFieldValue('laptopImage', value)}
                name="laptopImage"
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={!!(touched.laptopImage && errors.laptopImage)}
              />

              <div className={styles.row}>
                <FormControl
                  className={`${styles['col-2']} ${styles.input}`}
                  label="ლეპტოპის სახელი"
                  placeholder="ლეპტოპის სახელი"
                  name="laptopName"
                  value={values.laptopName}
                  handleChange={handleChange}
                  errorMSG={errors.laptopName}
                  isInvalid={!!(touched.laptopName && errors.laptopName)}
                  hint="ლათინური ასოები, ციფრები, !@#$%^&*()_+= "
                  handleBlur={handleBlur}
                />

                <FormSelect
                  className={`${styles['col-2']} ${styles.select}`}
                  selected={values.laptopBrand}
                  placeholder="ლეპტოპის ბრენდი"
                  endpoint={getLaptopBrands}
                  valChange={(value) => setFieldValue('laptopBrand', value)}
                  isInvalid={!!(touched.laptopBrand && errors.laptopBrand)}
                  handleBlur={handleBlur}
                />
              </div>
            </div>

            <div className={styles['inner-wrapper']}>
              <div className={styles.row}>
                <FormSelect
                  className={`${styles['col-3']} ${styles.select}`}
                  selected={values.cpu}
                  placeholder="CPU"
                  endpoint={getCpu}
                  valChange={(value) => setFieldValue('cpu', value)}
                  isInvalid={!!(touched.cpu && errors.cpu)}
                  handleBlur={handleBlur}
                />

                <FormControl
                  className={`${styles['col-3']} ${styles.input}`}
                  label="CPU-ს ბირთვი"
                  placeholder="CPU-ს ბირთვი"
                  name="cpuCore"
                  value={values.cpuCore}
                  handleChange={handleChange}
                  errorMSG={errors.cpuCore}
                  isInvalid={!!(touched.cpuCore && errors.cpuCore)}
                  hint="მხოლოდ ციფრები"
                  handleBlur={handleBlur}
                />

                <FormControl
                  className={`${styles['col-3']} ${styles.input}`}
                  label="CPU-ს ნაკადი"
                  placeholder="CPU-ს ნაკადი"
                  name="cpuThreads"
                  value={values.cpuThreads}
                  handleChange={handleChange}
                  errorMSG={errors.cpuThreads}
                  isInvalid={!!(touched.cpuThreads && errors.cpuThreads)}
                  hint="მხოლოდ ციფრები"
                  handleBlur={handleBlur}
                />
              </div>

              <div className={styles.row}>
                <FormControl
                  className={`${styles['col-2']} ${styles.input}`}
                  label="ლეპტოპის RAM (GB)"
                  placeholder="ლეპტოპის RAM (GB)"
                  name="laptopRam"
                  value={values.laptopRam}
                  handleChange={handleChange}
                  errorMSG={errors.laptopRam}
                  isInvalid={!!(touched.laptopRam && errors.laptopRam)}
                  hint="მხოლოდ ციფრები"
                  handleBlur={handleBlur}
                />

                <div className={`${styles['col-2']} `}>
                  <label
                    className={`${styles['radio-label']} ${
                      touched.hardDrive && errors.hardDrive
                        ? styles['radio-label-error']
                        : ''
                    }`}
                  >
                    მეხსიერების ტიპი
                    {touched.hardDrive && errors.hardDrive && (
                      <ErrorIcon className={styles['error-icon']} />
                    )}
                  </label>

                  <div className={styles['radio-container']}>
                    <fieldset id="hardDrive">
                      <RadioButton label="SSD" name="hardDrive" value="SSD" />
                      <RadioButton label="HDD" name="hardDrive" value="HDD" />
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['inner-wrapper']}>
              <div className={styles.row}>
                <div className={`${styles['col-2']} ${styles.input}`}>
                  <FormDate
                    name="buyDate"
                    label="შეძენის რიცხვი (არჩევითი) "
                    placeholder="დდ / თთ / წწწწ"
                    initialValue={
                      values.buyDate ? new Date(values.buyDate) : null
                    }
                    valChange={(date) => setFieldValue('buyDate', date || '')}
                  />
                </div>

                <FormControl
                  className={`${styles['col-2']} ${styles.input}`}
                  label="ლეპტოპის ფასი"
                  placeholder="ლეპტოპის ფასი"
                  name="price"
                  value={values.price}
                  handleChange={handleChange}
                  errorMSG={errors.price}
                  isInvalid={!!(touched.price && errors.price)}
                  handleBlur={handleBlur}
                  suffix={<img src={gelSymbol} alt="gel symbol" />}
                  hint="მხოლოდ ციფრები"
                />
              </div>

              <div
                className={`${styles['col-2']} ${styles['last-radio-buttons']} `}
              >
                <label
                  className={`${styles['radio-label']} ${
                    touched.leptopState && errors.leptopState
                      ? styles['radio-label-error']
                      : ''
                  }`}
                >
                  ლეპტოპის მდგომარეობა
                  {touched.leptopState && errors.leptopState && (
                    <ErrorIcon className={styles['error-icon']} />
                  )}
                </label>

                <div className={styles['radio-container']}>
                  <fieldset id="leptopState">
                    <RadioButton label="ახალი" name="leptopState" value="new" />
                    <RadioButton
                      label="მეორადი"
                      name="leptopState"
                      value="used"
                    />
                  </fieldset>
                </div>
              </div>

              <div className={styles['button-laptop']}>
                <Link to="../employee" className={styles.back}>
                  უკან
                </Link>
                <button type="submit" className={styles['lap-button']}>
                  დამახსოვრება
                </button>
              </div>
            </div>

            <Persist name="form-2" />
          </form>
        )}
      </Formik>

      {success && <SuccessModal />}
    </>
  );
};

export default LaptopForm;

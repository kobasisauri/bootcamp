import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Persist } from 'formik-persist';
import { getTeams, getPositions } from 'services/dropdowns';
import { useIsMobile } from 'helpers/hooks/useIsMobile';
import { FormControl, FormSelect } from 'component/UI';
import styles from '../AddRecords.module.scss';

const initialValues = {
  firstName: '',
  lastName: '',
  team: null,
  position: null,
  email: '',
  phoneNumber: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[ა-ჰ]+$/, 'არასწორი ფორმატი')
    .min(2, 'უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს')
    .required('სავალდებულო ველი'),

  lastName: Yup.string()
    .matches(/^[ა-ჰ]+$/, 'არასწორი ფორმატი')
    .min(2, 'უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს')
    .required('სავალდებულო ველი'),

  email: Yup.string()
    .required('სავალდებულო ველი')
    .matches(
      /([a-zA-Z0-9]+)([/.{1}])?([a-zA-Z0-9]+)@redberry([.])ge/g,
      'არასწორი ფორმატი'
    ),
  phoneNumber: Yup.string()
    .required('სავალდებულო ველი')
    .matches(/^[0-9]+$/, 'არასწორი ფორმატი')
    .min(9, 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს')
    .max(9, 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'),
  team: Yup.object().required('სავალდებულო ველი'),
  position: Yup.object().required('სავალდებულო ველი'),
});

const EmployeeForm = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const initial = useRef(false);
  const [teamId, setTeamId] = useState();
  const [positions, setPositions] = useState([]);

  const teamInitialId = JSON.parse(window.localStorage.getItem('form'))
    ? JSON.parse(window.localStorage.getItem('form'))?.values?.team?.id
    : null;

  useEffect(() => {
    setPositions([]);

    if (!initial.current && teamInitialId) {
      getSpecificPositions(teamInitialId);

      initial.current = true;
    } else {
      getSpecificPositions(teamId);
    }
  }, [teamId, teamInitialId]);

  const onSubmit = (values) => {
    navigate('../laptop', { state: values });
  };

  const getSpecificPositions = (teamId) => {
    if (teamId) {
      getPositions().then(({ data }) => {
        setPositions(data.data.filter((item) => item['team_id'] === +teamId));
      });
    }
  };

  return (
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
      }) => (
        <form onSubmit={handleSubmit} id="1">
          <div className={styles.row}>
            <FormControl
              className={`${styles['col-2']} ${styles.input}`}
              label="სახელი"
              placeholder="სახელი"
              name="firstName"
              value={values.firstName}
              handleChange={handleChange}
              errorMSG={errors.firstName}
              isInvalid={!!(touched.firstName && errors.firstName)}
              hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
              handleBlur={handleBlur}
            />

            <FormControl
              className={`${styles['col-2']} ${styles.input}`}
              label="გვარი"
              placeholder="გვარი"
              name="lastName"
              value={values.lastName}
              handleChange={handleChange}
              errorMSG={errors.lastName}
              isInvalid={!!(touched.lastName && errors.lastName)}
              hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
              handleBlur={handleBlur}
            />
          </div>

          <FormSelect
            className={styles.team}
            placeholder="თიმი"
            endpoint={getTeams}
            selected={values.team}
            valChange={(value) => {
              setFieldValue('team', value);
              setFieldValue('position', '');
              setTeamId(value?.id);
            }}
            isInvalid={!!(touched.team && errors.team)}
          />

          <FormSelect
            className={styles.position}
            placeholder="პოზიცია"
            selected={values.position}
            fetchData={positions}
            valChange={(value) => setFieldValue('position', value)}
            isInvalid={!!(touched.position && errors.position)}
          />

          <FormControl
            className={styles.input}
            label="მეილი"
            placeholder="მეილი"
            name="email"
            value={values.email}
            handleChange={handleChange}
            errorMSG={errors.email}
            isInvalid={!!(touched.email && errors.email)}
            hint="უნდა მთავრდებოდეს @redberry.ge-ით"
            handleBlur={handleBlur}
          />

          <FormControl
            className={styles.input}
            label="ტელეფონის ნომერი"
            placeholder="ტელეფონის ნომერი"
            name="phoneNumber"
            value={values.phoneNumber}
            handleChange={handleChange}
            errorMSG={errors.phoneNumber}
            isInvalid={!!(touched.phoneNumber && errors.phoneNumber)}
            hint={
              isMobile
                ? 'ქართული მობ-ნომრის ფორმატი'
                : 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'
            }
            handleBlur={handleBlur}
            prefix="+995"
          />

          <div className={styles['button-wrapper']}>
            <button type="submit" className={styles.button}>
              შემდეგი
            </button>
          </div>

          <Persist name="form" />
        </form>
      )}
    </Formik>
  );
};

export default EmployeeForm;

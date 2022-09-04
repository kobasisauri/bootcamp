import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import FormControl from './FormControl';

// eslint-disable-next-line react/display-name
const DatePickerElement = React.forwardRef(
  (
    {
      controlClassName,
      inputName,
      value,
      label,
      text,
      isInvalid,
      errorMessage,
      onClick,
      onBlur,
    },
    ref
  ) => (
    <div ref={ref}>
      <FormControl
        className={controlClassName}
        name={inputName}
        label={label}
        placeholder={text}
        isInvalid={isInvalid}
        errorMSG={errorMessage}
        value={value}
        readOnly
        handleClick={onClick}
        handleBlur={onBlur}
      />
    </div>
  )
);

function FormDate({
  className,
  initialValue,
  name,
  label,
  placeholder,
  isInvalid,
  errorMSG,
  maxDate = new Date(),
  valChange,
  setTouched,
  handleBlur,
}) {
  const [value, setValue] = useState();

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <DatePicker
      calendarClassName="portal-datepicker"
      selected={value}
      closeOnScroll
      withPortal
      showMonthDropdown
      showYearDropdown
      maxDate={maxDate}
      customInput={
        <DatePickerElement
          controlClassName={className}
          inputName={name}
          label={label}
          text={placeholder}
          isInvalid={isInvalid}
          errorMessage={errorMSG}
          onBlur={handleBlur}
        />
      }
      dateFormat="dd/MM/yyyy"
      dropdownMode="select"
      fixedHeight
      calendarStartDay={1}
      onCalendarClose={() => {
        setTimeout(() => {
          if (setTouched) setTouched();
        });
      }}
      onChange={(val) => {
        setValue(val);
        valChange(val);
      }}
    />
  );
}

export default FormDate;

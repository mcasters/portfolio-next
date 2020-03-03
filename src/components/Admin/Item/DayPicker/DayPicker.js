import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import ITEM from '../../../../constants/item';

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

function DayPicker({ date, onDayChange }) {
  const FORMAT = ITEM.FORMAT_DATE;
  return (
    <DayPickerInput
      onDayChange={onDayChange}
      formatDate={formatDate}
      format={FORMAT}
      parseDate={parseDate}
      placeholder={
        date === '' ? 'Date' : `${new Date(date).toLocaleDateString()}`
      }
    />
  );
}

DayPicker.propTypes = {
  date: PropTypes.string.isRequired,
  onDayChange: PropTypes.func.isRequired,
};

export default DayPicker;

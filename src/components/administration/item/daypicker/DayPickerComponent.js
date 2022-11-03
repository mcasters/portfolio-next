import { useState } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isValid, parse } from 'date-fns';

import ITEM_CONSTANT from '../../../../constants/itemConstant';

function DayPickerComponent({ handleDayChange, alreadyDay }) {
  const FORMAT = ITEM_CONSTANT.FORMAT_DATE;
  const [inputString, setInputString] = useState('');
  const [selected, setSelected] = useState(format(new Date(), FORMAT));

  const handleInputChange = (e) => {
    setInputString(e.currentTarget.value);
    const date = parse(e.currentTarget.value, FORMAT, new Date());
    if (isValid(date)) {
      setSelected(date);
      const stringDate = format(date, FORMAT);
      handleDayChange(stringDate);
    } else {
      setSelected(undefined);
    }
  };

  const handleSelect = (date) => {
    setSelected(date);
    if (date) {
      const stringDate = format(date, FORMAT);
      handleDayChange(stringDate);
      setInputString(stringDate);
    } else {
      setInputString('');
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder={alreadyDay !== '' ? alreadyDay : selected}
        value={inputString}
        onChange={handleInputChange}
      />
      <DayPicker
        initialFocus={true}
        mode="single"
        selected={selected}
        onSelect={handleSelect}
      />
    </>
  );
}

DayPickerComponent.propTypes = {
  handleDayChange: PropTypes.func.isRequired,
  alreadyDay: PropTypes.string,
};

export default DayPickerComponent;
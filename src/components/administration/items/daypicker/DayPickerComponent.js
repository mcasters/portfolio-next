import { useState } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isValid, parse } from 'date-fns';

import ITEM_CONSTANT from '../../../../constants/itemConstant';

function DayPickerComponent({ handleDayChange, selectedDay }) {
  const FORMAT = ITEM_CONSTANT.FORMAT_DATE;
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState(format(new Date, FORMAT));

  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, FORMAT, new Date());
    if (isValid(date)) {
      setSelected(date);
      handleDayChange(date);
    } else {
      setSelected(undefined);
    }
  };
2
  const handleSelect = (date) => {
    setSelected(date);
    handleDayChange(date);
    if (date) {
      setInputValue(format(date, FORMAT));
    } else {
      setInputValue('');
    }
  };

  return (
    <div>
      <input
          type="text"
          placeholder={selectedDay !== '' ? selectedDay : selected}
          value={inputValue}
          onChange={handleInputChange}
      />
      <DayPicker
          initialFocus={true}
          mode="single"
          selected={selected}
          onSelect={handleSelect}
      />
    </div>
  );
}

DayPickerComponent.propTypes = {
  handleDayChange: PropTypes.func.isRequired,
  selectedDay: PropTypes.object,
};

export default DayPickerComponent;
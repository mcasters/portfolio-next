import { useState } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isValid, parse } from 'date-fns';

import ITEM_CONSTANT from '../../../../constants/itemConstant';

function DayPickerComponent({ handleDayChange, alreadyDay }) {
  const FORMAT = ITEM_CONSTANT.FORMAT_DATE;
  const [formattedDate, setFormattedDate] = useState(format(alreadyDay, FORMAT));
  const [selected, setSelected] = useState(format(alreadyDay, FORMAT));

  const handleInputChange = e => {
    const date = parse(e.currentTarget.value, FORMAT, new Date());
    if (isValid(date)) {
      setSelected(date);
      handleDayChange(date);
    } else {
      setSelected(undefined);
    }
  };

  const handleSelect = date => {
    if (date) {
      handleDayChange(date);
      const dateFormatted = format(date, FORMAT);
      setFormattedDate(dateFormatted);
      setSelected(date);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder={formattedDate}
        value={formattedDate}
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
  alreadyDay: PropTypes.object,
};

export default DayPickerComponent;
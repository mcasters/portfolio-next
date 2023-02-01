import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isValid, parse } from 'date-fns';
import { usePopper } from 'react-popper';
import { FaCalendar } from 'react-icons/fa';

import CONSTANT from '../../../../constants/itemConstant';
import s from './DayPickerComponent.module.css';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

function DayPickerComponent({ handleDayChange, alreadyDay }) {
  const FORMAT = CONSTANT.FORMAT_DATE;
  const [inputValue, setInputValue] = useState(format(alreadyDay, FORMAT));
  const [selected, setSelected] = useState(alreadyDay);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);
  const popper = usePopper(popperRef.current, popperElement);

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  useOnClickOutside(popperElement, closePopper);

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

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, FORMAT));
      handleDayChange(date);
      closePopper();
    }
  };

  return (
    <>
      <div ref={popperRef}>
        <input
          className={s.input}
          type="text"
          placeholder={inputValue}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          ref={buttonRef}
          className={`${s.command} button`}
          type="button"
          aria-label="Sélectionne une date"
          onClick={handleButtonClick}
        >
          <FaCalendar />
        </button>
      </div>
      {isPopperOpen && (
        <div
          tabIndex={-1}
          style={popper.styles.popper}
          className={s.popperContainer}
          {...popper.attributes.popper}
          ref={setPopperElement}
          role="dialog"
        >
          <DayPicker
            initialFocus={isPopperOpen}
            mode="single"
            defaultMonth={selected}
            selected={selected}
            onSelect={handleDaySelect}
          />
        </div>
      )}
    </>
  );
}

DayPickerComponent.propTypes = {
  handleDayChange: PropTypes.func.isRequired,
  alreadyDay: PropTypes.object,
};

export default DayPickerComponent;

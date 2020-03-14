/*
 * @param: date database date format
 * @return: j/m/yyyy format
 */
export const createDateFormat = date => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${newDate.getMonth() +
    1}/${newDate.getFullYear()}`;
};

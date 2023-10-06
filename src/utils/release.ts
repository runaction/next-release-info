import moment from 'moment';

export const generateNewTagFromOld = ({
  oldYear,
  oldMonth,
  oldDay,
  oldItr,
  tagPrefix,
}: {
  oldYear: string;
  oldMonth: string;
  oldDay: string;
  oldItr: number;
  tagPrefix: string;
}) => {
  // const curDate = new Date();
  // const curMonth = curDate.getMonth() + 1;
  // const curYear = curDate.getFullYear();
  // const curDay = curDate.getDate();
  
  const curMonth = moment().format('MM');
  const curYear = moment().format('YYYY');
  const curDay =  moment().format('DD');

  let newYear = curYear;
  let newMonth = curMonth;
  let newDay = curDay;

  let newItr = oldItr + 1;

  // Reset iteration if the day changed since the last release
  if (curDay !== oldDay || curMonth !== oldMonth || curYear !== oldYear) {
    newItr = 0;
  }

  // Append iteration on the second and following releases on the same day
  const newTag = `${tagPrefix}${newYear}${newMonth}${newDay}`;
  if (newItr == 0) {
    return newTag;
  }
  return `${newTag}-${newItr}`;
};

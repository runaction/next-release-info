import { generateNewTagFromOld } from '../utils/release';
import moment from 'moment';

export const getNewReleaseTag = (
  tagPrefix: string,
  tagFormat: string | null | undefined,
  oldReleaseTag: string | null | undefined
) => {
  if (oldReleaseTag && oldReleaseTag.startsWith(tagPrefix)) {
    // const [oldYear, oldMonth, oldDay, oldItr] = oldReleaseTag
    //   .substring(tagPrefix.length)
    //   .split('.')
    //   .map((x) => x);

    // Format is v1.0
    if (tagFormat != "dated") {
      const tagParts = oldReleaseTag.split('.');
      const iter = Number(tagParts.pop()) + 1;
      tagParts.push(iter.toString());
      return tagParts.join('.');
    }

    // Format is v20231020
    const date = oldReleaseTag.substring(tagPrefix.length);
    const dateMoment = moment(date, 'YYYYMMDD');

    const oldYear = dateMoment.format('YYYY');
    const oldMonth = dateMoment.format('MM');
    const oldDay = dateMoment.format('DD');

    // Use iteration of the same-date release, like v20231020-1
    const oldItr = (date.length > 8) ? Number(date.substring(9)) : -1;

    return generateNewTagFromOld({
      oldYear,
      oldMonth,
      oldDay,
      oldItr,
      tagPrefix,
    });
  }
  // Handle no releases yet or prefix not matching last release
  return generateNewTagFromOld({
    oldYear: "-1",
    oldMonth: "-1",
    oldDay: "-1",
    oldItr: -1,
    tagPrefix,
  });
};

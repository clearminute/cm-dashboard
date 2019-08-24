import colors from 'clearminute/styles/colors';
import * as constants from 'clearminute/common/constants/constants';

export default function getColor(productivityKey) {
  switch (productivityKey) {
    case constants.PRODUCTIVE_KEY:
      return colors['dark-sky-blue'];
    case constants.SLIGHTLY_PRODUCTIVE_KEY:
      return '#80AFEE';
    case constants.SLIGHTLY_DISTRACTING_KEY:
      return '#F1AAA9';
    case constants.DISTRACTING_KEY:
      return colors['faded-orange'];
    default:
      return colors['light-blue-white'];
  }
}

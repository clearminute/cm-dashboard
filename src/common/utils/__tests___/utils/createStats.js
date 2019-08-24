// Externals - Others
import defaults from 'lodash/defaults';
import setWith from 'lodash/setWith';

// Internals - Others
import {
  PRODUCTIVE_KEY,
  NEUTRAL_KEY,
  DISTRACTING_KEY,
} from 'clearminute/common/constants/constants';

export default function createStats(year, month, day, hour, value = {}) {
  // backend always delivers keys, even if value is 0, so default to 0 no empty keys for
  const valueWithDefaults = defaults(value, {
    [PRODUCTIVE_KEY]: 0,
    [NEUTRAL_KEY]: 0,
    [DISTRACTING_KEY]: 0,
  });

  return setWith({}, `[${year}].[${month}].[${day}].[${hour}]`, valueWithDefaults, Object);
}

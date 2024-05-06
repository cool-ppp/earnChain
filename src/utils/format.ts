import BigNumber from 'bignumber.js';
import { ZERO } from 'constants/index';
import { DEFAULT_MIN_AMOUNT } from 'constants/stack';
import { ONE_DAY_IN_MS, ONE_HOUR_IN_MS, ONE_MINUTE_IN_MS } from 'constants/stack';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

window.dayjs = dayjs;
window.zero = ZERO;

export function formatTime({
  minDigits = 2,
  showSecond = true,
  hours,
  minutes,
  seconds,
}: {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
  showSecond?: boolean;
  minDigits?: number;
}) {
  if (minDigits === 1) {
    return `${hours}:${minutes}${showSecond ? `:${seconds}` : ''}`;
  } else {
    return `${timeFillDigits(hours)}:${timeFillDigits(minutes)}${
      showSecond ? `:${timeFillDigits(seconds)}` : ''
    }`;
  }
}

export function timeFillDigits(n: number | string) {
  return `${String(n).length < 2 ? `0${n}` : n}`;
}

export function formatTokenPrice(
  price: number | BigNumber | string,
  toFixedProps?: {
    decimalPlaces?: number;
    roundingMode?: BigNumber.RoundingMode;
  },
) {
  const { decimalPlaces = 4, roundingMode = BigNumber.ROUND_DOWN } = toFixedProps || {};
  const priceBig: BigNumber = BigNumber.isBigNumber(price) ? price : new BigNumber(price);
  if (priceBig.isNaN()) return `${price}`;

  if (!priceBig.isEqualTo(0) && priceBig.lt(0.0001)) {
    return '< 0.0001';
  }

  const priceFixed = priceBig.toFixed(decimalPlaces, roundingMode);
  const res = new BigNumber(priceFixed).toFormat();
  return res;
}

export function formatUSDPrice(
  price: number | BigNumber | string,
  toFixedProps?: {
    decimalPlaces?: number;
    roundingMode?: BigNumber.RoundingMode;
  },
) {
  const { decimalPlaces = 4, roundingMode = BigNumber.ROUND_DOWN } = toFixedProps || {};
  const priceBig: BigNumber = BigNumber.isBigNumber(price) ? price : new BigNumber(price);
  if (priceBig.isNaN()) return `${price}`;
  const priceFixed = priceBig.toFixed(decimalPlaces, roundingMode);
  const priceFixedBig = new BigNumber(priceFixed);

  if (priceBig.comparedTo(0) === 0) {
    return '$ 0';
  }

  if (priceFixedBig.comparedTo(0.0001) === -1) {
    return '<$ 0.0001';
  }

  return `$ ${priceFixedBig.toFormat()}`;
}

const KUnit = 1000;
const MUnit = KUnit * 1000;
const BUnit = MUnit * 1000;
const TUnit = BUnit * 1000;

export function formatNumber(
  number: number | string | BigNumber,
  toFixedProps?: {
    decimalPlaces?: number;
    roundingMode?: BigNumber.RoundingMode;
  },
) {
  const { decimalPlaces = 2, roundingMode = BigNumber.ROUND_DOWN } = toFixedProps || {};
  const numberBig: BigNumber = BigNumber.isBigNumber(number) ? number : new BigNumber(number);
  if (numberBig.isNaN() || numberBig.eq(0)) return '0';

  const regexp = /(?:\.0*|(\.\d+?)0+)$/;

  const abs = numberBig.abs();
  if (abs.gt(TUnit)) {
    return numberBig.div(TUnit).toFixed(decimalPlaces, roundingMode).replace(regexp, '$1') + 'T';
  } else if (abs.gte(BUnit)) {
    return numberBig.div(BUnit).toFixed(decimalPlaces, roundingMode).replace(regexp, '$1') + 'B';
  } else if (abs.gte(MUnit)) {
    return numberBig.div(MUnit).toFixed(decimalPlaces, roundingMode).replace(regexp, '$1') + 'M';
  } else if (abs.gte(KUnit)) {
    return numberBig.div(KUnit).toFixed(decimalPlaces, roundingMode).replace(regexp, '$1') + 'K';
  }
  return BigNumber.isBigNumber(number) ? number.toNumber() : number;
}

export const POTENTIAL_NUMBER = /^(0|[1-9]\d*)(\.\d*)?$/;
export const isPotentialNumber = (str: string) => {
  return POTENTIAL_NUMBER.test(str);
};

export function formatNumberWithDecimal(val: number | string | BigNumber, decimal = 2) {
  const _val = ZERO.plus(val);
  if (_val.isNaN()) return '';
  return ZERO.plus(_val.toFixed(decimal)).toFormat();
}

export function formatTokenAmount(val: string | number, min = DEFAULT_MIN_AMOUNT) {
  const _val = ZERO.plus(val);
  if (_val.isNaN() || _val.lte('0')) return '0.00';
  if (_val.gt(0) && _val.lt(min)) return `< ${min}`;
  return formatNumberWithDecimal(_val);
}

export function formatUSDAmount(val: string | number, min = DEFAULT_MIN_AMOUNT) {
  const _val = ZERO.plus(val);
  if (_val.isNaN() || _val.lte('0')) return '$0';
  if (_val.gt(0) && _val.lt(min)) return `< $${min}`;
  return `$${formatNumberWithDecimal(_val)}`;
}

export function timeDuration(time: number, format = 'DD[d] HH[h] mm[m]') {
  return dayjs.duration(time)?.format(format);
}

export function formatTimeStr(val: number | string, timeOutStr = 'unLocked') {
  if (!val) return '--';
  const timestamp = dayjs(val);
  const current = dayjs();
  const remainingTime = timestamp.diff(current);

  if (remainingTime < 0) return timeOutStr;
  if (remainingTime < ONE_MINUTE_IN_MS) return '< 1m';
  if (remainingTime < ONE_HOUR_IN_MS) return timeDuration(remainingTime, 'mm[m]');
  if (remainingTime < ONE_DAY_IN_MS) return timeDuration(remainingTime, 'HH[h] mm[m]');
  return timeDuration(remainingTime);
}

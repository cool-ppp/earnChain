import { useCountDown } from 'ahooks';
import { useMemo } from 'react';
export default function CountDownLock({ targetTimeStamp }: { targetTimeStamp: number | string }) {
  const [countdown, { days, hours, minutes }] = useCountDown({
    targetDate: Number(targetTimeStamp),
  });

  const countDisplay = useMemo(() => {
    if (days < 1) {
      if (hours < 1) {
        if (minutes < 1) {
          return '<1m';
        }
        return `${minutes}m`;
      }
      return `${hours}h-${minutes}m`;
    }
    return `${days}d-${hours}h-${minutes}m`;
  }, [days, hours, minutes]);

  return <>{countDisplay}</>;
}

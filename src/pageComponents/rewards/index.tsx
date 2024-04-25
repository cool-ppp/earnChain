import PoolsAmount from './components/PoolsAmount';
import PoolsTable from './components/PoolsTable';

export default function Rewards() {
  return (
    <>
      <h2 className="text-4xl text-neutralTitle pt-10">Rewards</h2>
      <div className="text-base text-neutralPrimary flex flex-col gap-1 mt-1">
        <p>For your claimed rewards, you can withdraw it after a 12-hour lock-up period.</p>
        <p>
          After staking points in XPSGR points pools, you can restake your claimed SGR rewards,
          including SGR rewards during the lock-up period.
        </p>
      </div>
      <div className="mt-8">
        <PoolsAmount />
      </div>
      <div className="mt-6">
        <PoolsTable />
      </div>
    </>
  );
}

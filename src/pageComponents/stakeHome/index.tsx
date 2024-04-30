import DappList from './components/DappList';
import useStakingHomeService from './hooks/useStakingHomeService';

export default function StakeHome() {
  const { dAppList, loading } = useStakingHomeService();
  return (
    <div className="">
      <div className="py-[40px] md:py-[80px] text-center text-6xl font-medium text-neutral-title">
        Participate in points mining for high earnings
      </div>
      <DappList items={dAppList || []} loading={loading} />
    </div>
  );
}

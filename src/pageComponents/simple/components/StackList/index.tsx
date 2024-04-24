import ListCard from '../ListCard';

interface IStackListProps {
  data: any;
}

export default function StackList({ data }: IStackListProps) {
  return (
    <div className="rounded-xl border border-solid border-neutralDivider bg-neutralWhiteBg px-6 py-6">
      <div className="text-xl font-medium mb-6">4 Stacked Position</div>
      <ListCard />
    </div>
  );
}

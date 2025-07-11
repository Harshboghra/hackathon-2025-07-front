import { LatestFailedLogs } from '../../components/dashboard/LatestFailedLogs';

const DashboardIndex = () => {
  return (
    <div className="flex gap-3 mb-4">
      <LatestFailedLogs />
    </div>
  );
};

export default DashboardIndex;

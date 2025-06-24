import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDashboardStore } from '@/store';
import { Player } from '@/types';

const PlayerDemographics = () => {
  const { players } = useDashboardStore();

  const data = (players || []).reduce((acc: { country: string; users: number }[], player: Player) => {
    const country = player.country || 'Unknown';
    const existingCountry = acc.find((item: { country: string; users: number }) => item.country === country);
    if (existingCountry) {
      existingCountry.users++;
    } else {
      acc.push({ country, users: 1 });
    }
    return acc;
  }, [] as { country: string; users: number }[]).sort((a: { country: string; users: number }, b: { country: string; users: number }) => b.users - a.users);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Player Demographics by Country</h3>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#3B82F6" name="Number of Players" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlayerDemographics; 
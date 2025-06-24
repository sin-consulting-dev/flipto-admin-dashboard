import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDashboardStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Game } from '@/types';

const GamePopularity = () => {
  const { games } = useDashboardStore();

  const sortedGames = (games || [])
    .sort((a: Game, b: Game) => b.totalPlays - a.totalPlays)
    .slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Most Popular Games by Plays</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedGames} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalPlays" fill="#8884d8" name="Total Plays" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GamePopularity; 
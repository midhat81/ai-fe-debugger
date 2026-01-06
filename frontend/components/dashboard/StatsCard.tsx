interface StatsCardProps {
    icon: string;
    label: string;
    value: number;
    color: 'blue' | 'green' | 'red' | 'purple';
  }
  
  const colorClasses = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  };
  
  export default function StatsCard({ icon, label, value, color }: StatsCardProps) {
    return (
      <div className={`${colorClasses[color]} border rounded-lg p-6`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">{icon}</span>
          <span className="text-3xl font-bold">{value}</span>
        </div>
        <div className="text-sm opacity-80">{label}</div>
      </div>
    );
  }
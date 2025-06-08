interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  icon?: string;
}

export default function StatsCard({ title, value, subtitle, color, icon }: StatsCardProps) {
  const gradientClasses = {
    blue: 'gradient-blue',
    green: 'gradient-green',
    yellow: 'from-amber-500 to-orange-500',
    purple: 'gradient-purple',
    orange: 'gradient-orange',
  };

  return (
    <div className={`stats-card ${gradientClasses[color]} animate-fade-in-up`}>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-white/90 text-sm font-medium mb-1">{title}</p>
            <p className="text-4xl font-bold text-white mb-2">{value}</p>
            <p className="text-white/80 text-sm">{subtitle}</p>
          </div>
          {icon && (
            <div className="text-3xl opacity-80">
              {icon}
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 bg-white/20 rounded-full h-1">
            <div
              className="bg-white/60 h-1 rounded-full transition-all duration-1000"
              style={{ width: typeof value === 'string' && value.includes('%') ? value : '100%' }}
            />
          </div>
          <div className="text-white/80 text-xs font-medium">
            {typeof value === 'string' && value.includes('%') ? value : '100%'}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
    </div>
  );
}

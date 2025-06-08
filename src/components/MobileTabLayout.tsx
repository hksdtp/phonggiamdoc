'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types';
import MobileTaskTable from './MobileTaskTable';
import { getTaskStats } from '@/utils/taskUtils';

type Props = {
  tasks: Task[];
};

export default function MobileTabLayout({ tasks }: Props) {
  const [activeTab, setActiveTab] = useState<'hung' | 'ninh'>('hung');
  const [statsFilter, setStatsFilter] = useState<'all' | 'completed' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-sync from Google Sheets on component mount
  useEffect(() => {
    const autoSync = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/sync-sheets');
        if (response.ok) {
          const result = await response.json();
          console.log('Auto-sync successful:', result.message);
          // Reload page to get fresh data
          setTimeout(() => window.location.reload(), 1000);
        }
      } catch (error) {
        console.warn('Auto-sync failed:', error);
        // Continue with existing data if sync fails
      } finally {
        setIsLoading(false);
      }
    };

    autoSync();
  }, []);

  const mrHungTasks = tasks.filter(task => task.assignee === 'Mr Hùng');
  const ninhTasks = tasks.filter(task => task.assignee === 'Ninh');
  
  const mrHungStats = getTaskStats(mrHungTasks);
  const ninhStats = getTaskStats(ninhTasks);

  // Apply stats filter
  let filteredTasks = activeTab === 'hung' ? mrHungTasks : ninhTasks;
  if (statsFilter === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.progress >= 100);
  } else if (statsFilter === 'all') {
    filteredTasks = filteredTasks.filter(task => task.progress < 100);
  }

  const currentTasks = filteredTasks;
  const currentStats = activeTab === 'hung' ? mrHungStats : ninhStats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-5">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center">
            Công việc phòng Giám Đốc
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8" style={{ paddingBottom: 'max(6rem, calc(3.5rem + env(safe-area-inset-bottom)))' }}>
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center mb-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-2xl border border-blue-200">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium text-blue-700">Đang đồng bộ dữ liệu...</span>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-8 mb-8 shadow-lg shadow-gray-900/5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStatsFilter(statsFilter === 'all' ? null : 'all')}
              className={`flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 ${
                statsFilter === 'all'
                  ? 'bg-blue-50 border border-blue-200 shadow-sm'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">
                Tổng: <span className="font-bold text-gray-900 text-xl">{currentStats.total}</span>
              </span>
            </button>
            <button
              onClick={() => setStatsFilter(statsFilter === 'completed' ? null : 'completed')}
              className={`flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 ${
                statsFilter === 'completed'
                  ? 'bg-emerald-50 border border-emerald-200 shadow-sm'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">
                Hoàn thành: <span className="font-bold text-gray-900 text-xl">{currentStats.completed}</span>
              </span>
            </button>
            <div className="flex items-center gap-4 px-5 py-3">
              <div className="w-4 h-4 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">
                TB: <span className="font-bold text-gray-900 text-xl">{currentStats.avgProgress}%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Task Table */}
        <MobileTaskTable tasks={currentTasks} />
      </div>

      {/* Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/60 shadow-lg">
        <div className="flex gap-3 p-4 pb-safe">
          <button
            onClick={() => setActiveTab('hung')}
            className={`flex-1 py-4 px-4 text-center transition-all duration-300 rounded-2xl ${
              activeTab === 'hung'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/25'
                : 'bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200/50'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg ${
                activeTab === 'hung' ? 'bg-white/20' : 'bg-blue-500/10'
              }`}>
                👨‍💼
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">Mr Hùng</span>
                <span className={`text-xs ${
                  activeTab === 'hung' ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {mrHungStats.total} việc
                </span>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('ninh')}
            className={`flex-1 py-4 px-4 text-center transition-all duration-300 rounded-2xl ${
              activeTab === 'ninh'
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/25'
                : 'bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200/50'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg ${
                activeTab === 'ninh' ? 'bg-white/20' : 'bg-emerald-500/10'
              }`}>
                🚗
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">Ninh</span>
                <span className={`text-xs ${
                  activeTab === 'ninh' ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {ninhStats.total} việc
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

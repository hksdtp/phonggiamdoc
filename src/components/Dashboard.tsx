'use client';

import { Task } from '@/types';
import { getTaskStats } from '@/utils/taskUtils';
import TaskTable from './TaskTable';
import { useState } from 'react';

interface DashboardProps {
  tasks: Task[];
}

export default function Dashboard({ tasks }: DashboardProps) {
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');

  const filteredTasks = selectedAssignee
    ? tasks.filter(task => task.assignee === selectedAssignee)
    : tasks;

  const allStats = getTaskStats(tasks);
  const mrHungTasks = tasks.filter(task => task.assignee === 'Mr Hùng');
  const ninhTasks = tasks.filter(task => task.assignee === 'Ninh');
  const mrHungStats = getTaskStats(mrHungTasks);
  const ninhStats = getTaskStats(ninhTasks);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                Work Tracker
              </h1>
              <p className="text-slate-600">
                Hệ thống theo dõi công việc của Mr Hùng và Ninh
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Cập nhật realtime
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 p-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 w-fit">
            <button
              onClick={() => setSelectedAssignee('')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedAssignee === ''
                  ? 'bg-white text-slate-900 shadow-lg shadow-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedAssignee('Mr Hùng')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedAssignee === 'Mr Hùng'
                  ? 'bg-white text-slate-900 shadow-lg shadow-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Mr Hùng
            </button>
            <button
              onClick={() => setSelectedAssignee('Ninh')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedAssignee === 'Ninh'
                  ? 'bg-white text-slate-900 shadow-lg shadow-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Ninh
            </button>
          </div>
        </div>

        {/* Compact Stats Bar */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-4 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {selectedAssignee === '' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Tổng: <span className="font-bold text-slate-900">{allStats.total}</span> công việc</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Tiến độ TB: <span className="font-bold text-slate-900">{allStats.avgProgress}%</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Mr Hùng: <span className="font-bold text-slate-900">{mrHungStats.total}</span> task ({mrHungStats.avgProgress}%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Ninh: <span className="font-bold text-slate-900">{ninhStats.total}</span> task ({ninhStats.avgProgress}%)</span>
                </div>
              </>
            )}

            {selectedAssignee === 'Mr Hùng' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Tổng: <span className="font-bold text-slate-900">{mrHungStats.total}</span> công việc</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Hoàn thành: <span className="font-bold text-slate-900">{mrHungStats.completed}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Đang làm: <span className="font-bold text-slate-900">{mrHungStats.inProgress}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Tiến độ TB: <span className="font-bold text-slate-900">{mrHungStats.avgProgress}%</span></span>
                </div>
              </>
            )}

            {selectedAssignee === 'Ninh' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Tổng: <span className="font-bold text-slate-900">{ninhStats.total}</span> công việc</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Hoàn thành: <span className="font-bold text-slate-900">{ninhStats.completed}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Đang làm: <span className="font-bold text-slate-900">{ninhStats.inProgress}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Tiến độ TB: <span className="font-bold text-slate-900">{ninhStats.avgProgress}%</span></span>
                </div>
              </>
            )}
          </div>
        </div>

        <TaskTable tasks={filteredTasks} />
      </div>
    </div>
  );
}

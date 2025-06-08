'use client';

import { Task } from '@/types';
import { getStatusColor, getProgressColor, formatDate, filterTasks } from '@/utils/taskUtils';
import { getTaskCategory, groupTasksByPriority } from '@/utils/categoryUtils';
import { useState } from 'react';
import TaskModal from './TaskModal';

interface MobileTaskTableProps {
  tasks: Task[];
}

export default function MobileTaskTable({ tasks }: MobileTaskTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>('all');
  // Filter tasks (completed filtering is handled by parent component)
  const filteredTasks = filterTasks(tasks, searchTerm, statusFilter, '');

  const uniqueStatuses = Array.from(new Set(tasks.map(task => task.status).filter(Boolean)));
  const groupedTasks = groupTasksByPriority(filteredTasks);

  // Get all unique groups for tabs
  const allGroups = [
    { key: 'all', label: 'Tất cả', icon: '📋', count: filteredTasks.length },
    ...groupedTasks.map(group => ({
      key: group.key,
      label: group.key === 'priority' ? 'Quan trọng' : group.category.label,
      icon: group.category.icon,
      count: group.tasks.length
    }))
  ];

  // Filter tasks based on active group
  const displayTasks = activeGroup === 'all'
    ? filteredTasks
    : groupedTasks.find(g => g.key === activeGroup)?.tasks || [];

  return (
    <div className="space-y-4">
      {/* Search and Filter - Single Row */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm công việc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 shadow-sm transition-all duration-200"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 shadow-sm min-w-[140px] transition-all duration-200"
        >
          <option value="">Tất cả trạng thái</option>
          {uniqueStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>



      {/* Group Tabs - Multi-row Layout */}
      <div className="flex flex-wrap gap-3 pb-2">
        {allGroups.map((group) => (
          <button
            key={group.key}
            onClick={() => setActiveGroup(group.key)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              activeGroup === group.key
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm border border-gray-200'
            }`}
          >
            <span className="text-base">{group.icon}</span>
            <span className="font-semibold whitespace-nowrap">
              {group.label === 'Tất cả' ? 'Tất cả' :
               group.label === 'Quan trọng' ? 'Quan trọng' :
               group.label.includes('PHÒNG DỰ ÁN') ? 'Dự án' :
               group.label.includes('PHÒNG BÁN LẺ') ? 'Bán lẻ' :
               group.label.includes('MUA HÀNG') ? 'Mua hàng' :
               group.label.includes('KHO') ? 'Kho' :
               group.label.includes('TỔ MAY') ? 'Tổ may' :
               group.label.includes('PHÁT TRIỂN') ? 'Phát triển' :
               group.label}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${
              activeGroup === group.key
                ? 'bg-white/20 text-white'
                : 'bg-blue-50 text-blue-600'
            }`}>
              {group.count}
            </span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
        {displayTasks.map((task, index) => (
          <div
            key={task.id}
            className="flex items-center p-6 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50/50 transition-all duration-200 active:bg-gray-100/50"
            onClick={() => setSelectedTask(task)}
            style={{ animationDelay: `${index * 30}ms` }}
          >
                {/* Content */}
                <div className="flex-1 min-w-0">
              {/* Category Badge and Title */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getTaskCategory(task).bgColor} ${getTaskCategory(task).color} border border-white/30`}>
                  <span className="text-xs">{getTaskCategory(task).icon}</span>
                  {getTaskCategory(task).label}
                </span>
                <span className="text-xs text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-full">
                  {task.assignee === 'Mr Hùng' ? '2 ngày trước' : '1 ngày trước'}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-base line-clamp-1 mb-2">
                {task.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                {task.description}
              </p>

              {/* Meta info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className={`w-2 h-2 rounded-full ${
                    task.assignee === 'Mr Hùng' ? 'bg-blue-500' : 'bg-emerald-500'
                  }`} />
                  <span className="font-medium">{task.assignee}</span>
                  {task.endDate && (
                    <>
                      <span>•</span>
                      <span>{formatDate(task.endDate)}</span>
                    </>
                  )}
                  {task.status && (
                    <>
                      <span>•</span>
                      <span className={`font-medium ${getStatusColor(task.status).includes('blue') ? 'text-blue-600' :
                        getStatusColor(task.status).includes('green') ? 'text-green-600' :
                        getStatusColor(task.status).includes('purple') ? 'text-purple-600' : 'text-gray-600'}`}>
                        {task.status}
                      </span>
                    </>
                  )}
                </div>

                {/* Progress indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(task.progress)}`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700 min-w-[2.5rem] bg-gray-100 px-2 py-0.5 rounded-full">
                    {task.progress}%
                  </span>
                </div>
                </div>
              </div>
              </div>
        ))}
      </div>

      {/* Empty State */}
      {displayTasks.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy công việc</h3>
          <p className="text-sm text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}

      {/* Task Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

'use client';

import { Task } from '@/types';
import { getStatusColor, getProgressColor, formatDate, filterTasks } from '@/utils/taskUtils';
import { useState } from 'react';
import TaskModal from './TaskModal';

interface TaskTableProps {
  tasks: Task[];
}

export default function TaskTable({ tasks }: TaskTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const filteredTasks = filterTasks(tasks, searchTerm, statusFilter, '');
  
  const uniqueStatuses = Array.from(new Set(tasks.map(task => task.status).filter(Boolean)));

  return (
    <div className="modern-card animate-fade-in-up">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Danh sách công việc</h2>
            <p className="text-slate-600">Tổng cộng {filteredTasks.length} công việc</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Cập nhật mới nhất
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm công việc, phòng ban..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-input pl-10"
            />
          </div>
          <div className="sm:w-56">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="modern-select"
            >
              <option value="">Tất cả trạng thái</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200/60">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Công việc</th>
              <th>Người thực hiện</th>
              <th>Phòng ban</th>
              <th>Tiến độ</th>
              <th>Trạng thái</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr
                key={task.id}
                className="cursor-pointer group"
                onClick={() => setSelectedTask(task)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td>
                  <div className="max-w-xs">
                    <p className="font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {task.title}
                    </p>
                    <p className="text-sm text-slate-500 line-clamp-2 mt-1">
                      {task.description}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      task.assignee === 'Mr Hùng' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      task.assignee === 'Mr Hùng'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      {task.assignee}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="text-sm text-slate-600 font-medium">
                    {task.department || '-'}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <div className="progress-container flex-1">
                      <div
                        className={`progress-bar ${getProgressColor(task.progress)}`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 min-w-[3rem]">
                      {task.progress}%
                    </span>
                  </div>
                </td>
                <td>
                  {task.status && (
                    <span className={`status-badge ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  )}
                </td>
                <td>
                  <span className="text-sm text-slate-600 font-medium">
                    {formatDate(task.endDate || '') || '-'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Không tìm thấy công việc</h3>
          <p className="text-slate-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

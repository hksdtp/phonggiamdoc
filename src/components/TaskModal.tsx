'use client';

import { Task } from '@/types';
import { getStatusColor, getProgressColor, formatDate } from '@/utils/taskUtils';
import { useEffect } from 'react';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
}

export default function TaskModal({ task, onClose }: TaskModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-8 border-b border-gray-200/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${
                  task.assignee === 'Mr Hùng' ? 'bg-blue-500' : 'bg-emerald-500'
                }`} />
                <span className="text-sm font-medium text-gray-600">
                  {task.assignee}
                </span>
                {task.department && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{task.department}</span>
                  </>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {task.title}
              </h2>
              <div className="flex items-center gap-3">
                {task.status && (
                  <span className={`status-badge ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className={`w-2 h-2 rounded-full ${getProgressColor(task.progress)}`} />
                  {task.progress}% hoàn thành
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">

          <div className="space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                📝 Mô tả chi tiết
              </h3>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{task.description}</p>
              </div>
            </div>

            {/* Timeline and Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  ⏰ Thời gian
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">Bắt đầu:</span>
                    <span className="font-semibold text-slate-900">
                      {formatDate(task.startDate || '') || 'Chưa xác định'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">Deadline:</span>
                    <span className="font-semibold text-slate-900">
                      {formatDate(task.endDate || '') || 'Chưa xác định'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  📊 Tiến độ
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="progress-container flex-1">
                        <div
                          className={`progress-bar ${getProgressColor(task.progress)}`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-2xl font-bold text-slate-900">
                        {task.progress}%
                      </span>
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                      {task.progress === 0 && '🔴 Chưa bắt đầu'}
                      {task.progress > 0 && task.progress < 100 && '🟡 Đang thực hiện'}
                      {task.progress === 100 && '🟢 Hoàn thành'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {task.notes && (
              <div>
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  ⚠️ Ghi chú / Vướng mắc
                </h4>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{task.notes}</p>
                </div>
              </div>
            )}

            {/* Feedback */}
            {task.feedback && (
              <div>
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  💬 Nhận xét của Sếp Hạnh
                </h4>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{task.feedback}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="btn-primary"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

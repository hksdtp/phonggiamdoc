import { Task, TaskStats } from '@/types';

export const getTaskStats = (tasks: Task[]): TaskStats => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.progress === 100).length;
  const inProgress = tasks.filter(task => task.progress > 0 && task.progress < 100).length;
  const notStarted = tasks.filter(task => task.progress === 0).length;
  const avgProgress = tasks.reduce((sum, task) => sum + task.progress, 0) / total;

  return {
    total,
    completed,
    inProgress,
    notStarted,
    avgProgress: Math.round(avgProgress)
  };
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Đang triển khai':
    case 'Đang tiến hành':
      return 'bg-blue-100 text-blue-800';
    case 'Đang hoàn thành':
      return 'bg-green-100 text-green-800';
    case 'Triển khai hàng tháng':
      return 'bg-purple-100 text-purple-800';
    case 'Đang chờ phê duyệt':
      return 'bg-yellow-100 text-yellow-800';
    case 'Chưa tiến hành':
    case 'Chưa bắt đầu':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getProgressColor = (progress: number): string => {
  if (progress === 0) return 'bg-gray-200';
  if (progress < 30) return 'bg-red-500';
  if (progress < 70) return 'bg-yellow-500';
  if (progress < 100) return 'bg-blue-500';
  return 'bg-green-500';
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  return dateStr;
};

export const filterTasks = (tasks: Task[], searchTerm: string, statusFilter: string, assigneeFilter: string): Task[] => {
  return tasks.filter(task => {
    const matchesSearch = !searchTerm || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.department && task.department.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || task.status === statusFilter;
    const matchesAssignee = !assigneeFilter || task.assignee === assigneeFilter;
    
    return matchesSearch && matchesStatus && matchesAssignee;
  });
};

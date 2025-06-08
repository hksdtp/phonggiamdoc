export interface Task {
  id: number;
  department?: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  progress: number;
  status: string;
  notes?: string;
  feedback?: string;
  assignee: 'Mr Hùng' | 'Ninh';
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  avgProgress: number;
}

export type StatusType = 'Đang triển khai' | 'Đang tiến hành' | 'Đang hoàn thành' | 'Triển khai hàng tháng' | 'Đang chờ phê duyệt' | 'Chưa tiến hành' | 'Chưa bắt đầu' | 'Tk';

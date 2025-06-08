import { Task } from '@/types';

export type TaskCategory = {
  icon: string;
  color: string;
  bgColor: string;
  label: string;
  priority?: boolean;
};

export const getTaskCategory = (task: Task): TaskCategory => {
  const department = task.department?.toUpperCase() || '';
  const title = task.title.toLowerCase();
  const description = task.description.toLowerCase();

  // Dự án quan trọng (có sao)
  if (
    title.includes('dự án đông dương') ||
    title.includes('app kho') ||
    task.progress >= 50
  ) {
    return {
      icon: '⭐',
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      label: department || 'QUAN TRỌNG',
      priority: true
    };
  }

  // Phòng Dự Án
  if (department.includes('PHÒNG DỰ ÁN') || title.includes('dự án') || title.includes('app dự án')) {
    return {
      icon: '🔵',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      label: 'PHÒNG DỰ ÁN'
    };
  }

  // Phòng Bán Lẻ
  if (department.includes('PHÒNG BÁN LẺ') || department.includes('BÁN LẺ')) {
    return {
      icon: '🟢',
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      label: 'PHÒNG BÁN LẺ'
    };
  }

  // Hệ Thống
  if (
    department.includes('HỆ THỐNG') ||
    title.includes('app') ||
    title.includes('hệ thống') ||
    title.includes('tasklist')
  ) {
    return {
      icon: '🔵',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      label: 'HỆ THỐNG'
    };
  }

  // Mua Hàng
  if (department.includes('MUA HÀNG') || title.includes('mua hàng') || title.includes('hunter douglas')) {
    return {
      icon: '🟣',
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      label: 'MUA HÀNG'
    };
  }

  // Kho
  if (
    department.includes('KHO') ||
    title.includes('kho') ||
    title.includes('xuất hàng') ||
    title.includes('tồn kho')
  ) {
    return {
      icon: '📦',
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-100',
      label: 'KHO'
    };
  }

  // Tổ May
  if (
    department.includes('TỔ MAY') ||
    title.includes('sản xuất') ||
    title.includes('may') ||
    title.includes('vải')
  ) {
    return {
      icon: '✂️',
      color: 'text-pink-700',
      bgColor: 'bg-pink-100',
      label: 'TỔ MAY'
    };
  }

  // Phát triển sản phẩm
  if (
    department.includes('PHÁT TRIỂN SẢN PHẨM') ||
    title.includes('motor') ||
    title.includes('phát triển')
  ) {
    return {
      icon: '🔬',
      color: 'text-cyan-700',
      bgColor: 'bg-cyan-100',
      label: 'PHÁT TRIỂN SP'
    };
  }

  // Marketing
  if (
    title.includes('marketing') ||
    title.includes('fanpage') ||
    title.includes('hình ảnh') ||
    title.includes('chụp ảnh') ||
    title.includes('áo teambuilding')
  ) {
    return {
      icon: '📸',
      color: 'text-rose-700',
      bgColor: 'bg-rose-100',
      label: 'MARKETING'
    };
  }

  // Sự kiện
  if (
    title.includes('sự kiện') ||
    title.includes('vinh quang') ||
    title.includes('bằng khen') ||
    title.includes('đào tạo')
  ) {
    return {
      icon: '🎉',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      label: 'SỰ KIỆN'
    };
  }

  // Du lịch / Visa
  if (
    title.includes('visa') ||
    title.includes('thượng hải') ||
    title.includes('nhật') ||
    title.includes('du lịch')
  ) {
    return {
      icon: '✈️',
      color: 'text-sky-700',
      bgColor: 'bg-sky-100',
      label: 'DU LỊCH'
    };
  }

  // Dự án cá nhân / Khác
  if (
    title.includes('trường học') ||
    title.includes('thiết kế nhà') ||
    title.includes('xăng') ||
    title.includes('vista lago')
  ) {
    return {
      icon: '🏠',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      label: 'CÁ NHÂN'
    };
  }

  // Thanh lý
  if (department.includes('THANH LÝ') || title.includes('thanh lý')) {
    return {
      icon: '💰',
      color: 'text-amber-700',
      bgColor: 'bg-amber-100',
      label: 'THANH LÝ'
    };
  }

  // Mặc định
  return {
    icon: '📋',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    label: department || 'KHÁC'
  };
};

export const getCategoryIcon = (category: TaskCategory): string => {
  return category.priority ? '⭐' : category.icon;
};

// Nhóm và sắp xếp tasks theo thứ tự ưu tiên
export const groupTasksByPriority = (tasks: Task[]) => {
  const grouped = tasks.reduce((acc, task) => {
    const category = getTaskCategory(task);
    const groupKey = category.priority ? 'priority' : category.label;

    if (!acc[groupKey]) {
      acc[groupKey] = {
        category,
        tasks: []
      };
    }
    acc[groupKey].tasks.push(task);
    return acc;
  }, {} as Record<string, { category: TaskCategory; tasks: Task[] }>);

  // Sắp xếp theo thứ tự ưu tiên
  const priorityOrder = [
    'priority',
    'PHÒNG DỰ ÁN',
    'HỆ THỐNG',
    'MARKETING',
    'SỰ KIỆN',
    'DU LỊCH',
    'PHÒNG BÁN LẺ',
    'MUA HÀNG',
    'KHO',
    'TỔ MAY',
    'PHÁT TRIỂN SP',
    'THANH LÝ',
    'CÁ NHÂN',
    'KHÁC'
  ];

  const sortedGroups = Object.entries(grouped)
    .sort(([a], [b]) => {
      const indexA = priorityOrder.indexOf(a);
      const indexB = priorityOrder.indexOf(b);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    })
    .map(([key, value]) => ({
      key,
      ...value,
      tasks: value.tasks.sort((a, b) => {
        // Sắp xếp trong nhóm theo progress giảm dần
        if (a.progress !== b.progress) return b.progress - a.progress;
        // Sau đó theo status
        if (a.status && b.status && a.status !== b.status) {
          const statusOrder = ['Đang triển khai', 'Đang tiến hành', 'Triển khai hàng tháng', 'Chưa bắt đầu'];
          return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        }
        return 0;
      })
    }));

  return sortedGroups;
};

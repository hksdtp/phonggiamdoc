import { Task } from '@/types';

export const mrHungTasks: Task[] = [
  {
    id: 1,
    department: 'PHÒNG DỰ ÁN',
    title: 'Dự án Đông Dương, Huế',
    description: 'Theo dõi tiến độ lắp đặt, tiến độ sản xuất. Hỗ trợ trao đổi công việc với nhà máy, hỗ trợ kiểm kê, đóng gói phân loại hàng hóa. Thuê nhân công lắp đặt ngoài OS. Thuê xe tải chuyển hàng (ghép chuyến)',
    startDate: '14/05/2025',
    endDate: '10/06/2025',
    progress: 100,
    status: 'Hoàn thành',
    notes: 'Đã hoàn thành dự án. Tiến độ lắp đặt đang bị chậm hơn so với kế hoạch. Đã chốt đơn giá, khối lượng, tiến độ thi công với bên OS. Đã vận chuyển 100% hàng hóa đến công trình',
    assignee: 'Mr Hùng'
  },
  {
    id: 2,
    department: 'PHÒNG DỰ ÁN',
    title: 'APP Dự Án',
    description: 'Phối hợp cùng BP hệ thống để xây dựng quy trình',
    startDate: '22/05/2025',
    endDate: '',
    progress: 20,
    status: 'Đang triển khai',
    assignee: 'Mr Hùng'
  },
  {
    id: 3,
    department: 'PHÒNG DỰ ÁN',
    title: 'Kiểm soát khối lượng & chi phí',
    description: 'Check lại khối lượng đặt hàng vật tư, phụ kiện. Kiểm soát chi phí lắp đặt, đơn giá bán theo mức được duyệt',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'Triển khai hàng tháng',
    assignee: 'Mr Hùng'
  },
  {
    id: 4,
    department: 'PHÒNG BÁN LẺ',
    title: 'Kiểm soát khối lượng & chi phí',
    description: 'Check lại khối lượng đặt hàng vật tư, phụ kiện. Kiểm soát chi phí lắp đặt, đơn giá bán theo mức được duyệt',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'Triển khai hàng tháng',
    assignee: 'Mr Hùng'
  },
  {
    id: 5,
    department: 'HỆ THỐNG',
    title: 'APP Kho',
    description: 'Định mức vật tư. Tồn kho thực tế. Đồng bộ dữ liệu với phần mềm Misa của P. Kế toán. Đồng bộ dữ liệu với app của bán lẻ',
    startDate: '09/05/2025',
    endDate: '',
    progress: 20,
    status: 'Đang triển khai',
    notes: 'Tồn kho thực tế chưa chuẩn. Dữ liệu tên vật tư/ mã hàng trên hệ thống chưa khớp.',
    assignee: 'Mr Hùng'
  },
  {
    id: 6,
    department: 'HỆ THỐNG',
    title: 'APP Dự Án',
    description: 'Đăng ký thông tin dự án, thông tin liên hệ. Tình trạng dự án : chào thầu, báo giá... Tình trạng triển khai...',
    startDate: '22/05/2025',
    endDate: '',
    progress: 0,
    status: 'Đang triển khai',
    assignee: 'Mr Hùng'
  },
  {
    id: 7,
    department: 'MUA HÀNG',
    title: 'Mua hàng nước ngoài',
    description: 'Báo cáo số lượng đơn đặt hàng và tình trạng ghép đơn. Báo cáo chi phí đơn hàng và chi phí vận chuyển, kê khai hải quan. Báo cáo tình trạng hàng lỗi/ hỏng phát sinh. Hướng xử lý, đề xuất',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'Triển khai hàng tháng',
    assignee: 'Mr Hùng'
  },
  {
    id: 8,
    department: 'MUA HÀNG',
    title: 'Hunter Douglas',
    description: 'Kiểm tra lại các mã hàng đã dừng sản xuất và update thêm các mã hàng mới. Kiểm tra lại đơn giá nhập, chi phí vận chuyển theo file đơn giá đã ban hành năm 2022',
    startDate: '15/05/2022',
    endDate: '',
    progress: 0,
    status: 'Đang triển khai',
    assignee: 'Mr Hùng'
  },
  {
    id: 9,
    department: 'KHO',
    title: 'Xuất hàng',
    description: 'Thay đổi thời gian xuất hàng. Sáng từ 7h30 đến 9h. Chiều từ 13h30-14h30. Kỹ thuật và tổ may gửi yêu cầu đề xuất trước để kho sắp xếp & chuẩn bị',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'Đang triển khai',
    assignee: 'Mr Hùng'
  },
  {
    id: 10,
    department: 'KHO',
    title: 'Báo cáo tồn kho & gửi yêu cầu đặt hàng',
    description: 'Báo cáo tồn kho hàng tuần. Cảnh báo số lượng tồn tối thiểu để đặt hàng',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'Đang triển khai',
    assignee: 'Mr Hùng'
  },
  {
    id: 11,
    department: 'TỔ MAY',
    title: 'Sản xuất',
    description: 'Vận hành máy kẹp múi tự động',
    startDate: '01/06/2025',
    endDate: '30/06/2025',
    progress: 0,
    status: 'Đang triển khai',
    assignee: 'Mr Hùng'
  },
  {
    id: 12,
    department: 'TỔ MAY',
    title: 'Hỗ trợ',
    description: 'Cắt vải làm cuốn mẫu',
    startDate: '01/06/2025',
    endDate: '30/06/2025',
    progress: 0,
    status: 'Đang triển khai',
    assignee: 'Mr Hùng'
  },
  {
    id: 13,
    department: 'PHÁT TRIỂN SẢN PHẨM',
    title: 'Motor',
    description: 'Đề xuất motor (Tuiss smartview) của hàng xuất sử dụng trong nước. Motor sử dụng cho mành Roman, Roller, mành TKNL',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'Đang triển khai',
    notes: 'Liên quan đến thương hiệu Tuiss Smartview : Đề xuất chị Hạnh trao đổi với chị Nga để sử dụng trong nước',
    assignee: 'Mr Hùng'
  },
  {
    id: 14,
    department: 'THANH LÝ HÀNG TỒN KHO',
    title: 'VẢI',
    description: 'Đề xuất giá bán thanh lý vải tồn kho',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'Đang triển khai',
    assignee: 'Mr Hùng'
  }
];

export const ninhTasks: Task[] = [
  {
    id: 15,
    title: 'Làm tasklist cho bán lẻ và dự án',
    description: 'Giúp Trường bộ phận nắm bắt được các công việc, đầu việc mà nhân viên đang thực hiện, tính KPI doanh số ,v.v.',
    startDate: '30/04/2025',
    endDate: '31/05/2025',
    progress: 75,
    status: 'Đang tiến hành',
    notes: 'Đã hoàn thành cơ bản, đang gặp khó khăn trong quá trình đồng bộ dữ liệu về Google. https://sales.incanto.my/ Đường dẫn đến app. Tích hợp luôn cả phòng Dự Án và Bán Lẻ, không cần xây dựng riêng. ( mới update ). Loại bỏ phòng dự án.',
    assignee: 'Ninh'
  },
  {
    id: 16,
    title: 'Trường học DGS',
    description: 'Cập nhật tình hình tiến độ: Đã liên hệ NNM chưa có kết quả báo lại. Đã bảo bên xây dựng, họ sẽ làm các hạng mục A1-4 nhưng vẫn cần Chủ đất ký. Giấy tờ bổ sung bao gồm: Giấy chứng nhận đầu tư, giấy đăng ký kd có thì gửi chị trước.',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'Đang tiến hành',
    notes: 'Đã liên hệ chị Nhiễu xin thông tin giấy tờ bên Ngôi Nhà Mới. Chưa thấy hồi âm',
    assignee: 'Ninh'
  },
  {
    id: 17,
    title: 'Bằng khen trường DGS',
    description: 'Đã in xong bằng khen - 37 bạn ( chưa nhận được ). Đã liên hệ A Dương xuất kho Khung. Đã chuyển khung + máy xuống Xưởng cho Nghĩa thực hiện. Đã bàn giao cho chị Linh DGS toàn bộ giấy khen, không có phản hồi',
    startDate: '15/05/2025',
    endDate: '01/06/2025',
    progress: 100,
    status: 'Đang hoàn thành',
    notes: '27 Liên hệ Nghĩa đóng khung ảnh. Chưa nắm được số lượng khung là 37 cái thì cần bao nhiêu mét để làm đề xuất xuất kho. Đã xuất ~75 mét khung + máy cho Nghĩa.',
    assignee: 'Ninh'
  },
  {
    id: 18,
    title: 'Tìm các Nguồn chụp ảnh mẫu tại các công trình khi nghiệm thu',
    description: 'Đã liên hệ được 2 bên chụp ảnh, tiến hành chụp thử công trình. Chi phí 1 tr 2 - 1 tr 3 / công trình ( Đã bao gồm hậu kỳ ). Đã lên lịch đi chụp',
    startDate: '',
    endDate: '',
    progress: 80,
    status: 'Đang tiến hành',
    notes: 'Chưa nắm được lịch để chụp công trình sắp tới. E sẽ liên hệ chị Nhung, A Hà',
    assignee: 'Ninh'
  },
  {
    id: 19,
    title: 'Tiếp nhận bàn giao hình ảnh, tài liệu, fanpage, v.v. của Quỳnh - phòng Marketing',
    description: 'Đã bổ sung các công việc dự định làm khi tiếp nhận. Đã Trao đổi với chị Nhung - Marketing',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'Đang chờ phê duyệt',
    notes: 'https://docs.google.com/document/d/1-DLbF6fIbG5c7qVcx48Z9DOmizvyTtzI/edit?usp=sharing&ouid=109462743299936545676&rtpof=true&sd=true',
    assignee: 'Ninh'
  },
  {
    id: 20,
    title: 'Làm mẫu áo teambuiding',
    description: 'Đã lên 1 vài mẫu, cần chỉnh sửa lại. Đã có Logo gốc, đã có ý tưởng, đã có tông màu chủ đạo',
    startDate: '',
    endDate: '',
    progress: 80,
    status: 'Đang tiến hành',
    assignee: 'Ninh'
  },
  {
    id: 21,
    title: 'Làm Visa đi nhật cho gia đình chị Huyền',
    description: 'Đã đọc toàn bộ tài liệu, Đã lên danh sách các giấy tờ cần chuẩn bị. Đã xong tờ khai visa của Chị Hạnh, của Dương, thiếu của Đức Anh và 2 Bác',
    startDate: '',
    endDate: '01/06/2025',
    progress: 10,
    status: 'Đang tiến hành',
    notes: 'https://visa-japan-checklist-ninja.lovable.app',
    assignee: 'Ninh'
  },
  {
    id: 22,
    title: 'Chuẩn bị các thông tin cần thiết cho chuyến đi Thượng Hải',
    description: 'Đã đặt xe đưa đón sân bay. Đã check các địa điểm di chuyển. Đã đặt bàn NICE CLUB. Tổng hợp hóa đơn',
    startDate: '24/05/2025',
    endDate: '28/05/2025',
    progress: 50,
    status: 'Đang tiến hành',
    notes: 'https://thuonghai.ninh.app',
    assignee: 'Ninh'
  },
  {
    id: 23,
    title: 'Sự kiện Vinh Quang tháng 7',
    description: 'Sự kiện diễn ra các ngày 20 21 22/7',
    startDate: '',
    endDate: '',
    progress: 0,
    status: '',
    assignee: 'Ninh'
  },
  {
    id: 24,
    title: 'Triển khai làm Đào tạo, E-learning',
    description: 'Chưa lên kế hoạch. Có kế hoạch đào tạo PCCC ngày 4/10/2025',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'Chưa tiến hành',
    assignee: 'Ninh'
  },
  {
    id: 25,
    title: 'Đơn vị thiết kế nhà chị Nga - Vista lago',
    description: 'Đã cung cấp thông tin chị Hạnh cho bên thiết kế làm hợp đồng. Đã điền thông tin chị Nga để làm giấy ủy quyền cập nhật vào hồ sơ xin cấp phép xây dựng với BQL Vista lago',
    startDate: '',
    endDate: '',
    progress: 0,
    status: '',
    notes: 'Chưa có đầy đủ thông tin, chưa làm giấy ủy quyền, chưa có thông tin nhà chị Nga',
    assignee: 'Ninh'
  },
  {
    id: 26,
    title: 'thử công việc mới',
    description: '',
    startDate: '7/6/2025',
    endDate: '',
    progress: 0,
    status: 'Chưa bắt đầu',
    assignee: 'Ninh'
  },
  {
    id: 27,
    title: 'Đổ xăng Range Rover',
    description: '1650k',
    startDate: '8/6/2025',
    endDate: '83 lít',
    progress: 0,
    status: 'Tk',
    assignee: 'Ninh'
  }
];

export const allTasks = [...mrHungTasks, ...ninhTasks];

import { Question } from '../types';

export const QUESTIONS_POOL: Question[] = [
  // --- VNPT WiFi ---
  {
    id: 'wifi_001',
    service: 'wifi',
    question: 'Chuẩn công nghệ WiFi nào đang được VNPT triển khai mang lại tốc độ vượt trội và khả năng xuyên tường tốt nhất?',
    options: ['WiFi 6 (802.11ax)', 'WiFi 1 (802.11b)', 'Bluetooth 4.0', 'Dial-up 56K'],
    answer: 0,
    explanation: 'WiFi 6 (802.11ax) là chuẩn công nghệ mới giúp mở rộng vùng phủ, tăng tốc độ truyền dữ liệu gấp nhiều lần và giảm thiểu độ trễ tối đa.',
    difficulty: 1,
  },
  {
    id: 'wifi_002',
    service: 'wifi',
    question: 'Giải pháp nào của VNPT giúp phủ sóng mạng không dây liền mạch khắp căn hộ nhiều phòng hoặc nhà nhiều tầng?',
    options: ['VNPT WiFi Mesh', 'Cáp đồng ADSL', 'Điện thoại cố định', 'Anten râu'],
    answer: 0,
    explanation: 'Thiết bị Mesh WiFi kết nối đồng bộ tạo ra một mạng duy nhất giúp người dùng di chuyển khắp ngôi nhà mà không bị rớt mạng.',
    difficulty: 1,
  },
  {
    id: 'wifi_003',
    service: 'wifi',
    question: 'Khi gặp sự cố mạng Internet VNPT tại nhà, tổng đài hỗ trợ kỹ thuật miễn phí 24/7 của VNPT là số nào?',
    options: ['18001166', '1080', '19001000', '113'],
    answer: 0,
    explanation: '18001166 là số tổng đài chăm sóc khách hàng và hỗ trợ kỹ thuật Internet/Truyền hình hoàn toàn miễn phí của VNPT.',
    difficulty: 1,
  },

  // --- FiberVNN ---
  {
    id: 'fibervnn_001',
    service: 'fibervnn',
    question: 'Dịch vụ Internet cáp quang băng rộng hàng đầu của VNPT có tên thương hiệu là gì?',
    options: ['FiberVNN', 'VNPT Dial-up', 'FiberCable', 'VNPT FastNet'],
    answer: 0,
    explanation: 'FiberVNN là dịch vụ truy cập Internet cáp quang tốc độ cao của VNPT với hạ tầng viễn thông vững chắc phủ khắp cả nước.',
    difficulty: 1,
  },
  {
    id: 'fibervnn_002',
    service: 'fibervnn',
    question: 'Ưu điểm nổi bật nhất của công nghệ cáp quang so với cáp đồng truyền thống là gì?',
    options: [
      'Tốc độ truyền tải siêu cao, không suy hao và không bị sét đánh lan truyền',
      'Giá thành dây đắt hơn nên không ai dùng',
      'Chỉ dùng được vào ban ngày',
      'Yêu cầu phải có ăng-ten ngoài trời',
    ],
    answer: 0,
    explanation: 'Cáp quang truyền tín hiệu bằng ánh sáng nên có băng thông cực lớn, không bị nhiễu điện từ và độ an toàn rất cao.',
    difficulty: 1,
  },

  // --- VinaPhone ---
  {
    id: 'vinaphone_001',
    service: 'vinaphone',
    question: 'Khẩu hiệu (slogan) nổi tiếng gắn liền với thương hiệu mạng di động VinaPhone là gì?',
    options: ['Không ngừng vươn xa', 'Hãy nói theo cách của bạn', 'Kết nối tương lai', 'Cùng bạn phát triển'],
    answer: 0,
    explanation: '"VinaPhone - Không ngừng vươn xa" là thông điệp mang tính biểu tượng đồng hành cùng hàng chục triệu thuê bao Việt Nam.',
    difficulty: 1,
  },
  {
    id: 'vinaphone_002',
    service: 'vinaphone',
    question: 'Đầu số nào sau đây thuộc dải số truyền thống của mạng di động VinaPhone?',
    options: ['091, 094, 088', '096, 097, 098', '090, 093, 089', '092, 056, 058'],
    answer: 0,
    explanation: 'Các đầu số 091, 094, 088, 081, 082, 083, 084, 085 là các dải số di động thuộc mạng VinaPhone - Tập đoàn VNPT.',
    difficulty: 1,
  },
  {
    id: 'vinaphone_003',
    service: 'vinaphone',
    question: 'Thế hệ mạng di động không dây mới nhất mà VinaPhone đã cấp phép thương mại hóa tốc độ Gigabit là gì?',
    options: ['5G', '2G', 'GPRS', 'CDMA'],
    answer: 0,
    explanation: 'Mạng 5G VinaPhone cung cấp tốc độ truyền tải cực cao, độ trễ siêu thấp phục vụ chuyển đổi số và thành phố thông minh.',
    difficulty: 1,
  },

  // --- VNPT iOffice ---
  {
    id: 'ioffice_001',
    service: 'ioffice',
    question: 'Hệ thống VNPT iOffice được thiết kế phục vụ mục đích chính nào sau đây?',
    options: [
      'Quản lý văn bản, hồ sơ công việc và điều hành tác nghiệp điện tử không giấy tờ',
      'Chơi game trực tuyến đối kháng',
      'Sửa chữa phần cứng máy tính',
      'Đặt vé máy bay du lịch',
    ],
    answer: 0,
    explanation: 'VNPT iOffice giúp các cơ quan, doanh nghiệp tin học hóa toàn diện quy trình xử lý văn bản, ký số văn bản và chỉ đạo điều hành.',
    difficulty: 2,
  },
  {
    id: 'ioffice_002',
    service: 'ioffice',
    question: 'Lợi ích lớn nhất khi cơ quan hành chính áp dụng VNPT iOffice là gì?',
    options: [
      'Tiết kiệm chi phí in ấn, thời gian luân chuyển văn bản và làm việc từ xa hiệu quả',
      'Không cần sử dụng máy tính nữa',
      'Tự động viết nội dung văn bản thay thế hoàn toàn con người',
      'Thay thế hoàn toàn nhân viên bảo vệ',
    ],
    answer: 0,
    explanation: 'VNPT iOffice rút ngắn thời gian xử lý công việc từ vài ngày xuống vài phút và cho phép lãnh đạo phê duyệt mọi lúc mọi nơi.',
    difficulty: 2,
  },

  // --- VNPT iLIS ---
  {
    id: 'ilis_001',
    service: 'ilis',
    question: 'Giải pháp VNPT iLIS là hệ thống thông tin phục vụ quản lý lĩnh vực nào?',
    options: ['Đất đai và tài nguyên môi trường', 'Giao thông đường thủy', 'Khám chữa bệnh từ xa', 'Dạy học trực tuyến'],
    answer: 0,
    explanation: 'VNPT iLIS là Hệ thống thông tin quản lý đất đai đa mục tiêu, xây dựng cơ sở dữ liệu đất đai tập trung chuẩn quốc gia.',
    difficulty: 3,
  },
  {
    id: 'ilis_002',
    service: 'ilis',
    question: 'Cơ sở dữ liệu không gian trong VNPT iLIS tích hợp công nghệ nào để hiển thị bản đồ địa chính trực quan?',
    options: ['Hệ thống thông tin địa lý (GIS)', 'Bluetooth Mesh', 'RFID thẻ từ', 'Băng từ analog'],
    answer: 0,
    explanation: 'Công nghệ bản đồ GIS kết hợp thuộc tính địa chính giúp số hóa toàn diện việc đo đạc, cấp giấy chứng nhận và tra cứu quy hoạch.',
    difficulty: 3,
  },

  // --- Hóa đơn điện tử (VNPT Invoice) ---
  {
    id: 'invoice_001',
    service: 'invoice',
    question: 'Sử dụng Hóa đơn điện tử VNPT Invoice giúp doanh nghiệp tuân thủ thông tư nghị định quan trọng nào của Chính phủ?',
    options: [
      'Nghị định 123/2020/NĐ-CP và Thông tư 78/2021/TT-BTC',
      'Nghị định xử phạt vi phạm giao thông',
      'Luật Nghĩa vụ quân sự',
      'Quy chuẩn thiết kế cầu đường bộ',
    ],
    answer: 0,
    explanation: 'VNPT Invoice được cấp phép kết nối trực tiếp với Tổng cục Thuế theo chuẩn Nghị định 123 và Thông tư 78.',
    difficulty: 2,
  },
  {
    id: 'invoice_002',
    service: 'invoice',
    question: 'Điểm khác biệt vượt trội của hóa đơn điện tử so với hóa đơn giấy truyền thống là gì?',
    options: [
      'Không lo thất lạc, rách hỏng, tra cứu tức thời và chống làm giả tuyệt đối',
      'Bắt buộc phải in ra giấy bìa cứng',
      'Chỉ có giá trị trong vòng 24 giờ',
      'Phải gửi thư tay qua bưu điện',
    ],
    answer: 0,
    explanation: 'Hóa đơn điện tử có mã xác thực số của Tổng cục Thuế, lưu trữ vĩnh viễn trên mây và gửi nhận qua Email/SMS tức thì.',
    difficulty: 2,
  },

  // --- Chữ ký số (VNPT SmartCA) ---
  {
    id: 'smartca_001',
    service: 'smartca',
    question: 'Dịch vụ chữ ký số từ xa VNPT SmartCA có điểm tiện lợi vượt bậc nào so với USB Token cũ?',
    options: [
      'Ký số mọi lúc mọi nơi trên điện thoại, không cần cắm USB Token vật lý',
      'Không cần có kết nối mạng',
      'Chỉ người khác mới ký hộ được',
      'Chỉ ký được vào ban đêm',
    ],
    answer: 0,
    explanation: 'VNPT SmartCA sử dụng công nghệ ký số từ xa Cloud PKI, xác thực sinh trắc học trên smartphone mà không cần USB Token.',
    difficulty: 2,
  },
  {
    id: 'smartca_002',
    service: 'smartca',
    question: 'Chữ ký số VNPT SmartCA có giá trị pháp lý tương đương với điều gì trong giao dịch truyền thống?',
    options: [
      'Chữ ký tay của cá nhân và con dấu của tổ chức/doanh nghiệp',
      'Ảnh chụp màn hình tin nhắn',
      'Bản photo chứng minh nhân dân',
      'Lời hứa miệng',
    ],
    answer: 0,
    explanation: 'Theo Luật Giao dịch điện tử, chữ ký số có giá trị pháp lý đầy đủ tương đương con dấu và chữ ký tay.',
    difficulty: 2,
  },

  // --- VNPT Cloud ---
  {
    id: 'cloud_001',
    service: 'cloud',
    question: 'Hạ tầng Trung tâm dữ liệu (IDC) của VNPT đạt tiêu chuẩn quốc tế uy tín nào về độ tin cậy và sẵn sàng cao?',
    options: ['Uptime Tier III quốc tế', 'ISO 9000 lớp 1', 'Class 5 Audio', 'Chuẩn Wifi N'],
    answer: 0,
    explanation: 'Các Trung tâm dữ liệu của VNPT tại Hà Nội, TP.HCM, Đà Nẵng, Hòa Lạc đạt tiêu chuẩn Uptime Tier III với độ sẵn sàng tới 99.982%.',
    difficulty: 2,
  },
  {
    id: 'cloud_002',
    service: 'cloud',
    question: 'Mô hình dịch vụ nào cho phép doanh nghiệp thuê máy chủ ảo linh hoạt theo nhu cầu thực tế trên VNPT Cloud?',
    options: ['IaaS (Hạ tầng như một dịch vụ - Cloud Server)', 'Mua đứt ổ cứng ngoài', 'Thuê đường dây thoại', 'Máy tính bảng'],
    answer: 0,
    explanation: 'IaaS (Infrastructure as a Service) giúp doanh nghiệp khởi tạo máy chủ chỉ trong vài phút, tự động co giãn và tiết kiệm chi phí.',
    difficulty: 2,
  },

  // --- Chính quyền số (VNPT eGov) ---
  {
    id: 'egov_001',
    service: 'egov',
    question: 'Hệ sinh thái Chính quyền số VNPT eGov giúp người dân thực hiện các thủ tục hành chính công như thế nào?',
    options: [
      'Nộp hồ sơ trực tuyến 24/7 qua Cổng Dịch vụ công, nhận kết quả tại nhà',
      'Bắt buộc phải đến cơ quan nhà nước xếp hàng từ sáng sớm',
      'Gửi thư tay qua đường bưu cục truyền thống',
      'Không cần thủ tục gì cả',
    ],
    answer: 0,
    explanation: 'Dịch vụ công trực tuyến mức độ toàn trình giúp công dân nộp hồ sơ, thanh toán phí và nhận kết quả không cần trực tiếp đến cơ quan công quyền.',
    difficulty: 3,
  },
  {
    id: 'egov_002',
    service: 'egov',
    question: 'Thành phần nào đóng vai trò là "xương sống" kết nối dữ liệu giữa các bộ ngành, tỉnh thành trong chính quyền số?',
    options: [
      'Nền tảng tích hợp, chia sẻ dữ liệu (LGSP / NDXP)',
      'Hộp thư điện tử Yahoo',
      'Dây cáp điện thoại analog',
      'Sổ hộ khẩu giấy',
    ],
    answer: 0,
    explanation: 'Trục chia sẻ dữ liệu liên thông kết nối thông suốt các cơ sở dữ liệu quốc gia về dân cư, đăng ký doanh nghiệp, bảo hiểm xã hội.',
    difficulty: 3,
  },
];

export function getQuestionsByService(serviceId: string): Question[] {
  const list = QUESTIONS_POOL.filter((q) => q.service === serviceId);
  return list.length > 0 ? list : getFallbackQuestions(serviceId);
}

export function getRandomQuestionForService(serviceId: string, excludedIds: string[] = []): Question {
  const available = QUESTIONS_POOL.filter((q) => q.service === serviceId && !excludedIds.includes(q.id));
  if (available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }
  // If all used, pick any for this service
  const anyServiceQ = QUESTIONS_POOL.filter((q) => q.service === serviceId);
  if (anyServiceQ.length > 0) {
    return anyServiceQ[Math.floor(Math.random() * anyServiceQ.length)];
  }
  return getFallbackQuestions(serviceId)[0];
}

export function getFallbackQuestions(serviceId: string): Question[] {
  return [
    {
      id: `${serviceId}_fallback`,
      service: serviceId,
      question: `Giải pháp ${serviceId.toUpperCase()} của VNPT hướng tới mục tiêu nào quan trọng nhất?`,
      options: [
        'Nâng cao chất lượng dịch vụ và thúc đẩy chuyển đổi số toàn diện',
        'Tăng lượng giấy tờ hành chính thủ công',
        'Làm chậm quá trình phát triển công nghệ',
        'Giảm bớt kết nối giữa con người và xã hội',
      ],
      answer: 0,
      explanation: 'VNPT luôn cam kết tiên phong cung cấp giải pháp số hiện đại, an toàn và tối ưu vì lợi ích của khách hàng và xã hội.',
      difficulty: 1,
    },
  ];
}

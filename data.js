window.ConstructionOSData = window.ConstructionOSData || {};
window.ConstructionOSData.dashboard = {
  healthScore: 82,
  healthLabel: "Hoạt động tốt",
  healthBrief: "Mọi thứ đang đi đúng hướng. Tập trung xử lý 2 việc quan trọng để duy trì đà tăng trưởng.",
  bossBrief: [
    ["red", "2", "việc cần xử lý ngay"],
    ["yellow", "4", "việc cần theo dõi"],
    ["green", "3", "cơ hội đáng chú ý"]
  ],
  metrics: [
    ["Doanh thu tháng này", "1,86 tỷ", "↑ 12%", "up", "bars"],
    ["Đã thu", "1,24 tỷ", "↑ 18%", "up", "wallet"],
    ["Còn phải thu", "620 triệu", "↓ 5%", "down", "clock"],
    ["Tổng công trình", "12", "6 đang thi công", "", "building"]
  ],
  projects: [
    ["Villa Đà Lạt", "Đúng tiến độ", "ok", 72],
    ["Nhà phố Q.7", "Chậm 4 ngày", "bad", 55],
    ["Resort Bảo Lộc", "Đúng tiến độ", "ok", 36],
    ["Nhà xưởng Đức Trọng", "Nguy cơ vượt ngân sách", "risk", 88]
  ],
  activity: [
    ["10:42", "camera", "▣", "Công trình Villa Đà Lạt", "đã tải lên 6 ảnh hiện trường"],
    ["10:31", "money", "₫", "Khách hàng Nguyễn Văn A", "đã thanh toán 180 triệu"],
    ["10:08", "file", "▤", "Báo giá #QT-028", "đã được chấp nhận"],
    ["09:45", "team", "◎", "Nhân viên Trần Minh", "hoàn thành task đổ bê tông tầng 2"],
    ["08:20", "alert", "!", "Cảnh báo: Vật tư thép", "sắp hết còn 3 ngày"]
  ],
  alerts: [
    ["finance", "red", "!", "HD-023 quá hạn 12 ngày", "Nhắc khách hàng An Phát"],
    ["projects", "yellow", "!", "Nhà xưởng Đức Trọng đạt 88% ngân sách", "Cần duyệt chi phí phát sinh"],
    ["schedule", "green", "✓", "Villa Đà Lạt có 6 ảnh hiện trường mới", "Kiểm tra trước 17:00"]
  ]
};

window.ConstructionOSData.moneyDashboard = {
  ...window.ConstructionOSData.dashboard,
  healthBrief: "Doanh nghiệp đang có 19,4 tỷ giá trị hợp đồng mở, biên lợi nhuận dự kiến 28%. Cần thu 620 triệu trong 7 ngày để giữ dòng tiền an toàn.",
  bossBrief: [
    ["red", "620tr", "phải thu cần xử lý trong 7 ngày"],
    ["yellow", "2,1tỷ", "chi phí đang chờ duyệt"],
    ["green", "5,4tỷ", "pipeline có khả năng chốt tháng này"]
  ],
  metrics: [
    ["Doanh thu tháng này", "1,86 tỷ", "+12% so với tháng trước", "up", "bars"],
    ["Biên lợi nhuận dự kiến", "28,4%", "+3,2 điểm", "up", "wallet"],
    ["Phải thu quá hạn", "620 triệu", "2 khách cần gọi hôm nay", "down", "clock"],
    ["Giá trị hợp đồng mở", "19,4 tỷ", "6 công trình đang tạo tiền", "", "building"]
  ]
};

window.ConstructionOSData.projectDetails = {
  "Villa Đà Lạt": {
    code: "CT-012",
    progress: "72%",
    status: "Đúng tiến độ",
    overview: "Đội thi công đang bám tiến độ. Hôm nay cần xác nhận ảnh hiện trường và lịch nghiệm thu tiếp theo.",
    facts: ["Chỉ huy trưởng: Trần Minh", "Hạn bàn giao: 30/11/2026", "Rủi ro: thời tiết và vật tư hoàn thiện"],
    money: "Đã thu 7,8 tỷ trên ngân sách 12,5 tỷ. Khoản thu tiếp theo cần nhắc trước ngày 20/09.",
    tasks: ["Upload ảnh hiện trường buổi sáng", "Gọi xác nhận đội điện nước", "Chuẩn bị biên bản nghiệm thu"]
  },
  "Nhà phố Q.7": {
    code: "CT-009",
    progress: "55%",
    status: "Chậm 4 ngày",
    overview: "Công trình đang chậm do vật tư tầng 2. Cần khóa phương án bù tiến độ trong hôm nay.",
    facts: ["Chỉ huy trưởng: Nguyễn Hùng", "Hạn bàn giao: 12/12/2026", "Rủi ro: thiếu thép và lịch đội điện"],
    money: "Đã chi 756 triệu. Cần duyệt thêm vật tư trước khi ảnh hưởng tiến độ.",
    tasks: ["Gọi nhà cung cấp thép", "Cập nhật tiến độ cho khách", "Xác nhận lịch đổ bê tông"]
  },
  "Resort Bảo Lộc": {
    code: "CT-014",
    progress: "36%",
    status: "Đúng tiến độ",
    overview: "Giai đoạn nền móng ổn định, nhưng chi phí vận chuyển cần được theo dõi sát.",
    facts: ["Chỉ huy trưởng: Lê Quốc", "Hạn bàn giao: 20/02/2027", "Rủi ro: mưa kéo dài"],
    money: "Chi phí hiện đạt 48% ngân sách giai đoạn. Chưa có công nợ quá hạn.",
    tasks: ["Chốt lịch xe vận chuyển", "Upload ảnh móng khu B", "Kiểm tra nhật ký công trường"]
  },
  "Nhà xưởng Đức Trọng": {
    code: "CT-016",
    progress: "88%",
    status: "Nguy cơ vượt ngân sách",
    overview: "Tiến độ gần hoàn thành nhưng chi phí phát sinh đang áp sát ngân sách. Cần rà lại hạng mục thầu phụ.",
    facts: ["Chỉ huy trưởng: Trần Minh", "Hạn bàn giao: 05/10/2026", "Rủi ro: vượt ngân sách thầu phụ"],
    money: "Đã dùng 88% ngân sách. Cần duyệt/khóa các khoản phát sinh trước khi thi công tiếp.",
    tasks: ["Rà soát chi phí thầu phụ", "Chốt phụ lục phát sinh", "Gửi báo cáo owner"]
  }
};
window.ConstructionOSData.commands = [
  ["dashboard", "Tổng quan", "Mở dashboard vận hành hôm nay"],
  ["projects", "Công trình", "Theo dõi tiến độ, ngân sách, cảnh báo"],
  ["customers", "Khách hàng", "Hồ sơ khách hàng và lịch sử giao dịch"],
  ["quotes", "Báo giá", "Báo giá đang soạn, đã gửi, chờ duyệt"],
  ["contracts", "Hợp đồng", "Hồ sơ ký kết và nghiệm thu"],
  ["costs", "Chi phí", "Vật tư, nhân công, phát sinh"],
  ["finance", "Hóa đơn & Thu chi", "Công nợ, khoản thu và chi phí"],
  ["schedule", "Lịch công việc", "Việc công trường và nghiệm thu hôm nay"],
  ["team", "Nhân sự", "Tổ đội, phân công, năng lực"],
  ["documents", "Tài liệu & Ảnh", "Hồ sơ, ảnh hiện trường và biên bản"],
  ["reports", "Báo cáo", "Hiệu quả công trình và dòng tiền"],
  ["ai", "AI Copilot", "Hỏi nhanh tình hình doanh nghiệp"],
  ["settings", "Cài đặt", "Công ty, phân quyền, thông báo"],
];

window.ConstructionOSData.moduleContent = {
  projects: {
    eyebrow: "FIELD OPS",
    title: "Công trình",
    cards: [
      ["wide", "Công trình đang chạy", "Theo dõi tiến độ, rủi ro và người phụ trách trong một màn.", ["Villa Đà Lạt|72% đúng tiến độ", "Nhà phố Q.7|55% chậm 4 ngày", "Nhà xưởng Đức Trọng|88% nguy cơ ngân sách"]],
      ["", "Cảnh báo", "2 cảnh báo cần xử lý trước cuối ngày.", ["Q.7|Thiếu vật tư tầng 2", "Đức Trọng|Chi phí phát sinh cao"]],
      ["", "Tổ đội hôm nay", "Lịch hiện trường đã khóa cho 6 nhóm thi công.", ["Đội xây|3 công trình", "Điện nước|2 công trình"]]
    ]
  },
  finance: {
    eyebrow: "CASH CONTROL",
    title: "Hóa đơn & Thu chi",
    cards: [
      ["wide", "Công nợ cần thu", "Ưu tiên khoản quá hạn, khoản đến hạn và khoản liên quan nghiệm thu.", ["An Phát|180 triệu quá hạn", "Villa Đà Lạt|Đợt 3 đến hạn 20/09", "WAL Office|Đã thu 180 triệu"]],
      ["", "Chi phí mới", "Ghi nhanh chi phí vật tư và nhân công từ điện thoại.", ["Thép|96,5 triệu", "Nhân công|42 triệu"]],
      ["", "Biên lợi nhuận", "Dự phóng theo hợp đồng và chi phí đã duyệt.", ["Gross margin|21,4%", "Rủi ro|1 công trình"]]
    ]
  },
  ai: {
    eyebrow: "AI COMMAND",
    title: "AI Copilot",
    cards: [
      ["wide", "Boss Brief tự động", "Copilot gom công nợ, tiến độ, chi phí và task để đưa ra việc nên làm tiếp theo.", ["Ưu tiên 1|Nhắc An Phát thanh toán", "Ưu tiên 2|Xử lý trễ Q.7", "Ưu tiên 3|Kiểm tra chi phí Bảo Lộc"]],
      ["", "Câu hỏi gợi ý", "Các câu hỏi chủ doanh nghiệp thường mở vào buổi sáng.", ["Hôm nay ai cần xử lý?", "Dự án nào đang vượt ngân sách?"]],
      ["", "Tự động hóa", "Chuẩn bị cho phase Supabase/AI thật.", ["Alerts|Rule-based trước", "AI|Kết nối sau khi có data"]]
    ]
  },
  schedule: {
    eyebrow: "DAILY OPS",
    title: "Lịch công việc",
    cards: [
      ["wide", "Hôm nay", "Các mốc cần owner nắm trong ngày.", ["08:00|Kiểm tra thép sàn tầng 2", "14:30|Nghiệm thu phần thô", "17:00|Nhắc thanh toán đợt 2"]],
      ["", "Trễ hạn", "Việc đã quá hạn hoặc chưa xác nhận.", ["Q.7|Cập nhật ảnh tiến độ", "Bảo Lộc|Chốt vật tư"]],
      ["", "Ngày mai", "Mốc nên chuẩn bị trước.", ["Villa|Kiểm tra đội điện", "WAL|Hoàn thiện hồ sơ"]]
    ]
  },
  customers: {
    eyebrow: "CRM PIPELINE",
    title: "Khách hàng",
    cards: [
      ["wide", "Khách hàng ưu tiên", "Tập trung vào khách có báo giá, công nợ hoặc dự án đang mở.", ["Nguyễn Văn A|180 triệu cần thu", "An Phát Group|Đang đàm phán Resort", "PDT Home|Chờ duyệt báo giá"]],
      ["", "Cơ hội mới", "Nguồn lead đang chờ phân loại.", ["Zalo OA|4 lead", "Giới thiệu|2 lead"]],
      ["", "Chăm sóc", "Lịch follow-up không để rơi khách.", ["Hôm nay|3 cuộc gọi", "Tuần này|8 việc"]]
    ]
  },
  quotes: {
    eyebrow: "QUOTE TO PROJECT",
    title: "Báo giá",
    cards: [
      ["wide", "Báo giá cần chốt", "Luồng báo giá được thiết kế để chuyển thành dự án một lần, có kiểm soát.", ["QT-028 Villa An Phát|860 triệu · chờ duyệt", "QT-027 Nhà phố Q.9|420 triệu · đã gửi", "QT-026 Văn phòng WAL|đã chấp nhận"]],
      ["", "Tỷ lệ chốt", "Theo giá trị báo giá 30 ngày.", ["Pipeline|3,2 tỷ", "Win rate|62%"]],
      ["", "Rủi ro", "Báo giá quá lâu chưa phản hồi.", ["Quá 7 ngày|2 báo giá", "Cần gọi lại|3 khách"]]
    ]
  },
  contracts: {
    eyebrow: "LEGAL OPS",
    title: "Hợp đồng",
    cards: [
      ["wide", "Hợp đồng đang mở", "Theo dõi ký kết, phụ lục, nghiệm thu và công nợ gắn trực tiếp với từng công trình.", ["HD-014 Villa Đà Lạt|12,5 tỷ · đang thi công · 72%", "HD-013 Nhà phố Q.7|4,8 tỷ · chờ nghiệm thu thô", "HD-012 WAL Office|2,1 tỷ · chuẩn bị bàn giao"]],
      ["", "Cần ký", "Tài liệu chưa đủ chữ ký hoặc cần duyệt trước khi thi công tiếp.", ["Phụ lục vật tư Q.7|2 bên chưa ký", "Biên bản nghiệm thu Villa|chờ khách", "Đề nghị thanh toán đợt 2|owner duyệt"]],
      ["", "Kiểm soát pháp lý", "Quy tắc giúp không thất thoát và không sửa phá dữ liệu tài chính.", ["Đã thanh toán|khóa sửa", "Điều chỉnh giá trị|bắt buộc phụ lục", "Nghiệm thu|lưu theo version"]]
    ]
  },
  costs: {
    eyebrow: "JOB COSTING",
    title: "Chi phí",
    cards: [
      ["wide", "Chi phí phát sinh", "Ghi nhận theo dự án, hạng mục, người nhập và trạng thái duyệt.", ["Thép Hòa Phát|96,5 triệu · Q.7", "Nhân công tổ xây|42 triệu · Villa", "Xe cát|8,4 triệu · Bảo Lộc"]],
      ["", "Theo loại", "Tỷ trọng chi phí tháng này.", ["Vật tư|61%", "Nhân công|24%", "Thầu phụ|15%"]],
      ["", "Cần duyệt", "Chi phí chưa vào báo cáo chính thức.", ["Chờ owner|5 khoản", "Tổng giá trị|148 triệu"]]
    ]
  },
  team: {
    eyebrow: "PEOPLE OPS",
    title: "Nhân sự",
    cards: [
      ["wide", "Tổ đội hôm nay", "Ai đang ở công trình nào, việc nào cần xác nhận.", ["Trần Minh|Chỉ huy Q.7", "Đội xây Hùng|Villa Đà Lạt", "Đội điện nước|WAL Office"]],
      ["", "Hiệu suất", "Theo việc hoàn thành trong tuần.", ["Hoàn thành|86%", "Trễ hạn|7 việc"]],
      ["", "Phân quyền", "Vai trò chuẩn bị cho Supabase RLS.", ["owner|toàn quyền", "site_manager|dự án được giao", "accountant|thu chi"]]
    ]
  },
  documents: {
    eyebrow: "DOCS & PHOTOS",
    title: "Tài liệu & Ảnh",
    cards: [
      ["wide", "Hồ sơ gần đây", "Tổ chức tài liệu theo công trình để sau này nối Supabase Storage.", ["Villa Đà Lạt|6 ảnh mới hôm nay", "Q.7|biên bản nghiệm thu phần thô", "WAL Office|hồ sơ bàn giao"]],
      ["", "Thiếu hồ sơ", "Các mục cần bổ sung trước nghiệm thu.", ["Ảnh hiện trường|2 dự án", "Biên bản ký|1 hồ sơ"]],
      ["", "Storage policy", "Chuẩn bị cho bucket riêng tư.", ["Signed URL|bật sau", "RLS|theo organization_id"]]
    ]
  },
  reports: {
    eyebrow: "OWNER REPORTS",
    title: "Báo cáo",
    cards: [
      ["wide", "Báo cáo điều hành", "Dành cho owner mở nhanh mỗi sáng, không cần xuất Excel.", ["Dòng tiền|+6,4%", "Biên lợi nhuận|21,4%", "Công trình rủi ro|2"]],
      ["", "Xuất dữ liệu", "Chuẩn bị cho file kế toán và đối soát.", ["Công nợ|CSV/XLSX", "Chi phí|theo dự án"]],
      ["", "Audit trail", "Các sự kiện rủi ro cao cần ghi log.", ["Đổi role|audit", "Sửa thanh toán|audit", "Void invoice|audit"]]
    ]
  },
  settings: {
    eyebrow: "SYSTEM",
    title: "Cài đặt",
    cards: [
      ["wide", "Công ty & phân quyền", "Giữ nguyên định hướng multi-company, Supabase Auth và RLS cho phase app thật.", ["Company|PDT Construction", "Timezone|Asia/Ho_Chi_Minh", "Roles|owner/accountant/site_manager/viewer"]],
      ["", "Thông báo", "Quy tắc alert cho owner.", ["Công nợ quá hạn|bật", "Vượt ngân sách|bật", "Task trễ|bật"]],
      ["", "Tích hợp", "Những thứ sẽ nối sau khi có codebase Next.js.", ["Supabase|Auth/RLS", "Storage|hồ sơ riêng tư", "AI|Boss Brief"]]
    ]
  }
};

window.ConstructionOSData.fallbackModule = {
  eyebrow: "MODULE",
  title: "Đang chuẩn bị",
  cards: [
    ["wide", "Module sẵn sàng nối dữ liệu", "Phần này đã có vỏ UI để nối vào domain thật ở phase tiếp theo.", ["Trạng thái|Prototype", "Dữ liệu|Demo", "Kết nối|Chờ app Next.js/Supabase"]]
  ]
};




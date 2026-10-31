const dataAdapter = window.ConstructionOSData;
const dashboardData = dataAdapter.dashboard;
const moneyDashboardData = dataAdapter.moneyDashboard;
const projectDetails = dataAdapter.projectDetails;
const commands = dataAdapter.commands;
const moduleContent = dataAdapter.moduleContent;
const fallbackModule = dataAdapter.fallbackModule;
const storageKeys = {
  projects: "construction_os_projects",
  customers: "construction_os_customers"
};

const defaultProjects = [
  {
    id: "p-villa-dalat",
    name: "Villa Đà Lạt",
    owner: "Nguyễn Văn A",
    value: "12,5 tỷ",
    progress: 72,
    status: "Đúng tiến độ",
    tone: "ok",
    nextAction: "Kiểm tra ảnh hiện trường trước 17:00"
  },
  {
    id: "p-q7",
    name: "Nhà phố Q.7",
    owner: "An Phát",
    value: "4,8 tỷ",
    progress: 55,
    status: "Chậm 4 ngày",
    tone: "risk",
    nextAction: "Gọi nhà cung cấp vật tư tầng 2"
  },
  {
    id: "p-duc-trong",
    name: "Nhà xưởng Đức Trọng",
    owner: "Đức Trọng Foods",
    value: "8,6 tỷ",
    progress: 88,
    status: "Nguy cơ vượt ngân sách",
    tone: "watch",
    nextAction: "Owner duyệt chi phí phát sinh"
  }
];

const defaultCustomers = [
  {
    id: "c-nguyen-a",
    name: "Nguyễn Văn A",
    phone: "090 123 4567",
    value: "12,5 tỷ",
    status: "Đang thi công",
    tone: "ok",
    nextAction: "Gửi ảnh tiến độ Villa Đà Lạt"
  },
  {
    id: "c-an-phat",
    name: "An Phát Group",
    phone: "091 888 2211",
    value: "180 triệu phải thu",
    status: "Cần gọi hôm nay",
    tone: "risk",
    nextAction: "Nhắc thanh toán đợt nghiệm thu thô"
  },
  {
    id: "c-resort",
    name: "Resort Bảo Lộc",
    phone: "093 456 7890",
    value: "5,4 tỷ pipeline",
    status: "Cơ hội mở rộng",
    tone: "watch",
    nextAction: "Chốt gói nội thất giai đoạn 2"
  }
];

const routeButtons = document.querySelectorAll("[data-route]");
const commandDialog = document.getElementById("commandDialog");
const commandInput = document.getElementById("commandInput");
const commandResults = document.getElementById("commandResults");
const sidebar = document.getElementById("sidebar");
const toast = document.getElementById("toast");
const hero = document.querySelector(".hero");
const dashboardView = document.getElementById("dashboardView");
const moduleView = document.getElementById("moduleView");
const moduleEyebrow = document.getElementById("moduleEyebrow");
const moduleTitle = document.getElementById("moduleTitle");
const moduleGrid = document.getElementById("moduleGrid");
const moduleSearch = document.getElementById("moduleSearch");
const moduleFilter = document.getElementById("moduleFilter");
const projectDrawer = document.getElementById("projectDrawer");
const drawerTitle = document.getElementById("drawerTitle");
const drawerCode = document.getElementById("drawerCode");
const drawerProgress = document.getElementById("drawerProgress");
const drawerStatus = document.getElementById("drawerStatus");
const quickDialog = document.getElementById("quickDialog");
const notifyPanel = document.getElementById("notifyPanel");
const aiInput = document.getElementById("aiInput");
const activityList = document.querySelector(".activity-list");
const chat = document.querySelector(".chat");
const confirmDialog = document.getElementById("confirmDialog");
const confirmEyebrow = document.getElementById("confirmEyebrow");
const confirmTitle = document.getElementById("confirmTitle");
const confirmBody = document.getElementById("confirmBody");
const bellCount = document.querySelector(".bell span");
const healthGauge = document.getElementById("healthGauge");
const healthBrief = document.getElementById("healthBrief");
const bossBriefList = document.getElementById("bossBriefList");
const watchList = document.getElementById("watchList");
const notifyList = document.querySelector(".notify-list");
const viewSwitcher = document.querySelector(".view-switcher");
const moneyViewToggle = document.getElementById("moneyViewToggle");
const heroTitle = document.getElementById("heroTitle");
const heroSubtitle = document.getElementById("heroSubtitle");
const executiveStrip = document.getElementById("executiveStrip");
const snapshotCard = document.getElementById("snapshotCard");
const cashPanelTitle = document.getElementById("cashPanelTitle");
const cashLegend = document.getElementById("cashLegend");
const cashSummary = document.getElementById("cashSummary");

let pendingAction = null;
let openAlertCount = 3;
let currentRoute = localStorage.getItem("construction_os_route") || "dashboard";
let currentFilter = "all";
let isMoneyView = localStorage.getItem("construction_os_money_view") === "true";

function loadRecords(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveRecords(key, records) {
  localStorage.setItem(key, JSON.stringify(records));
}

function getProjects() {
  return loadRecords(storageKeys.projects, defaultProjects);
}

function setProjects(records) {
  saveRecords(storageKeys.projects, records);
}

function getCustomers() {
  return loadRecords(storageKeys.customers, defaultCustomers);
}

function setCustomers(records) {
  saveRecords(storageKeys.customers, records);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function hydrateDashboard(source = isMoneyView ? moneyDashboardData : dashboardData) {
  if (!source) return;
  healthGauge.style.setProperty("--score", source.healthScore);
  healthGauge.querySelector("span").textContent = source.healthScore;
  healthGauge.querySelector("b").textContent = source.healthLabel;
  healthBrief.textContent = `"${source.healthBrief}"`;

  bossBriefList.innerHTML = source.bossBrief.map(([color, count, label]) => `
    <li><b class="${color}">${count}</b><span>${label}</span></li>
  `).join("");

  source.metrics.forEach(([label, value, trend, trendClass, icon], index) => {
    const card = document.querySelector(`[data-metric-index="${index}"]`);
    if (!card) return;
    card.querySelector("span").textContent = label;
    card.querySelector("strong").textContent = value;
    const trendElement = card.querySelector("b");
    trendElement.textContent = trend;
    trendElement.className = trendClass;
    card.querySelector(".metric-icon").className = `metric-icon ${icon}`;
  });

  watchList.innerHTML = source.projects.map(([name, status, tone, progress]) => `
    <button data-project="${name}">
      <span>${name}</span>
      <em class="${tone}">${status}</em>
      <b>${progress}%</b>
      <i class="${tone === "risk" ? "danger" : ""}"><u style="width:${progress}%"></u></i>
    </button>
  `).join("");

  activityList.innerHTML = source.activity.map(([time, iconClass, icon, title, detail]) => `
    <li><time>${time}</time><i class="${iconClass}">${icon}</i><span>${title}<small>${detail}</small></span></li>
  `).join("");

  notifyList.innerHTML = source.alerts.map(([route, color, icon, title, detail]) => `
    <button data-route="${route}"><b class="${color}">${icon}</b><span>${title}<small>${detail}</small></span></button>
  `).join("");
  openAlertCount = dashboardData.alerts.length;
  bellCount.textContent = String(openAlertCount);
}

function renderMoneyView() {
  document.body.classList.toggle("money-view", isMoneyView);
  moneyViewToggle?.setAttribute("aria-pressed", String(isMoneyView));
  if (moneyViewToggle) {
    moneyViewToggle.textContent = isMoneyView ? "Money view: ON" : "Money view";
  }

  if (heroTitle && heroSubtitle) {
    heroTitle.textContent = isMoneyView ? "Owner Command Center" : "Chào buổi sáng, Owner!";
    heroSubtitle.textContent = isMoneyView
      ? "19,4 tỷ hợp đồng mở · 620 triệu cần thu · 28,4% biên lợi nhuận dự kiến."
      : "Đây là tình hình doanh nghiệp của bạn hôm nay.";
  }

  if (executiveStrip) {
    executiveStrip.hidden = !isMoneyView;
  }

  if (snapshotCard) {
    snapshotCard.className = isMoneyView ? "finance-snapshot" : "";
    snapshotCard.innerHTML = isMoneyView
      ? `
        <span>EXECUTIVE SNAPSHOT</span>
        <strong>7,8 tỷ</strong>
        <p>cash collected YTD</p>
        <ul>
          <li><b>42 ngày</b><small>cash runway</small></li>
          <li><b>3,2 tỷ</b><small>gross profit forecast</small></li>
        </ul>
      `
      : `
        <p>Xây dựng không chỉ là công trình, mà là giá trị bền vững cho tương lai.</p>
        <small>© PDT LABS</small>
      `;
  }

  if (cashPanelTitle && cashLegend && cashSummary) {
    cashPanelTitle.textContent = isMoneyView ? "Dòng tiền & Burn Rate" : "Dòng tiền (6 tháng)";
    cashLegend.innerHTML = isMoneyView
      ? '<span class="dot green"></span>Thu <span class="dot blue"></span>Chi <span class="dot red"></span>Risk'
      : '<span class="dot green"></span>Thu <span class="dot blue"></span>Chi';
    cashSummary.hidden = !isMoneyView;
  }

  hydrateDashboard(isMoneyView ? moneyDashboardData : dashboardData);
}

function renderModule(route) {
  const command = commands.find(([key]) => key === route);
  const content = moduleContent[route] || { ...fallbackModule, title: command?.[1] || fallbackModule.title };
  const keyword = moduleSearch.value.trim().toLowerCase();
  moduleEyebrow.textContent = content.eyebrow;
  moduleTitle.textContent = content.title;

  if (route === "projects") {
    renderProjectsModule(keyword);
    return;
  }

  if (route === "customers") {
    renderCustomersModule(keyword);
    return;
  }

  if (route === "contracts" && !keyword && currentFilter === "all") {
    renderContractsModule();
    return;
  }

  const cards = content.cards.map(([variant, title, body, rows]) => {
    const filteredRows = rows.filter((row) => {
      const tone = getStatusTone(row);
      const textMatch = !keyword || row.toLowerCase().includes(keyword) || title.toLowerCase().includes(keyword) || body.toLowerCase().includes(keyword);
      const toneMatch = currentFilter === "all" || tone === currentFilter;
      return textMatch && toneMatch;
    });
    return [variant, title, body, filteredRows];
  }).filter(([, title, body, rows]) => rows.length || !keyword && currentFilter === "all");

  moduleGrid.innerHTML = cards.length ? cards.map(([variant, title, body, rows]) => `
    <article class="module-card ${variant}">
      <div class="module-card-head">
        <h3>${title}</h3>
        <button data-module-action="${route}">Mở</button>
      </div>
      <p>${body}</p>
      <ul>
        ${rows.map((row) => {
          const [label, value] = row.split("|");
          const tone = getStatusTone(value);
          return `<li><span>${label}</span><b>${value}</b><em class="${tone}">${tone}</em></li>`;
        }).join("")}
      </ul>
    </article>
  `).join("") : `
    <article class="module-card wide empty-module">
      <h3>Không có kết quả phù hợp</h3>
      <p>Thử đổi bộ lọc hoặc nhập từ khóa rộng hơn để xem dữ liệu demo trong module này.</p>
    </article>
  `;
}

function recordMatchesFilter(record) {
  if (currentFilter === "all") return true;
  if (currentFilter === "risk") return record.tone === "risk";
  if (currentFilter === "watch") return record.tone === "watch";
  if (currentFilter === "ok") return record.tone === "ok";
  return true;
}

function renderProjectsModule(keyword = "") {
  const projects = getProjects();
  const visibleProjects = projects.filter((project) => {
    const text = `${project.name} ${project.owner} ${project.value} ${project.status} ${project.nextAction}`.toLowerCase();
    return (!keyword || text.includes(keyword)) && recordMatchesFilter(project);
  });

  moduleGrid.innerHTML = `
    <article class="module-card live-module wide">
      <div class="module-card-head">
        <div>
          <span class="mini-eyebrow">LIVE PROJECT OPS</span>
          <h3>Công trình đang vận hành</h3>
        </div>
        <button data-add-project>+ Thêm công trình</button>
      </div>
      <div class="live-summary">
        <div><small>Tổng công trình</small><strong>${projects.length}</strong></div>
        <div><small>Đang rủi ro</small><strong>${projects.filter((item) => item.tone === "risk").length}</strong></div>
        <div><small>Giá trị đang mở</small><strong>${projects.length >= 4 ? "21,4 tỷ" : "25,9 tỷ"}</strong></div>
      </div>
      <div class="record-list">
        ${visibleProjects.length ? visibleProjects.map((project) => `
          <button class="record-row" data-open-project="${project.name}">
            <span>
              <b>${project.name}</b>
              <small>${project.owner} · ${project.nextAction}</small>
            </span>
            <i><u style="width:${project.progress}%"></u></i>
            <strong>${project.value}</strong>
            <em class="${project.tone}">${project.status}</em>
          </button>
        `).join("") : `<p class="empty-inline">Không có công trình phù hợp bộ lọc.</p>`}
      </div>
    </article>
    <article class="module-card action-stack">
      <div class="module-card-head">
        <h3>Tác vụ nhanh</h3>
      </div>
      <button data-progress-project>+5% tiến độ Q.7</button>
      <button data-risk-project>Đánh dấu xử lý rủi ro</button>
      <button data-add-project>Thêm công trình mới</button>
    </article>
  `;
}

function renderCustomersModule(keyword = "") {
  const customers = getCustomers();
  const visibleCustomers = customers.filter((customer) => {
    const text = `${customer.name} ${customer.phone} ${customer.value} ${customer.status} ${customer.nextAction}`.toLowerCase();
    return (!keyword || text.includes(keyword)) && recordMatchesFilter(customer);
  });

  moduleGrid.innerHTML = `
    <article class="module-card live-module wide">
      <div class="module-card-head">
        <div>
          <span class="mini-eyebrow">LIVE CUSTOMER OPS</span>
          <h3>Khách hàng thật trong pipeline</h3>
        </div>
        <button data-add-customer>+ Thêm khách</button>
      </div>
      <div class="live-summary">
        <div><small>Tổng khách</small><strong>${customers.length}</strong></div>
        <div><small>Cần chăm sóc</small><strong>${customers.filter((item) => item.tone !== "ok").length}</strong></div>
        <div><small>Giá trị liên quan</small><strong>18,1 tỷ</strong></div>
      </div>
      <div class="record-list customer-records">
        ${visibleCustomers.length ? visibleCustomers.map((customer) => `
          <button class="record-row" data-customer-id="${customer.id}">
            <span>
              <b>${customer.name}</b>
              <small>${customer.phone} · ${customer.nextAction}</small>
            </span>
            <strong>${customer.value}</strong>
            <em class="${customer.tone}">${customer.status}</em>
          </button>
        `).join("") : `<p class="empty-inline">Không có khách hàng phù hợp bộ lọc.</p>`}
      </div>
    </article>
    <article class="module-card action-stack">
      <div class="module-card-head">
        <h3>Chăm sóc nhanh</h3>
      </div>
      <button data-call-customer>Ghi đã gọi An Phát</button>
      <button data-add-customer>Thêm khách hàng mới</button>
      <button data-export-customers>Chuẩn bị danh sách follow-up</button>
    </article>
  `;
}

function renderContractsModule() {
  moduleGrid.innerHTML = `
    <article class="module-card contract-command wide">
      <div class="module-card-head">
        <div>
          <span class="mini-eyebrow">LIVE CONTRACT CONTROL</span>
          <h3>Hợp đồng đang mở</h3>
        </div>
        <button data-module-action="contracts">Mở phòng hợp đồng</button>
      </div>
      <div class="contract-kpis">
        <div><small>Tổng giá trị mở</small><strong>19,4 tỷ</strong><em class="ok">+3 hợp đồng</em></div>
        <div><small>Cần ký tuần này</small><strong>5</strong><em class="watch">đang chờ</em></div>
        <div><small>Rủi ro nghiệm thu</small><strong>2</strong><em class="risk">cần xử lý</em></div>
      </div>
      <ul class="contract-list">
        <li>
          <span><b>HD-014</b> Villa Đà Lạt <small>Hợp đồng thi công trọn gói</small></span>
          <i><u style="width:72%"></u></i>
          <strong>12,5 tỷ</strong>
          <em class="ok">đang thi công</em>
        </li>
        <li>
          <span><b>HD-013</b> Nhà phố Q.7 <small>Chờ nghiệm thu thô · trễ 4 ngày</small></span>
          <i><u style="width:55%"></u></i>
          <strong>4,8 tỷ</strong>
          <em class="risk">cần owner</em>
        </li>
        <li>
          <span><b>HD-012</b> WAL Office <small>Chuẩn bị bàn giao · còn 2 phụ lục</small></span>
          <i><u style="width:88%"></u></i>
          <strong>2,1 tỷ</strong>
          <em class="watch">chờ ký</em>
        </li>
      </ul>
    </article>
    <article class="module-card signature-card">
      <div class="module-card-head">
        <h3>Cần ký ngay</h3>
        <button data-module-action="contracts">Gửi nhắc</button>
      </div>
      <ul class="signature-list">
        <li><span>Phụ lục vật tư Q.7</span><b>2 bên</b></li>
        <li><span>Biên bản nghiệm thu Villa</span><b>Khách</b></li>
        <li><span>Đề nghị thanh toán đợt 2</span><b>Owner</b></li>
      </ul>
    </article>
    <article class="module-card guardrail-card">
      <div class="module-card-head">
        <h3>Không sửa phá vỡ</h3>
      </div>
      <p>Mọi thay đổi tiền/hạng mục sau ký phải tạo phụ lục hoặc version mới. Dữ liệu đã thu tiền được khóa sửa.</p>
      <div class="guardrail-stack">
        <span>✓ Audit trail</span>
        <span>✓ Version hợp đồng</span>
        <span>✓ Khóa dòng tiền</span>
      </div>
    </article>
  `;
}

function getStatusTone(value = "") {
  const text = value.toLowerCase();
  if (text.includes("quá hạn") || text.includes("chậm") || text.includes("vượt") || text.includes("rủi ro")) return "risk";
  if (text.includes("chờ") || text.includes("cần") || text.includes("quá")) return "watch";
  if (text.includes("đúng") || text.includes("hoàn") || text.includes("đã")) return "ok";
  return "info";
}

function selectRoute(route) {
  currentRoute = route;
  localStorage.setItem("construction_os_route", route);
  routeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.route === route);
  });
  sidebar.classList.remove("open");

  if (route === "dashboard") {
    hero.hidden = false;
    if (viewSwitcher) viewSwitcher.hidden = false;
    if (executiveStrip) executiveStrip.hidden = !isMoneyView;
    dashboardView.hidden = false;
    moduleView.hidden = true;
    return;
  }

  hero.hidden = true;
  if (viewSwitcher) viewSwitcher.hidden = true;
  if (executiveStrip) executiveStrip.hidden = true;
  dashboardView.hidden = true;
  moduleView.hidden = false;
  renderModule(route);

  const command = commands.find(([key]) => key === route);
  showToast(`${command ? command[1] : "Module"} đang dùng dữ liệu demo trong prototype`);
}

function renderCommands(filter = "") {
  const keyword = filter.trim().toLowerCase();
  const visible = commands.filter(([, label, description]) => {
    return !keyword || `${label} ${description}`.toLowerCase().includes(keyword);
  });

  commandResults.innerHTML = visible.length
    ? visible.map(([route, label, description]) => `
      <button type="button" data-command-route="${route}">
        ${label}
        <small>${description}</small>
      </button>
    `).join("")
    : "<small>Không tìm thấy mục phù hợp.</small>";
}

function openCommand() {
  renderCommands();
  commandDialog.showModal();
  requestAnimationFrame(() => commandInput.focus());
}

function openProjectDrawer(name) {
  const detail = projectDetails[name] || projectDetails["Villa Đà Lạt"];
  const progress = detail.progress;
  const status = detail.status;
  drawerTitle.textContent = name;
  drawerCode.textContent = detail.code;
  drawerProgress.textContent = progress;
  drawerStatus.textContent = status;
  document.querySelector('[data-pane="overview"] p').textContent = detail.overview;
  document.querySelector('[data-pane="overview"] ul').innerHTML = detail.facts.map((fact) => `<li>${fact}</li>`).join("");
  document.querySelector('[data-pane="money"] p').textContent = detail.money;
  document.querySelector('[data-pane="tasks"]').innerHTML = detail.tasks.map((task, index) => `
    <label><input type="checkbox" ${index === 0 ? "checked" : ""}> ${task}</label>
  `).join("");
  projectDrawer.classList.add("open");
  projectDrawer.setAttribute("aria-hidden", "false");
}

function closeProjectDrawer() {
  projectDrawer.classList.remove("open");
  projectDrawer.setAttribute("aria-hidden", "true");
}

function openNotifications() {
  notifyPanel.classList.add("open");
  notifyPanel.setAttribute("aria-hidden", "false");
}

function closeNotifications() {
  notifyPanel.classList.remove("open");
  notifyPanel.setAttribute("aria-hidden", "true");
}

function saveQuickEntry() {
  const title = document.getElementById("quickTitle").value.trim() || "Ghi nhanh từ hiện trường";
  const project = document.getElementById("quickProject").value;
  activityList.insertAdjacentHTML("afterbegin", `
    <li><time>Bây giờ</time><i class="file">＋</i><span>${title}<small>${project} · vừa thêm từ quick action</small></span></li>
  `);
  showToast("Đã thêm vào hoạt động gần đây");
}

function createProject() {
  const name = window.prompt("Tên công trình mới?", "Công trình mới");
  if (!name) return;
  const value = window.prompt("Giá trị hợp đồng?", "1,2 tỷ") || "Đang cập nhật";
  const projects = getProjects();
  projects.unshift({
    id: `p-${Date.now()}`,
    name,
    owner: "Khách mới",
    value,
    progress: 0,
    status: "Mới tạo",
    tone: "watch",
    nextAction: "Cần phân công người phụ trách"
  });
  setProjects(projects);
  addActivity(`Đã tạo công trình ${name}`, `${value} · lưu trong prototype`, "＋");
  renderModule("projects");
  showToast("Đã thêm công trình và lưu trên máy này");
}

function createCustomer() {
  const name = window.prompt("Tên khách hàng mới?", "Khách hàng mới");
  if (!name) return;
  const phone = window.prompt("Số điện thoại?", "09x xxx xxxx") || "Chưa cập nhật";
  const customers = getCustomers();
  customers.unshift({
    id: `c-${Date.now()}`,
    name,
    phone,
    value: "Cơ hội mới",
    status: "Mới thêm",
    tone: "watch",
    nextAction: "Cần gọi xác nhận nhu cầu"
  });
  setCustomers(customers);
  addActivity(`Đã thêm khách hàng ${name}`, `${phone} · cần chăm sóc`, "◎");
  renderModule("customers");
  showToast("Đã thêm khách hàng và lưu trên máy này");
}

function progressProject() {
  const projects = getProjects();
  const project = projects.find((item) => item.name.includes("Q.7")) || projects[0];
  if (!project) return;
  project.progress = Math.min(100, project.progress + 5);
  project.status = project.progress >= 80 ? "Đang bù tiến độ" : project.status;
  project.nextAction = `Vừa cập nhật tiến độ lên ${project.progress}%`;
  setProjects(projects);
  addActivity(`Cập nhật tiến độ ${project.name}`, `đạt ${project.progress}%`, "▦");
  renderModule("projects");
  showToast(`Đã cập nhật ${project.name} lên ${project.progress}%`);
}

function resolveProjectRisk() {
  const projects = getProjects();
  const project = projects.find((item) => item.tone === "risk") || projects[0];
  if (!project) return;
  project.tone = "watch";
  project.status = "Đang xử lý";
  project.nextAction = "Đã giao người phụ trách xử lý rủi ro";
  setProjects(projects);
  addActivity(`Đã giao xử lý rủi ro ${project.name}`, "trạng thái chuyển sang đang xử lý", "!");
  renderModule("projects");
  showToast("Đã cập nhật trạng thái rủi ro");
}

function callCustomer() {
  const customers = getCustomers();
  const customer = customers.find((item) => item.name.includes("An Phát")) || customers[0];
  if (!customer) return;
  customer.tone = "ok";
  customer.status = "Đã gọi";
  customer.nextAction = "Chờ phản hồi thanh toán";
  setCustomers(customers);
  addActivity(`Đã gọi ${customer.name}`, "ghi nhận chăm sóc khách hàng", "☎");
  renderModule("customers");
  showToast("Đã ghi nhận cuộc gọi khách hàng");
}

function addActivity(title, detail, icon = "✓") {
  activityList.insertAdjacentHTML("afterbegin", `
    <li><time>Bây giờ</time><i class="file">${icon}</i><span>${title}<small>${detail}</small></span></li>
  `);
}

function askAi() {
  const question = aiInput.value.trim() || "Hôm nay cần ưu tiên việc gì?";
  chat.insertAdjacentHTML("beforeend", `<p class="bubble user">${question}</p>`);
  chat.insertAdjacentHTML("beforeend", `
    <div class="bubble ai">
      <span>Gợi ý demo: xử lý công nợ An Phát trước, sau đó gọi chỉ huy trưởng Q.7 để khóa phương án bù tiến độ trong hôm nay.</span>
    </div>
  `);
  aiInput.value = "";
  showToast("AI Copilot đã trả lời trong panel");
}

function requestConfirmation(type, title, body) {
  pendingAction = { type, title };
  confirmEyebrow.textContent = type.toUpperCase();
  confirmTitle.textContent = title;
  confirmBody.textContent = body;
  confirmDialog.showModal();
}

function runConfirmedAction() {
  if (!pendingAction) return;
  addActivity(pendingAction.title, "Đã xử lý từ action center demo", "✓");
  if (openAlertCount > 0) {
    openAlertCount -= 1;
    bellCount.textContent = String(openAlertCount);
  }
  showToast("Đã ghi nhận thao tác xử lý");
  pendingAction = null;
}

function bindEvents() {
  document.getElementById("openCommand").addEventListener("click", openCommand);
  document.getElementById("openQuick").addEventListener("click", () => quickDialog.showModal());
  document.getElementById("openNotifications").addEventListener("click", openNotifications);
  document.getElementById("closeNotifications").addEventListener("click", closeNotifications);
  document.getElementById("menuButton").addEventListener("click", () => sidebar.classList.toggle("open"));
  document.getElementById("askAi").addEventListener("click", askAi);
  document.getElementById("backDashboard").addEventListener("click", () => selectRoute("dashboard"));
  document.getElementById("closeDrawer").addEventListener("click", closeProjectDrawer);
  document.getElementById("saveQuick").addEventListener("click", saveQuickEntry);
  document.getElementById("confirmAction").addEventListener("click", runConfirmedAction);
  moneyViewToggle?.addEventListener("click", () => {
    isMoneyView = !isMoneyView;
    localStorage.setItem("construction_os_money_view", String(isMoneyView));
    renderMoneyView();
    showToast(isMoneyView ? "Đã bật Money view" : "Đã quay lại giao diện thường");
  });

  routeButtons.forEach((button) => {
    button.addEventListener("click", () => selectRoute(button.dataset.route));
  });

  moduleSearch.addEventListener("input", () => renderModule(currentRoute));
  moduleFilter.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    currentFilter = button.dataset.filter;
    moduleFilter.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    renderModule(currentRoute);
  });

  document.querySelector(".account").addEventListener("click", () => quickDialog.showModal());

  notifyList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const title = button.querySelector("span").childNodes[0].textContent.trim();
    const detail = button.querySelector("small").textContent.trim();
    requestConfirmation("alert", title, detail);
  });

  document.querySelectorAll("[data-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("quickTitle").placeholder = {
        cost: "VD: Mua thép Hòa Phát cho Q.7",
        payment: "VD: Thu đợt 3 Villa Đà Lạt",
        task: "VD: Kiểm tra chống thấm tầng mái",
        photo: "VD: Upload ảnh nghiệm thu buổi sáng"
      }[button.dataset.quick];
    });
  });

  watchList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project]");
    if (!button) return;
    openProjectDrawer(button.dataset.project);
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      document.querySelectorAll("[data-tab]").forEach((tabButton) => tabButton.classList.toggle("active", tabButton === button));
      document.querySelectorAll("[data-pane]").forEach((pane) => pane.classList.toggle("active", pane.dataset.pane === tab));
    });
  });

  commandInput.addEventListener("input", () => renderCommands(commandInput.value));
  commandResults.addEventListener("click", (event) => {
    const item = event.target.closest("[data-command-route]");
    if (!item) return;
    selectRoute(item.dataset.commandRoute);
    commandDialog.close();
  });

  moduleGrid.addEventListener("click", (event) => {
    if (event.target.closest("[data-add-project]")) {
      createProject();
      return;
    }
    if (event.target.closest("[data-progress-project]")) {
      progressProject();
      return;
    }
    if (event.target.closest("[data-risk-project]")) {
      resolveProjectRisk();
      return;
    }
    if (event.target.closest("[data-add-customer]")) {
      createCustomer();
      return;
    }
    if (event.target.closest("[data-call-customer]")) {
      callCustomer();
      return;
    }
    if (event.target.closest("[data-export-customers]")) {
      addActivity("Đã chuẩn bị danh sách follow-up", "3 khách hàng cần chăm sóc tuần này", "▤");
      showToast("Đã tạo danh sách follow-up demo");
      return;
    }
    const projectButton = event.target.closest("[data-open-project]");
    if (projectButton) {
      openProjectDrawer(projectButton.dataset.openProject);
      return;
    }
    const customerButton = event.target.closest("[data-customer-id]");
    if (customerButton) {
      const customer = getCustomers().find((item) => item.id === customerButton.dataset.customerId);
      if (customer) {
        requestConfirmation("customer", customer.name, `${customer.phone} · ${customer.value} · ${customer.nextAction}`);
      }
      return;
    }
    const action = event.target.closest("[data-module-action]");
    if (!action) return;
    requestConfirmation(
      "module action",
      `Mở workflow ${moduleTitle.textContent}`,
      "Prototype đã ghi nhận thao tác. Khi nối domain thật, nút này sẽ mở form hoặc danh sách chi tiết tương ứng."
    );
  });

  document.addEventListener("keydown", (event) => {
    const wantsCommand = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
    if (wantsCommand) {
      event.preventDefault();
      openCommand();
    }
    if (event.key === "Escape") closeProjectDrawer();
    if (event.key === "Enter" && document.activeElement === aiInput) askAi();
  });

  document.addEventListener("click", (event) => {
    if (!sidebar.classList.contains("open")) return;
    if (event.target.closest("#sidebar") || event.target.closest("#menuButton")) return;
    sidebar.classList.remove("open");
  });

  projectDrawer.addEventListener("click", (event) => {
    if (event.target === projectDrawer) closeProjectDrawer();
  });

  notifyPanel.addEventListener("click", (event) => {
    if (event.target === notifyPanel) closeNotifications();
  });

  document.querySelectorAll(".small-action, .metric-card, .project-photo button").forEach((element) => {
    element.addEventListener("click", () => showToast("Hành động demo đã được ghi nhận"));
  });

  document.getElementById("analyzeHealth").addEventListener("click", () => {
    requestConfirmation(
      "ai analysis",
      "Tạo phân tích Business Health",
      "AI sẽ gom 3 cảnh báo lớn nhất, công nợ, tiến độ và chi phí để tạo brief điều hành."
    );
  });
}

bindEvents();
renderCommands();
renderMoneyView();
selectRoute(currentRoute);



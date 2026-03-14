
(function () {
  const K = {
    AUTH_SESSION: "campus.auth.session.v1",
    AUTH_USERS: "campus.auth.users.v1",
    AUTH_PROMPT: "campus.auth.prompted.v1",
    TODO: "campus.todo.v1",
    REMOTE: "campus.remote.services.v1",
    LIB_BOOK: "campus.library.booking.v2",
    LIB_MODE: "campus.library.mode.v1",
    LIB_API_BASE: "campus.library.api.base.v1",
    ANALYTICS_EVENTS: "campus.analytics.events.v1",
    PERF_METRICS: "campus.perf.metrics.v1",
    EXP_PKGS: "campus.express.packages.v2",
    SHUTTLE_FAV: "campus.shuttle.favorite.v2",
    SCH_FOLLOW: "campus.scholarship.follow.v1",
    LOST_CUSTOM: "campus.lostfound.custom.v1",
    LOST_STATUS: "campus.lostfound.status.v1"
  };

  const $ = (id) => document.getElementById(id);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  const tabButtons = $$(".tab-btn");
  const views = $$(".view");
  const newsList = $("news-list");
  const newsSource = $("news-source");
  const networkStatus = $("network-status");
  const settingsForm = $("settings-form");
  const settingsTip = $("settings-tip");
  const lastSync = $("last-sync");
  const installBtn = $("install-btn");
  const newsTemplate = $("news-item-template");
  const welcomeText = $("welcome-text");
  const examCountdown = $("exam-countdown");

  const accountEntry = $("account-entry");
  const logoutBtn = $("logout-btn");
  const authStatus = $("auth-status");
  const authFeedback = $("auth-feedback");
  const sessionUser = $("session-user");
  const sessionTime = $("session-time");
  const authTabs = $$(".auth-tab");
  const authForms = $$(".auth-form");
  const loginForm = $("login-form");
  const registerForm = $("register-form");

  const promptModal = $("login-prompt-modal");
  const promptLoginBtn = $("prompt-login-btn");
  const promptCloseTargets = $$("[data-close-prompt]");

  const todoForm = $("todo-form");
  const todoInput = $("todo-input");
  const todoList = $("todo-list");

  const mapZoneLabel = $("map-zone-label");
  const mapDescription = $("map-description");
  const mapDetailTitle = $("map-detail-title");
  const mapOpenTime = $("map-open-time");
  const mapCrowdLevel = $("map-crowd-level");
  const mapServiceTag = $("map-service-tag");
  const mapRouteTip = $("map-route-tip");
  const mapDetailPanel = $("map-detail-panel");
  const zoneInteractive = $$("[data-zone]");

  const serviceEntries = $$(".service-entry");
  const backHomeBtns = $$(".back-home-btn");

  const homeLibraryStatus = $("home-library-status");
  const homeLibraryHint = $("home-library-hint");
  const homeExpressStatus = $("home-express-status");
  const homeExpressHint = $("home-express-hint");
  const homeShuttleStatus = $("home-shuttle-status");
  const homeShuttleHint = $("home-shuttle-hint");

  const quickButtons = $$(".quick-btn");
  const quickTitle = $("quick-service-title");
  const quickHint = $("quick-service-hint");
  const quickPanel = $("quick-service-panel");

  const librarySummary = $("library-live-summary");
  const libraryFilterForm = $("library-live-filter");
  const libraryFilterDate = $("library-filter-date");
  const libraryFilterSlot = $("library-filter-slot");
  const libraryFloorList = $("library-floor-list");
  const libraryBookingForm = $("library-booking-form");
  const libraryBookingDate = $("library-booking-date");
  const libraryFloorSelect = $("library-floor-select");
  const librarySlotSelect = $("library-slot-select");
  const libraryBookingList = $("library-booking-list");
  const libraryTip = $("library-booking-tip");
  const libraryModeForm = $("library-mode-form");
  const libraryDataMode = $("library-data-mode");
  const libraryApiBase = $("library-api-base");
  const libraryApiStatus = $("library-api-status");

  const expressStats = $("express-stats");
  const expressFilterRow = $("express-filter-row");
  const expressFilterButtons = $$("[data-express-filter]");
  const expressAppointmentForm = $("express-appointment-form");
  const expressAppointmentPackage = $("express-appointment-package");
  const expressAppointmentTime = $("express-appointment-time");
  const expressList = $("express-list");
  const expressTip = $("express-tip");

  const shuttlePlannerForm = $("shuttle-planner-form");
  const shuttleFrom = $("shuttle-from");
  const shuttleTo = $("shuttle-to");
  const shuttlePlanResult = $("shuttle-plan-result");
  const shuttleList = $("shuttle-list");
  const shuttleTip = $("shuttle-tip");

  const dashboardKpis = $("dashboard-kpis");
  const dashboardUsageBars = $("dashboard-usage-bars");
  const dashboardDailyBars = $("dashboard-daily-bars");
  const dashboardLastUpdate = $("dashboard-last-update");
  const perfMetricsForm = $("perf-metrics-form");
  const perfFillSampleBtn = $("perf-fill-sample");
  const perfFormTip = $("perf-form-tip");
  const perfCompareBars = $("perf-compare-bars");
  const perfCompareTable = $("perf-compare-table");

  const MAP = {
    library: { name: "图书馆", description: "图书馆位于校园中心区，适合自习与查阅资料。", open: "07:30 - 23:30", crowd: "中等", service: "自习预约", route: "路线建议：从南门步行 6 分钟可达。" },
    canteen: { name: "食堂", description: "食堂在生活区北侧，覆盖南北风味窗口和轻食区。", open: "06:30 - 21:30", crowd: "较高", service: "线上排队", route: "路线建议：午高峰建议 11:20 前到达，减少排队。" },
    dorm: { name: "宿舍区", description: "宿舍区靠近南门，周边有便利店和快递站。", open: "全天开放（门禁 23:30）", crowd: "中等", service: "报修服务", route: "路线建议：夜间回宿舍优先主干道。" },
    sports: { name: "体育馆", description: "体育馆位于东区，提供羽毛球和体测训练。", open: "08:00 - 22:00", crowd: "中等", service: "场馆预约", route: "路线建议：晚课后可乘东线校车。" },
    teaching: { name: "教学楼群", description: "教学楼群集中在西区，覆盖大课教室与机房。", open: "07:00 - 22:30", crowd: "较高", service: "空教室查询", route: "路线建议：跨楼上课预留 10 分钟。" }
  };

  const QUICK_META = {
    grades: ["成绩查询", "选择学期并查看课程成绩和绩点估算"],
    exams: ["考试安排", "按时间窗口查看考试计划，并可一键加入待办"],
    classroom: ["空教室查询", "按教学楼和时段查询可用教室"],
    scholarship: ["奖学金通知", "查看截止日期并关注重点奖项"],
    bus: ["校园巴士", "查看推荐线路并跳转到校车中心"],
    lostfound: ["失物招领", "发布和处理失物信息，支持状态更新"]
  };

  const S = {
    data: null,
    source: "",
    showSummary: true,
    deferredPrompt: null,
    quick: "grades",
    gradeSemester: "",
    examWindow: "30",
    classroomBuilding: "",
    classroomSlot: "",
    expressFilter: "all",
    routes: [],
    routeTimer: null,
    libFilter: { dateMode: "today", slot: "14:00-16:00" },
    libMode: localStorage.getItem(K.LIB_MODE) === "api" ? "api" : "mock",
    libApiBase: localStorage.getItem(K.LIB_API_BASE) || "/api",
    libRealtime: [],
    libBookings: [],
    dashboardUpdatedAt: 0
  };

  const fallback = () => ({
    updatedAt: new Date().toISOString(),
    library: { slots: ["08:00-10:00", "10:30-12:30", "14:00-16:00", "16:30-18:30", "19:00-21:00"], floors: [] },
    express: { stations: [], packages: [] },
    shuttle: { routes: [] },
    quickServices: { grades: [], exams: [], classrooms: [], scholarships: [], lostFound: [] }
  });

  const rj = (k, d) => {
    try {
      const raw = localStorage.getItem(k);
      return raw ? JSON.parse(raw) : d;
    } catch {
      return d;
    }
  };
  const wj = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const clone = (v) => JSON.parse(JSON.stringify(v));
  const nf = (v, d) => (Number.isFinite(Number(v)) ? Number(v) : d);

  const getEvents = () => (Array.isArray(rj(K.ANALYTICS_EVENTS, [])) ? rj(K.ANALYTICS_EVENTS, []) : []);
  const setEvents = (v) => wj(K.ANALYTICS_EVENTS, v);

  function trackEvent(module, event, value) {
    const next = getEvents();
    next.push({ at: Date.now(), module, event, value: value || "" });
    while (next.length > 1200) next.shift();
    setEvents(next);
    if (dashboardKpis && document.getElementById("view-dashboard") && document.getElementById("view-dashboard").classList.contains("active")) {
      renderDashboard();
    }
  }

  function dayKey(ts) {
    const d = new Date(ts);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function getPerfMetrics() {
    const d = {
      traditional: { fcp: null, lcp: null, tbt: null, score: null },
      pwaFirst: { fcp: null, lcp: null, tbt: null, score: null },
      pwaRepeat: { fcp: null, lcp: null, tbt: null, score: null }
    };
    const raw = rj(K.PERF_METRICS, d);
    return { traditional: { ...d.traditional, ...(raw.traditional || {}) }, pwaFirst: { ...d.pwaFirst, ...(raw.pwaFirst || {}) }, pwaRepeat: { ...d.pwaRepeat, ...(raw.pwaRepeat || {}) } };
  }

  function setPerfMetrics(v) {
    wj(K.PERF_METRICS, v);
  }

  async function loadData() {
    try {
      const res = await fetch("./data/campus-services.json", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      wj(K.REMOTE, data);
      S.source = "network";
      return data;
    } catch {
      const cached = rj(K.REMOTE, null);
      if (cached) {
        S.source = "local-cache";
        return cached;
      }
      S.source = "fallback";
      return fallback();
    }
  }

  function switchView(viewName, opts) {
    const t = opts && opts.tabView ? opts.tabView : viewName;
    tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.view === t));
    views.forEach((v) => v.classList.toggle("active", v.id === `view-${viewName}`));
    trackEvent("nav", "switch_view", viewName);
    if (viewName === "dashboard") renderDashboard();
  }

  function switchAuthTab(name) {
    authTabs.forEach((t) => t.classList.toggle("active", t.dataset.authTab === name));
    authForms.forEach((f) => f.classList.toggle("active", f.id === `${name}-form`));
    authFeedback.textContent = "";
  }

  const getSession = () => rj(K.AUTH_SESSION, null);
  const setSession = (v) => (v ? wj(K.AUTH_SESSION, v) : localStorage.removeItem(K.AUTH_SESSION));
  const getUsers = () => rj(K.AUTH_USERS, []);
  const setUsers = (v) => wj(K.AUTH_USERS, v);

  function updateAuth(session) {
    if (session) {
      accountEntry.textContent = `账号：${session.username}`;
      authStatus.textContent = `当前状态：已登录（${session.username}）`;
      sessionUser.textContent = session.username;
      sessionTime.textContent = `登录时间：${new Date(session.loginAt).toLocaleString()}`;
      welcomeText.textContent = `欢迎回来，${session.username}，今日也要高效学习。`;
      logoutBtn.hidden = false;
      return;
    }
    accountEntry.textContent = "登录 / 注册";
    authStatus.textContent = "当前状态：未登录";
    sessionUser.textContent = "未登录";
    sessionTime.textContent = "登录后可同步你的个性化设置和待办事项。";
    welcomeText.textContent = "欢迎使用校园轻应用";
    logoutBtn.hidden = true;
  }

  function updateNetwork() {
    const online = navigator.onLine;
    networkStatus.textContent = online ? "在线" : "离线";
    networkStatus.classList.toggle("offline", !online);
  }

  function setMapZone(code, anim) {
    const z = MAP[code] || MAP.library;
    mapZoneLabel.textContent = `当前关注区域：${z.name}`;
    mapDetailTitle.textContent = z.name;
    mapDescription.textContent = z.description;
    mapOpenTime.textContent = z.open;
    mapCrowdLevel.textContent = z.crowd;
    mapServiceTag.textContent = z.service;
    mapRouteTip.textContent = z.route;
    zoneInteractive.forEach((el) => el.classList.toggle("active", el.dataset.zone === code));
    if (anim) {
      mapDetailPanel.classList.remove("zone-change");
      void mapDetailPanel.offsetWidth;
      mapDetailPanel.classList.add("zone-change");
    }
  }

  function applyPrefs(prefs, anim) {
    S.showSummary = !!prefs.showSummary;
    document.documentElement.dataset.theme = prefs.theme;
    $("pref-theme").value = prefs.theme;
    $("pref-map-zone").value = MAP[prefs.mapZone] ? prefs.mapZone : "library";
    $("pref-show-summary").checked = S.showSummary;
    setMapZone($("pref-map-zone").value, anim);
  }

  async function loadNews() {
    try {
      const local = await window.CampusDB.getAllNews();
      if (local.length) renderNews(local, "来源：IndexedDB 缓存");
    } catch {}
    try {
      const res = await fetch("./data/news.json", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const remote = await res.json();
      await window.CampusDB.saveNewsBatch(remote);
      renderNews(remote, "来源：网络实时数据");
      lastSync.textContent = `最近同步：${new Date().toLocaleString()} (${S.source})`;
    } catch {
      if (!newsList.querySelector(".news-title")) newsList.innerHTML = '<li class="news-item">离线状态下无本地缓存，无法加载新闻。</li>';
      newsSource.textContent = "来源：离线缓存/网络不可用";
    }
  }

  function renderNews(items, sourceText) {
    newsList.innerHTML = "";
    if (!items.length) {
      newsList.innerHTML = '<li class="news-item">暂无新闻数据</li>';
      newsSource.textContent = sourceText;
      return;
    }
    const frag = document.createDocumentFragment();
    items.forEach((it) => {
      const node = newsTemplate.content.firstElementChild.cloneNode(true);
      node.querySelector(".news-title").textContent = it.title;
      node.querySelector(".news-meta").textContent = `${it.category} | ${it.publishAt} | ${it.author}`;
      const s = node.querySelector(".news-summary");
      if (S.showSummary) s.textContent = it.summary; else s.remove();
      frag.appendChild(node);
    });
    newsList.appendChild(frag);
    newsSource.textContent = sourceText;
  }

  const getTodos = () => {
    const ex = rj(K.TODO, null);
    if (Array.isArray(ex)) return ex;
    const seed = [
      { id: "todo-1", text: "18:00 前完成数据库实验草稿", done: false },
      { id: "todo-2", text: "预约周四体育馆羽毛球场地", done: true }
    ];
    wj(K.TODO, seed);
    return seed;
  };
  const setTodos = (v) => wj(K.TODO, v);

  function addTodo(text) {
    const t = String(text || "").trim();
    if (!t) return;
    const list = getTodos();
    list.unshift({ id: `todo-${Date.now()}`, text: t, done: false });
    setTodos(list);
    renderTodos();
  }

  function renderTodos() {
    todoList.innerHTML = "";
    const list = getTodos();
    if (!list.length) {
      todoList.innerHTML = '<li class="todo-item"><span class="hint">暂无待办，今天状态不错。</span></li>';
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach((it) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.dataset.id = it.id;
      li.innerHTML = `<label class="todo-label"><input type="checkbox" ${it.done ? "checked" : ""}><span class="${it.done ? "done" : ""}">${it.text}</span></label><button class="todo-remove" type="button">删除</button>`;
      frag.appendChild(li);
    });
    todoList.appendChild(frag);
  }

  function bindTodo() {
    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      addTodo(todoInput.value);
      todoInput.value = "";
    });
    todoList.addEventListener("change", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLInputElement) || t.type !== "checkbox") return;
      const row = t.closest(".todo-item");
      if (!row) return;
      setTodos(getTodos().map((x) => (x.id === row.dataset.id ? { ...x, done: t.checked } : x)));
      renderTodos();
    });
    todoList.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLButtonElement) || !t.classList.contains("todo-remove")) return;
      const row = t.closest(".todo-item");
      if (!row) return;
      setTodos(getTodos().filter((x) => x.id !== row.dataset.id));
      renderTodos();
    });
  }

  const seatMap = { window: "靠窗", quiet: "安静区", socket: "带插座" };
  const getLocalLibBook = () => (Array.isArray(rj(K.LIB_BOOK, [])) ? rj(K.LIB_BOOK, []) : []);
  const setLocalLibBook = (v) => wj(K.LIB_BOOK, v);
  const floorById = (id) => (((S.data && S.data.library && S.data.library.floors) || []).find((f) => String(f.id) === String(id)));

  function libStatus(dateMode, slot, status) {
    if (status === "cancelled") return "已取消";
    if (status === "checked_in") return "已签到";
    if (dateMode === "tomorrow") return "待开始";
    const now = new Date();
    const [s, e] = slot.split("-");
    const [sh, sm] = s.split(":").map(Number);
    const [eh, em] = e.split(":").map(Number);
    const st = new Date(now); st.setHours(sh, sm, 0, 0);
    const et = new Date(now); et.setHours(eh, em, 0, 0);
    if (now < st) return "待开始";
    if (now <= et) return "进行中";
    return "已结束";
  }

  function syncLibraryModeForm() {
    if (!libraryDataMode || !libraryApiBase) return;
    libraryDataMode.value = S.libMode;
    libraryApiBase.value = S.libApiBase;
    libraryApiBase.disabled = S.libMode !== "api";
  }

  function setLibraryStatus(text, error) {
    if (!libraryApiStatus) return;
    libraryApiStatus.textContent = text;
    libraryApiStatus.style.color = error ? "var(--danger)" : "";
  }

  function normBooking(item) {
    const floor = floorById(item.floorId) || { name: item.floorName || `楼层 ${item.floorId || "-"}` };
    const seatType = String(item.seatType || "window");
    return {
      id: String(item.id || `lib-${Date.now()}`),
      floorId: String(item.floorId || ""),
      floorName: String(item.floorName || floor.name),
      slot: String(item.slot || S.libFilter.slot),
      dateMode: item.dateMode === "tomorrow" ? "tomorrow" : "today",
      seatType,
      seatTypeText: String(item.seatTypeText || seatMap[seatType] || seatType),
      status: String(item.status || "booked"),
      createdAt: Number(item.createdAt || Date.now())
    };
  }

  function mockRealtime(dateMode, slot) {
    const floors = (S.data && S.data.library && S.data.library.floors) || [];
    return floors.map((floor) => {
      const total = Math.max(1, Number(floor.total || 0));
      const occ = Number((floor.slotOccupancy || {})[slot] || 0.58);
      const est = Math.round(total * Math.min(0.95, Math.max(0.25, occ + (dateMode === "tomorrow" ? -0.04 : 0.02))));
      const booked = getLocalLibBook().filter((b) => String(b.floorId) === String(floor.id) && b.slot === slot && b.dateMode === dateMode && b.status !== "cancelled").length;
      const available = Math.max(0, total - est - booked);
      return { id: String(floor.id), name: floor.name, total, available, ratio: available / total };
    });
  }

  function normalizeRealtimePayload(payload, dateMode, slot) {
    const list = Array.isArray(payload) ? payload : Array.isArray(payload && payload.floors) ? payload.floors : [];
    return list.map((f) => {
      const base = floorById(f.id) || {};
      const total = Math.max(1, Number(f.total || base.total || 0));
      const available = Math.max(0, Math.min(total, Number(f.available)));
      return {
        id: String(f.id),
        name: String(f.name || base.name || `楼层 ${f.id}`),
        total,
        available: Number.isFinite(available) ? available : 0,
        ratio: total ? (Number.isFinite(available) ? available : 0) / total : 0,
        dateMode,
        slot
      };
    });
  }

  function libApiUrl(path) {
    const baseRaw = String(S.libApiBase || "/api").trim() || "/api";
    const base = baseRaw.replace(/\/+$/, "");
    const suffix = path.startsWith("/") ? path : `/${path}`;
    return `${base}${suffix}`;
  }

  async function libApiFetch(path, options) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 6000);
    const opts = options || {};
    try {
      const res = await fetch(libApiUrl(path), {
        ...opts,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(opts.body ? { "Content-Type": "application/json" } : {}),
          ...(opts.headers || {})
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (res.status === 204) return null;
      return res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  function syncLibraryFloorOptions() {
    const floors = S.libRealtime.length ? S.libRealtime : (S.data.library.floors || []);
    libraryFloorSelect.innerHTML = floors.map((f) => `<option value="${f.id}">${f.name}</option>`).join("");
    if (floors.length && !floors.some((f) => String(f.id) === String(libraryFloorSelect.value))) {
      libraryFloorSelect.value = String(floors[0].id);
    }
  }

  function initLibrarySelectors() {
    const slots = S.data.library.slots || [];
    librarySlotSelect.innerHTML = slots.map((s) => `<option value="${s}">${s}</option>`).join("");
    libraryFilterSlot.innerHTML = slots.map((s) => `<option value="${s}">${s}</option>`).join("");
    if (slots.length && !slots.includes(S.libFilter.slot)) S.libFilter.slot = slots[0];
    libraryFilterDate.value = S.libFilter.dateMode;
    libraryFilterSlot.value = S.libFilter.slot;
    librarySlotSelect.value = S.libFilter.slot;
    libraryBookingDate.value = S.libFilter.dateMode;
    syncLibraryFloorOptions();
    syncLibraryModeForm();
  }

  function renderLibrary() {
    const floors = S.libRealtime;
    const dm = S.libFilter.dateMode;
    const slot = S.libFilter.slot;
    libraryFloorList.innerHTML = "";
    if (!floors.length) {
      libraryFloorList.innerHTML = '<li class="resource-item"><span class="hint">暂无图书馆数据</span></li>';
      return;
    }
    let totalAvail = 0;
    let total = 0;
    const frag = document.createDocumentFragment();
    floors.forEach((f) => {
      const floorTotal = Math.max(1, Number(f.total || 0));
      const floorAvail = Math.max(0, Math.min(floorTotal, Number(f.available || 0)));
      totalAvail += floorAvail;
      total += floorTotal;
      const li = document.createElement("li");
      li.className = "resource-item";
      li.innerHTML = `<strong>${f.name}</strong><span class="resource-meta">当前时段可预约 ${floorAvail} / ${floorTotal}</span><div class="capacity-bar"><span style="width:${Math.round((floorAvail / floorTotal) * 100)}%"></span></div>`;
      frag.appendChild(li);
    });
    libraryFloorList.appendChild(frag);
    const occ = total ? (((total - totalAvail) / total) * 100).toFixed(1) : "0";
    librarySummary.innerHTML = `<article class="stat-box"><span class="hint">查询时段</span><strong>${dm === "today" ? "今天" : "明天"} ${slot}</strong></article><article class="stat-box"><span class="hint">总可预约座位</span><strong>${totalAvail} 个</strong></article><article class="stat-box"><span class="hint">整体占用率</span><strong>${occ}%</strong></article>`;
  }

  function renderLibraryBookings() {
    const list = S.libBookings;
    libraryBookingList.innerHTML = "";
    if (!list.length) {
      libraryBookingList.innerHTML = '<li class="resource-item"><span class="hint">暂无预约记录</span></li>';
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach((b) => {
      const st = libStatus(b.dateMode, b.slot, b.status);
      const li = document.createElement("li");
      li.className = "resource-item";
      li.dataset.bookingId = b.id;
      li.innerHTML = `<strong>${b.floorName} | ${b.slot}</strong><span class="resource-meta">日期：${b.dateMode === "today" ? "今天" : "明天"} | 偏好：${b.seatTypeText}</span><span class="resource-pill">状态：${st}</span><div class="resource-actions">${st === "待开始" ? '<button class="btn secondary checkin-booking-btn" type="button">提前签到</button>' : ""}${st === "待开始" || st === "进行中" ? '<button class="btn secondary cancel-booking-btn" type="button">取消预约</button>' : ""}</div>`;
      frag.appendChild(li);
    });
    libraryBookingList.appendChild(frag);
  }

  async function refreshLibraryRealtime() {
    if (S.libMode === "api") {
      try {
        const qs = new URLSearchParams({ dateMode: S.libFilter.dateMode, slot: S.libFilter.slot });
        const payload = await libApiFetch(`/library/realtime?${qs.toString()}`);
        S.libRealtime = normalizeRealtimePayload(payload, S.libFilter.dateMode, S.libFilter.slot);
        if (!S.libRealtime.length) throw new Error("空响应");
        setLibraryStatus(`当前模式：REST API（${S.libApiBase}）`, false);
      } catch {
        S.libRealtime = mockRealtime(S.libFilter.dateMode, S.libFilter.slot);
        setLibraryStatus(`API 不可用，已降级到模拟数据（${S.libApiBase}）`, true);
      }
    } else {
      S.libRealtime = mockRealtime(S.libFilter.dateMode, S.libFilter.slot);
      setLibraryStatus("当前模式：模拟数据（本地离线可用）", false);
    }
    syncLibraryFloorOptions();
    renderLibrary();
  }

  async function refreshLibraryBookings() {
    if (S.libMode === "api") {
      try {
        const payload = await libApiFetch("/library/bookings");
        const rows = Array.isArray(payload) ? payload : Array.isArray(payload && payload.items) ? payload.items : [];
        S.libBookings = rows.map(normBooking).sort((a, b) => b.createdAt - a.createdAt);
        setLocalLibBook(S.libBookings);
      } catch {
        S.libBookings = getLocalLibBook().map(normBooking);
        libraryTip.textContent = "API 预约记录读取失败，已回退到本地记录。";
      }
    } else {
      S.libBookings = getLocalLibBook().map(normBooking);
    }
    renderLibraryBookings();
  }

  async function refreshLibraryAll() {
    await refreshLibraryRealtime();
    await refreshLibraryBookings();
    updateHomeCards();
  }

  async function createBooking(payload) {
    if (S.libMode === "api") {
      try {
        const created = await libApiFetch("/library/bookings", { method: "POST", body: JSON.stringify(payload) });
        if (created) {
          const normalized = normBooking(created);
          S.libBookings = [normalized, ...S.libBookings.filter((x) => x.id !== normalized.id)];
          setLocalLibBook(S.libBookings);
        }
        libraryTip.textContent = "API 预约成功。";
        trackEvent("library", "booking_success", "api");
        return true;
      } catch {
        const fallbackBooking = normBooking({ ...payload, id: `lib-local-${Date.now()}`, status: "booked", createdAt: Date.now() });
        S.libBookings.unshift(fallbackBooking);
        setLocalLibBook(S.libBookings);
        libraryTip.textContent = "API 不可用，已降级为本地模拟预约。";
        trackEvent("library", "booking_success", "fallback_local");
        return true;
      }
    }
    const local = normBooking({ ...payload, id: `lib-${Date.now()}`, status: "booked", createdAt: Date.now() });
    S.libBookings.unshift(local);
    setLocalLibBook(S.libBookings);
    libraryTip.textContent = "预约成功，已写入我的预约。";
    trackEvent("library", "booking_success", "mock");
    return true;
  }

  async function updateBookingStatus(id, status) {
    if (S.libMode === "api") {
      try {
        await libApiFetch(`/library/bookings/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }) });
      } catch {}
    }
    S.libBookings = S.libBookings.map((x) => (x.id === id ? { ...x, status } : x));
    setLocalLibBook(S.libBookings);
  }

  function bindLibrary() {
    libraryFilterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(libraryFilterForm);
      S.libFilter.dateMode = String(fd.get("dateMode"));
      S.libFilter.slot = String(fd.get("slot"));
      trackEvent("library", "filter_realtime", `${S.libFilter.dateMode}|${S.libFilter.slot}`);
      refreshLibraryAll();
    });
    if (libraryModeForm) {
      libraryModeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(libraryModeForm);
        S.libMode = String(fd.get("mode")) === "api" ? "api" : "mock";
        S.libApiBase = String(fd.get("apiBase") || "/api").trim() || "/api";
        localStorage.setItem(K.LIB_MODE, S.libMode);
        localStorage.setItem(K.LIB_API_BASE, S.libApiBase);
        trackEvent("library", "switch_mode", S.libMode);
        syncLibraryModeForm();
        refreshLibraryAll();
      });
      if (libraryDataMode) {
        libraryDataMode.addEventListener("change", () => {
          S.libMode = libraryDataMode.value === "api" ? "api" : "mock";
          syncLibraryModeForm();
        });
      }
    }
    libraryBookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(libraryBookingForm);
      const floorId = String(fd.get("floorId"));
      const slot = String(fd.get("slot"));
      const dateMode = String(fd.get("dateMode"));
      const seatType = String(fd.get("seatType"));
      const liveFloors = S.libMode === "mock" ? mockRealtime(dateMode, slot) : (S.libRealtime || []);
      const floor = liveFloors.find((f) => String(f.id) === floorId) || floorById(floorId);
      if (!floor) { libraryTip.textContent = "楼层数据异常，请重试。"; return; }
      if (S.libMode !== "api" && Number(floor.available || 0) <= 0) { libraryTip.textContent = "该楼层该时段暂无可预约座位。"; return; }
      const dup = S.libBookings.some((x) => x.floorId === floorId && x.slot === slot && x.dateMode === dateMode && x.status !== "cancelled");
      if (dup) { libraryTip.textContent = "该时段已有预约，请勿重复预约。"; return; }
      trackEvent("library", "submit_booking", `${floorId}|${slot}|${dateMode}`);
      createBooking({
        floorId,
        floorName: floor.name,
        slot,
        dateMode,
        seatType,
        seatTypeText: seatMap[seatType] || seatType
      }).then(() => refreshLibraryAll());
    });
    libraryBookingList.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLButtonElement)) return;
      const row = t.closest(".resource-item");
      if (!row) return;
      const id = row.dataset.bookingId;
      if (t.classList.contains("cancel-booking-btn")) {
        libraryTip.textContent = "预约已取消。";
        trackEvent("library", "cancel_booking", id);
        updateBookingStatus(id, "cancelled").then(() => refreshLibraryAll());
      }
      if (t.classList.contains("checkin-booking-btn")) {
        libraryTip.textContent = "签到成功，祝学习顺利。";
        trackEvent("library", "checkin_booking", id);
        updateBookingStatus(id, "checked_in").then(() => refreshLibraryAll());
      }
    });
  }

  const stationName = (id) => ((S.data.express.stations || []).find((s) => s.id === id) || { name: id }).name;
  const getPkgs = () => {
    const ex = rj(K.EXP_PKGS, null);
    if (Array.isArray(ex)) return ex;
    const seed = clone(S.data.express.packages || []);
    wj(K.EXP_PKGS, seed);
    return seed;
  };
  const setPkgs = (v) => wj(K.EXP_PKGS, v);

  function leftText(deadline) {
    const h = Math.floor((new Date(deadline).getTime() - Date.now()) / 3600000);
    if (h < 0) return "已超时";
    if (h < 24) return `剩余 ${h} 小时`;
    return `剩余 ${Math.floor(h / 24)} 天`;
  }

  function renderExpress() {
    const list = getPkgs();
    const c = {
      total: list.length,
      pending: list.filter((x) => x.status === "pending").length,
      in_transit: list.filter((x) => x.status === "in_transit").length,
      received: list.filter((x) => x.status === "received").length
    };
    expressStats.innerHTML = `<article class="stat-box"><span class="hint">包裹总数</span><strong>${c.total} 件</strong></article><article class="stat-box"><span class="hint">待领取</span><strong>${c.pending} 件</strong></article><article class="stat-box"><span class="hint">运输中</span><strong>${c.in_transit} 件</strong></article><article class="stat-box"><span class="hint">已领取</span><strong>${c.received} 件</strong></article>`;
    const options = list.filter((x) => x.status !== "received");
    expressAppointmentPackage.innerHTML = options.map((x) => `<option value="${x.id}">${x.company} | ${stationName(x.stationId)}</option>`).join("") || '<option value="">暂无可预约包裹</option>';

    const filtered = list.filter((x) => (S.expressFilter === "all" ? true : x.status === S.expressFilter));
    const m = { pending: "待领取", in_transit: "运输中", received: "已领取" };
    expressList.innerHTML = filtered.length
      ? filtered.map((x) => `<li class="resource-item" data-package-id="${x.id}"><strong>${x.company} (${x.size || "-"})</strong><span class="resource-meta">取件点：${stationName(x.stationId)} | ${x.appointmentTime ? `预约取件：${new Date(x.appointmentTime).toLocaleString()}` : "尚未预约取件"}</span><span class="resource-meta">截止时间：${new Date(x.deadline).toLocaleString()} | ${leftText(x.deadline)}</span><div class="resource-actions"><span class="resource-pill">状态：${m[x.status] || x.status}</span><button class="btn secondary show-code-btn" type="button">查看取件码</button>${x.status === "pending" ? '<button class="btn receive-package-btn" type="button">标记已领取</button>' : ""}${x.status === "in_transit" ? '<button class="btn secondary mark-pending-btn" type="button">更新为待领取</button>' : ""}</div></li>`).join("")
      : '<li class="resource-item"><span class="hint">当前筛选条件下没有包裹。</span></li>';
  }

  function bindExpress() {
    expressFilterRow.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLButtonElement) || !t.dataset.expressFilter) return;
      S.expressFilter = t.dataset.expressFilter;
      trackEvent("express", "switch_filter", S.expressFilter);
      expressFilterButtons.forEach((b) => b.classList.toggle("active", b.dataset.expressFilter === S.expressFilter));
      renderExpress();
    });
    expressAppointmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(expressAppointmentForm);
      const id = String(fd.get("packageId") || "");
      const time = String(fd.get("appointmentTime") || "");
      if (!id || !time) { expressTip.textContent = "请选择包裹并填写预约时间。"; return; }
      setPkgs(getPkgs().map((x) => (x.id === id ? { ...x, appointmentTime: time } : x)));
      expressTip.textContent = "预约取件时间已保存。";
      trackEvent("express", "save_appointment", id);
      renderExpress();
    });
    expressList.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLButtonElement)) return;
      const row = t.closest(".resource-item");
      if (!row) return;
      const id = row.dataset.packageId;
      const list = getPkgs();
      const cur = list.find((x) => x.id === id);
      if (!cur) return;
      if (t.classList.contains("show-code-btn")) { expressTip.textContent = `取件码：${cur.pickupCode}（${cur.company}）`; trackEvent("express", "show_pickup_code", id); return; }
      if (t.classList.contains("receive-package-btn")) { setPkgs(list.map((x) => (x.id === id ? { ...x, status: "received" } : x))); expressTip.textContent = "状态更新成功：已标记为领取完成。"; trackEvent("express", "mark_received", id); }
      if (t.classList.contains("mark-pending-btn")) { setPkgs(list.map((x) => (x.id === id ? { ...x, status: "pending" } : x))); expressTip.textContent = "包裹已更新为待领取状态。"; trackEvent("express", "mark_pending", id); }
      renderExpress();
      updateHomeCards();
    });
  }

  const getFavRoute = () => localStorage.getItem(K.SHUTTLE_FAV) || "";
  const setFavRoute = (id) => (id ? localStorage.setItem(K.SHUTTLE_FAV, id) : localStorage.removeItem(K.SHUTTLE_FAV));

  function initRoutes() { S.routes = clone(S.data.shuttle.routes || []); }

  function allStops() {
    const s = new Set();
    S.routes.forEach((r) => (r.stops || []).forEach((x) => s.add(x.name)));
    return Array.from(s);
  }

  function initShuttleSelects() {
    const stops = allStops();
    shuttleFrom.innerHTML = stops.map((x) => `<option value="${x}">${x}</option>`).join("");
    shuttleTo.innerHTML = stops.map((x) => `<option value="${x}">${x}</option>`).join("");
    if (stops.length > 1) { shuttleFrom.value = stops[0]; shuttleTo.value = stops[1]; }
  }

  function planRoute(from, to) {
    if (!from || !to) return "请选择起点和终点。";
    if (from === to) return "起点和终点相同，建议步行。";
    const direct = S.routes.filter((r) => {
      const names = (r.stops || []).map((x) => x.name);
      return names.includes(from) && names.includes(to);
    });
    if (direct.length) {
      const best = direct.map((r) => {
        const fs = r.stops.find((x) => x.name === from);
        const ts = r.stops.find((x) => x.name === to);
        return { r, d: Math.abs((ts ? ts.eta : 0) - (fs ? fs.eta : 0)) + 3 };
      }).sort((a, b) => a.d - b.d)[0];
      return `推荐 ${best.r.line} 直达，预计 ${best.d} 分钟。`;
    }
    const hub = "图书馆";
    const r1 = S.routes.find((r) => r.stops.some((x) => x.name === from) && r.stops.some((x) => x.name === hub));
    const r2 = S.routes.find((r) => r.stops.some((x) => x.name === hub) && r.stops.some((x) => x.name === to));
    if (r1 && r2) return `推荐 ${r1.line} 换乘 ${r2.line}（换乘点：${hub}），预计 20-28 分钟。`;
    return "暂无直达线路，建议步行至图书馆或南门站再中转。";
  }

  function renderShuttle() {
    if (!S.routes.length) {
      shuttleList.innerHTML = '<li class="resource-item"><span class="hint">暂无校车线路数据。</span></li>';
      return;
    }
    const fav = getFavRoute();
    const txt = { low: "路况通畅", medium: "路况一般", high: "路况拥堵" };
    shuttleList.innerHTML = S.routes.map((r) => `<li class="resource-item" data-route-id="${r.id}"><strong>${r.line}（发车间隔 ${r.intervalMin} 分钟）</strong><span class="resource-meta">${txt[r.traffic] || "路况未知"} | 最近一班约 ${(r.stops && r.stops[0] ? r.stops[0].eta : "-")} 分钟到站</span><div class="route-stops">${(r.stops || []).map((s) => `<span class="stop-pill">${s.name} ${s.eta}m</span>`).join("")}</div><div class="resource-actions"><span class="resource-pill">${fav === r.id ? "已收藏" : "可收藏"}</span><button class="btn secondary favorite-route-btn" type="button">${fav === r.id ? "取消收藏" : "收藏线路"}</button></div></li>`).join("");
  }

  function tickRoutes() {
    S.routes = S.routes.map((r) => ({
      ...r,
      stops: (r.stops || []).map((s) => ({ ...s, eta: s.eta <= 1 ? r.intervalMin + Math.floor(Math.random() * 4) : s.eta - 1 }))
    }));
    renderShuttle();
    updateHomeCards();
    shuttleTip.textContent = `每 20 秒自动刷新站点 ETA，最近刷新：${new Date().toLocaleTimeString()}`;
  }

  function ensureRouteTimer() {
    if (S.routeTimer) return;
    S.routeTimer = window.setInterval(tickRoutes, 20000);
  }

  function bindShuttle() {
    shuttlePlannerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(shuttlePlannerForm);
      const from = String(fd.get("from") || "");
      const to = String(fd.get("to") || "");
      shuttlePlanResult.textContent = planRoute(from, to);
      trackEvent("shuttle", "plan_route", `${from}->${to}`);
    });
    shuttleList.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLButtonElement) || !t.classList.contains("favorite-route-btn")) return;
      const row = t.closest(".resource-item");
      if (!row) return;
      const id = row.dataset.routeId;
      if (id === getFavRoute()) { setFavRoute(""); shuttleTip.textContent = "已取消收藏线路。"; }
      else { setFavRoute(id); const r = S.routes.find((x) => x.id === id); shuttleTip.textContent = r ? `已收藏 ${r.line}。` : "收藏已更新。"; }
      trackEvent("shuttle", "favorite_route", id || "");
      renderShuttle();
      updateHomeCards();
    });
  }

  const pt = (score) => (score >= 90 ? 4 : score >= 85 ? 3.7 : score >= 82 ? 3.3 : score >= 78 ? 3 : score >= 75 ? 2.7 : score >= 72 ? 2.3 : score >= 68 ? 2 : score >= 64 ? 1.5 : score >= 60 ? 1 : 0);
  const gpa = (courses) => {
    if (!courses.length) return "0.00";
    let c = 0, p = 0;
    courses.forEach((x) => { c += Number(x.credit || 0); p += pt(Number(x.score || 0)) * Number(x.credit || 0); });
    return c ? (p / c).toFixed(2) : "0.00";
  };
  const dayLeft = (d) => {
    const t = new Date(`${d}T00:00:00`).getTime();
    const n = new Date();
    const s = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
    return Math.ceil((t - s) / 86400000);
  };
  const getFollow = () => new Set(Array.isArray(rj(K.SCH_FOLLOW, [])) ? rj(K.SCH_FOLLOW, []) : []);
  const setFollow = (s) => wj(K.SCH_FOLLOW, Array.from(s));
  const getLostCustom = () => (Array.isArray(rj(K.LOST_CUSTOM, [])) ? rj(K.LOST_CUSTOM, []) : []);
  const setLostCustom = (v) => wj(K.LOST_CUSTOM, v);
  const getLostStatus = () => rj(K.LOST_STATUS, {});
  const setLostStatus = (v) => wj(K.LOST_STATUS, v);

  function quickHtml() {
    const q = S.data.quickServices || {};
    if (S.quick === "grades") {
      const gs = q.grades || [];
      if (!S.gradeSemester && gs.length) S.gradeSemester = gs[0].semester;
      const cur = gs.find((x) => x.semester === S.gradeSemester) || gs[0] || { semester: "", courses: [] };
      return `<form class="service-mini-form"><label>学期<select id="quick-grade-semester">${gs.map((x) => `<option value="${x.semester}" ${x.semester === cur.semester ? "selected" : ""}>${x.semester}</option>`).join("")}</select></label><div class="resource-meta">当前学期估算 GPA：<strong>${gpa(cur.courses || [])}</strong></div></form><table class="data-table"><thead><tr><th>课程</th><th>学分</th><th>成绩</th><th>绩点</th></tr></thead><tbody>${(cur.courses || []).map((x) => `<tr><td>${x.name}</td><td>${x.credit}</td><td>${x.score}</td><td>${pt(x.score).toFixed(1)}</td></tr>`).join("")}</tbody></table>`;
    }
    if (S.quick === "exams") {
      const ex = (q.exams || []).map((x) => ({ ...x, dl: dayLeft(x.date) })).filter((x) => x.dl >= 0 && x.dl <= Number(S.examWindow || "30")).sort((a, b) => a.dl - b.dl);
      return `<form class="service-mini-form"><label>时间窗口<select id="quick-exam-window"><option value="7" ${S.examWindow === "7" ? "selected" : ""}>7 天内</option><option value="14" ${S.examWindow === "14" ? "selected" : ""}>14 天内</option><option value="30" ${S.examWindow === "30" ? "selected" : ""}>30 天内</option></select></label><div class="resource-meta">当前共 ${ex.length} 场考试</div></form><ul class="resource-list">${ex.map((x) => `<li class="resource-item"><strong>${x.course}</strong><span class="resource-meta">${x.date} ${x.time} | ${x.location} 座位 ${x.seat}</span><div class="resource-actions"><span class="resource-pill">倒计时 ${x.dl} 天</span><button class="btn secondary add-exam-todo-btn" type="button" data-exam-name="${x.course}" data-exam-date="${x.date}">加入待办</button></div></li>`).join("")}</ul>`;
    }
    if (S.quick === "classroom") {
      const rooms = q.classrooms || [];
      const bds = Array.from(new Set(rooms.map((x) => x.building)));
      const slots = S.data.library.slots || [];
      if (!S.classroomBuilding && bds.length) S.classroomBuilding = bds[0];
      if (!S.classroomSlot && slots.length) S.classroomSlot = slots[0];
      const rs = rooms.filter((x) => x.building === S.classroomBuilding && !(x.busySlots || []).includes(S.classroomSlot));
      return `<form class="service-mini-form"><label>教学楼<select id="quick-classroom-building">${bds.map((x) => `<option value="${x}" ${x === S.classroomBuilding ? "selected" : ""}>${x} 楼</option>`).join("")}</select></label><label>时段<select id="quick-classroom-slot">${slots.map((x) => `<option value="${x}" ${x === S.classroomSlot ? "selected" : ""}>${x}</option>`).join("")}</select></label><div class="resource-meta">可用教室 ${rs.length} 间</div></form><ul class="resource-list">${rs.map((x) => `<li class="resource-item"><strong>${x.room}</strong><span class="resource-meta">容量 ${x.capacity} 人</span></li>`).join("") || '<li class="resource-item"><span class="hint">当前条件下无空教室</span></li>'}</ul>`;
    }
    if (S.quick === "scholarship") {
      const list = q.scholarships || [];
      const follow = getFollow();
      return `<ul class="resource-list">${list.map((x) => `<li class="resource-item"><strong>${x.name}</strong><span class="resource-meta">截止日期：${x.deadline}（剩余 ${dayLeft(x.deadline)} 天）</span><span class="resource-meta">要求：${x.requirement}</span><div class="resource-actions"><button class="btn secondary follow-scholarship-btn" type="button" data-scholarship-id="${x.id}">${follow.has(x.id) ? "取消关注" : "关注通知"}</button></div></li>`).join("")}</ul>`;
    }
    if (S.quick === "bus") {
      const fav = getFavRoute();
      const r = S.routes.find((x) => x.id === fav) || S.routes[0];
      const msg = r ? `${r.line}：最近一班约 ${(r.stops && r.stops[0] ? r.stops[0].eta : "-")} 分钟到站` : "暂无校车数据";
      return `<article class="resource-item"><strong>${msg}</strong><span class="resource-meta">可进入校车中心查看各站点实时 ETA，并生成路线建议。</span><div class="resource-actions"><button class="btn secondary jump-shuttle-btn" type="button">前往校车中心</button></div></article>`;
    }
    const base = q.lostFound || [];
    const custom = getLostCustom();
    const st = getLostStatus();
    const all = [...base, ...custom].map((x) => ({ ...x, status: st[x.id] || x.status || "open" }));
    return `<form id="lostfound-form" class="service-mini-form"><label>类型<select name="type"><option value="lost">丢失</option><option value="found">拾到</option></select></label><label>物品<input name="title" type="text" maxlength="30" required></label><label>地点<input name="location" type="text" maxlength="30" required></label><label>联系方式<input name="contact" type="text" maxlength="30" required></label><button class="btn secondary" type="submit">发布信息</button></form><ul class="resource-list">${all.map((x) => `<li class="resource-item"><strong>[${x.type === "lost" ? "丢失" : "拾到"}] ${x.title}</strong><span class="resource-meta">${x.location} | ${x.time}</span><span class="resource-meta">${x.contact}</span><div class="resource-actions"><span class="resource-pill">状态：${x.status === "open" ? "进行中" : "已完成"}</span><button class="btn secondary toggle-lostfound-btn" type="button" data-lostfound-id="${x.id}">${x.status === "open" ? "标记完成" : "恢复进行中"}</button></div></li>`).join("")}</ul>`;
  }

  function renderQuick() {
    quickButtons.forEach((b) => b.classList.toggle("active", b.dataset.quickService === S.quick));
    const m = QUICK_META[S.quick] || ["常用服务", ""];
    quickTitle.textContent = m[0];
    quickHint.textContent = m[1];
    quickPanel.innerHTML = quickHtml();
  }

  function bindQuick() {
    quickButtons.forEach((b) => b.addEventListener("click", () => { S.quick = b.dataset.quickService; trackEvent(String(S.quick), "open_quick_service", "tab"); renderQuick(); }));
    quickPanel.addEventListener("change", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t.id === "quick-grade-semester") S.gradeSemester = t.value;
      if (t.id === "quick-exam-window") S.examWindow = t.value;
      if (t.id === "quick-classroom-building") S.classroomBuilding = t.value;
      if (t.id === "quick-classroom-slot") S.classroomSlot = t.value;
      renderQuick();
    });
    quickPanel.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLButtonElement)) return;
      if (t.classList.contains("add-exam-todo-btn")) { trackEvent("exams", "add_todo", String(t.dataset.examName || "")); addTodo(`准备考试：${t.dataset.examName} (${t.dataset.examDate})`); return; }
      if (t.classList.contains("follow-scholarship-btn")) {
        const id = t.dataset.scholarshipId;
        const set = getFollow();
        if (set.has(id)) set.delete(id); else set.add(id);
        setFollow(set);
        renderQuick();
        return;
      }
      if (t.classList.contains("jump-shuttle-btn")) { trackEvent("bus", "jump_shuttle", "from_quick"); switchView("shuttle", { tabView: "home" }); return; }
      if (t.classList.contains("toggle-lostfound-btn")) {
        const id = t.dataset.lostfoundId;
        const map = getLostStatus();
        map[id] = map[id] === "done" ? "open" : "done";
      setLostStatus(map);
      trackEvent("lostfound", "toggle_status", id);
      renderQuick();
      }
    });
    quickPanel.addEventListener("submit", (e) => {
      const f = e.target;
      if (!(f instanceof HTMLFormElement) || f.id !== "lostfound-form") return;
      e.preventDefault();
      const fd = new FormData(f);
      const title = String(fd.get("title") || "").trim();
      const location = String(fd.get("location") || "").trim();
      const contact = String(fd.get("contact") || "").trim();
      if (!title || !location || !contact) return;
      const list = getLostCustom();
      list.unshift({ id: `lf-custom-${Date.now()}`, type: String(fd.get("type") || "lost"), title, location, contact, time: new Date().toLocaleString(), status: "open" });
      setLostCustom(list);
      trackEvent("lostfound", "publish", title);
      f.reset();
      renderQuick();
    });
  }

  function renderBarRows(target, rows) {
    if (!target) return;
    if (!rows.length) {
      target.innerHTML = '<li class="resource-item"><span class="hint">暂无数据</span></li>';
      return;
    }
    const max = Math.max(1, ...rows.map((x) => x.value));
    target.innerHTML = rows.map((x) => `<li class="bar-row"><span>${x.label}</span><span class="bar-track"><span style="width:${Math.round((x.value / max) * 100)}%"></span></span><span class="bar-value">${x.value}</span></li>`).join("");
  }

  function setPerfFormValues(metrics) {
    if (!perfMetricsForm) return;
    const write = (name, value) => {
      const el = perfMetricsForm.elements.namedItem(name);
      if (el && "value" in el) el.value = value ?? "";
    };
    write("traditionalFcp", metrics.traditional.fcp);
    write("traditionalLcp", metrics.traditional.lcp);
    write("traditionalTbt", metrics.traditional.tbt);
    write("traditionalScore", metrics.traditional.score);
    write("pwaFirstFcp", metrics.pwaFirst.fcp);
    write("pwaFirstLcp", metrics.pwaFirst.lcp);
    write("pwaFirstTbt", metrics.pwaFirst.tbt);
    write("pwaFirstScore", metrics.pwaFirst.score);
    write("pwaRepeatFcp", metrics.pwaRepeat.fcp);
    write("pwaRepeatLcp", metrics.pwaRepeat.lcp);
    write("pwaRepeatTbt", metrics.pwaRepeat.tbt);
    write("pwaRepeatScore", metrics.pwaRepeat.score);
  }

  function renderPerfView(metrics) {
    if (!perfCompareBars || !perfCompareTable) return;
    const groups = [
      { key: "fcp", title: "FCP (s)", unit: "s", betterLower: true },
      { key: "lcp", title: "LCP (s)", unit: "s", betterLower: true },
      { key: "tbt", title: "TBT (ms)", unit: "ms", betterLower: true },
      { key: "score", title: "PWA Score", unit: "", betterLower: false }
    ];
    const rows = groups.map((g) => {
      const t = nf(metrics.traditional[g.key], 0);
      const f = nf(metrics.pwaFirst[g.key], 0);
      const r = nf(metrics.pwaRepeat[g.key], 0);
      const base = Math.max(1, t, f, r);
      return {
        ...g,
        t, f, r,
        tPct: Math.round((t / base) * 100),
        fPct: Math.round((f / base) * 100),
        rPct: Math.round((r / base) * 100),
        improve: g.betterLower ? (t > 0 ? (((t - r) / t) * 100) : 0) : (t > 0 ? (((r - t) / t) * 100) : 0)
      };
    });

    perfCompareBars.innerHTML = rows.map((x) => `<article class="compare-row"><strong>${x.title}</strong><div class="compare-bars"><div class="bar-row"><span>传统页</span><span class="bar-track"><span style="width:${x.tPct}%"></span></span><span class="bar-value">${x.t}${x.unit}</span></div><div class="bar-row"><span>PWA首访</span><span class="bar-track"><span style="width:${x.fPct}%"></span></span><span class="bar-value">${x.f}${x.unit}</span></div><div class="bar-row"><span>PWA复访</span><span class="bar-track"><span style="width:${x.rPct}%"></span></span><span class="bar-value">${x.r}${x.unit}</span></div></div></article>`).join("");

    perfCompareTable.innerHTML = `<table class="data-table"><thead><tr><th>指标</th><th>传统页</th><th>PWA首访</th><th>PWA复访</th><th>相对传统改进</th></tr></thead><tbody>${rows.map((x) => `<tr><td>${x.title}</td><td>${x.t}${x.unit}</td><td>${x.f}${x.unit}</td><td>${x.r}${x.unit}</td><td>${x.improve.toFixed(1)}%</td></tr>`).join("")}</tbody></table>`;
  }

  function renderDashboard() {
    if (!dashboardKpis || !dashboardUsageBars || !dashboardDailyBars) return;
    const now = Date.now();
    const last7 = now - (7 * 24 * 3600 * 1000);
    const all = getEvents();
    const recent = all.filter((x) => Number(x.at || 0) >= last7);
    const byModule = { library: 0, express: 0, shuttle: 0, grades: 0, exams: 0, classroom: 0, scholarship: 0, lostfound: 0, nav: 0 };
    recent.forEach((x) => { byModule[x.module] = (byModule[x.module] || 0) + 1; });
    const usageRows = [
      { label: "图书馆", value: byModule.library || 0 },
      { label: "快递中心", value: byModule.express || 0 },
      { label: "校车中心", value: byModule.shuttle || 0 },
      { label: "成绩查询", value: byModule.grades || 0 },
      { label: "考试安排", value: byModule.exams || 0 },
      { label: "空教室", value: byModule.classroom || 0 },
      { label: "奖学金", value: byModule.scholarship || 0 },
      { label: "失物招领", value: byModule.lostfound || 0 }
    ];
    const dayRows = [];
    const dayMap = {};
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date(now - i * 24 * 3600 * 1000);
      const k = dayKey(d.getTime());
      dayMap[k] = 0;
    }
    recent.forEach((x) => {
      const k = dayKey(x.at);
      if (Object.prototype.hasOwnProperty.call(dayMap, k)) dayMap[k] += 1;
    });
    Object.keys(dayMap).forEach((k) => dayRows.push({ label: k.slice(5), value: dayMap[k] }));

    const activeModuleCount = usageRows.filter((x) => x.value > 0).length;
    dashboardKpis.innerHTML = `<article class="stat-box"><span class="hint">近 7 天事件数</span><strong>${recent.length}</strong></article><article class="stat-box"><span class="hint">活跃模块数</span><strong>${activeModuleCount}</strong></article><article class="stat-box"><span class="hint">图书馆数据模式</span><strong>${S.libMode === "api" ? "REST API" : "模拟数据"}</strong></article><article class="stat-box"><span class="hint">最近数据源</span><strong>${S.source || "local"}</strong></article>`;
    renderBarRows(dashboardUsageBars, usageRows);
    renderBarRows(dashboardDailyBars, dayRows);
    const metrics = getPerfMetrics();
    setPerfFormValues(metrics);
    renderPerfView(metrics);
    dashboardLastUpdate.textContent = `最近更新：${new Date().toLocaleString()}`;
    S.dashboardUpdatedAt = Date.now();
  }

  function bindDashboard() {
    if (!perfMetricsForm) return;
    perfMetricsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(perfMetricsForm);
      const m = {
        traditional: { fcp: nf(fd.get("traditionalFcp"), 0), lcp: nf(fd.get("traditionalLcp"), 0), tbt: nf(fd.get("traditionalTbt"), 0), score: nf(fd.get("traditionalScore"), 0) },
        pwaFirst: { fcp: nf(fd.get("pwaFirstFcp"), 0), lcp: nf(fd.get("pwaFirstLcp"), 0), tbt: nf(fd.get("pwaFirstTbt"), 0), score: nf(fd.get("pwaFirstScore"), 0) },
        pwaRepeat: { fcp: nf(fd.get("pwaRepeatFcp"), 0), lcp: nf(fd.get("pwaRepeatLcp"), 0), tbt: nf(fd.get("pwaRepeatTbt"), 0), score: nf(fd.get("pwaRepeatScore"), 0) }
      };
      setPerfMetrics(m);
      perfFormTip.textContent = `性能对比数据已保存（${new Date().toLocaleTimeString()}）`;
      trackEvent("dashboard", "save_perf_metrics", "manual");
      renderDashboard();
    });
    const fillSample = () => {
      const sample = {
        traditional: { fcp: 2.8, lcp: 4.5, tbt: 420, score: 58 },
        pwaFirst: { fcp: 2.2, lcp: 3.7, tbt: 280, score: 82 },
        pwaRepeat: { fcp: 1.1, lcp: 1.8, tbt: 90, score: 95 }
      };
      setPerfMetrics(sample);
      setPerfFormValues(sample);
      if (perfFormTip) perfFormTip.textContent = "已填充示例数据，可直接用于演示对比图。";
      trackEvent("dashboard", "fill_sample_metrics", "sample");
      renderDashboard();
    };
    if (perfFillSampleBtn) {
      perfFillSampleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        fillSample();
      });
    }
    perfMetricsForm.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t.id === "perf-fill-sample") {
        e.preventDefault();
        fillSample();
      }
    });
  }

  function updateHomeCards() {
    const floors = S.libRealtime.length ? S.libRealtime : mockRealtime(S.libFilter.dateMode, S.libFilter.slot);
    if (floors.length) {
      const avail = floors.reduce((sum, f) => sum + Math.max(0, Number(f.available || 0)), 0);
      homeLibraryStatus.textContent = `可预约 ${avail} 个`;
      homeLibraryHint.textContent = `${S.libFilter.dateMode === "today" ? "今天" : "明天"} ${S.libFilter.slot} (${S.libMode === "api" ? "API" : "模拟"})`;
    }
    const pk = getPkgs();
    homeExpressStatus.textContent = `${pk.filter((x) => x.status === "pending").length} 件待取`;
    homeExpressHint.textContent = `${pk.filter((x) => x.status === "in_transit").length} 件运输中`;
    if (S.routes.length) {
      const best = S.routes.map((r) => ({ line: r.line, eta: r.stops && r.stops[0] ? r.stops[0].eta : 999 })).sort((a, b) => a.eta - b.eta)[0];
      homeShuttleStatus.textContent = `${best.line} ${best.eta} 分钟`;
      homeShuttleHint.textContent = "实时 ETA 每 20 秒刷新";
    }
    if (document.getElementById("view-dashboard") && document.getElementById("view-dashboard").classList.contains("active")) renderDashboard();
  }

  function bindAuth() {
    accountEntry.addEventListener("click", () => { switchView("account", { tabView: "home" }); switchAuthTab("login"); });
    logoutBtn.addEventListener("click", () => { setSession(null); updateAuth(null); authFeedback.textContent = "已退出登录。"; switchView("home"); });
    authTabs.forEach((t) => t.addEventListener("click", () => switchAuthTab(t.dataset.authTab)));
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      const username = String(fd.get("username") || "").trim();
      const password = String(fd.get("password") || "").trim();
      if (!username || !password) { authFeedback.textContent = "请输入用户名和密码。"; return; }
      const users = getUsers();
      const matched = users.find((u) => u.username === username);
      if (matched && matched.password !== password) { authFeedback.textContent = "密码错误，请重试。"; return; }
      if (!matched) { users.push({ username, email: "", password, createdAt: new Date().toISOString() }); setUsers(users); }
      const s = { username, loginAt: Date.now() };
      setSession(s);
      updateAuth(s);
      authFeedback.textContent = "登录成功（模拟登录）。";
      switchView("home");
      promptModal.classList.remove("open");
    });
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(registerForm);
      const username = String(fd.get("username") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const password = String(fd.get("password") || "").trim();
      const confirm = String(fd.get("confirmPassword") || "").trim();
      if (!username || !email || !password) { authFeedback.textContent = "请完整填写注册信息。"; return; }
      if (password.length < 6) { authFeedback.textContent = "密码长度至少 6 位。"; return; }
      if (password !== confirm) { authFeedback.textContent = "两次密码输入不一致。"; return; }
      const users = getUsers();
      if (users.some((u) => u.username === username)) { authFeedback.textContent = "该用户名已存在，请直接登录。"; switchAuthTab("login"); return; }
      users.push({ username, email, password, createdAt: new Date().toISOString() });
      setUsers(users);
      const s = { username, loginAt: Date.now() };
      setSession(s);
      updateAuth(s);
      authFeedback.textContent = "注册成功，已自动登录。";
      switchView("home");
      promptModal.classList.remove("open");
      registerForm.reset();
    });
  }

  function bindPrompt() {
    promptCloseTargets.forEach((el) => el.addEventListener("click", () => promptModal.classList.remove("open")));
    promptLoginBtn.addEventListener("click", () => { promptModal.classList.remove("open"); switchView("account", { tabView: "home" }); switchAuthTab("login"); });
  }

  function maybePrompt() {
    const s = getSession();
    updateAuth(s);
    if (!s && localStorage.getItem(K.AUTH_PROMPT) !== "1") {
      localStorage.setItem(K.AUTH_PROMPT, "1");
      setTimeout(() => promptModal.classList.add("open"), 420);
    }
  }

  function bindSettings() {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(settingsForm);
      const next = { theme: String(fd.get("theme")), mapZone: String(fd.get("mapZone")), showSummary: Boolean(fd.get("showSummary")) };
      const saved = window.PreferenceStorage.savePreferences(next);
      applyPrefs(saved, true);
      loadNews();
      settingsTip.textContent = `配置已保存 (${new Date().toLocaleTimeString()})`;
    });
  }

  function bindTabs() { tabButtons.forEach((b) => b.addEventListener("click", () => switchView(b.dataset.view))); }

  function bindMap() {
    zoneInteractive.forEach((el) => {
      el.addEventListener("click", () => {
        const z = MAP[el.dataset.zone] ? el.dataset.zone : "library";
        setMapZone(z, true);
        $("pref-map-zone").value = z;
        window.PreferenceStorage.savePreferences({ mapZone: z });
        trackEvent("map", "switch_zone", z);
      });
    });
  }

  function bindServiceNav() {
    serviceEntries.forEach((b) => b.addEventListener("click", () => { trackEvent(String(b.dataset.serviceView || "service"), "open_service_center", "home_card"); switchView(b.dataset.serviceView, { tabView: "home" }); }));
    backHomeBtns.forEach((b) => b.addEventListener("click", () => { trackEvent("nav", "back_home", String(b.dataset.backView || "home")); switchView("home"); }));
  }

  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", async () => {
      try { await navigator.serviceWorker.register("./sw.js"); } catch {}
    });
  }

  function bindInstall() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      S.deferredPrompt = e;
      installBtn.hidden = false;
    });
    installBtn.addEventListener("click", async () => {
      if (!S.deferredPrompt) return;
      S.deferredPrompt.prompt();
      await S.deferredPrompt.userChoice;
      S.deferredPrompt = null;
      installBtn.hidden = true;
    });
    window.addEventListener("appinstalled", () => { installBtn.hidden = true; });
  }

  function bindNetwork() {
    updateNetwork();
    window.addEventListener("online", updateNetwork);
    window.addEventListener("offline", updateNetwork);
  }

  function setExamCountdown() {
    const d = new Date("2026-06-18T09:00:00").getTime();
    const left = Math.max(0, Math.ceil((d - Date.now()) / 86400000));
    examCountdown.textContent = `最近考试（2026-06-18）倒计时：${left} 天`;
  }

  async function init() {
    const prefs = window.PreferenceStorage.getPreferences();
    applyPrefs(prefs, false);
    bindTabs();
    bindSettings();
    bindMap();
    bindTodo();
    bindAuth();
    bindPrompt();
    bindServiceNav();
    bindQuick();
    bindDashboard();
    bindLibrary();
    bindExpress();
    bindShuttle();
    maybePrompt();
    bindNetwork();
    bindInstall();
    registerSW();

    S.data = await loadData();
    initLibrarySelectors();
    initRoutes();
    initShuttleSelects();
    if ((S.data.quickServices.grades || []).length) S.gradeSemester = S.data.quickServices.grades[0].semester;
    if ((S.data.quickServices.classrooms || []).length) S.classroomBuilding = S.data.quickServices.classrooms[0].building;
    if ((S.data.library.slots || []).length) S.classroomSlot = S.data.library.slots[0];

    renderTodos();
    await refreshLibraryAll();
    renderExpress();
    renderShuttle();
    renderQuick();
    ensureRouteTimer();
    updateHomeCards();
    renderDashboard();
    trackEvent("system", "app_open", "init");
    setExamCountdown();
    loadNews();
  }

  init();
})();

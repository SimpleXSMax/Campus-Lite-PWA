(function () {
  const STORAGE_KEY = "campus.preferences.v1";

  const defaultPreferences = {
    theme: "sky",
    mapZone: "library",
    showSummary: true
  };

  function getPreferences() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ...defaultPreferences };
      }
      const parsed = JSON.parse(raw);
      return { ...defaultPreferences, ...parsed };
    } catch (error) {
      console.warn("读取 LocalStorage 失败，使用默认配置", error);
      return { ...defaultPreferences };
    }
  }

  function savePreferences(nextValues) {
    const merged = { ...getPreferences(), ...nextValues };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  }

  window.PreferenceStorage = {
    getPreferences,
    savePreferences,
    defaultPreferences
  };
})();


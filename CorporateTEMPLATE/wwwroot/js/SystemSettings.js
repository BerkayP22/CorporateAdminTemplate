// systemSettings.js

document.addEventListener("DOMContentLoaded", function () {

    const THEME_MODE_KEY = "themeMode";
    const ACCENT_KEY = "accentColor";

    /* ====================
       MAINTENANCE MODE
    ==================== */
    const maintenanceToggle = document.getElementById("maintenanceToggle");
    const maintenanceStatus = document.getElementById("maintenanceStatus");

    if (maintenanceToggle && maintenanceStatus) {
        const updateMaintenance = () => {
            if (maintenanceToggle.checked) {
                maintenanceStatus.textContent = "Enabled";
                maintenanceStatus.classList.remove("status-off");
                maintenanceStatus.classList.add("status-on");
            } else {
                maintenanceStatus.textContent = "Disabled";
                maintenanceStatus.classList.remove("status-on");
                maintenanceStatus.classList.add("status-off");
            }
        };

        updateMaintenance();
        maintenanceToggle.addEventListener("change", updateMaintenance);
    }

    /* ====================
       SESSION TIMEOUT TEXT
    ==================== */
    const timeoutSelect = document.getElementById("sessionTimeoutSelect");
    const timeoutText = document.getElementById("sessionTimeoutText");

    if (timeoutSelect && timeoutText) {
        const updateTimeoutText = () => {
            const value = parseInt(timeoutSelect.value || "30", 10);
            let label = value + " minutes";

            if (value === 60) label = "1 hour";
            if (value === 120) label = "2 hours";

            timeoutText.textContent = "User sessions expire after " + label + " of inactivity.";
        };

        updateTimeoutText();
        timeoutSelect.addEventListener("change", updateTimeoutText);
    }

    /* ====================
       LIVE THEME SWITCH
       (Light / Dark / System)
    ==================== */

    const themeRadios = document.querySelectorAll("input[name='themeMode']");
    const themeOptions = document.querySelectorAll(".ss-theme-option");

    function setBodyDarkClassFromMode(mode) {
        if (mode === "light") {
            document.body.classList.remove("dark");
        }
        else if (mode === "dark") {
            document.body.classList.add("dark");
        }
        else if (mode === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.body.classList.toggle("dark", prefersDark);
        }
    }

    function applyThemeMode(mode) {
        if (!mode) return;
        localStorage.setItem(THEME_MODE_KEY, mode);
        setBodyDarkClassFromMode(mode);

        // System mod için cihaz teması değişimini dinle
        if (mode === "system") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            const handler = (e) => {
                const saved = localStorage.getItem(THEME_MODE_KEY);
                if (saved === "system") {
                    document.body.classList.toggle("dark", e.matches);
                }
            };

            // Bazı browser'lar için hem addEventListener hem addListener destekli
            if (typeof mq.addEventListener === "function") {
                mq.addEventListener("change", handler);
            } else if (typeof mq.addListener === "function") {
                mq.addListener(handler);
            }
        }
    }

    function refreshThemeActive() {
        themeOptions.forEach(opt => {
            const input = opt.querySelector("input[type=radio]");
            if (!input) return;

            if (input.checked) {
                opt.classList.add("active");
            } else {
                opt.classList.remove("active");
            }
        });
    }

    if (themeRadios.length > 0) {
        // Sayfa açılışında localStorage'dan oku
        const savedTheme = localStorage.getItem(THEME_MODE_KEY);

        if (savedTheme) {
            const radio = document.querySelector(`input[name='themeMode'][value='${savedTheme}']`);
            if (radio) {
                radio.checked = true;
                applyThemeMode(savedTheme);
            } else {
                // fallback
                const checked = document.querySelector("input[name='themeMode']:checked");
                if (checked) applyThemeMode(checked.value);
            }
        } else {
            // İlk kez giriliyorsa checked olan neyse onu uygula
            const checked = document.querySelector("input[name='themeMode']:checked");
            if (checked) applyThemeMode(checked.value);
        }

        refreshThemeActive();

        // Değiştiğinde uygula
        themeRadios.forEach(radio => {
            radio.addEventListener("change", () => {
                applyThemeMode(radio.value);
                refreshThemeActive();
            });
        });

        // Kartın kendisine tıklama
        themeOptions.forEach(opt => {
            const input = opt.querySelector("input[type=radio]");
            if (!input) return;

            opt.addEventListener("click", () => {
                if (!input.checked) {
                    input.checked = true;
                    applyThemeMode(input.value);
                    refreshThemeActive();
                }
            });
        });
    }

    /* ====================
       ACCENT COLOR PREVIEW + PERSIST
    ==================== */

    const accentSelect = document.getElementById("accentColorSelect");
    const accentDot = document.querySelector(".ss-accent-dot");

    function getAccentColorValue(val) {
        if (val === "purple") return "#a855f7";
        if (val === "emerald") return "#10b981";
        if (val === "orange") return "#f97316";
        // default blue
        return "#3b82f6";
    }

    function applyAccent(val) {
        const color = getAccentColorValue(val);
        // preview dot
        if (accentDot) {
            accentDot.style.background = color;
        }
        // global CSS variable üzerinden tüm siteye yaymak için
        document.documentElement.style.setProperty("--accent-color", color);
        localStorage.setItem(ACCENT_KEY, val);
    }

    if (accentSelect) {
        // Açılışta localStorage'dan oku
        const savedAccent = localStorage.getItem(ACCENT_KEY);
        if (savedAccent) {
            accentSelect.value = savedAccent;
            applyAccent(savedAccent);
        } else {
            // yoksa mevcut seçili değeri uygula
            applyAccent(accentSelect.value || "blue");
        }

        accentSelect.addEventListener("change", () => {
            applyAccent(accentSelect.value);
        });
    }

    /* ====================
       NOTIFICATION LEVEL
    ==================== */

    const notifPills = document.querySelectorAll(".ss-radio-pill");

    if (notifPills.length > 0) {
        const updateNotifActive = () => {
            notifPills.forEach(pill => {
                const input = pill.querySelector("input[type=radio]");
                if (!input) return;

                if (input.checked) {
                    pill.classList.add("active");
                } else {
                    pill.classList.remove("active");
                }
            });
        };

        updateNotifActive();

        notifPills.forEach(pill => {
            const input = pill.querySelector("input[type=radio]");
            if (!input) return;

            pill.addEventListener("click", () => {
                if (!input.checked) {
                    input.checked = true;
                    updateNotifActive();
                }
            });
        });
    }

    /* ====================
       TEST NOTIFICATION
    ==================== */

    const btnTest = document.getElementById("btnTestNotification");
    const toast = document.getElementById("testNotificationToast");

    if (btnTest && toast) {
        btnTest.addEventListener("click", () => {
            toast.style.display = "inline-flex";

            setTimeout(() => {
                toast.style.display = "none";
            }, 3000);
        });
    }

});

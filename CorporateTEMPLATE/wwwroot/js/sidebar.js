/* -------------------------------
   SIDEBAR TOGGLE
--------------------------------*/
document.getElementById("menuToggle").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");

    // Collapse olduğunda tüm dropdownları kapat
    if (sidebar.classList.contains("collapsed")) {
        document.querySelectorAll(".menu-item.dropdown").forEach(m => {
            m.classList.remove("active");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const THEME_MODE_KEY = "themeMode";
    const ACCENT_KEY = "accentColor";
    const THEME_CARD_RADIUS_KEY = "themeCardRadius";
    const THEME_SIDEBAR_STYLE_KEY = "themeSidebarStyle";
    const THEME_NEON_KEY = "themeNeonGlow";
    const THEME_FONT_SCALE_KEY = "themeFontScale";
    const THEME_DENSITY_KEY = "themeDensity";

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

    // Tema modu
    const savedTheme = localStorage.getItem(THEME_MODE_KEY);
    if (savedTheme) {
        setBodyDarkClassFromMode(savedTheme);
    }

    // Accent
    function getAccentColorValue(val) {
        if (val === "purple") return "#a855f7";
        if (val === "emerald") return "#10b981";
        if (val === "orange") return "#f97316";
        return "#3b82f6";
    }

    const storedAccent = localStorage.getItem(ACCENT_KEY) || "blue";
    document.documentElement.style.setProperty(
        "--accent-color",
        getAccentColorValue(storedAccent)
    );

    // Radius
    const storedRadius = localStorage.getItem(THEME_CARD_RADIUS_KEY) || "soft";
    applyBodyClassGroup("theme-radius", storedRadius);

    // Sidebar style
    const storedSidebar = localStorage.getItem(THEME_SIDEBAR_STYLE_KEY) || "solid";
    applyBodyClassGroup("theme-sidebar", storedSidebar);

    // Neon
    const storedNeon = localStorage.getItem(THEME_NEON_KEY) || "off";
    applyBodyClassGroup("theme-neon", storedNeon);
    let glow = 0;
    if (storedNeon === "soft") glow = 0.5;
    if (storedNeon === "strong") glow = 1;
    document.documentElement.style.setProperty("--neon-glow", glow.toString());

    // Font scale
    const storedFontScale = localStorage.getItem(THEME_FONT_SCALE_KEY) || "md";
    let scale = 1;
    if (storedFontScale === "sm") scale = 0.95;
    if (storedFontScale === "lg") scale = 1.07;
    document.documentElement.style.setProperty("--font-scale", scale.toString());

    // Density
    const storedDensity = localStorage.getItem(THEME_DENSITY_KEY) || "comfortable";
    applyBodyClassGroup("theme-density", storedDensity);

    function applyBodyClassGroup(prefix, value) {
        const toRemove = [];
        document.body.classList.forEach(c => {
            if (c.startsWith(prefix + "-")) {
                toRemove.push(c);
            }
        });
        toRemove.forEach(c => document.body.classList.remove(c));
        if (value) {
            document.body.classList.add(prefix + "-" + value);
        }
    }

});

document.addEventListener("DOMContentLoaded", function () {
    const THEME_MODE_KEY = "themeMode";
    const ACCENT_KEY = "accentColor";

    // ---- Tema modu yükle ----
    const savedTheme = localStorage.getItem(THEME_MODE_KEY);

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

    if (savedTheme) {
        setBodyDarkClassFromMode(savedTheme);
    }

    // ---- Accent color yükle ----
    const savedAccent = localStorage.getItem(ACCENT_KEY);

    function getAccentColorValue(val) {
        if (val === "purple") return "#a855f7";
        if (val === "emerald") return "#10b981";
        if (val === "orange") return "#f97316";
        return "#3b82f6";
    }

    const accentVal = savedAccent || "blue";
    const accentColor = getAccentColorValue(accentVal);
    document.documentElement.style.setProperty("--accent-color", accentColor);
});

/* -------------------------------
   SIDEBAR DROPDOWNS
--------------------------------*/
document.querySelectorAll(".dropdown-toggle").forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault();

        const parent = item.parentElement;

        // Tek dropdown açık olsun
        if (!parent.classList.contains("active")) {
            document.querySelectorAll(".menu-item.dropdown").forEach(m => {
                if (m !== parent) m.classList.remove("active");
            });
        }

        parent.classList.toggle("active");
    });
});


/* -------------------------------
   DARK MODE + ICON CHANGE
--------------------------------*/
const darkBtn = document.getElementById("darkToggle");
const darkIcon = darkBtn.querySelector("i");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Icon değiştir
    if (document.body.classList.contains("dark")) {
        darkIcon.classList.remove("fa-moon");
        darkIcon.classList.add("fa-sun");
    } else {
        darkIcon.classList.remove("fa-sun");
        darkIcon.classList.add("fa-moon");
    }
});


/* -------------------------------
   USER DROPDOWN
--------------------------------*/
const userToggle = document.getElementById("userMenuToggle");
const userDropdown = document.getElementById("userDropdown");

userToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("show");
});

// Sayfada başka yere tıklayınca kapansın
document.addEventListener("click", () => {
    userDropdown.classList.remove("show");
});

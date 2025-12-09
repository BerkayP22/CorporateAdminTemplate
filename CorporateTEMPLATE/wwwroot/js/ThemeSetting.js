// themeSettings.js

document.addEventListener("DOMContentLoaded", function () {

    const THEME_CARD_RADIUS_KEY = "themeCardRadius";
    const THEME_SIDEBAR_STYLE_KEY = "themeSidebarStyle";
    const THEME_NEON_KEY = "themeNeonGlow";
    const THEME_FONT_SCALE_KEY = "themeFontScale";
    const THEME_DENSITY_KEY = "themeDensity";
    const ACCENT_KEY = "accentColor";

    /* ====================
       HELPERS
    ==================== */

    function setBodyClassGroup(prefix, value) {
        // prefix: "theme-radius", "theme-sidebar", "theme-neon", "theme-density"
        const classesToRemove = [];
        document.body.classList.forEach(c => {
            if (c.startsWith(prefix + "-")) {
                classesToRemove.push(c);
            }
        });
        classesToRemove.forEach(c => document.body.classList.remove(c));
        if (value) {
            document.body.classList.add(`${prefix}-${value}`);
        }
    }

    function applyRadius(value) {
        localStorage.setItem(THEME_CARD_RADIUS_KEY, value);
        setBodyClassGroup("theme-radius", value);
    }

    function applySidebarStyle(value) {
        localStorage.setItem(THEME_SIDEBAR_STYLE_KEY, value);
        setBodyClassGroup("theme-sidebar", value);
    }

    function applyNeon(value) {
        localStorage.setItem(THEME_NEON_KEY, value);
        setBodyClassGroup("theme-neon", value);

        let glow = 0;
        if (value === "soft") glow = 0.5;
        if (value === "strong") glow = 1;
        document.documentElement.style.setProperty("--neon-glow", glow.toString());
    }

    function applyFontScale(value) {
        localStorage.setItem(THEME_FONT_SCALE_KEY, value);
        let scale = 1;
        if (value === "sm") scale = 0.95;
        if (value === "md") scale = 1;
        if (value === "lg") scale = 1.07;
        document.documentElement.style.setProperty("--font-scale", scale.toString());
    }

    function applyDensity(value) {
        localStorage.setItem(THEME_DENSITY_KEY, value);
        setBodyClassGroup("theme-density", value);
    }

    function getAccentColorValue(val) {
        if (val === "purple") return "#a855f7";
        if (val === "emerald") return "#10b981";
        if (val === "orange") return "#f97316";
        return "#3b82f6"; // blue
    }

    function applyAccent(val) {
        localStorage.setItem(ACCENT_KEY, val);
        const color = getAccentColorValue(val);
        document.documentElement.style.setProperty("--accent-color", color);
    }

    function syncPillGroup(groupEl, storedValue) {
        if (!groupEl) return;
        const labels = groupEl.querySelectorAll(".theme-pill");
        labels.forEach(l => {
            const input = l.querySelector("input[type=radio]");
            if (!input) return;
            const isActive = input.value === storedValue;
            input.checked = isActive;
            l.classList.toggle("active", isActive);
        });
    }

    /* ====================
       INIT FROM LOCALSTORAGE
    ==================== */

    const storedRadius = localStorage.getItem(THEME_CARD_RADIUS_KEY) || "soft";
    const storedSidebar = localStorage.getItem(THEME_SIDEBAR_STYLE_KEY) || "solid";
    const storedNeon = localStorage.getItem(THEME_NEON_KEY) || "off";
    const storedFontScale = localStorage.getItem(THEME_FONT_SCALE_KEY) || "md";
    const storedDensity = localStorage.getItem(THEME_DENSITY_KEY) || "comfortable";
    const storedAccent = localStorage.getItem(ACCENT_KEY) || "blue";

    applyRadius(storedRadius);
    applySidebarStyle(storedSidebar);
    applyNeon(storedNeon);
    applyFontScale(storedFontScale);
    applyDensity(storedDensity);
    applyAccent(storedAccent);

    // card radius group
    const cardRadiusGroup = document.getElementById("cardRadiusGroup");
    syncPillGroup(cardRadiusGroup, storedRadius);

    // sidebar style group
    const sidebarStyleGroup = document.getElementById("sidebarStyleGroup");
    syncPillGroup(sidebarStyleGroup, storedSidebar);

    // neon group
    const neonGlowGroup = document.getElementById("neonGlowGroup");
    syncPillGroup(neonGlowGroup, storedNeon);

    // font scale group
    const fontScaleGroup = document.getElementById("fontScaleGroup");
    syncPillGroup(fontScaleGroup, storedFontScale);

    // density group
    const densityGroup = document.getElementById("densityGroup");
    syncPillGroup(densityGroup, storedDensity);

    /* ====================
       EVENTS: PILL GROUPS
    ==================== */

    function wirePillGroup(groupEl, applyFn) {
        if (!groupEl) return;
        const labels = groupEl.querySelectorAll(".theme-pill");
        labels.forEach(l => {
            const input = l.querySelector("input[type=radio]");
            if (!input) return;
            l.addEventListener("click", () => {
                const val = input.value;
                applyFn(val);
                // update active state
                labels.forEach(lbl => {
                    const inp = lbl.querySelector("input[type=radio]");
                    if (!inp) return;
                    lbl.classList.toggle("active", inp === input);
                });
            });
        });
    }

    wirePillGroup(cardRadiusGroup, applyRadius);
    wirePillGroup(sidebarStyleGroup, applySidebarStyle);
    wirePillGroup(neonGlowGroup, applyNeon);
    wirePillGroup(fontScaleGroup, applyFontScale);
    wirePillGroup(densityGroup, applyDensity);

    /* ====================
       ACCENT DOTS
    ==================== */

    const accentGroup = document.getElementById("accentGroup");
    if (accentGroup) {
        const dots = accentGroup.querySelectorAll(".theme-accent-dot");

        dots.forEach(dot => {
            const val = dot.getAttribute("data-accent");
            if (val === storedAccent) {
                dot.classList.add("active");
            }
            dot.addEventListener("click", () => {
                const accent = dot.getAttribute("data-accent");
                if (!accent) return;
                applyAccent(accent);
                dots.forEach(d => d.classList.remove("active"));
                dot.classList.add("active");
            });
        });
    }

    /* ====================
       RESET BUTTON
    ==================== */

    const btnResetTheme = document.getElementById("btnResetTheme");
    if (btnResetTheme) {
        btnResetTheme.addEventListener("click", () => {
            applyRadius("soft");
            applySidebarStyle("solid");
            applyNeon("off");
            applyFontScale("md");
            applyDensity("comfortable");
            applyAccent("blue");

            syncPillGroup(cardRadiusGroup, "soft");
            syncPillGroup(sidebarStyleGroup, "solid");
            syncPillGroup(neonGlowGroup, "off");
            syncPillGroup(fontScaleGroup, "md");
            syncPillGroup(densityGroup, "comfortable");

            if (accentGroup) {
                accentGroup.querySelectorAll(".theme-accent-dot").forEach(d => {
                    const v = d.getAttribute("data-accent");
                    d.classList.toggle("active", v === "blue");
                });
            }
        });
    }

});

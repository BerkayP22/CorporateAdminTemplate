// changePassword.js

document.addEventListener("DOMContentLoaded", function () {

    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const submitBtn = document.getElementById("cpSubmitBtn");
    const cancelBtn = document.getElementById("cpCancelBtn");
    const alertBox = document.getElementById("cpAlert");
    const matchInfo = document.getElementById("cpMatchInfo");

    const strengthFill = document.getElementById("cpStrengthFill");
    const strengthLabel = document.getElementById("cpStrengthLabel");
    const rulesEls = document.querySelectorAll(".cp-rule");

    // Modal elements
    const modalBackdrop = document.getElementById("cpCodeModal");
    const codeInput = document.getElementById("cpCodeInput");
    const codeError = document.getElementById("cpCodeError");
    const codeCancelBtn = document.getElementById("cpCodeCancelBtn");
    const codeConfirmBtn = document.getElementById("cpCodeConfirmBtn");
    const emailDisplay = document.getElementById("cpEmailDisplay");

    // Demo için sabit e-posta (istersen modelden beslersin)
    if (emailDisplay) {
        emailDisplay.textContent = "admin@example.com";
    }

    /* ====================
       TOGGLE PASSWORD VISIBILITY
    ==================== */
    document.querySelectorAll(".cp-eye-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const input = document.getElementById(targetId);
            if (!input) return;

            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";

            const icon = btn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-eye", !isPassword);
                icon.classList.toggle("fa-eye-slash", isPassword);
            }
        });
    });

    /* ====================
       PASSWORD RULES & STRENGTH
    ==================== */

    function evaluatePassword(pw) {
        const result = {
            length: pw.length >= 8,
            upper: /[A-Z]/.test(pw),
            lower: /[a-z]/.test(pw),
            digit: /[0-9]/.test(pw),
            special: /[^A-Za-z0-9]/.test(pw)
        };

        let passed = 0;
        Object.keys(result).forEach(k => {
            if (result[k]) passed++;
        });

        let percent = (passed / 5) * 100;
        let label = "Weak";
        let color = "#f97316";

        if (passed <= 2) {
            label = "Weak";
            color = "#f97316";
        } else if (passed === 3 || passed === 4) {
            label = "Medium";
            color = "#eab308";
        } else if (passed === 5 && pw.length >= 10) {
            label = "Strong";
            color = "#22c55e";
        }

        return {
            result,
            percent,
            label,
            color,
            allPassed: passed === 5 && pw.length >= 8
        };
    }

    function refreshPasswordUI() {
        const pw = newPassword.value || "";
        const evaluation = evaluatePassword(pw);

        // rules
        rulesEls.forEach(el => {
            const ruleKey = el.getAttribute("data-rule");
            const ruleOk = evaluation.result[ruleKey];
            const icon = el.querySelector("i");
            el.classList.toggle("text-success", ruleOk);
            el.classList.toggle("text-muted", !ruleOk);
            if (icon) {
                icon.classList.toggle("fa-circle-check", ruleOk);
                icon.classList.toggle("fa-circle-xmark", !ruleOk);
            }
        });

        // strength bar
        strengthFill.style.width = evaluation.percent + "%";
        strengthFill.style.background = evaluation.color;
        strengthLabel.textContent = "Password strength: " + evaluation.label;

        // match info
        const cp = confirmPassword.value || "";
        if (cp.length > 0) {
            if (cp === pw) {
                matchInfo.textContent = "Passwords match.";
                matchInfo.classList.remove("error");
                matchInfo.classList.add("ok");
            } else {
                matchInfo.textContent = "Passwords do not match.";
                matchInfo.classList.remove("ok");
                matchInfo.classList.add("error");
            }
        } else {
            matchInfo.textContent = "Repeat the new password exactly.";
            matchInfo.classList.remove("ok", "error");
        }

        // Submit buton enable/disable
        const canSubmit =
            currentPassword.value.length > 0 &&
            evaluation.allPassed &&
            pw === cp;

        submitBtn.disabled = !canSubmit;
    }

    newPassword.addEventListener("input", refreshPasswordUI);
    confirmPassword.addEventListener("input", refreshPasswordUI);
    currentPassword.addEventListener("input", refreshPasswordUI);

    /* ====================
       ALERT HELPER
    ==================== */

    function showAlert(type, message) {
        if (!alertBox) return;
        alertBox.classList.remove("d-none", "cp-alert-success", "cp-alert-error");
        if (type === "success") {
            alertBox.classList.add("cp-alert-success");
        } else {
            alertBox.classList.add("cp-alert-error");
        }
        alertBox.innerHTML = "";
        const icon = document.createElement("i");
        icon.className = type === "success"
            ? "fa-solid fa-circle-check me-1"
            : "fa-solid fa-circle-exclamation me-1";
        alertBox.appendChild(icon);
        alertBox.appendChild(document.createTextNode(message));
    }

    function hideAlert() {
        if (!alertBox) return;
        alertBox.classList.add("d-none");
    }

    /* ====================
       MODAL OPEN/CLOSE
    ==================== */

    function openModal() {
        if (!modalBackdrop) return;
        modalBackdrop.classList.remove("d-none");
        codeInput.value = "";
        codeError.classList.add("d-none");
        codeInput.focus();
    }

    function closeModal() {
        if (!modalBackdrop) return;
        modalBackdrop.classList.add("d-none");
    }

    /* ====================
       FLOW: CLICK CONTINUE → VALIDATE → OPEN MODAL
    ==================== */

    submitBtn.addEventListener("click", () => {
        hideAlert();

        // tekrar bir güvenlik check (JS içinde)
        const pw = newPassword.value || "";
        const cp = confirmPassword.value || "";
        const evalPw = evaluatePassword(pw);

        if (!currentPassword.value) {
            showAlert("error", "Please enter your current password.");
            return;
        }

        if (!evalPw.allPassed) {
            showAlert("error", "New password does not meet the required rules.");
            return;
        }

        if (pw !== cp) {
            showAlert("error", "New password and confirmation do not match.");
            return;
        }

        // Burada normalde backend'e "verification email gönder" istek gider.
        // Demo'da direkt modal açıyoruz.
        openModal();
    });

    /* ====================
       MODAL BUTTONS
    ==================== */

    if (codeCancelBtn) {
        codeCancelBtn.addEventListener("click", () => {
            closeModal();
        });
    }

    if (codeConfirmBtn) {
        codeConfirmBtn.addEventListener("click", () => {
            if (!codeInput) return;
            const val = (codeInput.value || "").trim();

            if (val === "123456") {
                // Demo: doğrulama başarılı
                closeModal();
                showAlert("success", "Password successfully changed (frontend demo).");

                // Formu sıfırlayalım
                currentPassword.value = "";
                newPassword.value = "";
                confirmPassword.value = "";
                refreshPasswordUI();
            } else {
                codeError.classList.remove("d-none");
            }
        });
    }

    if (codeInput) {
        codeInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                codeConfirmBtn?.click();
            }
        });
    }

    /* ====================
       CANCEL BUTTON
    ==================== */

    cancelBtn.addEventListener("click", () => {
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
        hideAlert();
        refreshPasswordUI();
    });

    // initial
    refreshPasswordUI();
});
// Profile.js

document.addEventListener("DOMContentLoaded", function () {

    const THEME_MODE_KEY = "themeMode";
    const ACCENT_KEY = "accentColor";
    const THEME_DENSITY_KEY = "themeDensity";
    const THEME_CARD_RADIUS_KEY = "themeCardRadius";

    const themeModeEl = document.getElementById("mpThemeModeValue");
    const accentDotEl = document.getElementById("mpAccentDot");
    const accentLabelEl = document.getElementById("mpAccentLabel");
    const densityEl = document.getElementById("mpDensityValue");
    const radiusEl = document.getElementById("mpRadiusValue");

    function getAccentColorValue(val) {
        if (val === "purple") return "#a855f7";
        if (val === "emerald") return "#10b981";
        if (val === "orange") return "#f97316";
        return "#3b82f6"; // blue
    }

    function getAccentLabel(val) {
        if (val === "purple") return "Purple";
        if (val === "emerald") return "Emerald";
        if (val === "orange") return "Orange";
        return "Blue";
    }

    function getThemeModeLabel(val) {
        if (val === "light") return "Light";
        if (val === "dark") return "Dark";
        if (val === "system") return "System (device)";
        return "Default";
    }

    function getDensityLabel(val) {
        if (val === "compact") return "Compact";
        if (val === "comfortable") return "Comfortable";
        return "Default";
    }

    function getRadiusLabel(val) {
        if (val === "soft") return "Soft";
        if (val === "rounded") return "Rounded";
        if (val === "sharp") return "Sharp";
        return "Default";
    }

    // LocalStorage'dan oku
    const storedMode = localStorage.getItem(THEME_MODE_KEY) || "light";
    const storedAccent = localStorage.getItem(ACCENT_KEY) || "blue";
    const storedDensity = localStorage.getItem(THEME_DENSITY_KEY) || "comfortable";
    const storedRadius = localStorage.getItem(THEME_CARD_RADIUS_KEY) || "soft";

    // Theme mode
    if (themeModeEl) {
        themeModeEl.textContent = getThemeModeLabel(storedMode);
    }

    // Accent
    const accentColor = getAccentColorValue(storedAccent);
    if (accentDotEl) {
        accentDotEl.style.background = accentColor;
        accentDotEl.style.borderColor = "#e5e7eb";
    }
    if (accentLabelEl) {
        accentLabelEl.textContent = getAccentLabel(storedAccent);
    }

    // Density
    if (densityEl) {
        densityEl.textContent = getDensityLabel(storedDensity);
    }

    // Card radius
    if (radiusEl) {
        radiusEl.textContent = getRadiusLabel(storedRadius);
    }

    // Buraya ileride MyProfile'a özel başka davranışlar (edit modal, avatar upload vs.)
    // eklenebilir.

});

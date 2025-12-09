// apiSettings.js

document.addEventListener("DOMContentLoaded", function () {

    /* ====================
       API KEY TOGGLE / COPY / REGENERATE
    ==================== */

    const apiKeyInput = document.getElementById("apiKeyInput");
    const btnToggleKey = document.getElementById("btnToggleKey");
    const btnCopyKey = document.getElementById("btnCopyKey");
    const btnRegenerateKey = document.getElementById("btnRegenerateKey");
    const apiKeyToast = document.getElementById("apiKeyToast");

    let apiKeyVisible = false;

    if (btnToggleKey && apiKeyInput) {
        btnToggleKey.addEventListener("click", () => {
            apiKeyVisible = !apiKeyVisible;
            apiKeyInput.type = apiKeyVisible ? "text" : "password";

            const icon = btnToggleKey.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-eye", !apiKeyVisible);
                icon.classList.toggle("fa-eye-slash", apiKeyVisible);
            }
        });
    }

    if (btnCopyKey && apiKeyInput) {
        btnCopyKey.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(apiKeyInput.value);
                showApiToast("API key copied to clipboard.");
            } catch {
                showApiToast("Could not copy to clipboard.");
            }
        });
    }

    if (btnRegenerateKey && apiKeyInput) {
        btnRegenerateKey.addEventListener("click", () => {
            // Backend yok, demo amaçlı fake key üretiyoruz
            const randomPart = Math.random().toString(36).substring(2, 10);
            apiKeyInput.value = "sk_live_" + randomPart + "EXAMPLE";
            apiKeyInput.type = apiKeyVisible ? "text" : "password";

            showApiToast("API key updated (demo only).");
        });
    }

    function showApiToast(message) {
        if (!apiKeyToast) return;
        apiKeyToast.textContent = "";
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-circle-check me-2";
        apiKeyToast.appendChild(icon);
        apiKeyToast.appendChild(document.createTextNode(message));

        apiKeyToast.style.display = "inline-flex";

        setTimeout(() => {
            apiKeyToast.style.display = "none";
        }, 2500);
    }

    /* ====================
       ENVIRONMENT TABS
    ==================== */
    const envTabs = document.querySelectorAll(".apis-env-tab");
    const envPanels = document.querySelectorAll(".apis-env-panel");

    if (envTabs.length > 0 && envPanels.length > 0) {
        envTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const env = tab.getAttribute("data-env");
                if (!env) return;

                envTabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                envPanels.forEach(panel => {
                    if (panel.getAttribute("data-env-panel") === env) {
                        panel.classList.remove("d-none");
                    } else {
                        panel.classList.add("d-none");
                    }
                });
            });
        });
    }

    /* ====================
       RATE LIMIT SLIDER
    ==================== */
    const rateRange = document.getElementById("rateLimitRange");
    const rateValue = document.getElementById("rateLimitValue");

    if (rateRange && rateValue) {
        const updateRateText = () => {
            rateValue.textContent = rateRange.value;
        };

        updateRateText();
        rateRange.addEventListener("input", updateRateText);
    }

    /* ====================
       TEST WEBHOOK
    ==================== */
    const btnTestWebhook = document.getElementById("btnTestWebhook");
    const webhookToast = document.getElementById("webhookToast");

    if (btnTestWebhook && webhookToast) {
        btnTestWebhook.addEventListener("click", () => {
            webhookToast.style.display = "inline-flex";

            setTimeout(() => {
                webhookToast.style.display = "none";
            }, 2500);
        });
    }

});

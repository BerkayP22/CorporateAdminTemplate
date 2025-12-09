document.addEventListener("DOMContentLoaded", function () {
    const appSelect = document.getElementById("appSelect");
    const rows = document.querySelectorAll(".version-row");

    const appNameSpan = document.getElementById("selectedAppName");
    const appCodeSpan = document.getElementById("selectedAppCode");
    const appDescSpan = document.getElementById("selectedAppDesc");
    const appCurrentVersionSpan = document.getElementById("selectedAppCurrentVersion");
    const appCustomerSpan = document.getElementById("selectedAppCustomer");
    const appTotalReleasesSpan = document.getElementById("selectedAppTotalReleases");

    const statTotalReleases = document.getElementById("statTotalReleases");
    const statRollbacks = document.getElementById("statRollbacks");
    const statCycleTime = document.getElementById("statCycleTime");
    const statLastIncident = document.getElementById("statLastIncident");

    const saleCustomer = document.getElementById("saleCustomer");
    const saleVersion = document.getElementById("saleVersion");
    const saleOwner = document.getElementById("saleOwner");
    const saleDate = document.getElementById("saleDate");

    const appMeta = {
        "version-manager": {
            name: "Version Manager",
            code: "APP-VM",
            desc: "Centralized version definition and deployment orchestration.",
            current: "v3.4.2",
            customer: "St Solutions A.Ş.",
            totalReleases: "23",
            stats: {
                total: "23",
                rollbacks: "1",
                cycle: "14 days",
                incident: "v3.2.1"
            },
            sale: {
                customer: "St Solutions A.Ş.",
                version: "v3.4.0",
                owner: "Eda H.",
                date: "2025-11-22"
            }
        },
        "deployment-monitor": {
            name: "Deployment Monitor",
            code: "APP-DM",
            desc: "Real-time monitoring for deployments and incident tracking.",
            current: "v2.1.0",
            customer: "Acme Technologies",
            totalReleases: "11",
            stats: {
                total: "11",
                rollbacks: "0",
                cycle: "21 days",
                incident: "v2.0.0"
            },
            sale: {
                customer: "Acme Technologies",
                version: "v2.1.0",
                owner: "Burak K.",
                date: "2025-11-29"
            }
        },
        "customer-portal": {
            name: "Customer Portal",
            code: "APP-CP",
            desc: "Self-service portal for end customers and partners.",
            current: "v1.8.3",
            customer: "Globex Corporation",
            totalReleases: "17",
            stats: {
                total: "17",
                rollbacks: "2",
                cycle: "18 days",
                incident: "v1.7.0"
            },
            sale: {
                customer: "Globex Corporation",
                version: "v1.8.3",
                owner: "Sales Team",
                date: "2025-10-05"
            }
        },
        "incident-tracker": {
            name: "Incident Tracker",
            code: "APP-IT",
            desc: "SLA-aware incident tracking and escalation workflows.",
            current: "v4.0.0",
            customer: "St Solutions A.Ş.",
            totalReleases: "9",
            stats: {
                total: "9",
                rollbacks: "1",
                cycle: "30 days",
                incident: "v3.9.0"
            },
            sale: {
                customer: "St Solutions A.Ş.",
                version: "v4.0.0",
                owner: "On-call Team",
                date: "2025-11-18"
            }
        },
        "log-analyzer": {
            name: "Log Analyzer",
            code: "APP-LA",
            desc: "Advanced log querying and anomaly detection.",
            current: "v0.9.5",
            customer: "Internal",
            totalReleases: "5",
            stats: {
                total: "5",
                rollbacks: "0",
                cycle: "10 days",
                incident: "v0.9.2"
            },
            sale: {
                customer: "Internal",
                version: "v0.9.5",
                owner: "Platform Team",
                date: "2025-09-05"
            }
        }
    };

    function updateForApp(appKey) {
        const meta = appMeta[appKey];
        if (!meta) return;

        // Tablo filtre
        rows.forEach(row => {
            if (row.getAttribute("data-app") === appKey) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });

        // Üst kart
        appNameSpan.textContent = meta.name;
        appCodeSpan.textContent = meta.code;
        appDescSpan.textContent = meta.desc;
        appCurrentVersionSpan.textContent = meta.current;
        appCustomerSpan.textContent = meta.customer;
        appTotalReleasesSpan.textContent = meta.totalReleases;

        // Stats
        statTotalReleases.textContent = meta.stats.total;
        statRollbacks.textContent = meta.stats.rollbacks;
        statCycleTime.textContent = meta.stats.cycle;
        statLastIncident.textContent = meta.stats.incident;

        // Sale
        saleCustomer.textContent = meta.sale.customer;
        saleVersion.textContent = meta.sale.version;
        saleOwner.textContent = meta.sale.owner;
        saleDate.textContent = meta.sale.date;
    }

    appSelect.addEventListener("change", function () {
        updateForApp(this.value);
    });

    // ilk yüklemede default
    updateForApp(appSelect.value);
});
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("versionFileInput");
    const fileNameSpan = document.getElementById("selectedFileName");
    const uploadBox = document.getElementById("fileUploadBox");

    // Click to open file dialog
    uploadBox.addEventListener("click", function () {
        fileInput.click();
    });

    // On file selected
    fileInput.addEventListener("change", function () {
        if (fileInput.files && fileInput.files.length > 0) {
            fileNameSpan.textContent = fileInput.files[0].name;
            uploadBox.classList.add("has-file");
        } else {
            fileNameSpan.textContent = "No file selected";
            uploadBox.classList.remove("has-file");
        }
    });
});
<script>
    document.addEventListener("DOMContentLoaded", function () {
            const appSelect = document.getElementById("historyAppSelect");
    const items = document.querySelectorAll(".history-item");

    function filterHistory(appKey) {
        items.forEach(item => {
            const itemApp = item.getAttribute("data-app");
            if (appKey === "all" || itemApp === appKey) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
            }

    appSelect.addEventListener("change", function () {
        filterHistory(this.value);
            });

    // başlangıçta hepsi
    filterHistory(appSelect.value);
        });
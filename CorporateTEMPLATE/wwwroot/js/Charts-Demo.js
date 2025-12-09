/* ==============================
  CHARTS DEMO - GLOBAL
  Theme Auto Update (Dark/Light)
================================ */

document.addEventListener("DOMContentLoaded", function () {

    let isDark = document.body.classList.contains("dark");

    function chartColors() {
        return isDark
            ? {
                text: "#d1d5db",
                grid: "#1e293b",
                primary: "#60a5fa",
                secondary: "#a855f7",
                danger: "#f87171",
                success: "#4ade80"
            }
            : {
                text: "#374151",
                grid: "#e5e7eb",
                primary: "#3b82f6",
                secondary: "#8b5cf6",
                danger: "#dc2626",
                success: "#16a34a"
            };
    }

    function recreateCharts() {
        console.log("Charts Updating...");
        const colors = chartColors();

        /* ==================================================
           DASHBOARD CHART - Sales Line Chart
        ================================================== */
        const dashboardCanvas = document.getElementById("salesChart");
        if (dashboardCanvas) {
            new Chart(dashboardCanvas, {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                    datasets: [{
                        label: "Sales Growth",
                        data: [25, 42, 35, 52, 68],
                        borderColor: colors.primary,
                        backgroundColor: colors.primary + "44",
                        borderWidth: 2,
                        tension: .35,
                        fill: true
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: colors.grid },
                            ticks: { color: colors.text }
                        },
                        x: {
                            ticks: { color: colors.text },
                            grid: { color: colors.grid }
                        }
                    }
                }
            });
        }

        /* ==================================================
           PERFORMANCE REPORT - KPI Bar Chart
        ================================================== */
        const perfCanvas = document.getElementById("performanceChart");
        if (perfCanvas) {
            new Chart(perfCanvas, {
                type: "bar",
                data: {
                    labels: ["Ali", "Veli", "Ayşe", "Zeynep", "Berk"],
                    datasets: [{
                        label: "Productivity",
                        data: [88, 72, 95, 64, 80],
                        backgroundColor: [
                            colors.success,
                            colors.primary,
                            colors.secondary,
                            colors.danger,
                            colors.primary
                        ]
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: colors.text } }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: colors.text },
                            grid: { color: colors.grid }
                        },
                        x: {
                            ticks: { color: colors.text }
                        }
                    }
                }
            });
        }

        /* ==================================================
           USER ANALYTICS - Doughnut Mood Chart
        ================================================== */
        const moodCanvas = document.getElementById("moodChart");
        if (moodCanvas) {
            new Chart(moodCanvas, {
                type: "doughnut",
                data: {
                    labels: ["Happy", "Neutral", "Stressed"],
                    datasets: [{
                        data: [62, 28, 10],
                        backgroundColor: [
                            colors.success,
                            colors.primary,
                            colors.danger
                        ],
                        borderWidth: 1,
                        borderColor: isDark ? "#0f172a" : "#ffffff"
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: colors.text } }
                    }
                }
            });
        }

        /* ==================================================
           MONTHLY REPORT - Area Chart
        ================================================== */
        const monthlyCanvas = document.getElementById("monthlyRevenueChart");
        if (monthlyCanvas) {
            new Chart(monthlyCanvas, {
                type: "line",
                data: {
                    labels: ["Jun", "Jul", "Aug", "Sep", "Oct"],
                    datasets: [{
                        label: "Revenue",
                        data: [180, 240, 210, 260, 300],
                        borderColor: colors.secondary,
                        backgroundColor: colors.secondary + "33",
                        fill: true,
                        tension: .4
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: colors.text } }
                    },
                    scales: {
                        x: {
                            ticks: { color: colors.text },
                            grid: { color: colors.grid }
                        },
                        y: {
                            ticks: { color: colors.text },
                            grid: { color: colors.grid }
                        }
                    }
                }
            });
        }
    }

    /* İlk render */
    recreateCharts();

    /* Tema değişince tekrar çiz */
    const observer = new MutationObserver(() => {
        const newDark = document.body.classList.contains("dark");
        if (newDark !== isDark) {
            isDark = newDark;
            recreateCharts();
        }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
});

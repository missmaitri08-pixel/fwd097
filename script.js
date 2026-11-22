document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // FEATURE 1: Active Nav Link Highlighter & Smooth Scroll
    // ==========================================
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        
        // Highlight active page link
        if (linkPath === currentPath || (currentPath === "index.html" && linkPath === "#home")) {
            link.classList.add("active");
        }

        // Smooth scroll for internal page anchors
        if (linkPath.startsWith("#")) {
            link.addEventListener("click", (e) => {
                const targetId = linkPath.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            });
        }
    });

    // ==========================================
    // FEATURE 2: Dynamic Tariff Estimator Tool
    // ==========================================
    const tariffRates = {
        standard: {
            "university-guest": { single: 1500, double: 2000 },
            "faculty-guest": { single: 1000, double: 1500 },
            "student-parent": { single: 1000, double: 1500 },
            "external-student": { single: 1000, double: 1500 },
            "private-guest": { single: 1500, double: 2000 },
            "driver": { single: 500, double: 500 }
        },
        vip: {
            "university-guest": { single: 3000, double: 4000 },
            "faculty-guest": { single: 2000, double: 3000 }
        }
    };

    const calcBtn = document.getElementById("calc-tariff-btn");
    if (calcBtn) {
        calcBtn.addEventListener("click", () => {
            const roomType = document.getElementById("calc-room-type").value;
            const category = document.getElementById("calc-category").value;
            const occupancy = document.getElementById("calc-occupancy").value;
            const days = parseInt(document.getElementById("calc-days").value) || 1;
            const resultBox = document.getElementById("calc-result");

            if (tariffRates[roomType] && tariffRates[roomType][category]) {
                const ratePerDay = tariffRates[roomType][category][occupancy];
                const totalAmount = ratePerDay * days;
                resultBox.innerHTML = `<strong>Estimated Total:</strong> ₹${totalAmount.toLocaleString("en-IN")} (${days} day${days > 1 ? 's' : ''} @ ₹${ratePerDay}/day)`;
                resultBox.style.color = "#155724";
            } else {
                resultBox.innerHTML = "<strong>Note:</strong> Selected combination is not available under current tariffs.";
                resultBox.style.color = "#721c24";
            }
        });
    }

    // ==========================================
    // FEATURE 3: Interactive FAQ Accordion
    // ==========================================
    const faqSummaries = document.querySelectorAll(".faq-item summary");
    faqSummaries.forEach(summary => {
        summary.addEventListener("click", function () {
            const parentDetails = this.parentElement;
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== parentDetails) {
                    item.removeAttribute("open");
                }
            });
        });
    });
});
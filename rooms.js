(function () {
    var R = {
        std: [
            ["University Guests / Invitees", 1500, 2000],
            ["Faculty and Staff’s guest / family members", 1000, 1500],
            ["Parents / Guardians of the Students", 1000, 1500],
            ["Students from another institutes", 1000, 1500],
            ["Permitted Private Guests", 1500, 2000],
            ["Drivers (sharing basis, single only)", 500, null]
        ],
        vip: [
            ["University Guests / Invitees", 3000, 4000],
            ["Faculty and Staff’s guest / family members", 2000, 3000]
        ]
    };

    var cards = Array.prototype.slice.call(document.querySelectorAll(".rm-card")),
        chips = Array.prototype.slice.call(document.querySelectorAll(".rm-chip")),
        groupRows = Array.prototype.slice.call(document.querySelectorAll(".tariff-group-row")),
        rateRows = Array.prototype.slice.call(document.querySelectorAll(".tariff-rate-row")),
        rmCount = document.getElementById("rm-count"),
        tariffCount = document.getElementById("tariff-count"),
        activeCat = "All";

    function applyCategoryFilter() {
        var visibleCards = 0, visibleRates = 0;

        cards.forEach(function (card) {
            var show = activeCat === "All" || card.dataset.cat === activeCat;
            card.hidden = !show;
            if (show) {
                visibleCards++;
                card.style.animation = "none";
                void card.offsetWidth;
                card.style.animation = "";
            }
        });

        groupRows.forEach(function (row) {
            row.hidden = !(activeCat === "All" || row.dataset.group === activeCat);
        });

        rateRows.forEach(function (row) {
            var show = activeCat === "All" || row.dataset.group === activeCat;
            row.hidden = !show;
            if (show) visibleRates++;
        });

        if (rmCount) rmCount.textContent = "Showing " + visibleCards + " of " + cards.length + " accommodation categories";
        if (tariffCount) tariffCount.textContent = visibleRates + " tariff " + (visibleRates === 1 ? "entry" : "entries") + " shown";
    }

    chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
            chips.forEach(function (c) {
                c.classList.remove("is-on");
                c.setAttribute("aria-pressed", "false");
            });
            chip.classList.add("is-on");
            chip.setAttribute("aria-pressed", "true");
            activeCat = chip.dataset.cat;
            applyCategoryFilter();
        });
    });

    var room = document.getElementById("calc-room"),
        cat = document.getElementById("calc-cat"),
        occ = document.getElementById("calc-occ"),
        days = document.getElementById("calc-days"),
        out = document.getElementById("calc-result"),
        btn = document.getElementById("calc-tariff-btn"),
        presets = Array.prototype.slice.call(document.querySelectorAll(".calc-preset-btn")),
        jumpBtns = Array.prototype.slice.call(document.querySelectorAll("[data-jump-calc]"));

    function syncPresets(n) {
        presets.forEach(function (p) {
            p.classList.toggle("is-active", parseInt(p.dataset.days, 10) === n);
        });
    }

    function syncTableHighlight() {
        rateRows.forEach(function (row) {
            var match = row.dataset.calcRoom === room.value && String(row.dataset.calcIdx) === String(cat.value);
            row.classList.toggle("is-highlight", match);
        });
    }

    function fillCategories(keepIndex) {
        var prev = keepIndex ? cat.value : "0";
        cat.innerHTML = R[room.value].map(function (c, i) {
            return '<option value="' + i + '">' + c[0] + '</option>';
        }).join("");
        if (R[room.value][+prev]) cat.value = prev;
    }

    function calculateRent() {
        if (!room || !cat || !occ || !days || !out) return;
        var entry = R[room.value][+cat.value] || R[room.value][0];
        var rate = occ.value === "d" ? entry[2] : entry[1];
        var n = Math.max(1, Math.min(365, parseInt(days.value, 10) || 1));
        days.value = n;
        syncPresets(n);
        syncTableHighlight();

        if (rate == null) {
            out.classList.add("is-warn");
            out.textContent = "Double occupancy is not available for " + entry[0] + ". Switch to Single Occupancy to estimate.";
            return;
        }

        out.classList.remove("is-warn");
        var total = rate * n;
        var occLabel = occ.value === "d" ? "Double" : "Single";
        out.textContent = "Estimated rent: ₹" + total.toLocaleString("en-IN") +
            " (" + occLabel + " · ₹" + rate.toLocaleString("en-IN") + " × " + n + (n > 1 ? " days" : " day") + ") — excluding meals.";
    }

    if (room && btn) {
        room.addEventListener("change", function () {
            fillCategories(false);
            calculateRent();
        });
        cat.addEventListener("change", calculateRent);
        occ.addEventListener("change", calculateRent);
        days.addEventListener("input", calculateRent);
        btn.addEventListener("click", calculateRent);

        presets.forEach(function (p) {
            p.addEventListener("click", function () {
                days.value = p.dataset.days;
                calculateRent();
            });
        });

        rateRows.forEach(function (row) {
            if (!row.dataset.calcRoom) return;
            row.style.cursor = "pointer";
            row.title = "Click to load this category into the rent estimator";
            row.addEventListener("click", function () {
                room.value = row.dataset.calcRoom;
                fillCategories(false);
                cat.value = row.dataset.calcIdx;
                calculateRent();
                document.getElementById("tariff-calculator").scrollIntoView({ behavior: "smooth", block: "nearest" });
            });
        });

        jumpBtns.forEach(function (jb) {
            jb.addEventListener("click", function () {
                room.value = jb.dataset.jumpCalc;
                fillCategories(false);
                calculateRent();
                document.getElementById("tariff-calculator").scrollIntoView({ behavior: "smooth", block: "nearest" });
            });
        });

        fillCategories(false);
        calculateRent();
    }

    applyCategoryFilter();
})();

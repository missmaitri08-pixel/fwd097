(function () {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".svc-card")),
        chips = Array.prototype.slice.call(document.querySelectorAll(".svc-chip")),
        count = document.getElementById("svc-count"),
        empty = document.getElementById("svc-empty"),
        category = "All";

    function apply() {
        var visible = 0;
        cards.forEach(function (card) {
            var show = category === "All" || card.dataset.cat === category;
            card.hidden = !show;
            if (show) {
                visible++;
                card.style.animation = "none";
                void card.offsetWidth;
                card.style.animation = "";
            }
        });
        count.textContent = "Showing " + visible + " of " + cards.length + " services";
        empty.hidden = visible > 0;
    }

    chips.forEach(function (button) {
        button.addEventListener("click", function () {
            chips.forEach(function (chip) {
                chip.classList.remove("is-on");
                chip.setAttribute("aria-pressed", "false");
            });
            button.classList.add("is-on");
            button.setAttribute("aria-pressed", "true");
            category = button.dataset.cat;
            apply();
        });
    });

    apply();
})();

(function () {
    var sections = Array.prototype.slice.call(document.querySelectorAll(".rl-sec")),
        links = Array.prototype.slice.call(document.querySelectorAll(".rl-index nav a")),
        toggle = document.getElementById("rl-toggle"),
        topButton = document.getElementById("rl-top");

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            var section = document.querySelector(link.getAttribute("href"));
            if (section) section.open = true;
        });
    });

    function sync() {
        toggle.textContent = sections.every(function (section) { return section.open; }) ? "Collapse all" : "Expand all";
    }

    toggle.addEventListener("click", function () {
        var open = !sections.every(function (section) { return section.open; });
        sections.forEach(function (section) { section.open = open; });
        sync();
    });

    sections.forEach(function (section) { section.addEventListener("toggle", sync); });
    sync();

    function spy() {
        var current = sections[0].id;
        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top < 160) current = section.id;
        });
        links.forEach(function (link) {
            link.classList.toggle("on", link.getAttribute("href") === "#" + current);
        });
        topButton.classList.toggle("show", window.scrollY > 500);
    }

    window.addEventListener("scroll", spy, { passive: true });
    spy();
    topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
})();

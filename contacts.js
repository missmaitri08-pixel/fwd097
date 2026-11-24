(function () {
    var toast = document.createElement("div");
    toast.className = "ct-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);

    function say(message) {
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(function () { toast.classList.remove("show"); }, 2200);
    }

    Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (button) {
        button.addEventListener("click", function () {
            var text = button.getAttribute("data-copy");
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function () { say("Copied"); }, function () { say(text); });
            } else {
                say(text);
            }
        });
    });

    var tabs = Array.prototype.slice.call(document.querySelectorAll(".ct-tab"));
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach(function (item) {
                var active = item === tab;
                item.classList.toggle("on", active);
                item.setAttribute("aria-selected", active);
                document.getElementById("panel-" + item.dataset.tab).hidden = !active;
            });
        });
    });

    var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
        document.querySelector('a[href^="tel:"]').addEventListener("click", function (event) {
            event.preventDefault();
            if (navigator.clipboard) navigator.clipboard.writeText("+91 (11) 35656823");
            say("Number copied. Dial it from your phone.");
        });

        var mail = document.querySelector('a[href^="mailto:guesthouse"]');
        mail.href = "https://mail.google.com/mail/?view=cm&fs=1&to=guesthouse@sau.int";
        mail.target = "_blank";
        mail.rel = "noopener";
    }

    document.getElementById("ct-form").addEventListener("submit", function (event) {
        event.preventDefault();
        var name = document.getElementById("ct-name").value,
            email = document.getElementById("ct-email").value,
            subject = document.getElementById("ct-subject").value,
            message = document.getElementById("ct-msg").value,
            body = message + "\n\n" + name + " (" + email + ")";

        if (isMobile) {
            window.location.href = "mailto:guesthouse@sau.int?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        } else {
            window.open("https://mail.google.com/mail/?view=cm&fs=1&to=guesthouse@sau.int&su=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body), "_blank", "noopener");
        }
        say(isMobile ? "Opening your email app…" : "Opening Gmail…");
    });
})();

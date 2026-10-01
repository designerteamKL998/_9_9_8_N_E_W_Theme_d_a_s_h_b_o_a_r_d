document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PK BATTLE TABS
    ===================================================== */

    const pkbTabs = document.querySelectorAll(".pkb-tab");
    const pkbContents = document.querySelectorAll(".pkb-tab-content");

    pkbTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const target = tab.dataset.pkbTab;

            /* Remove active tab */
            pkbTabs.forEach(function (item) {
                item.classList.remove("pkb-tab-active");
            });

            /* Hide all content */
            pkbContents.forEach(function (content) {
                content.classList.remove("pkb-content-active");
            });

            /* Activate selected tab */
            tab.classList.add("pkb-tab-active");

            const targetContent = document.querySelector(
                '[data-pkb-content="' + target + '"]'
            );

            if (targetContent) {
                targetContent.classList.add("pkb-content-active");
            }

        });

    });


    /* =====================================================
       COUNTDOWN
    ===================================================== */

    const pkbCountdowns = document.querySelectorAll(
        "[data-pkb-countdown]"
    );

    pkbCountdowns.forEach(function (element) {

        let remaining = parseInt(
            element.dataset.pkbCountdown,
            10
        );

        function updateCountdown() {

            if (remaining <= 0) {
                element.textContent = "00 : 00 : 00";
                return;
            }

            const hours = Math.floor(
                remaining / 3600
            );

            const minutes = Math.floor(
                (remaining % 3600) / 60
            );

            const seconds = remaining % 60;

            element.textContent =
                String(hours).padStart(2, "0") +
                " : " +
                String(minutes).padStart(2, "0") +
                " : " +
                String(seconds).padStart(2, "0");

            remaining--;

        }

        updateCountdown();

        setInterval(updateCountdown, 1000);

    });


    /* =====================================================
       JOIN BUTTON
    ===================================================== */

    const pkbJoinButtons = document.querySelectorAll(
        ".pkb-join-btn"
    );

    pkbJoinButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const originalText = button.innerHTML;

            button.innerHTML = "JOINED ✓";

            button.style.filter = "brightness(0.9)";

            setTimeout(function () {

                button.innerHTML = originalText;
                button.style.filter = "";

            }, 1500);

        });

    });


    /* =====================================================
       BATTLE SELECT
    ===================================================== */

    const pkbBattleSelect = document.querySelector(
        ".pkb-battle-select"
    );

    if (pkbBattleSelect) {

        pkbBattleSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "Selected battle:",
                    this.value
                );

                /*
                    Add AJAX/API here later if required.
                */

            }
        );

    }

});
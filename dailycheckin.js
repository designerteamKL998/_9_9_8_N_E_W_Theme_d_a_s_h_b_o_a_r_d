document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const dciDays =
        document.getElementById("dciDays");

    const dciRewardTitle =
        document.getElementById("dciRewardTitle");

    const dciRewardContent =
        document.getElementById("dciRewardContent");

    const dciCheckinButton =
        document.getElementById("dciCheckinButton");

    const dciStatus =
        document.getElementById("dciStatus");

    const dciProgressText =
        document.getElementById("dciProgressText");

    const dciProgressBar =
        document.getElementById("dciProgressBar");


    /* =====================================================
       REWARD DATA
    ===================================================== */

    const dciRewards = {

        7: {
            amount: "$5.00",
            date: "2026-09-29 12:00"
        },

        14: {
            amount: "$5.00",
            date: "2026-10-06 12:00"
        },

        21: {
            amount: "$5.00",
            date: "2026-10-13 12:00"
        },

        28: {
            amount: "$15.00",
            date: "2026-10-20 12:00"
        }

    };


    /* =====================================================
       SUIT ICONS
    ===================================================== */

    const dciSuits = [
        "♠",
        "♥",
        "♣",
        "♦"
    ];


    /* =====================================================
       STATE
    ===================================================== */

    let dciSelectedDay = null;

   let dciCheckedDays = new Set();
        new Set(
            JSON.parse(
                localStorage.getItem(
                    "dciCheckedDays"
                ) || "[]"
            )
        );





    /* =====================================================
       GET SUIT
    ===================================================== */

    function dciGetSuit(day) {

        return dciSuits[
            (day - 1) % dciSuits.length
        ];

    }


    /* =====================================================
       CREATE DAY
    ===================================================== */

    function dciCreateDay(day) {

        const dciDay =
            document.createElement("button");


        dciDay.type =
            "button";


        dciDay.classList.add(
            "dci-day"
        );


        /*
            Reward days:
            7 / 14 / 21 / 28
        */

        if (dciRewards[day]) {

            dciDay.classList.add(
                "dci-reward"
            );

        }


        /*
            Already checked
        */

        if (
            dciCheckedDays.has(day)
        ) {

            dciDay.classList.add(
                "dci-checked"
            );

        }


        dciDay.dataset.day =
            day;


        const dciSymbol =
            dciRewards[day]
                ? "🎁"
                : dciGetSuit(day);


        dciDay.innerHTML = `

            <span class="dci-day-label">
                DAY
            </span>

            <strong class="dci-day-number">
                ${day}
            </strong>

            <span class="dci-day-symbol">
                ${dciSymbol}
            </span>

        `;


        /*
            Click day
        */

        dciDay.addEventListener(
            "click",
            function () {

                dciSelectDay(day);

            }
        );


        dciDays.appendChild(
            dciDay
        );

    }


    /* =====================================================
       RENDER ALL DAYS
    ===================================================== */

    function dciRenderDays() {

        dciDays.innerHTML =
            "";


        for (
            let day = 1;
            day <= 28;
            day++
        ) {

            dciCreateDay(day);

        }


        dciUpdateProgress();

    }


    /* =====================================================
       SELECT DAY
    ===================================================== */

    function dciSelectDay(day) {

        dciSelectedDay =
            day;


        /*
            Selected visual
        */

        document
            .querySelectorAll(
                ".dci-day"
            )
            .forEach(
                function (card) {

                    card.classList.toggle(
                        "dci-selected",
                        Number(
                            card.dataset.day
                        ) === day
                    );

                }
            );


        const reward =
            dciRewards[day];


        /*
            NO REWARD DAY
        */

        if (!reward) {

            dciRewardTitle.textContent =
                `Day ${day}`;


            dciRewardContent.innerHTML = `

                <div class="dci-reward-empty">

                    <i class="fa-solid fa-gift"></i>

                    <strong>
                        No reward
                    </strong>

                    <p>
                        Keep checking in
                        to unlock your next reward.
                    </p>

                </div>

            `;


            dciCheckinButton.disabled =
                dciCheckedDays.has(day);


            if (
                dciCheckedDays.has(day)
            ) {

                dciStatus.textContent =
                    `Day ${day} already checked in.`;

            } else {

                dciStatus.textContent =
                    `Day ${day} selected.`;

            }


            return;

        }


        /*
            REWARD DAY
        */

        dciRewardTitle.textContent =
            `Day ${day} Reward`;


        dciRewardContent.innerHTML = `

            <div class="dci-reward-list">

                <div class="dci-reward-item">

                    <h3>
                        Day ${day}
                        -
                        <span>
                            ${reward.amount}
                        </span>
                    </h3>

                    <p>
                        Can claim at

                        <span class="dci-reward-date">
                            ${reward.date}
                            (GMT+08:00)
                        </span>
                    </p>

                </div>

            </div>

        `;


        /*
            Disable button if checked
        */

        dciCheckinButton.disabled =
            dciCheckedDays.has(day);


        if (
            dciCheckedDays.has(day)
        ) {

            dciStatus.textContent =
                `Day ${day} already checked in.`;

        } else {

            dciStatus.textContent =
                `Day ${day} selected. Click Check-in to claim.`;

        }

    }


    /* =====================================================
       UPDATE PROGRESS
    ===================================================== */

    function dciUpdateProgress() {

        const totalDays =
            28;

        const completedDays =
            dciCheckedDays.size;


        dciProgressText.textContent =
            `${completedDays} / ${totalDays} DAYS`;


        const percentage =
            Math.min(
                (
                    completedDays /
                    totalDays
                ) * 100,
                100
            );


        dciProgressBar.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       CHECK-IN BUTTON
    ===================================================== */

    dciCheckinButton.addEventListener(
        "click",
        function () {

            /*
                Nothing selected
            */

            if (
                !dciSelectedDay
            ) {

                return;

            }


            /*
                Already checked
            */

            if (
                dciCheckedDays.has(
                    dciSelectedDay
                )
            ) {

                return;

            }


            /*
                Add checked day
            */

            dciCheckedDays.add(
                dciSelectedDay
            );


            /*
                Re-render calendar
            */

            dciRenderDays();


            /*
                Restore selected day
            */

            dciSelectDay(
                dciSelectedDay
            );


            dciCheckinButton.disabled =
                true;


            dciStatus.textContent =
                `Day ${dciSelectedDay} checked in successfully.`;

        }
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    dciRenderDays();

});

document.addEventListener("DOMContentLoaded", function () {

    const termsCard = document.querySelector(".dci-terms-card");
    const termsHeader = document.querySelector(".dci-terms-header");

    if (!termsCard || !termsHeader) return;

    termsHeader.addEventListener("click", function () {

        if (window.innerWidth <= 768) {
            termsCard.classList.toggle("dci-open");
        }

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const checkinWrap = document.querySelector(".dci-checkin-wrap");
    const mobileCheckin = document.querySelector(".dci-mobile-checkin");
    const rewardCard = document.querySelector(".dci-reward-card");

    if (!checkinWrap || !mobileCheckin || !rewardCard) return;

    const originalParent = rewardCard;

    function moveCheckin() {

        if (window.innerWidth <= 768) {

            // Move to below calendar
            if (!mobileCheckin.contains(checkinWrap)) {
                mobileCheckin.appendChild(checkinWrap);
            }

        } else {

            // Move back to Reward Card
            if (!originalParent.contains(checkinWrap)) {
                originalParent.appendChild(checkinWrap);
            }

        }
    }

    moveCheckin();

    window.addEventListener("resize", moveCheckin);

});
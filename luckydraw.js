// JavaScript source code
/* =========================================================
   SPIN & WIN
   PREFIX: sw-
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const swWheel = document.getElementById("swWheel");
    const swSpinBtn = document.getElementById("swSpinBtn");
    const swSpinCount = document.getElementById("swSpinCount");

    const swHistoryEmpty =
        document.getElementById("swHistoryEmpty");

    const swHistoryList =
        document.getElementById("swHistoryList");


    /* =====================================================
       CONFIG
    ===================================================== */

    let swCurrentRotation = 0;

    let swSpinsAvailable = 0;

    /*
        Prize order follows wheel clockwise
    */

    const swPrizes = [
        {
            name: "$888",
            reward: "$888"
        },
        {
            name: "iPhone 17 Pro Max 2TB",
            reward: "iPhone 17 Pro Max 2TB"
        },
        {
            name: "Lucky",
            reward: "Lucky"
        },
        {
            name: "Please Try Again!",
            reward: "Try Again"
        },
        {
            name: "$0",
            reward: "$0"
        },
        {
            name: "$1",
            reward: "$1"
        },
        {
            name: "$5",
            reward: "$5"
        },
        {
            name: "$88",
            reward: "$88"
        }
    ];


    /* =====================================================
       UPDATE SPIN COUNT
    ===================================================== */

    function swUpdateSpinCount() {

        swSpinCount.textContent = swSpinsAvailable;

        if (swSpinsAvailable <= 0) {

            swSpinBtn.disabled = true;

        } else {

            swSpinBtn.disabled = false;

        }
    }


    /* =====================================================
       GET TIME
    ===================================================== */

    function swGetTime() {

        const now = new Date();

        const date =
            now.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );

        const time =
            now.toLocaleTimeString(
                "en-GB",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

        return `${date} ${time}`;
    }


    /* =====================================================
       ADD HISTORY
    ===================================================== */

    function swAddHistory(prize) {

        swHistoryEmpty.style.display = "none";

        const row =
            document.createElement("div");

        row.className = "sw-history-row";

        row.innerHTML = `
            <span>${swGetTime()}</span>
            <span>${prize.name}</span>
            <span class="sw-history-reward">
                ${prize.reward}
            </span>
        `;

        swHistoryList.prepend(row);
    }


    /* =====================================================
       CALCULATE WINNER
    ===================================================== */

    function swSpin() {

        if (swSpinsAvailable <= 0) {
            return;
        }

        swSpinsAvailable--;

        swUpdateSpinCount();

        swSpinBtn.classList.add("sw-spinning");

        swSpinBtn.disabled = true;


        /*
            Random segment

            0 = $888
            1 = iPhone
            2 = Lucky
            3 = Try Again
            4 = $0
            5 = $1
            6 = $5
            7 = $88
        */

        const winner =
            Math.floor(
                Math.random() * swPrizes.length
            );


        /*
            Each segment = 45 degrees.

            Pointer is at top.

            Calculate target angle.
        */

        const segmentAngle = 45;

        const targetAngle =
            360 -
            (winner * segmentAngle + segmentAngle / 2);


        /*
            Add multiple rotations
            for realistic spinning.
        */

        const extraRotation =
            360 * (5 + Math.floor(Math.random() * 3));


        swCurrentRotation +=
            extraRotation +
            targetAngle;


        swWheel.style.transform =
            `rotate(${swCurrentRotation}deg)`;


        /*
            Wait for animation
        */

        setTimeout(function () {

            swSpinBtn.classList.remove(
                "sw-spinning"
            );

            swAddHistory(
                swPrizes[winner]
            );

            /*
                If spins remain,
                allow another spin.
            */

            swUpdateSpinCount();

        }, 5100);
    }


    /* =====================================================
       BUTTON EVENT
    ===================================================== */

    swSpinBtn.addEventListener(
        "click",
        swSpin
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    swUpdateSpinCount();


    /* =====================================================
       OPTIONAL TEST MODE

       Untuk testing sahaja.
       Uncomment line bawah kalau nak
       bagi 3 spin secara default.
    ===================================================== */

    // swSpinsAvailable = 3;
    // swUpdateSpinCount();

});
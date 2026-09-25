document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const quickButtons = document.querySelectorAll(".quick-btn");
    const topTabs = document.querySelectorAll(".top-tab");

    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");

    const searchBtn = document.getElementById("searchBtn");

    const selectedPeriod =
        document.getElementById("selectedPeriod");

    const recordCount =
        document.getElementById("recordCount");

    const transactionBody =
        document.getElementById("transactionBody");


    /* =====================================================
       DATE FUNCTIONS
    ===================================================== */

    function formatDate(date) {

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    function formatDisplayDate(dateString) {

        const date = new Date(
            dateString + "T00:00:00"
        );

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }


    /* =====================================================
       SET DEFAULT DATE
       Last 7 Days
    ===================================================== */

    function setDefaultDates() {

        const today = new Date();

        const start = new Date(today);

        start.setDate(
            today.getDate() - 6
        );

        startDate.value =
            formatDate(start);

        endDate.value =
            formatDate(today);

    }

    setDefaultDates();


    /* =====================================================
       QUICK DATE BUTTONS
    ===================================================== */

    quickButtons.forEach(button => {

        button.addEventListener("click", () => {

            /* Remove active */
            quickButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            /* Add active */
            button.classList.add("active");

            const days =
                Number(button.dataset.days);

            const today = new Date();

            const start = new Date(today);

            start.setDate(
                today.getDate() - (days - 1)
            );


            /* Update input */
            startDate.value =
                formatDate(start);

            endDate.value =
                formatDate(today);


            /* Update label */
            selectedPeriod.textContent =
                `Last ${days} Days`;


            /* Reset transaction display */
            showEmptyState();

        });

    });


    /* =====================================================
       CUSTOM DATE SEARCH
    ===================================================== */

    searchBtn.addEventListener("click", () => {

        const start = startDate.value;
        const end = endDate.value;


        /* Check empty */
        if (!start || !end) {

            showMessage(
                "Please select both start and end dates."
            );

            return;
        }


        /* Check invalid range */
        if (
            new Date(start) >
            new Date(end)
        ) {

            showMessage(
                "Start date cannot be later than end date."
            );

            return;
        }


        /* Remove quick active */
        quickButtons.forEach(button => {
            button.classList.remove("active");
        });


        /* Update period */
        selectedPeriod.textContent =
            `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`;


        /*
         * IMPORTANT:
         * API call can be added here later.
         */

        searchTransactions(start, end);

    });


    /* =====================================================
       SEARCH TRANSACTIONS
    ===================================================== */

    function searchTransactions(start, end) {

        console.log("Searching transactions:");

        console.log({
            startDate: start,
            endDate: end
        });


        /*
         * Example API:
         *
         * fetch("/api/transactions", {
         *
         *     method: "POST",
         *
         *     headers: {
         *         "Content-Type": "application/json"
         *     },
         *
         *     body: JSON.stringify({
         *         startDate: start,
         *         endDate: end
         *     })
         *
         * })
         *
         * .then(response => response.json())
         *
         * .then(data => {
         *
         *     renderTransactions(data);
         *
         * })
         *
         * .catch(error => {
         *
         *     console.error(error);
         *
         * });
         */


        /* Temporary empty state */
        showEmptyState();

    }


    /* =====================================================
       EMPTY STATE
    ===================================================== */

    function showEmptyState() {

        recordCount.textContent =
            "0 records";


        transactionBody.innerHTML = `

            <tr class="empty-row">

                <td colspan="9">

                    <div class="empty-state">

                        <div class="empty-icon">

                            <i class="fa-regular fa-file-lines"></i>

                            <i class="fa-solid fa-magnifying-glass"></i>

                        </div>

                        <h3>
                            No transactions found
                        </h3>

                        <p>
                            There are no records for the selected date range.
                        </p>

                    </div>

                </td>

            </tr>

        `;

    }


    /* =====================================================
       SHOW MESSAGE
    ===================================================== */

    function showMessage(message) {

        alert(message);

    }


    /* =====================================================
       TOP TABS
    ===================================================== */

    topTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            topTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");


            const tabName =
                tab.dataset.tab;


            console.log(
                "Selected tab:",
                tabName
            );


            /*
             * Kalau nak tukar page:
             *
             * if (tabName === "mybets") {
             *     window.location.href = "/mybets";
             * }
             */


        });

    });


    /* =====================================================
       RENDER TRANSACTIONS
       Untuk API nanti
    ===================================================== */

    function renderTransactions(data) {

        if (!Array.isArray(data) || data.length === 0) {

            showEmptyState();

            return;
        }


        recordCount.textContent =
            `${data.length} records`;


        transactionBody.innerHTML = "";


        data.forEach((transaction, index) => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${transaction.date || "-"}
                </td>

                <td>
                    ${transaction.type || "-"}
                </td>

                <td>
                    ${transaction.description || "-"}
                </td>

                <td>
                    ${transaction.amount || "0.00"}
                </td>

                <td>
                    ${transaction.balance || "0.00"}
                </td>

                <td>
                    ${transaction.status || "-"}
                </td>

                <td>
                    ${transaction.reference || "-"}
                </td>

                <td>

                    <button
                        type="button"
                        class="view-btn"
                        data-id="${transaction.id || ""}"
                    >
                        View
                    </button>

                </td>

            `;


            transactionBody.appendChild(row);

        });

    }


    /* =====================================================
       VIEW TRANSACTION
    ===================================================== */

    transactionBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(".view-btn");


            if (!button) return;


            const transactionId =
                button.dataset.id;


            console.log(
                "View transaction:",
                transactionId
            );

        }
    );


    /* =====================================================
       DATE INPUT CHANGE
    ===================================================== */

    startDate.addEventListener("change", () => {

        quickButtons.forEach(button => {
            button.classList.remove("active");
        });

    });


    endDate.addEventListener("change", () => {

        quickButtons.forEach(button => {
            button.classList.remove("active");
        });

    });


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    showEmptyState();

});


//statement
document.addEventListener("DOMContentLoaded", function () {

    const dropdown = document.getElementById("mbDropdown");
    const selected = dropdown.querySelector(".mb-dropdown-selected");
    const selectedText = selected.querySelector("span");
    const options = dropdown.querySelectorAll(".mb-dropdown-option");

    /* OPEN / CLOSE */
    selected.addEventListener("click", function (e) {
        e.stopPropagation();

        dropdown.classList.toggle("open");
    });


    /* SELECT OPTION */
    options.forEach(option => {

        option.addEventListener("click", function (e) {

            e.stopPropagation();

            selectedText.textContent = this.textContent.trim();

            options.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            dropdown.classList.remove("open");
        });

    });


    /* CLICK OUTSIDE */
    document.addEventListener("click", function () {
        dropdown.classList.remove("open");
    });

});

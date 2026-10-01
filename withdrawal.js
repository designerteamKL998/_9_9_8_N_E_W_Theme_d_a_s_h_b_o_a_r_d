document.addEventListener("DOMContentLoaded", () => {

   /* =====================================================
       ELEMENTS
    ===================================================== */

    const methods = document.querySelectorAll(".wdr-method");
    const views = document.querySelectorAll(".wdr-view");

    const bankRows = document.querySelectorAll(".wdr-bank-row");
    const bankAmount = document.querySelector(".wdr-bank-amount");
    const bankQuick = document.querySelectorAll("[data-bank-amount]");

    const bankName = document.getElementById("wdrBankName");
    const bankAccount = document.getElementById("wdrBankAccount");
    const bankTotal = document.getElementById("wdrBankTotal");
    const bankReceive = document.getElementById("wdrBankReceive");

    const ewalletAmount = document.querySelector(".wdr-ewallet-amount");
    const ewalletQuick = document.querySelectorAll("[data-ewallet-amount]");
    const ewalletTotal = document.getElementById("wdrEwalletTotal");
    const ewalletReceive = document.getElementById("wdrEwalletReceive");

    const modal = document.getElementById("wdrBankModal");
    const addBank = document.getElementById("wdrAddBank");
    const closeBank = document.getElementById("wdrCloseBank");
    const bankForm = document.getElementById("wdrBankForm");
    const toast = document.getElementById("wdrToast");


    /* =====================================================
       HELPERS
    ===================================================== */

    function money(value) {
        const number = Number(value) || 0;
        return number.toLocaleString("en-MY", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    let toastTimer;

    function showToast(message, type = "success") {
        clearTimeout(toastTimer);

        toast.textContent = message;
        toast.className = "wdr-toast is-show " +
            (type === "error" ? "is-error" : "is-success");

        toastTimer = setTimeout(() => {
            toast.classList.remove("is-show");
        }, 2800);
    }


    /* =====================================================
       METHOD SWITCH
       IMPORTANT:
       Only one view exists visually at a time.
    ===================================================== */

    methods.forEach(method => {
        method.addEventListener("click", () => {

            const target = method.dataset.method;

            methods.forEach(item => {
                item.classList.toggle(
                    "is-active",
                    item === method
                );
            });

            views.forEach(view => {
                view.classList.toggle(
                    "is-visible",
                    view.dataset.view === target
                );
            });

        });
    });


    /* =====================================================
       BANK SELECTION
    ===================================================== */

    function bindBankRow(row) {
        row.addEventListener("click", () => {

            bankRows.forEach(item => {
                item.classList.remove("is-selected");
            });

            row.classList.add("is-selected");

            bankName.textContent = row.dataset.bank;
            bankAccount.textContent = row.dataset.account;

        });
    }

    bankRows.forEach(bindBankRow);


    /* =====================================================
       BANK AMOUNT
    ===================================================== */

    function updateBankAmount() {
        const value = Number(bankAmount.value) || 0;

        bankTotal.textContent = `MYR ${money(value)}`;
        bankReceive.textContent = `MYR ${money(value)}`;

        bankQuick.forEach(button => {
            button.classList.toggle(
                "is-active",
                Number(button.dataset.bankAmount) === value
            );
        });
    }

    bankAmount.addEventListener("input", updateBankAmount);

    bankQuick.forEach(button => {
        button.addEventListener("click", () => {
            bankAmount.value = button.dataset.bankAmount;
            updateBankAmount();
        });
    });


    /* =====================================================
       EWALLET AMOUNT
    ===================================================== */

    function updateEwalletAmount() {
        const value = Number(ewalletAmount.value) || 0;

        ewalletTotal.textContent = `MYR ${money(value)}`;
        ewalletReceive.textContent = `MYR ${money(value)}`;

        ewalletQuick.forEach(button => {
            button.classList.toggle(
                "is-active",
                Number(button.dataset.ewalletAmount) === value
            );
        });
    }

    ewalletAmount.addEventListener("input", updateEwalletAmount);

    ewalletQuick.forEach(button => {
        button.addEventListener("click", () => {
            ewalletAmount.value = button.dataset.ewalletAmount;
            updateEwalletAmount();
        });
    });


    /* =====================================================
       ADD BANK MODAL
    ===================================================== */

    addBank.addEventListener("click", () => {
        modal.classList.add("is-open");
    });

    closeBank.addEventListener("click", () => {
        modal.classList.remove("is-open");
    });

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("is-open");
        }
    });


    /* =====================================================
       ADD BANK
    ===================================================== */

    bankForm.addEventListener("submit", event => {
        event.preventDefault();

        const bank = document.getElementById("wdrNewBank").value;
        const account = document.getElementById("wdrNewAccount").value.trim();
        const location = document.getElementById("wdrNewLocation").value.trim();

        if (!bank || !account || !location) {
            showToast("Please complete all bank details.", "error");
            return;
        }

        const row = document.createElement("button");
        row.type = "button";
        row.className = "wdr-bank-row";

        let logoClass = "wdr-logo-cimb";
        if (bank === "Maybank") logoClass = "wdr-logo-maybank";
        if (bank === "Hong Leong Bank") logoClass = "wdr-logo-hlb";

        row.dataset.bank = bank;
        row.dataset.account = account;
        row.dataset.location = location;

        row.innerHTML = `
            <span class="wdr-bank-logo ${logoClass}">✣</span>
            <span class="wdr-bank-data">
                <strong>${escapeHtml(bank)}</strong>
                <span>${escapeHtml(account)}</span>
                <small>${escapeHtml(location)}</small>
            </span>
            <span class="wdr-radio"></span>
        `;

        document.getElementById("wdrBankList").appendChild(row);
        bindBankRow(row);
        row.click();

        bankForm.reset();
        modal.classList.remove("is-open");

        showToast("Bank account added successfully.");
    });


    /* =====================================================
       WALLET ADDRESS
    ===================================================== */

    document.getElementById("wdrSetWallet").addEventListener("click", () => {
        showToast("Wallet address setup can be connected to your wallet modal.");
    });


    /* =====================================================
       SUBMIT
    ===================================================== */

    document.querySelectorAll("[data-submit]").forEach(button => {

        button.addEventListener("click", () => {

            const type = button.dataset.submit;
            const input = type === "bank" ? bankAmount : ewalletAmount;
            const value = Number(input.value) || 0;

            if (value < 50) {
                showToast("Minimum withdrawal amount is MYR 50.", "error");
                input.focus();
                return;
            }

            if (type === "ewallet") {
                showToast("Please make sure your SKLPay wallet is verified.");
                return;
            }

            showToast(
                `Withdrawal request submitted: MYR ${money(value)}`
            );
        });

    });


    /* =====================================================
       SAFE TEXT
    ===================================================== */

    function escapeHtml(value) {
        return value.replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char]));
    }


    updateBankAmount();
    updateEwalletAmount();

});

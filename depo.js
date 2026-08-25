// =========================================
// ELEMENTS
// =========================================

const methods = document.querySelectorAll(".payment-method");
const flows = document.querySelectorAll(".deposit-flow");

const chooseBank = document.querySelector(".choose-bank-step");

const depositRight = document.querySelector(".deposit-right");
const rightBank = document.querySelector(".right-bank-layout");
const rightGateway = document.querySelector(".right-gateway-layout");


// =========================================
// RIGHT LAYOUT
// =========================================

function hideRight() {

    rightBank?.classList.remove("active");
    rightGateway?.classList.remove("active");

    depositRight?.classList.remove("show");

}


function showBankRight() {

    rightGateway?.classList.remove("active");
    rightBank?.classList.add("active");

    depositRight?.classList.add("show");

}


function showGatewayRight(card) {

    rightBank?.classList.remove("active");
    rightGateway?.classList.add("active");

    depositRight?.classList.add("show");


    // Gateway logo
    const cardImg = card.querySelector("img");
    const rightImg = rightGateway?.querySelector(
        ".gateway-logo img"
    );

    if (cardImg && rightImg) {

        rightImg.src = cardImg.src;
        rightImg.alt = cardImg.alt;

    }


    // Gateway name
    const cardName = card.querySelector("span");
    const rightName = rightGateway?.querySelector(
        ".gateway-name"
    );

    if (cardName && rightName) {

        rightName.textContent =
            cardName.textContent.trim();

    }


    // Payment Method
    const methodName =
        card.dataset.methodName;

    const rightMethod =
        rightGateway?.querySelector(
            ".right-payment-method"
        );

    if (methodName && rightMethod) {

        rightMethod.textContent =
            methodName;

    }

}


// =========================================
// PAYMENT METHOD
// =========================================

methods.forEach(btn => {

    btn.addEventListener("click", () => {

        // Active payment method
        methods.forEach(item => {
            item.classList.remove("active");
        });

        btn.classList.add("active");


        // Hide right first
        hideRight();


        // Hide all left flows
        flows.forEach(flow => {
            flow.classList.remove("active");
        });


        // Show selected left flow
        const selectedFlow = document.querySelector(
            `.deposit-flow.${btn.dataset.method}`
        );

        if (selectedFlow) {
            selectedFlow.classList.add("active");
        }


        // Reset gateway
        document
            .querySelectorAll(".gateway-card")
            .forEach(card => {
                card.classList.remove("active");
            });


        // Hide Choose Bank first
        chooseBank?.classList.remove("show");


        // =====================================
        // BANK-IN
        // =====================================

        if (btn.dataset.method === "bank") {

            // Choose Bank is visible immediately
            chooseBank?.classList.add("show");


            // Desktop:
            // Right side appears immediately
            if (window.innerWidth > 1024) {
                showBankRight();
            }

            // Responsive <= 1024:
            // Right side stays hidden
            // until user selects a bank
        }

    });

});

//currency-dropdown

const currencyDropdown = document.querySelector(".currency-dropdown");
const currencyBtn = currencyDropdown?.querySelector(".currency-btn");
const currencyValue = currencyDropdown?.querySelector(".currency-value");

currencyBtn?.addEventListener("click", (e) => {
    e.stopPropagation();

    currencyDropdown.classList.toggle("open");
});


currencyDropdown?.querySelectorAll(".currency-menu button").forEach(option => {

    option.addEventListener("click", (e) => {

        e.stopPropagation();

        currencyValue.textContent = option.dataset.currency;

        currencyDropdown.classList.remove("open");

    });

});


document.addEventListener("click", () => {
    currencyDropdown?.classList.remove("open");
});


//copy

function copyAccountNumber(button, value) {
    navigator.clipboard.writeText(value).then(() => {

        const originalIcon = button.innerHTML;

        // Tukar kepada copied state
        button.innerHTML = '<i class="fa-solid fa-check"></i>';
        button.classList.add('copied');
        button.setAttribute('title', 'Copied!');

        // Kembali kepada icon asal selepas 2 saat
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.classList.remove('copied');
            button.setAttribute('title', 'Copy');
        }, 2000);

    }).catch(() => {
        console.error('Failed to copy');
    });
}


// =========================================
// CUSTOM DROPDOWN
// =========================================

document.addEventListener("click", e => {

    const dropdownBtn =
        e.target.closest(".custom-dropdown-btn");

    const option =
        e.target.closest(".custom-dropdown-option");


    // OPEN / CLOSE
    if (dropdownBtn) {

        const dropdown =
            dropdownBtn.closest(".custom-dropdown");


        document
            .querySelectorAll(".custom-dropdown.open")
            .forEach(item => {

                if (item !== dropdown) {
                    item.classList.remove("open");
                }

            });


        dropdown.classList.toggle("open");

        return;
    }


    // SELECT OPTION
    if (option) {

        const dropdown =
            option.closest(".custom-dropdown");

        const value =
            dropdown?.querySelector(
                ".custom-dropdown-value"
            );

        const img =
            option.querySelector("img");


        // Update selected text
        const text =
            option.textContent.trim();

        const textElement =
            value?.querySelector("span:last-child");

        if (textElement) {
            textElement.textContent = text;
        }


        // Update selected logo
        if (img) {

            const valueImg =
                value?.querySelector("img");

            if (valueImg) {
                valueImg.src = img.src;
            }

        }


        dropdown.classList.remove("open");


        // =====================================
        // CHOOSE BANK
        // =====================================

        const bankStep =
            option.closest(".choose-bank-step");

        if (bankStep) {

            // Update right bank name
            const rightBankName =
                rightBank?.querySelector(
                    ".right-bank-name"
                );

            if (rightBankName) {
                rightBankName.textContent = text;
            }


            // Update right bank logo
            if (img) {

                const rightBankImg =
                    rightBank?.querySelector(
                        ".bank-main-icon img"
                    );

                if (rightBankImg) {

                    rightBankImg.src = img.src;
                    rightBankImg.alt = img.alt;

                }

            }


            // Show bank right
            showBankRight();

            return;
        }


        return;
    }


    // CLOSE ALL DROPDOWNS
    document
        .querySelectorAll(".custom-dropdown.open")
        .forEach(item => {
            item.classList.remove("open");
        });

});


// =========================================
// GATEWAY
// =========================================

document.addEventListener("click", e => {

    const card =
        e.target.closest(".gateway-card");

    if (!card) return;


    // Active gateway
    document
        .querySelectorAll(".gateway-card")
        .forEach(item => {
            item.classList.remove("active");
        });

    card.classList.add("active");


    const needsBank =
        card.dataset.chooseBank === "true";


    // =====================================
    // NEEDS BANK
    // =====================================

    if (needsBank) {

        // Hide right until bank selected
        hideRight();

        // Show Choose Bank
        chooseBank?.classList.add("show");

        return;
    }


    // =====================================
    // DOES NOT NEED BANK
    // =====================================

    chooseBank?.classList.remove("show");

    showGatewayRight(card);

});


// =========================================
// QUICK AMOUNT
// =========================================

document.addEventListener("click", e => {

    const quickBtn =
        e.target.closest(
            ".quick-amounts button[data-amount]"
        );

    if (!quickBtn) return;


    const input =
        rightGateway?.querySelector(
            ".gateway-amount-input"
        );

    if (!input) return;


    const amount =
        Number(quickBtn.dataset.amount);


    input.value = amount;


    // Update display
    const display =
        rightGateway?.querySelector(
            ".amount-display strong"
        );

    if (display) {

        display.textContent =
            amount.toFixed(2);

    }

});


// =========================================
// AMOUNT DISPLAY
// =========================================

document.addEventListener("input", e => {

    const input = e.target.closest(".gateway-amount-input");

    if (!input) return;

    const amount = Number(input.value || 0);

    // Cari display yang berada dalam
    // amount-input-new yang sama
    const amountBox = input.closest(".amount-input-new");

    if (!amountBox) return;

    const display =
        amountBox.querySelector(".amount-display strong");

    if (display) {
        display.textContent = amount.toFixed(2);
    }

});

// =========================================
// COPY ACCOUNT
// =========================================

document.addEventListener("click", e => {

    const btn =
        e.target.closest(".copy-btn");

    if (!btn) return;


    const card =
        btn.closest(".bank-info-card");

    if (!card) return;


    const details =
        card.querySelectorAll(
            ".bank-detail strong"
        );


    const account =
        details[details.length - 1]
            ?.textContent
            .replace(/\s/g, "");


    if (!account) return;


    navigator.clipboard.writeText(account);

});


// =========================================
// UPLOAD
// =========================================

document.addEventListener("change", e => {

    if (e.target.id !== "depositSlip") {
        return;
    }


    const file =
        e.target.files[0];

    if (!file) return;


    const text =
        e.target
            .closest(".upload-box")
            ?.querySelector(
                ".upload-text"
            );


    if (!text) return;


    text.innerHTML = `
        <strong>${file.name}</strong>
        <span>File selected successfully</span>
    `;

});


// =========================================
// SUBMIT / CONFIRM
// =========================================

document.addEventListener("click", e => {

    const btn =
        e.target.closest(".deposit-submit");

    if (!btn) return;


    // =====================================
    // BANK RIGHT
    // =====================================

    const bankLayout =
        btn.closest(".right-bank-layout");

    if (bankLayout) {

        const input =
            bankLayout.querySelector(
                "input[type='number']"
            );

        if (!input) return;


        const amount =
            Number(input.value);


        if (!amount) {

            alert(
                "Please enter deposit amount."
            );

            return;

        }


        if (amount < 30) {

            alert(
                "Minimum deposit is RM 30.00."
            );

            return;

        }


        if (amount > 50000) {

            alert(
                "Maximum deposit is RM 50,000.00."
            );

            return;

        }


        // Valid
        return;
    }


    // =====================================
    // GATEWAY RIGHT
    // =====================================

    const gatewayLayout =
        btn.closest(".right-gateway-layout");

    if (gatewayLayout) {

        const input =
            gatewayLayout.querySelector(
                ".gateway-amount-input"
            );

        if (!input) return;


        const amount =
            Number(input.value);


        if (!amount) {

            alert(
                "Please enter deposit amount."
            );

            return;

        }


        if (amount < 10) {

            alert(
                "Minimum deposit is RM 10.00."
            );

            return;

        }


        if (amount > 50000) {

            alert(
                "Maximum deposit is RM 50,000.00."
            );

            return;

        }


        // Valid
        return;
    }

});


// =========================================
// DEFAULT
// =========================================

document
    .querySelector(".payment-method.active")
    ?.click();
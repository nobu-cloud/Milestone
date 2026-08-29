document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("#contact-form");

    if (form) {
        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.innerText = "Show Office Hours & Info";
        toggleBtn.style.backgroundColor = "#818CF8";
        toggleBtn.style.color = "#181e24";
        toggleBtn.style.border = "none";
        toggleBtn.style.padding = "10px 16px";
        toggleBtn.style.marginBottom = "20px";
        toggleBtn.style.borderRadius = "8px";
        toggleBtn.style.fontWeight = "600";
        toggleBtn.style.width = "100%";

        const infoBox = document.createElement("div");
        infoBox.style.display = "none";
        infoBox.style.padding = "12px 16px";
        infoBox.style.marginBottom = "20px";
        infoBox.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
        infoBox.style.border = "1px solid rgba(42, 210, 235, 0.2)";
        infoBox.style.borderRadius = "8px";
        infoBox.style.fontSize = "0.95rem";
        infoBox.innerHTML = "<p style='margin:0;'><strong>Office Hours:</strong> Monday & Wednesday, 6:00 PM to 7:00 PM PST<br><strong>Location:</strong> Dev 140, Auditorium, CampusWire</p>";

        form.parentNode.insertBefore(toggleBtn, form);
        form.parentNode.insertBefore(infoBox, form);

        toggleBtn.addEventListener("click", function () {
            if (infoBox.style.display === "none") {
                infoBox.style.display = "block";
                toggleBtn.innerText = "Hide Office Hours & Info";
            } else {
                infoBox.style.display = "none";
                toggleBtn.innerText = "Show Office Hours & Info";
            }
        });
    }

    const validDomains = ["@yahoo.com", "@gmail.com", "@live.com", "@hotmail.com", "@icloud.com", "@protonmail.com", "@outlook.com", "@aol.com", "@proton.me", "tutanota.com"];

    const nameInput = document.querySelector("#user-name");
    const emailInput = document.querySelector("#user-email");
    const messageInput = document.querySelector("#user-message");
    const successMsg = document.querySelector("#form-success");

    function showError(inputElement, errorSpan, customMsg) {
        const container = inputElement.closest(".form-field");
        if (container) {
            container.classList.add("has-error");
        }
        if (errorSpan) {
            errorSpan.innerText = customMsg;
        }
        inputElement.setAttribute("aria-invalid", "true");
    }


    function clearError(inputElement) {
        const container = inputElement.closest(".form-field");
        if (container) {
            container.classList.remove("has-error");
        }
        inputElement.removeAttribute("aria-invalid");
    }


    function validateName() {
        const nameValue = nameInput.value.trim();
        const words = nameValue.split(/\s+/).filter(word => word.length > 0);
        const errorSpan = document.querySelector("#name-error");

        if (nameValue === "") {
            showError(nameInput, errorSpan, "Please enter your full name.");
            return false;
        } else if (words.length < 2) {
            showError(nameInput, errorSpan, "Please enter both first and last name (e.g. John Doe).");
            return false;
        } else {
            clearError(nameInput);
            return true;
        }
    }


    function validateEmail() {
        const emailValue = emailInput.value.trim().toLowerCase();
        const errorSpan = document.querySelector("#email-error");

        const hasValidDomain = validDomains.some(domain => emailValue.endsWith(domain));

        if (emailValue === "") {
            showError(emailInput, errorSpan, "Please enter an email address.");
            return false;
        } else if (!hasValidDomain) {
            showError(emailInput, errorSpan, "Please enter a valid email address");
            return false;
        } else {
            clearError(emailInput);
            return true;
        }
    }

    function validateMessage() {
        const messageValue = messageInput.value.trim();
        const words = messageValue.split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        const errorSpan = document.querySelector("#message-error");

        if (messageValue === "") {
            showError(messageInput, errorSpan, "Please enter a message.");
            return false;
        } else if (wordCount < 50) {
            showError(messageInput, errorSpan, `Your message must be at least 50 words. Current count: ${wordCount} word(s).`);
            return false;
        } else {
            clearError(messageInput);
            return true;
        }
    }


    if (nameInput) {
        nameInput.addEventListener("input", validateName);
    }
    if (emailInput) {
        emailInput.addEventListener("input", validateEmail);
    }
    if (messageInput) {
        messageInput.addEventListener("input", validateMessage);
    }


    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isMessageValid) {
                form.reset();
                if (successMsg) {
                    successMsg.style.display = "block";
                }
            } else {
                if (successMsg) {
                    successMsg.style.display = "none";
                }
            }
        });
    }
});


const mainContent = document.querySelector("main");
if (mainContent) {
    const factContainer = document.createElement("div");
    factContainer.style.backgroundColor = "#ffffff08";
    factContainer.style.border = "1px solid #2ad2eb33";
    factContainer.style.borderRadius = "8px";
    factContainer.style.padding = "16px";
    factContainer.style.marginTop = "24px";
    factContainer.style.textAlign = "center";

    factContainer.innerHTML = "<h3>💡 Tech Fact of the Day</h3><p id='fact-text'>Loading fact...</p>";
    mainContent.appendChild(factContainer);

    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(function (data) {
            document.querySelector("#fact-text").innerText = data.text;
        })
        .catch(function (error) {
            console.error("Fetch error:", error);
            document.querySelector("#fact-text").innerText = "Could not load fact right now. Check back later!";
        });
};
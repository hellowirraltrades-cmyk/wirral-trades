emailjs.init({
    publicKey: "lbo2ZD2JGn-NDe8Ai",
});

document.querySelector('.menu-toggle')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
});

document.querySelectorAll('[data-trade]').forEach(btn =>
    btn.addEventListener('click', () => {
        document.getElementById('tradeSelect').value = btn.dataset.trade;
        document.getElementById('post-job').scrollIntoView({
            behavior: 'smooth'
        });
    })
);

const jobForm = document.getElementById("jobForm");

jobForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.send("service_yckjkna", "template_xtpon58", {
        name: jobForm.querySelector('input[name="name"]').value,
        phone: jobForm.querySelector('input[name="phone"]').value,
        email: jobForm.querySelector('input[name="email"]').value,
        trade: document.getElementById("tradeSelect").value,
        location: jobForm.querySelector('input[name="postcode"]').value,
        message: jobForm.querySelector("textarea").value
    })
    .then(() => {
        document.getElementById("jobMessage").innerHTML =
            "✅ Thank you! Your job request has been sent successfully.";
        document.getElementById("jobMessage").className = "form-message success";
        jobForm.reset();
    })
    .catch((error) => {
        console.log(error);
        document.getElementById("jobMessage").innerHTML =
            "❌ Sorry, something went wrong. Please try again.";
        document.getElementById("jobMessage").className = "form-message error";
    });
});

document.getElementById("year").textContent = new Date().getFullYear();

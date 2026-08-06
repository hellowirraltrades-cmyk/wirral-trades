emailjs.init({
    publicKey: "lbo2ZD2JGn-NDe8Ai",
});

const SUPABASE_URL = "https://albxdmnscsekjoirjoee.supabase.co";
const SUPABASE_KEY = "sb_publishable_gK_FzHhpv79eSJp8NhZ-7A_zMWJ2Wh1";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
const jobForm = document.getElementById("jobForm");

jobForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        name: jobForm.querySelector('input[name="name"]').value,
        phone: jobForm.querySelector('input[name="phone"]').value,
        email: jobForm.querySelector('input[name="email"]').value,
        postcode: jobForm.querySelector('input[name="postcode"]').value,
        trade: document.getElementById("tradeSelect").value,
        title: jobForm.querySelector('input[placeholder]').value,
        description: jobForm.querySelector("textarea").value
    };

    // Send Email
    try {
        await emailjs.send(
            "service_yckjkna",
            "template_xtpon58",
            {
                name: data.name,
                phone: data.phone,
                email: data.email,
                trade: data.trade,
                location: data.postcode,
                message: data.description
            }
        );

        // Save to Supabase
        await fetch(
            "https://albxdmnscsekjoirjoee.supabase.co/rest/v1/Jobs",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": "sb_publishable_gK_FzHhpv79eSJp8NhZ-7A_zMWJ2Wh1",
                    "Authorization": "Bearer sb_publishable_gK_FzHhpv79eSJp8NhZ-7A_zMWJ2Wh1",
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify(data)
            }
        );

        document.getElementById("jobMessage").innerHTML =
            "✅ Thank you! Your job request has been sent successfully.";

        document.getElementById("jobMessage").className =
            "form-message success";

        jobForm.reset();

    } catch (err) {
        console.log(err);

        document.getElementById("jobMessage").innerHTML =
            "❌ Something went wrong.";

        document.getElementById("jobMessage").className =
            "form-message error";
    }
});

document.getElementById("year").textContent = new Date().getFullYear();

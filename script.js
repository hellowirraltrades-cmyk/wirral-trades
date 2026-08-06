
       
            
  // ===============================
// EmailJS
// ===============================

emailjs.init({
    publicKey: "lbo2ZD2JGn-NDe8Ai"
});

// ===============================
// Supabase
// ===============================

const supabaseUrl = "https://albxdmnscsekjoirjoee.supabase.co";
const supabaseKey = "sb_publishable_gK_FzHhpv79eSJp8NhZ-7A_zMWJ2Wh1";

const db = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

// ===============================
// Form
// ===============================

const jobForm = document.getElementById("jobForm");

if (jobForm) {

jobForm.addEventListener("submit", async function(e){

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

try{

// Email

await emailjs.send(
"service_yckjkna",
"template_xtpon58",
{
name:data.name,
phone:data.phone,
email:data.email,
trade:data.trade,
location:data.postcode,
message:data.description
}
);

// Database

const { error } = await db
.from("Jobs")
.insert([data]);

if(error) throw error;

document.getElementById("jobMessage").innerHTML =
"✅ Thank you! Your job request has been sent successfully.";

jobForm.reset();

}catch(err){

console.error(err);

document.getElementById("jobMessage").innerHTML =
"❌ Sorry, something went wrong.";

}

});

}
// Mapbox map
mapboxgl.accessToken = 'pk.eyJ1Ijoid2lycmFsdHJhZGVzIiwiYSI6ImNtc2h6bXdxNDA2NGkyd3M5b2U4bXczbG8ifQ.Gq03fiSUQJ4AwVzsJFvMOw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [-3.065, 53.372],
    zoom: 10
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat([-3.065, 53.372])
    .addTo(map);

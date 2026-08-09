
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});
document.querySelectorAll('[data-trade]').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById('tradeSelect').value = btn.dataset.trade;
  document.getElementById('post-job').scrollIntoView({behavior:'smooth'});
}));
function setupForm(id, messageId, prefix){
  const form=document.getElementById(id), msg=document.getElementById(messageId);
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.checkValidity()){form.reportValidity();return;}
    const ref=prefix+'-'+Date.now().toString().slice(-6);
    msg.textContent='Thank you — your reference is '+ref+'. This demo form is not yet connected to email.';
    msg.className='form-message success';
    form.reset();
  });
}
setupForm('jobForm','jobMessage','WT');
setupForm('tradeForm','tradeMessage','TR');
document.getElementById('year').textContent=new Date().getFullYear();

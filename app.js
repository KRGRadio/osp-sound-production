const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

document.querySelectorAll('[data-package]').forEach(link=>{
  link.addEventListener('click',()=>{const field=document.querySelector('[name="needs"]');if(field){field.value=link.dataset.package;field.focus()}});
});

document.getElementById('bookingForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(e.currentTarget);
  const msg=[
    'Hi OSP Equipment Hire, I would like to make a booking.',
    '',
    `Name: ${f.get('name')}`,
    `Event date: ${f.get('date')}`,
    `Event type: ${f.get('event')}`,
    `Location: ${f.get('location')}`,
    `Equipment / package needed: ${f.get('needs') || 'Not specified'}`,
    `Additional notes: ${f.get('notes') || 'None'}`
  ].join('\\n');
  window.open('https://wa.me/27719109965?text='+encodeURIComponent(msg),'_blank','noopener');
});

let deferredPrompt;
const install=document.getElementById('install');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;install.hidden=false});
install?.addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;install.hidden=true});
window.addEventListener('appinstalled',()=>install.hidden=true);
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));

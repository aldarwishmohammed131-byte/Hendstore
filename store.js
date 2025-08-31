
const AS={endpoint:localStorage.getItem('AS_ENDPOINT')||'',currency:localStorage.getItem('AS_CURRENCY')||'SAR',lang:localStorage.getItem('AS_LANG')||'ar',fmt(n){const s={USD:'$',SAR:'﷼',AED:'د.إ',KWD:'د.ك',QAR:'ر.ق',BHD:'ب.د',OMR:'ر.ع',YER:'ر.ي'};return `${s[this.currency]||''}${Number(n).toFixed(2)}`} };
async function getProducts(){const r=await fetch('/assets/data/products.json');return await r.json()}
function qs(k){return new URLSearchParams(location.search).get(k)}
function getCart(){return JSON.parse(localStorage.getItem('AS_CART')||'[]')} function setCart(c){localStorage.setItem('AS_CART',JSON.stringify(c))}
function addToCart(it){const c=getCart();c.push(it);setCart(c);alert('تمت إضافة المنتج إلى السلة')}
function clearCart(){setCart([])}
function uid(){return 'HS-'+Math.random().toString(36).slice(2,6).toUpperCase()+'-'+Date.now().toString().slice(-5)}
function getOrders(){return JSON.parse(localStorage.getItem('AS_ORDERS')||'[]')} function saveOrder(o){const a=getOrders();a.unshift(o);localStorage.setItem('AS_ORDERS',JSON.stringify(a))}
async function sendToEndpoint(order){if(!AS.endpoint)return{sent:false,reason:'no-endpoint'};try{const r=await fetch(AS.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'order',order})});const d=await r.json().catch(()=>({ok:false}));return{sent:true,data:d}}catch(e){return{sent:false,reason:e.message}}}
if('serviceWorker'in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/service-worker.js'))}
let deferredPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.querySelector('#installBanner')?.classList.add('show')});async function installApp(){if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;document.querySelector('#installBanner')?.classList.remove('show');deferredPrompt=null}

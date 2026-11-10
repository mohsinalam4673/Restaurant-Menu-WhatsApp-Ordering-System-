// ================= CART =================
let cart = [];
try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch(e) { cart = []; }
cart = cart.filter(c => menuItems.some(m => m.id === c.id));
const save = () => { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch(e) {} };
const subtotal = () => cart.reduce((s,c) => s + c.price*c.qty, 0);
function totals(){ const s = subtotal(), g = Math.round(s*CONFIG.gstPercent/100); return {subtotal:s, gst:g, total:s+g}; }

function renderCart(){
  $("count").textContent = cart.reduce((s,c)=>s+c.qty,0);
  $("cartTotal").textContent = money(totals().total);
  $("cartBody").innerHTML = cart.length ? cart.map(c => {
    const m = menuItems.find(x=>x.id===c.id);
    return `<div class="ci">${m.img?`<img src="${m.img}" alt="">`:`<div class="thumb" aria-hidden="true">${m.emoji}</div>`}
    <div><strong>${c.name}</strong><div class="price">${money(c.price*c.qty)}</div></div>
    <div class="qty"><button data-dec="${c.id}" aria-label="Decrease">−</button><span>${c.qty}</span><button data-inc="${c.id}" aria-label="Increase">+</button></div>
    <button class="rm" data-rm="${c.id}">Remove</button></div>`; }).join("")
    : `<div class="empty">Your cart is empty. Please add some items first.</div>`;
  save();
}
function addItem(id){
  const m = menuItems.find(x=>x.id===id); if(!m||!m.available) return;
  const c = cart.find(x=>x.id===id);
  c ? c.qty++ : cart.push({id:m.id,name:m.name,price:m.price,qty:1});
  renderCart(); toast(m.name + " added to cart");
}
function change(id,d){
  const c = cart.find(x=>x.id===id); if(!c) return;
  c.qty += d; if(c.qty<=0) cart = cart.filter(x=>x.id!==id);
  renderCart();
}

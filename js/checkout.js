// ================= TABLE NUMBER =================
function initTable(){
  const sel = $("table");
  sel.innerHTML = '<option value="">Select your table</option>' + Array.from({length:CONFIG.totalTables},(_,i)=>`<option value="${i+1}">Table ${i+1}</option>`).join("");
  let t = new URLSearchParams(location.search).get("table");   // QR code link: ...?table=5
  if(!t){ try { t = localStorage.getItem("table"); } catch(e) {} }
  if(+t>=1 && +t<=CONFIG.totalTables) sel.value = t;
  showTable();
}
function showTable(){
  const v = $("table").value;
  $("tableBadge").textContent = v ? "Table " + v : "Select table";
  try { if(v) localStorage.setItem("table", v); } catch(e) {}
}

// ================= PANELS =================
function open(id){ $(id).classList.add("on"); }
function closeAll(){ document.querySelectorAll(".ov").forEach(o=>o.classList.remove("on")); }
function summary(){
  const t = totals();
  $("sum").innerHTML = "<strong>Order summary</strong>" + cart.map(c=>`<div><span>${c.name} × ${c.qty}</span><span>${money(c.price*c.qty)}</span></div>`).join("") +
    (CONFIG.gstPercent ? `<div><span>GST (${CONFIG.gstPercent}%)</span><span>${money(t.gst)}</span></div>` : "") +
    `<div style="border-top:1px solid var(--line);margin-top:6px;padding-top:6px"><strong>Total</strong><strong>${money(t.total)}</strong></div>`;
}

// ================= VALIDATION =================
function validate(){
  const f = {table:$("table").value, n:$("name").value.trim(), m:$("mobile").value.trim(), t:$("note").value.trim()};
  let ok = true;
  $("eTable").textContent = f.table ? "" : (ok=false,"Please select your table number.");
  $("eMobile").textContent = (!f.m || /^[6-9]\d{9}$/.test(f.m)) ? "" : (ok=false,"Please enter a valid mobile number.");
  return ok ? f : null;
}

// ================= WHATSAPP MESSAGES =================
const LINE = "━━━━━━━━━━━━━━━";
function kitchenMsg(o){
  return `🍽️ NEW ORDER — KITCHEN\n${LINE}\nOrder: ${o.id}\nTable: ${o.table}\nTime: ${o.time}\n${LINE}\n` +
    o.items.map((c,i)=>`${i+1}. ${c.name} × ${c.qty}`).join("\n") + `\n${LINE}\nNote: ${o.note || "-"}`;
}
function billMsg(o, title){
  return `🧾 ${title}\n${LINE}\nOrder: ${o.id}\nTable: ${o.table}\nTime: ${o.time}\n` +
    (o.name ? `Name: ${o.name}\n` : "") + (o.mobile ? `Mobile: ${o.mobile}\n` : "") + `${LINE}\n` +
    o.items.map((c,i)=>`${i+1}. ${c.name} × ${c.qty} × ${money(c.price)} = ${money(c.price*c.qty)}`).join("\n") +
    `\n${LINE}\nSubtotal: ${money(o.subtotal)}\n` + (CONFIG.gstPercent ? `GST (${CONFIG.gstPercent}%): ${money(o.gst)}\n` : "") +
    `TOTAL: ${money(o.total)}\nNote: ${o.note || "-"}`;
}
function openWhatsApp(num, msg){
  const a = document.createElement("a");
  a.href = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove();
}

// ================= SEND ORDER =================
let lastOrder = null;
const splitBilling = () => CONFIG.billingWhatsApp && CONFIG.billingWhatsApp !== CONFIG.kitchenWhatsApp;
function sendOrder(){
  if(!cart.length){ toast("Your cart is empty. Please add some items first."); return; }
  const f = validate(); if(!f) return;
  const d = new Date(), pad = n => String(n).padStart(2,"0");
  const o = {
    id: `T${f.table}-${pad(d.getHours())}${pad(d.getMinutes())}-${Math.floor(10+Math.random()*90)}`,
    table: f.table, name: f.n, mobile: f.m, note: f.t,
    time: d.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),
    items: cart.map(c=>({...c})), ...totals()
  };
  lastOrder = o;
  openWhatsApp(CONFIG.kitchenWhatsApp, splitBilling() ? kitchenMsg(o) : billMsg(o, "NEW ORDER — KITCHEN & BILLING"));
  cart = []; renderCart(); $("note").value = ""; closeAll();
  $("doneTxt").innerHTML = `Order <strong>${o.id}</strong> for <strong>Table ${o.table}</strong> is ready in WhatsApp.<br>Press <strong>Send</strong> there to confirm it.`;
  $("billBtn").hidden = !splitBilling();
  open("doneOv");
}

// ================= EVENTS =================
document.addEventListener("click", e => {
  const t = e.target.closest("button,.ov"); if(!t) return;
  if(t.dataset.cat){ category = t.dataset.cat; renderChips(); renderMenu(); }
  else if(t.dataset.add) addItem(+t.dataset.add);
  else if(t.dataset.inc) change(+t.dataset.inc,1);
  else if(t.dataset.dec) change(+t.dataset.dec,-1);
  else if(t.dataset.rm) change(+t.dataset.rm,-999);
  else if(t.hasAttribute("data-close") || (t.classList.contains("ov") && e.target===t)) closeAll();
});
$("openCart").onclick = () => { renderCart(); open("cartOv"); };
$("toCheckout").onclick = () => {
  if(!cart.length){ toast("Your cart is empty. Please add some items first."); return; }
  closeAll(); summary(); open("coOv");
};
$("sendWa").onclick = sendOrder;
$("billBtn").onclick = () => { if(lastOrder) openWhatsApp(CONFIG.billingWhatsApp, billMsg(lastOrder, "BILL DETAILS — BILLING COUNTER")); };
$("table").onchange = showTable;
$("search").oninput = e => { query = e.target.value; renderMenu(); };
document.addEventListener("keydown", e => { if(e.key==="Escape") closeAll(); });

// ================= START =================
const waLink = `https://wa.me/${CONFIG.kitchenWhatsApp}?text=${encodeURIComponent("Hello " + CONFIG.restaurantName + ", I need help.")}`;
$("fab").href = waLink;
[1,5,10].forEach((id,i)=>{ $("h"+(i+1)).src = menuItems.find(m=>m.id===id).img; });
$("rackBtn").onclick = () => { category = "Cold Drinks"; renderChips(); renderMenu(); $("menu").scrollIntoView({behavior:"smooth"}); };
initTable(); renderChips(); renderMenu(); renderCart();

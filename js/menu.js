// ================= CONFIG: edit these for your restaurant =================
const CONFIG = {
  restaurantName: "Spice Garden",
  kitchenWhatsApp: "919122326202",   // kitchen number: country code + number, no + or spaces
  billingWhatsApp: "",               // optional billing-counter number (leave "" to send everything to the kitchen number)
  totalTables: 20,                   // number of tables in the restaurant
  gstPercent: 0,                     // e.g. 5 to add 5% GST on the bill (0 = prices already final)
  currency: "₹"
};

// ================= MENU DATA =================
// img: path inside /images (leave "" to show the emoji instead)
const menuItems = [
 {"id": 22, "name": "Masala Chai", "price": 20, "category": "Chai & Snacks", "desc": "Hot, strong and full of ginger and spice.", "available": true, "img": "images/masala-chai.jpg", "emoji": ""},
 {"id": 23, "name": "Samosa (2 pcs)", "price": 30, "category": "Chai & Snacks", "desc": "Crispy pastry stuffed with spiced potato.", "available": true, "img": "images/samosa-2-pcs.jpg", "emoji": ""},
 {"id": 24, "name": "Onion Pakora", "price": 50, "category": "Chai & Snacks", "desc": "Crispy onion fritters with a fresh salad.", "available": true, "img": "images/onion-pakora.jpg", "emoji": ""},
 {"id": 25, "name": "Veg Pakora", "price": 60, "category": "Chai & Snacks", "desc": "Mixed vegetable fritters with green chutney.", "available": true, "img": "images/veg-pakora.jpg", "emoji": ""},
 {"id": 26, "name": "Tandoori Roti", "price": 15, "category": "Roti & Rice", "desc": "Fresh from the tandoor.", "available": true, "img": "images/tandoori-roti.jpg", "emoji": ""},
 {"id": 27, "name": "Butter Roti", "price": 20, "category": "Roti & Rice", "desc": "Soft roti brushed with butter.", "available": true, "img": "images/butter-roti.jpg", "emoji": ""},
 {"id": 28, "name": "Butter Naan", "price": 40, "category": "Roti & Rice", "desc": "Soft, fluffy and buttery.", "available": true, "img": "images/butter-naan.jpg", "emoji": ""},
 {"id": 29, "name": "Jeera Rice", "price": 100, "category": "Roti & Rice", "desc": "Basmati rice tempered with cumin.", "available": true, "img": "images/jeera-rice.jpg", "emoji": ""},
 {"id": 10, "name": "Veg Biryani", "price": 180, "category": "Main Course", "desc": "Fragrant basmati rice cooked with garden vegetables.", "available": true, "img": "images/veg-biryani.jpg", "emoji": ""},
 {"id": 11, "name": "Chicken Biryani", "price": 220, "category": "Main Course", "desc": "Slow-cooked dum biryani with tender chicken and raita.", "available": true, "img": "images/chicken-biryani.jpg", "emoji": ""},
 {"id": 12, "name": "Special Thali", "price": 250, "category": "Main Course", "desc": "Curry, dal, rice, naan and sides on one plate.", "available": true, "img": "images/special-thali.jpg", "emoji": ""},
 {"id": 13, "name": "Grilled Chicken", "price": 260, "category": "Main Course", "desc": "Herb-marinated chicken legs, grilled with garlic and lemon.", "available": true, "img": "images/grilled-chicken.jpg", "emoji": ""},
 {"id": 30, "name": "Dal Tadka", "price": 140, "category": "Main Course", "desc": "Yellow dal with a garlic and ghee tadka.", "available": true, "img": "images/dal-tadka.jpg", "emoji": ""},
 {"id": 31, "name": "Kadai Paneer", "price": 220, "category": "Main Course", "desc": "Paneer cooked with capsicum and whole spices in a kadai masala.", "available": true, "img": "images/kadai-paneer.jpg", "emoji": ""},
 {"id": 32, "name": "Raita", "price": 40, "category": "Main Course", "desc": "Cool curd with cucumber and roasted cumin.", "available": true, "img": "images/raita.jpg", "emoji": ""},
 {"id": 14, "name": "Kathi Roll", "price": 110, "category": "Starters", "desc": "Spiced filling wrapped in a soft, flaky roti.", "available": true, "img": "images/kathi-roll.jpg", "emoji": ""},
 {"id": 15, "name": "Aloo Paratha", "price": 80, "category": "Starters", "desc": "Hot stuffed paratha with a dollop of butter.", "available": true, "img": "images/aloo-paratha.jpg", "emoji": ""},
 {"id": 34, "name": "Cheesy Garlic Bread", "price": 130, "category": "Starters", "desc": "Baked garlic bread with melted cheese and a creamy dip.", "available": true, "img": "images/cheesy-garlic-bread.jpg", "emoji": ""},
 {"id": 7, "name": "Chicken Chowmein", "price": 150, "category": "Chinese", "desc": "Wok-tossed noodles with chicken and spring onion.", "available": true, "img": "images/chicken-chowmein.jpg", "emoji": ""},
 {"id": 8, "name": "Veg Fried Rice", "price": 140, "category": "Chinese", "desc": "Smoky fried rice with colourful vegetables.", "available": true, "img": "images/veg-fried-rice.jpg", "emoji": ""},
 {"id": 9, "name": "Chilli Paneer", "price": 160, "category": "Chinese", "desc": "Tangy paneer tossed with capsicum and spices.", "available": false, "img": "images/chilli-paneer.jpg", "emoji": ""},
 {"id": 1, "name": "Margherita Pizza", "price": 199, "category": "Pizza", "desc": "Classic tomato, mozzarella and fresh basil.", "available": true, "img": "images/margherita-pizza.jpg", "emoji": ""},
 {"id": 2, "name": "Farmhouse Pizza", "price": 249, "category": "Pizza", "desc": "Loaded with capsicum, mushroom and onion.", "available": true, "img": "images/farmhouse-pizza.jpg", "emoji": ""},
 {"id": 3, "name": "Paneer Pizza", "price": 229, "category": "Pizza", "desc": "Stone-baked with extra cheese and olives.", "available": true, "img": "images/paneer-pizza.jpg", "emoji": ""},
 {"id": 4, "name": "Veg Burger", "price": 99, "category": "Burger", "desc": "Crispy veg patty with fresh lettuce and sauce.", "available": true, "img": "images/veg-burger.jpg", "emoji": ""},
 {"id": 5, "name": "Cheese Burger", "price": 129, "category": "Burger", "desc": "Melting cheese, juicy patty and tomato.", "available": true, "img": "images/cheese-burger.jpg", "emoji": ""},
 {"id": 6, "name": "Paneer Burger", "price": 149, "category": "Burger", "desc": "Crispy paneer and fresh vegetables in a sesame bun.", "available": true, "img": "images/paneer-burger.jpg", "emoji": ""},
 {"id": 16, "name": "Mango Shake", "price": 70, "category": "Beverages", "desc": "Thick, fresh and fruity.", "available": true, "img": "images/mango-shake.jpg", "emoji": ""},
 {"id": 17, "name": "Fresh Lime", "price": 60, "category": "Beverages", "desc": "Sweet or salted, freshly squeezed.", "available": true, "img": "images/fresh-lime.jpg", "emoji": ""},
 {"id": 18, "name": "Cold Coffee", "price": 100, "category": "Beverages", "desc": "Thick, creamy and topped with chocolate.", "available": true, "img": "images/cold-coffee.jpg", "emoji": ""},
 {"id": 33, "name": "Mineral Water", "price": 20, "category": "Cold Drinks", "desc": "510 ml sealed bottle of natural mineral water.", "available": true, "img": "images/mineral-water.jpg", "emoji": ""},
 {"id": 35, "name": "Apple Soda", "price": 40, "category": "Cold Drinks", "desc": "Chilled apple-flavoured fizzy drink.", "available": true, "img": "images/apple-soda.jpg", "emoji": ""},
 {"id": 36, "name": "Lemon Soda", "price": 40, "category": "Cold Drinks", "desc": "Zesty lemon soda, served ice cold.", "available": true, "img": "images/lemon-soda.jpg", "emoji": ""},
 {"id": 37, "name": "Orange Soda", "price": 40, "category": "Cold Drinks", "desc": "Sweet and tangy orange fizz.", "available": true, "img": "images/orange-soda.jpg", "emoji": ""},
 {"id": 38, "name": "Cola", "price": 40, "category": "Cold Drinks", "desc": "Classic dark cola, chilled.", "available": true, "img": "images/cola.jpg", "emoji": ""},
 {"id": 39, "name": "Berry Soda", "price": 50, "category": "Cold Drinks", "desc": "Mixed-berry soda with a fruity finish.", "available": true, "img": "images/berry-soda.jpg", "emoji": ""},
 {"id": 19, "name": "Chocolate Cake", "price": 120, "category": "Desserts", "desc": "Rich chocolate cake with Oreo crumble.", "available": true, "img": "images/chocolate-cake.jpg", "emoji": ""},
 {"id": 20, "name": "Ice Cream", "price": 60, "category": "Desserts", "desc": "Two scoops with chocolate sauce and a brownie.", "available": true, "img": "images/ice-cream.jpg", "emoji": ""},
 {"id": 21, "name": "Cheesecake", "price": 120, "category": "Desserts", "desc": "Creamy New York cheesecake with berry sauce.", "available": true, "img": "images/cheesecake.jpg", "emoji": ""}
];

const $ = id => document.getElementById(id);
const money = n => CONFIG.currency + n;
function toast(msg){ const t=$("toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(toast.t); toast.t=setTimeout(()=>t.classList.remove("on"),1800); }

// ================= MENU: chips, search, cards =================
let category = "All", query = "";
function renderChips(){
  const cats = ["All", ...new Set(menuItems.map(m => m.category))];
  $("chips").innerHTML = cats.map(c => `<button class="chip" aria-pressed="${c===category}" data-cat="${c}">${c}</button>`).join("");
}
function renderMenu(){
  const q = query.trim().toLowerCase();
  const list = menuItems.filter(m => (category==="All"||m.category===category) && (!q || (m.name+" "+m.desc+" "+m.category).toLowerCase().includes(q)));
  $("grid").innerHTML = list.length ? list.map(m => `
    <article class="card"><div class="img${m.img?"":" emo"}">${m.img?`<img src="${m.img}" alt="${m.name}" loading="lazy" width="420" height="315">`:`<span aria-hidden="true">${m.emoji}</span>`}</div>
      <div class="body"><h3>${m.name}</h3><p>${m.desc}</p>
      <div class="row"><span class="price">${money(m.price)}</span>
      <button class="add" data-add="${m.id}" ${m.available?"":"disabled"}>${m.available?"+ Add":"Sold out"}</button></div></div></article>`).join("")
    : `<div class="empty">No matching food items found.</div>`;
}

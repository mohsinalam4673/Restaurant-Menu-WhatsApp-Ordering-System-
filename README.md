# Spice Garden — Table Ordering (HTML + CSS + JavaScript)

A frontend-only digital menu for dine-in restaurants. Customers scan the QR code on their table, order chai, snacks, roti, full meals and drinks, and the order goes to the kitchen and the billing counter through WhatsApp. There is no backend or database.

## How it works
1. Each table has a QR code that opens `https://your-site/?table=5`, so the table number is filled in automatically. Customers can also pick their table by hand.
2. The customer adds items to the cart and presses **Send order to kitchen**.
3. WhatsApp opens with a ready message: order ID, table number, time, items and the customer's note. The customer presses **Send**.
4. **Kitchen and billing on one number** (default): the message has items, prices, GST (if enabled) and the total, so the billing counter gets a correct bill.
5. **Separate numbers** (set `billingWhatsApp`): the kitchen gets items and quantities only. The customer then taps **Send bill details to billing counter**, and the billing number gets the priced bill.

## Project structure
```
index.html      Page layout
tables.html     Makes the per-table links for QR codes
css/style.css   Design (mobile-first, light and dark mode)
js/menu.js      CONFIG, menu data, search and category filter
js/cart.js      Cart, quantity, totals, localStorage
js/checkout.js  Table number, validation, WhatsApp messages
images/         Food photos
```

## Set up for your restaurant
Open `js/menu.js` and edit `CONFIG`:
- `kitchenWhatsApp`: country code plus number, for example `919122326202`
- `billingWhatsApp`: optional second number for the billing counter
- `totalTables`: how many tables you have
- `gstPercent`: for example `5` to add 5% GST (`0` means prices are final)

To change the menu, edit the `menuItems` list. Use `"img": "images/your-photo.jpg"` for a photo, or leave it empty and set `"emoji"`. Prices and items are samples, so replace them with your own.

## Publish on GitHub Pages
1. Create a GitHub repository and upload all these files.
2. Go to **Settings → Pages**, choose the `main` branch and the root folder, then save.
3. Open `tables.html` on your live site to get one link per table, and turn each link into a QR code.

## Limits
- The customer has to press **Send** in WhatsApp, so an order is not received until they do.
- There is no automatic kitchen printer, online payment, order tracking or order history. Those need a backend.
- The cart is kept in the browser (localStorage) and is cleared after an order is sent.

# Volt — Next-Generation Tech & Gaming Gear Store

Volt is a premium, ultra-modern single-page e-commerce application designed for high-end tech, gadgets, and gaming peripherals. Built with a futuristic dark-mode aesthetic, sleek glassmorphism, responsive micro-animations, and full localized payment integration.

---

## 🚀 Key Features

* **Premium Glassmorphism Aesthetic**: Rich dark themes with neon-accented glowing hover borders, smooth animations, and high-fidelity custom product visual renders.
* **Persistent User Experience**:
  * **Theme State Caching**: Seamlessly saves and restores the user's preferred light/dark mode selection across refreshes using `localStorage`.
  * **Persistent Shopping Cart**: The shopping cart preserves selected items, custom quantities, and pricing data even after page reloads.
* **Dynamic E-Commerce Logic**:
  * Cart drawer showing unique product counts in the header badge (up to a capped quantity of `5` items per product) instead of total sum quantities.
  * Mobile-optimized cart drawers supporting dynamic viewports (`100dvh`) and safe-area margins for smooth touch responses.
* **Paystack Payment Gateway Integration**:
  * Full integration with Paystack Inline Popups for secure, client-side digital transactions.
  * Direct payment currency processing in **Ghanaian Cedis (GH₵ / GHS)**, converting total prices into sub-unit pesewas.
  * Secure parsing of customer info (Name, Email, Phone, Address) passed down as transaction metadata.
  * Automatic visual loaders ("Connecting to Paystack...") and robust simulation fallbacks if the external SDK fails to initialize.
* **Smart Search Interactivity**:
  * Smooth-scrolling search trigger in the header navbar that slides focus immediately onto the shop input and selects its text.
* **Highly Compact Mobile Shell**:
  * Reduced navbar structures, compact action layouts, scaled SVG iconography, and adjusted drawer slide positions for seamless mobile navigation.
* **Secure Environment Variables**:
  * Excluded configuration tracking (`.gitignore`) to keep sensitive private keys safe from public source code repositories.

---

## 🛠️ Tech Stack & SDKs

* **Structure**: Semantic HTML5 markup
* **Styling**: Vanilla CSS3 Custom Properties (Variables), Flexbox, Grid, and Media Queries
* **Behavior**: Modern Vanilla JavaScript (ES6+)
* **Icons**: [Lucide Icons SDK](https://lucide.dev/) (loaded asynchronously)
* **Payments**: [Paystack Inline SDK](https://paystack.com/) (loaded dynamically)

---

## 📂 Project Structure

```
volt/
├── img/                  # Centralized product and UI assets
│   ├── gaming_mouse.png  # GX Pro Gaming Mouse render
│   ├── image.png         # About section backdrop
│   ├── mech_keyboard.png # Apex Mechanical Keyboard render
│   ├── pro_headphones.png# Pro X Wireless Headphones render
│   ├── storm_webcam.png  # Premium generated Storm Pro Webcam render
│   └── volt_watch.png    # Volt Watch Series 3 render
├── .env                  # Paystack private environment keys (Ignored)
├── .gitignore            # Git exclusion mapping file
├── index.html            # Core structural shell
├── script.js             # Shopping logic, theme, and Paystack integration
└── styles.css            # Dark mode variables, glassmorphism, and media queries
```

---

## ⚙️ Installation & Setup

1. **Clone the Repository**:
   Clone your codebase files into your local directory.

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory (already included locally and protected by `.gitignore`):
   ```env
   PAYSTACK_SECRET_KEY=your_secret_live_key
   PAYSTACK_PUBLIC_KEY=your_public_live_key
   ```
   *Note: Client-side operations utilize the `PAYSTACK_PUBLIC_KEY` to launch the popups safely.*

3. **Run Locally**:
   * **Direct Preview**: You can simply double-click `index.html` to run the application in any modern web browser. A robust fallback script is included in `script.js` so that payment simulations still work seamlessly if opened via direct file protocols (`file:///`).
   * **Development Server**: For the dynamic environment parsing to fetch `.env` keys successfully at runtime, run a lightweight local server (e.g., using VS Code's **Live Server** extension, or running `npx serve` in your terminal).

---

## 💳 How Paystack Checkout Works

1. The customer adds premium gear to the cart.
2. Clicking **Proceed to Checkout** slides open the mobile-optimized input form.
3. Upon filling out their delivery info and clicking **Complete Purchase**, Volt requests Paystack Popups using the dynamic keys.
4. On transaction completion, Paystack delivers a transaction callback with a transaction reference, triggering a success overlay showing the official reference ID.

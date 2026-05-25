let config = {};
async function loadConfig() {
  try {
    const res = await fetch('.env');
    if (!res.ok) throw new Error("Status: " + res.status);
    const text = await res.text();
    text.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        config[parts[0].trim()] = parts.slice(1).join('=').trim();
      }
    });
  } catch (e) {
    console.warn("Could not parse .env file asynchronously, using local fallback.", e);
  }
}
loadConfig();

const PRODUCTS = [
  {id:1,name:'Pro X Wireless Headphones',image:'img/pro_headphones.png',category:'audio',price:299,oldPrice:379,rating:4.9,reviews:2847,desc:'Premium noise-cancelling headphones with 40hr battery life and spatial audio.'},
  {id:2,name:'Volt Watch Series 3',image:'img/volt_watch.png',category:'wearables',price:449,oldPrice:599,rating:4.8,reviews:1923,desc:'Advanced health monitoring, GPS, and AMOLED display in a sleek titanium case.'},
  {id:3,name:'Apex Mechanical Keyboard',image:'img/mech_keyboard.png',category:'peripherals',price:189,oldPrice:239,rating:4.7,reviews:3412,desc:'Hot-swappable switches, RGB per-key lighting, and aircraft-grade aluminum frame.'},
  {id:4,name:'GX Pro Gaming Mouse',image:'img/gaming_mouse.png',category:'peripherals',price:89,oldPrice:119,rating:4.9,reviews:5621,desc:'26,000 DPI optical sensor, 8 programmable buttons, and ultra-light honeycomb design.'},
  {id:5,name:'Pulse 360 Speaker',image:'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80',category:'speakers',price:199,oldPrice:259,rating:4.6,reviews:1876,desc:'360-degree immersive sound with deep bass and 20-hour playtime.'},
  {id:6,name:'AirDrop Pro Earbuds',image:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80',category:'audio',price:149,oldPrice:199,rating:4.8,reviews:4102,desc:'True wireless earbuds with ANC, 8hr battery, and custom tuned drivers.'},
  {id:7,name:'Halo Smart Display',image:'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',category:'wearables',price:329,oldPrice:399,rating:4.7,reviews:987,desc:'15.6" portable smart display with 4K resolution and built-in AI assistant.'},
  {id:8,name:'QuantumPad Desk Mat',image:'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=400&q=80',category:'peripherals',price:59,oldPrice:79,rating:4.5,reviews:2341,desc:'XL ultra-smooth surface with wireless charging zones and cable management.'},
  {id:9,name:'Ember TWS Earbuds',image:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80',category:'audio',price:119,oldPrice:149,rating:4.6,reviews:1654,desc:'Ergonomic fit, 6mm dynamic drivers, and 36-hour total battery life.'},
  {id:10,name:'Storm Pro Webcam',image:'img/storm_webcam.png',category:'peripherals',price:139,oldPrice:179,rating:4.8,reviews:2891,desc:'4K/60fps, AI face tracking, dual mics with noise cancellation.'},
  {id:11,name:'BoomBox Mini',image:'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80',category:'speakers',price:79,oldPrice:99,rating:4.4,reviews:3201,desc:'Compact waterproof speaker with 12-hour battery and party mode.'},
  {id:12,name:'FlexBand Fitness',image:'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=400&q=80',category:'wearables',price:79,oldPrice:99,rating:4.5,reviews:4573,desc:'24/7 health tracking, sleep analysis, and 14-day battery life.'},
];

const TESTIMONIALS = [
  {name:'Ama Owusu',role:'Tech Blogger, Accra',avatar:'AO',text:'VoltCart completely changed how I buy gadgets. The Pro X Headphones arrived next day and the sound quality is absolutely incredible. Five stars without hesitation!',stars:5},
  {name:'Marcus Chen',role:'Software Engineer',avatar:'MC',text:'Fast shipping, genuine products, and the customer support team went above and beyond when I had a query about my Volt Watch. This is my go-to tech store now.',stars:5},
  {name:'Sofia Rodriguez',role:'Content Creator',avatar:'SR',text:'The Apex Keyboard is a dream to type on. Build quality rivals keyboards 3x the price. VoltCart\'s curation is genuinely impressive — they only stock the best.',stars:5},
  {name:'James Osei',role:'Game Developer',avatar:'JO',text:'Ordered the GX Pro Mouse on a Tuesday, had it Wednesday morning. Performance is elite. Cart UI on the website is also beautifully designed!',stars:5},
  {name:'Priya Nair',role:'UX Designer',avatar:'PN',text:'Got the AirDrop Pro earbuds and they\'re the best I\'ve owned. True ANC, great fit, and the price is unbeatable. Will be back for the speaker next.',stars:5},
  {name:'David Mensah',role:'Entrepreneur',avatar:'DM',text:'Bought 6 items for my home office setup — all arrived perfectly packaged. VoltCart feels like a premium brand, not just another online store.',stars:5},
];

let cart = [];
try {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  console.error("Failed to load cart from localStorage:", e);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'default';

function renderFeatured(){
  const grid = document.getElementById('featured-grid');
  grid.innerHTML = PRODUCTS.slice(0,6).map(p => `
    <div class="product-card reveal">
      <div class="pc-glow"></div>
      <button class="pc-wishlist" onclick="toggleWishlist(this)">♡</button>
      <div class="pc-img">
        <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
      </div>
      <div class="pc-body">
        <div class="pc-category">${p.category}</div>
        <div class="pc-name">${p.name}</div>
        <div class="pc-stars">
          <span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}</span>
          <span class="count">${p.rating} (${p.reviews.toLocaleString()})</span>
        </div>
        <div class="pc-footer">
          <div class="pc-price">GH₵${p.price}<span>GH₵${p.oldPrice}</span></div>
          <button class="pc-add ripple-btn" onclick="addToCart(${p.id})">Add</button>
        </div>
      </div>
    </div>
  `).join('');
  triggerReveal();
  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderShop(){
  let products = [...PRODUCTS];
  if(currentCategory !== 'all') products = products.filter(p => p.category === currentCategory);
  if(currentSearch) products = products.filter(p => p.name.toLowerCase().includes(currentSearch.toLowerCase()) || p.desc.toLowerCase().includes(currentSearch.toLowerCase()));
  if(currentSort === 'price-asc') products.sort((a,b) => a.price - b.price);
  else if(currentSort === 'price-desc') products.sort((a,b) => b.price - a.price);
  else if(currentSort === 'rating') products.sort((a,b) => b.rating - a.rating);
  const grid = document.getElementById('shop-grid');
  grid.innerHTML = products.length ? products.map(p => `
    <div class="shop-card">
      <div class="sc-img">
        <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
      </div>
      <div class="sc-body">
        <div class="sc-name">${p.name}</div>
        <div class="sc-desc">${p.desc}</div>
        <div class="sc-footer">
          <div class="sc-price">GH₵${p.price}</div>
          <button class="sc-add ripple-btn" onclick="addToCart(${p.id})"><span>Add to Cart</span></button>
        </div>
      </div>
    </div>
  `).join('') : '<p style="color:var(--text2);padding:40px;text-align:center;grid-column:1/-1">No products found.</p>';
  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderTestimonials(){
  document.getElementById('testi-grid').innerHTML = TESTIMONIALS.map(t => `
    <div class="testi-card reveal">
      <div class="tc-stars">${'★'.repeat(t.stars)}</div>
      <div class="tc-text">"${t.text}"</div>
      <div class="tc-author">
        <div class="tc-avatar">${t.avatar}</div>
        <div><div class="tc-name">${t.name}</div><div class="tc-role">${t.role}</div></div>
      </div>
    </div>
  `).join('');
  triggerReveal();
  if (window.lucide) {
    lucide.createIcons();
  }
}

const MAX_QTY = 5;

function addToCart(id){
  const productId = Number(id);
  const p = PRODUCTS.find(x => x.id === productId);
  const existing = cart.find(x => x.id === productId);
  if(existing){
    if(existing.qty >= MAX_QTY){
      showToast(`⚠️ Max quantity of ${MAX_QTY} reached for ${p.name}`);
      return;
    }
    existing.qty++;
  } else {
    cart.push({...p, qty:1});
  }
  updateCartBadge();
  renderCartItems();
  saveCart();
  showToast(`🛒 ${p.name} added to cart!`);
}

function removeFromCart(id){
  const productId = Number(id);
  cart = cart.filter(x => x.id !== productId);
  updateCartBadge();
  renderCartItems();
  saveCart();
}

function changeQty(id, delta){
  const productId = Number(id);
  const item = cart.find(x => x.id === productId);
  if(!item) return;
  const newQty = item.qty + delta;
  if(newQty > MAX_QTY){
    showToast(`⚠️ Maximum quantity is ${MAX_QTY}`);
    return;
  }
  item.qty = newQty;
  if(item.qty <= 0) removeFromCart(productId);
  else { updateCartBadge(); renderCartItems(); saveCart(); }
}

function updateCartBadge(){
  document.getElementById('cart-badge').textContent = cart.length;
}

function renderCartItems(){
  const list = document.getElementById('cart-items-list');
  const footer = document.getElementById('cart-footer');
  const empty = document.getElementById('cart-empty');
  
  if(!cart.length){
    list.innerHTML = '';
    empty.style.display = 'flex';
    footer.style.display = 'none';
    return;
  }
  
  empty.style.display = 'none';
  footer.style.display = 'block';
  
  list.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="ci-img">
        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 12px;">
      </div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">GH₵${(item.price * item.qty).toFixed(2)}</div>
        <div class="ci-controls">
          <button class="qty-btn dec-btn">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn inc-btn">+</button>
          <button class="ci-remove remove-btn"><i data-lucide="trash-2" style="width: 16px; height: 16px;"></i></button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Attach event listeners dynamically to each rendered cart item
  list.querySelectorAll('.cart-item').forEach(itemEl => {
    const id = parseInt(itemEl.getAttribute('data-id'), 10);
    itemEl.querySelector('.dec-btn').addEventListener('click', () => changeQty(id, -1));
    itemEl.querySelector('.inc-btn').addEventListener('click', () => changeQty(id, 1));
    itemEl.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(id));
  });

  if (window.lucide) {
    lucide.createIcons();
  }

  const subtotal = cart.reduce((s,x) => s + x.price * x.qty, 0);
  document.getElementById('cart-total').textContent = 'GH₵' + subtotal.toFixed(2);
}

function openCart(){
  closeMobileMenu();
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart(){
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

function openCheckout(){
  if(!cart.length) return;
  closeCart();
  const subtotal = cart.reduce((s,x) => s + x.price * x.qty, 0);
  const shipping = 3.99;
  const total = subtotal + shipping;
  
  document.getElementById('checkout-summary').innerHTML = `
    <div class="os-title">Order Summary</div>
    ${cart.map(x => `
      <div class="os-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <img src="${x.image}" alt="${x.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 6px;">
        <span style="flex: 1; font-weight: 500;">${x.name} ×${x.qty}</span>
        <span style="font-weight: 700;">GH₵${(x.price*x.qty).toFixed(2)}</span>
      </div>
    `).join('')}
    <div class="os-row" style="margin-top: 12px;"><span>Shipping</span><span>GH₵${shipping.toFixed(2)}</span></div>
    <div class="os-row total"><span>Total</span><span>GH₵${total.toFixed(2)}</span></div>
  `;
  document.getElementById('checkout-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCheckout(){
  document.getElementById('checkout-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function processCheckout(){
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const address = document.getElementById('f-address').value.trim();
  
  if(!name){ showToast('⚠️ Please enter your full name'); return; }
  if(!email || !email.includes('@')){ showToast('⚠️ Please enter a valid email address'); return; }
  
  const subtotal = cart.reduce((s,x) => s + x.price * x.qty, 0);
  const shipping = 3.99;
  const total = subtotal + shipping;
  
  const ref = 'VC-PAYSTK-' + Math.random().toString(36).substr(2,8).toUpperCase();
  
  const checkoutBtn = document.querySelector('.checkout-btn');
  const originalText = checkoutBtn.innerHTML;
  checkoutBtn.disabled = true;
  checkoutBtn.innerHTML = 'Connecting to Paystack...';
  
  if (typeof PaystackPop === 'undefined') {
    showToast('⚠️ Paystack SDK failed to load. Simulating checkout...');
    setTimeout(() => {
      document.getElementById('txn-ref').textContent = ref;
      document.getElementById('success-msg').textContent = `Thank you, ${name}! Your simulated payment of GH₵${total.toFixed(2)} was completed. Your order is confirmed.`;
      closeCheckout();
      document.getElementById('success-overlay').classList.add('open');
      checkoutBtn.disabled = false;
      checkoutBtn.innerHTML = originalText;
    }, 1500);
    return;
  }
  
  const handler = PaystackPop.setup({
    key: config.PAYSTACK_PUBLIC_KEY || 'pk_live_e617f2f529b921892cd36fa242e99a026278ca62',
    email: email,
    amount: Math.round(total * 100), // GHS pesewas sub-units
    currency: 'GHS',
    ref: ref,
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "customer_name", value: name },
        { display_name: "Phone Number", variable_name: "phone_number", value: phone },
        { display_name: "Delivery Address", variable_name: "delivery_address", value: address }
      ]
    },
    callback: function(response){
      document.getElementById('txn-ref').textContent = response.reference;
      document.getElementById('success-msg').textContent = `Thank you, ${name}! Your payment of GH₵${total.toFixed(2)} was successfully processed via Paystack (Ref: ${response.reference}). Your order is confirmed.`;
      closeCheckout();
      document.getElementById('success-overlay').classList.add('open');
      checkoutBtn.disabled = false;
      checkoutBtn.innerHTML = originalText;
    },
    onClose: function(){
      showToast('❌ Payment cancelled by user');
      checkoutBtn.disabled = false;
      checkoutBtn.innerHTML = originalText;
    }
  });
  
  handler.openIframe();
}
function closeSuccess(){
  document.getElementById('success-overlay').classList.remove('open');
  document.body.style.overflow = '';
  cart = [];
  updateCartBadge();
  renderCartItems();
  saveCart();
}

// Mobile menu setup
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

function setCategory(btn, cat){
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  currentCategory = cat;
  renderShop();
}
function filterProducts(){
  currentSearch = document.getElementById('search-input').value;
  renderShop();
}
function sortProducts(val){
  currentSort = val;
  renderShop();
}

function toggleWishlist(btn){
  btn.textContent = btn.textContent === '♡' ? '❤️' : '♡';
}

// Theme initialization and persistence
let isDark = true;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  isDark = false;
  document.body.classList.add('light');
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.setAttribute('data-lucide', 'sun');
  }
} else {
  isDark = true;
  document.body.classList.remove('light');
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.setAttribute('data-lucide', 'moon');
  }
}

document.getElementById('theme-btn').addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('light', !isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
    if (window.lucide) {
      lucide.createIcons();
    }
  }
});

document.getElementById('cart-open-btn').addEventListener('click', openCart);

document.getElementById('hamburger-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});
function closeMobileMenu(){
  document.getElementById('mobile-menu').classList.remove('open');
}

function subscribeNewsletter(btn){
  const input = btn.previousElementSibling;
  if(!input.value.includes('@')){ showToast('Please enter a valid email'); return; }
  showToast('🎉 Subscribed! Welcome to VoltCart!');
  input.value = '';
}

document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.addEventListener('click', function(e){
    const r = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Support coordinate detection safely on all mobile browsers and touch interfaces
    const clientX = typeof e.clientX === 'number' ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + size / 2);
    const clientY = typeof e.clientY === 'number' ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + size / 2);
    
    r.className = 'ripple';
    r.style.cssText = `width:${size}px;height:${size}px;left:${clientX-rect.left-size/2}px;top:${clientY-rect.top-size/2}px`;
    this.appendChild(r);
    setTimeout(()=>r.remove(), 700);
  });
});

let toastTimer;
function showToast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--surface2);border:1px solid var(--border2);color:var(--text);padding:12px 24px;border-radius:100px;font-size:14px;font-weight:500;z-index:9999;opacity:0;transition:all 0.3s;white-space:nowrap;box-shadow:0 8px 32px rgba(0,0,0,0.4);font-family:'DM Sans',sans-serif;`;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(-50%) translateY(20px)'},3000);
}

function triggerReveal(){
  const els = document.querySelectorAll('.reveal:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:0.15});
  els.forEach(el => obs.observe(el));
}

function animateCounters(){
  const statsContainer = document.getElementById('about-stats-container');
  if(!statsContainer) return;
  
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const counters = statsContainer.querySelectorAll('.stat-num');
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          
          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            
            const currentVal = start + easeProgress * target;
            counter.textContent = currentVal.toFixed(decimals) + suffix;
            
            if(progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toFixed(decimals) + suffix;
            }
          }
          requestAnimationFrame(updateCounter);
        });
        obs.unobserve(statsContainer);
      }
    });
  }, {threshold: 0.15});
  obs.observe(statsContainer);
}

// Search button click handler
document.getElementById('search-btn').addEventListener('click', () => {
  const shopSection = document.getElementById('shop');
  const searchInput = document.getElementById('search-input');
  if (shopSection && searchInput) {
    shopSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      searchInput.focus();
      searchInput.select();
    }, 500);
  }
});

renderFeatured();
renderShop();
renderTestimonials();
triggerReveal();
animateCounters();
updateCartBadge();
renderCartItems();

if (window.lucide) {
  lucide.createIcons();
}

window.addEventListener('scroll', triggerReveal, {passive:true});

document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    closeCart();
    closeCheckout();
    document.getElementById('success-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ========================================
// Store Functionality
// ========================================

let filteredParts = [...mockData.partsInventory];

document.addEventListener('DOMContentLoaded', () => {
  // Set active nav link
  navigation.setActiveLink('store.html');

  // Setup modal
  modal.setupCloseOnOutsideClick('cartModal');

  // Populate My Garage info
  populateMyGarage();

  // Initial render
  renderParts(filteredParts);

  // Update cart count
  updateCartCount();

  // Setup event listeners
  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('categoryFilter').addEventListener('change', applyFilters);
  document.getElementById('compatibleOnlyFilter').addEventListener('change', applyFilters);
  document.getElementById('sortBy').addEventListener('change', applyFilters);
});

// ========================================
// Populate My Garage
// ========================================

function populateMyGarage() {
  const vehicle = appState.currentVehicle;
  const myGarageEl = document.getElementById('myGarageVehicle');

  if (!vehicle) {
    myGarageEl.textContent = 'ยังไม่ได้เพิ่มรถยนต์';
    document.getElementById('compatibleOnlyFilter').disabled = true;
    document.getElementById('compatibleOnlyFilter').checked = false;
    return;
  }

  // Render vehicle selector if multiple vehicles
  const selectorContainer = document.getElementById('myGarageSelector');
  if (selectorContainer) {
    const selectorHTML = appState.renderVehicleSelector();
    if (selectorHTML) {
      selectorContainer.innerHTML = selectorHTML.replace('class="form-control"', 'class="form-control" style="background: white; color: black;"');
    }
  }

  myGarageEl.textContent = `แสดงอะไหล่สำหรับ: ${vehicle.make} ${vehicle.model} (${vehicle.year})`;
}

// Make loadStoreData available globally for vehicle switching
window.loadStoreData = function () {
  populateMyGarage();
  applyFilters();
};

// ========================================
// Apply Filters
// ========================================

function applyFilters() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const compatibleOnly = document.getElementById('compatibleOnlyFilter').checked;
  const sortBy = document.getElementById('sortBy').value;

  const vehicle = appState.currentVehicle;
  const vehicleModel = vehicle ? `${vehicle.make} ${vehicle.model}` : null;

  // Filter
  filteredParts = mockData.partsInventory.filter(part => {
    // Search filter
    const matchesSearch = part.name.toLowerCase().includes(searchTerm) ||
      part.brand.toLowerCase().includes(searchTerm) ||
      part.description.toLowerCase().includes(searchTerm);

    // Category filter
    const matchesCategory = !category || part.category === category;

    // Vehicle compatibility filter
    const matchesVehicle = !compatibleOnly || !vehicleModel ||
      part.compatibleModels.includes(vehicleModel);

    return matchesSearch && matchesCategory && matchesVehicle;
  });

  // Sort
  filteredParts.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name, 'th');
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'stock':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  renderParts(filteredParts);
}

// ========================================
// Render Parts
// ========================================

function renderParts(parts) {
  const grid = document.getElementById('partsGrid');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');

  resultsCount.textContent = parts.length;

  if (parts.length === 0) {
    grid.classList.add('d-none');
    noResults.classList.remove('d-none');
    return;
  }

  grid.classList.remove('d-none');
  noResults.classList.add('d-none');

  const vehicle = appState.currentVehicle;
  const vehicleModel = vehicle ? `${vehicle.make} ${vehicle.model}` : null;

  grid.innerHTML = parts.map(part => {
    const isCompatible = vehicleModel && part.compatibleModels.includes(vehicleModel);
    const inStock = part.stock > 0;

    return `
      <div class="card">
        <div class="card-body">
          <!-- Product Image Placeholder -->
          <div style="width: 100%; height: 150px; background: var(--bg-grey); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; position: relative;">
            <span style="font-size: 3rem;">📦</span>
            ${isCompatible ? '<span class="badge badge-success" style="position: absolute; top: 0.5rem; right: 0.5rem;">✓ เข้ากับรถของคุณ</span>' : ''}
            ${!inStock ? '<span class="badge badge-danger" style="position: absolute; top: 0.5rem; left: 0.5rem;">สินค้าหมด</span>' : ''}
          </div>
          
          <!-- Product Info -->
          <h4 class="mb-1" style="font-size: 1rem; line-height: 1.3;">${part.name}</h4>
          <p class="text-muted mb-2" style="font-size: 0.875rem;">${part.brand}</p>
          
          <!-- Category Badge -->
          <span class="badge" style="background: var(--cool-grey); color: white; font-size: 0.75rem;">${part.category}</span>
          
          <!-- Description -->
          <p class="text-muted mt-2 mb-2" style="font-size: 0.875rem; line-height: 1.4;">${part.description}</p>
          
          <!-- Compatible Models -->
          <details class="mb-2">
            <summary style="cursor: pointer; font-size: 0.875rem; color: var(--steel-blue);">รุ่นรถที่รองรับ</summary>
            <ul style="margin: 0.5rem 0 0 1rem; font-size: 0.875rem; color: var(--text-muted);">
              ${part.compatibleModels.map(model => `<li>${model}</li>`).join('')}
            </ul>
          </details>
          
          <!-- Stock -->
          <p class="text-muted mb-2" style="font-size: 0.875rem;">
            คงเหลือ: <strong class="${inStock ? 'text-success' : 'text-danger'}">${part.stock} ชิ้น</strong>
          </p>
          
          <!-- Price & Actions -->
          <div class="flex-between mb-2">
            <strong class="text-primary" style="font-size: 1.25rem;">${utils.formatCurrency(part.price)}</strong>
          </div>
          
          <button class="btn btn-primary" style="width: 100%;" onclick="addToCart('${part.sku}')" ${!inStock ? 'disabled' : ''}>
            ${inStock ? '🛒 เพิ่มไปตะกร้า' : 'สินค้าหมด'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ========================================
// Cart Functions
// ========================================

function addToCart(sku) {
  const part = mockData.partsInventory.find(p => p.sku === sku);
  if (!part || part.stock === 0) {
    utils.showNotification('ไม่สามารถเพิ่มสินค้าได้', 'error');
    return;
  }

  // Check if already in cart
  const existingItem = appState.cart.find(item => item.sku === sku);

  if (existingItem) {
    // Increase quantity
    if (existingItem.quantity < part.stock) {
      existingItem.quantity++;
      appState.addToCart(appState.cart); // Update localStorage
      utils.showNotification(`เพิ่มจำนวน ${part.name} เป็น ${existingItem.quantity} ชิ้น`, 'success');
    } else {
      utils.showNotification('ไม่สามารถเพิ่มได้ เกินสต๊อกที่มี', 'error');
      return;
    }
  } else {
    // Add new item
    const cartItem = {
      sku: part.sku,
      name: part.name,
      brand: part.brand,
      price: part.price,
      quantity: 1,
      maxStock: part.stock
    };
    appState.cart.push(cartItem);
    localStorage.setItem('helpmecar_cart', JSON.stringify(appState.cart));
    utils.showNotification(`เพิ่ม ${part.name} ลงในตะกร้าแล้ว`, 'success');
  }

  updateCartCount();
}

function removeFromCart(index) {
  const item = appState.cart[index];
  if (confirm(`ต้องการลบ ${item.name} ออกจากตะกร้าหรือไม่?`)) {
    appState.removeFromCart(index);
    updateCartCount();
    renderCartItems();
    utils.showNotification('ลบสินค้าออกจากตะกร้าแล้ว', 'info');
  }
}

function updateQuantity(index, change) {
  const item = appState.cart[index];
  const newQuantity = item.quantity + change;

  if (newQuantity < 1) {
    removeFromCart(index);
    return;
  }

  if (newQuantity > item.maxStock) {
    utils.showNotification('ไม่สามารถเพิ่มได้ เกินสต๊อกที่มี', 'error');
    return;
  }

  item.quantity = newQuantity;
  localStorage.setItem('helpmecar_cart', JSON.stringify(appState.cart));
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  const count = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}

function viewCart() {
  renderCartItems();
  modal.open('cartModal');
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (appState.cart.length === 0) {
    container.innerHTML = `
      <div class="text-center" style="padding: 2rem;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
        <h3 class="text-muted">ตะกร้าสินค้าว่างเปล่า</h3>
        <p class="text-muted">เริ่มเลือกซื้ออะไหล่เลย!</p>
      </div>
    `;
    totalEl.textContent = utils.formatCurrency(0);
    return;
  }

  let total = 0;

  container.innerHTML = appState.cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    return `
      <div class="card mb-2" style="box-shadow: none; background: var(--bg-light);">
        <div class="card-body" style="padding: 1rem;">
          <div class="flex-between mb-2">
            <div>
              <strong>${item.name}</strong>
              <p class="text-muted mb-0" style="font-size: 0.875rem;">${item.brand}</p>
            </div>
            <button class="btn btn-sm" style="background: var(--danger); color: white;" onclick="removeFromCart(${index})">🗑️</button>
          </div>
          
          <div class="flex-between">
            <div class="flex-center gap-2">
              <button class="btn btn-sm btn-outline" onclick="updateQuantity(${index}, -1)">−</button>
              <span style="min-width: 2rem; text-align: center;"><strong>${item.quantity}</strong></span>
              <button class="btn btn-sm btn-outline" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <div class="text-right">
              <p class="text-muted mb-0" style="font-size: 0.875rem;">${utils.formatCurrency(item.price)} × ${item.quantity}</p>
              <strong class="text-primary">${utils.formatCurrency(itemTotal)}</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  totalEl.textContent = utils.formatCurrency(total);
}

function checkout() {
  if (appState.cart.length === 0) {
    utils.showNotification('ตะกร้าสินค้าว่างเปล่า', 'error');
    return;
  }

  const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = appState.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (confirm(`ยืนยันการสั่งซื้อ\n\nจำนวน: ${itemCount} รายการ\nรวมทั้งหมด: ${utils.formatCurrency(total)}\n\nในเวอร์ชันจริงจะไปหน้าชำระเงิน`)) {
    utils.showNotification('กำลังดำเนินการสั่งซื้อ...', 'success');

    // Clear cart after 2 seconds
    setTimeout(() => {
      appState.clearCart();
      updateCartCount();
      modal.close('cartModal');
      utils.showNotification('สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ', 'success');
    }, 2000);
  }
}

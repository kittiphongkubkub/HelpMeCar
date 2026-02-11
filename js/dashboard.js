// ========================================
// Dashboard Functionality
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    if (!appState.isAuthenticated) {
        // Redirect to login if not authenticated (in production)
        // For now, we auto-login in app.js
    }

    // Populate user information
    populateUserInfo();

    // Populate vehicle information
    populateVehicleInfo();

    // Generate maintenance reminders
    generateReminders();

    // Show recent service history
    populateRecentServices();
});

// ========================================
// Populate User Info
// ========================================

function populateUserInfo() {
    if (appState.currentUser) {
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = appState.currentUser.name;
        }
    }
}

// ========================================
// Populate Vehicle Info
// ========================================

function populateVehicleInfo() {
    const vehicle = appState.currentVehicle;

    if (!vehicle) {
        document.getElementById('vehicleInfo').innerHTML = `
      <p class="text-muted text-center">ไม่พบข้อมูลรถยนต์</p>
      <div class="text-center mt-2">
        <button class="btn btn-primary" onclick="alert('ฟีเจอร์เพิ่มรถยนต์จะพัฒนาเร็วๆ นี้')">เพิ่มรถยนต์</button>
      </div>
    `;
        return;
    }

    // Render vehicle selector if multiple vehicles
    const selectorContainer = document.getElementById('vehicleSelectorContainer');
    if (selectorContainer) {
        const selectorHTML = appState.renderVehicleSelector();
        if (selectorHTML) {
            selectorContainer.innerHTML = selectorHTML;
        }
    }

    // Update vehicle name
    document.getElementById('vehicleName').textContent = `${vehicle.make} ${vehicle.model} (${vehicle.year})`;

    // Update license plate
    document.getElementById('vehiclePlate').textContent = `ทะเบียน: ${vehicle.licensePlate}`;

    // Update current mileage
    document.getElementById('vehicleMileage').textContent = `${utils.formatNumber(vehicle.mileage)} กม.`;

    // Calculate mileage remaining until next service
    const remaining = vehicle.nextServiceDue - vehicle.mileage;
    const progress = ((vehicle.mileage / vehicle.nextServiceDue) * 100).toFixed(1);

    document.getElementById('mileageRemaining').textContent = `${utils.formatNumber(remaining)} กม.`;
    document.getElementById('mileageProgress').style.width = `${progress}%`;

    // Change color based on urgency
    const progressBar = document.getElementById('mileageProgress');
    if (remaining < 500) {
        progressBar.style.background = 'var(--danger)';
    } else if (remaining < 2000) {
        progressBar.style.background = 'var(--warning)';
    } else {
        progressBar.style.background = 'var(--steel-blue)';
    }
}

// Make loadDashboardData available globally for vehicle switching
window.loadDashboardData = function () {
    populateVehicleInfo();
    generateReminders();
    populateRecentServices();
};

// ========================================
// Generate Maintenance Reminders
// ========================================

function generateReminders() {
    const vehicle = appState.currentVehicle;
    const remindersContainer = document.getElementById('reminders');

    if (!vehicle) {
        remindersContainer.innerHTML = '<p class="text-muted">ไม่มีการแจ้งเตือน</p>';
        return;
    }

    const reminders = [];

    // Calculate days since last service
    const lastServiceDate = new Date(vehicle.lastServiceDate);
    const today = new Date();
    const daysSinceService = Math.floor((today - lastServiceDate) / (1000 * 60 * 60 * 24));

    // Mileage-based reminder
    const mileageRemaining = vehicle.nextServiceDue - vehicle.mileage;
    if (mileageRemaining < 500) {
        reminders.push({
            type: 'urgent',
            icon: '⚠️',
            title: 'เปลี่ยนถ่ายน้ำมันเครื่องด่วน!',
            description: `เหลืออีก ${utils.formatNumber(mileageRemaining)} กม.`,
            action: 'นัดหมายเลย'
        });
    } else if (mileageRemaining < 2000) {
        reminders.push({
            type: 'warning',
            icon: '🔔',
            title: 'เปลี่ยนถ่ายน้ำมันเครื่องเร็วๆ นี้',
            description: `เหลืออีก ${utils.formatNumber(mileageRemaining)} กม.`,
            action: 'นัดหมาย'
        });
    }

    // Time-based reminder (every 6 months / 180 days)
    if (daysSinceService > 150 && daysSinceService < 180) {
        reminders.push({
            type: 'info',
            icon: 'ℹ️',
            title: 'ตรวจเช็คสภาพรถตามกำหนด',
            description: `ผ่านมา ${daysSinceService} วันแล้ว (แนะนำ 180 วัน)`,
            action: 'ดูรายละเอียด'
        });
    } else if (daysSinceService >= 180) {
        reminders.push({
            type: 'warning',
            icon: '⏰',
            title: 'ถึงเวลาตรวจเช็คสภาพรถแล้ว',
            description: `ผ่านมา ${daysSinceService} วัน (เกินกำหนด)`,
            action: 'นัดหมายเลย'
        });
    }

    // General maintenance tips
    if (reminders.length === 0) {
        reminders.push({
            type: 'success',
            icon: '✅',
            title: 'รถของคุณอยู่ในสภาพดี',
            description: 'ไม่มีการแจ้งเตือนในขณะนี้',
            action: null
        });
    }

    // Render reminders
    let html = '';
    reminders.forEach(reminder => {
        const badgeClass = reminder.type === 'urgent' ? 'badge-danger' :
            reminder.type === 'warning' ? 'badge-warning' :
                reminder.type === 'info' ? 'badge-info' : 'badge-success';

        html += `
      <div class="card mb-2" style="border-left: 4px solid var(--${reminder.type === 'urgent' ? 'danger' : reminder.type === 'warning' ? 'warning' : reminder.type === 'info' ? 'info' : 'success'});">
        <div class="card-body" style="padding: 1rem;">
          <div class="flex-between">
            <div>
              <span style="font-size: 1.5rem; margin-right: 0.5rem;">${reminder.icon}</span>
              <strong>${reminder.title}</strong>
              <p class="text-muted mt-1 mb-0">${reminder.description}</p>
            </div>
            ${reminder.action ? `<button class="btn btn-sm btn-primary" onclick="scheduleService()">${reminder.action}</button>` : ''}
          </div>
        </div>
      </div>
    `;
    });

    remindersContainer.innerHTML = html;
}

// ========================================
// Populate Recent Services
// ========================================

function populateRecentServices() {
    const vehicle = appState.currentVehicle;
    const recentServicesContainer = document.getElementById('recentServices');

    if (!vehicle) {
        recentServicesContainer.innerHTML = '<p class="text-muted">ไม่มีประวัติการซ่อม</p>';
        return;
    }

    // Get recent maintenance logs for this vehicle
    const logs = mockData.maintenanceLogs
        .filter(log => log.vehicleId === vehicle.vehicleId)
        .sort((a, b) => new Date(b.serviceDate) - new Date(a.serviceDate))
        .slice(0, 3); // Show only 3 most recent

    if (logs.length === 0) {
        recentServicesContainer.innerHTML = '<p class="text-muted">ยังไม่มีประวัติการซ่อม</p>';
        return;
    }

    let html = '';
    logs.forEach(log => {
        const mechanic = mockData.mechanics.find(m => m.mechanicId === log.mechanicId);

        html += `
      <div class="card mb-2" style="background: var(--bg-light); box-shadow: none;">
        <div class="card-body" style="padding: 1rem;">
          <div class="flex-between mb-2">
            <div>
              <strong>${log.serviceType}</strong>
              <p class="text-muted mt-1 mb-0">โดย: ${mechanic ? mechanic.name : 'ไม่ทราบ'}</p>
            </div>
            <div class="text-right">
              <p class="text-muted mb-0">${utils.formatDate(log.serviceDate)}</p>
              <strong class="text-primary">${utils.formatCurrency(log.totalCost)}</strong>
            </div>
          </div>
          <p class="text-muted" style="font-size: 0.875rem; margin: 0;">เลขไมล์: ${utils.formatNumber(log.mileageAtService)} กม.</p>
        </div>
      </div>
    `;
    });

    recentServicesContainer.innerHTML = html;
}

// ========================================
// Action Functions
// ========================================

function viewVehicleDetails() {
    const vehicle = appState.currentVehicle;
    if (!vehicle) return;

    alert(`รายละเอียดรถยนต์:\n\n` +
        `ยี่ห้อ: ${vehicle.make}\n` +
        `รุ่น: ${vehicle.model}\n` +
        `ปี: ${vehicle.year}\n` +
        `VIN: ${vehicle.vin}\n` +
        `ทะเบียน: ${vehicle.licensePlate}\n` +
        `เลขไมล์: ${utils.formatNumber(vehicle.mileage)} กม.\n` +
        `ซ่อมล่าสุด: ${utils.formatDate(vehicle.lastServiceDate)}\n` +
        `ซ่อมครั้งถัดไป: ${utils.formatNumber(vehicle.nextServiceDue)} กม.`
    );
}

function scheduleService() {
    // In production, this would redirect to booking page with type=scheduled
    if (confirm('ต้องการนัดหมายช่างซ่อมบำรุงหรือไม่?')) {
        window.location.href = 'booking.html?type=scheduled';
    }
}

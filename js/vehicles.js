// ========================================
// My Vehicles - Vehicle Management
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    navigation.setActiveLink('vehicles.html');
    modal.setupCloseOnOutsideClick('vehicleModal');
    loadVehicles();
});

// ========================================
// Load and Render Vehicles
// ========================================

function loadVehicles() {
    const vehicles = appState.getUserVehicles();
    const grid = document.getElementById('vehiclesGrid');
    const emptyState = document.getElementById('emptyState');

    if (vehicles.length === 0) {
        grid.classList.add('d-none');
        emptyState.classList.remove('d-none');
        return;
    }

    grid.classList.remove('d-none');
    emptyState.classList.add('d-none');

    grid.innerHTML = vehicles.map(vehicle => {
        const isCurrent = appState.currentVehicle && vehicle.vehicleId === appState.currentVehicle.vehicleId;
        const mileageRemaining = vehicle.nextServiceDue - vehicle.mileage;
        const needsService = mileageRemaining < 2000;

        return `
            <div class="card" style="${isCurrent ? 'border: 3px solid var(--primary-blue);' : ''}">
                <div class="card-body">
                    ${isCurrent ? '<span class="badge badge-primary" style="position: absolute; top: 1rem; right: 1rem;">✓ รถปัจจุบัน</span>' : ''}
                    
                    <!-- Vehicle Icon -->
                    <div style="font-size: 3rem; text-align: center; margin-bottom: 0.75rem;">🚗</div>
                    
                    <!-- Vehicle Info -->
                    <h3 class="mb-1" style="text-align: center; font-size: 1.25rem;">${vehicle.make} ${vehicle.model}</h3>
                    <p class="text-muted text-center mb-3" style="font-size: 0.9rem;">${vehicle.year} • ${vehicle.licensePlate}</p>
                    
                    <!-- Stats -->
                    <div class="mb-3" style="background: var(--bg-light); padding: 0.875rem; border-radius: var(--radius-md);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.625rem; font-size: 0.9rem;">
                            <span class="text-muted">📍 เลขไมล์:</span>
                            <strong>${utils.formatNumber(vehicle.mileage)} กม.</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.625rem; font-size: 0.9rem;">
                            <span class="text-muted">🔧 ซ่อมล่าสุด:</span>
                            <strong>${utils.formatDate(vehicle.lastServiceDate)}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                            <span class="text-muted">⚙️ ซ่อมครั้งถัดไป:</span>
                            <strong class="${needsService ? 'text-danger' : ''}">${utils.formatNumber(vehicle.nextServiceDue)} กม.</strong>
                        </div>
                    </div>

                    ${needsService ? `
                        <div class="alert alert-warning" style="padding: 0.625rem; margin-bottom: 1rem; font-size: 0.875rem;">
                            ⚠️ ใกล้ถึงเวลาบำรุงรักษา (เหลือ ${utils.formatNumber(mileageRemaining)} กม.)
                        </div>
                    ` : ''}
                    
                    <!-- Actions - Mobile Optimized -->
                    <div class="vehicle-actions" style="display: flex; flex-direction: column; gap: 0.75rem;">
                        ${!isCurrent ? `
                            <button class="btn btn-outline" onclick="selectVehicle('${vehicle.vehicleId}')" style="width: 100%; padding: 0.875rem; font-size: 1rem;">
                                ✓ เลือกรถนี้
                            </button>
                        ` : ''}
                        <div style="display: flex; gap: 0.75rem;">
                            <button class="btn btn-primary" onclick="openEditVehicleModal('${vehicle.vehicleId}')" style="flex: 1; padding: 0.875rem; font-size: 1rem;">
                                ✏️ แก้ไข
                            </button>
                            <button class="btn" style="background: var(--danger); color: white; padding: 0.875rem 1.25rem; font-size: 1rem;" onclick="deleteVehicle('${vehicle.vehicleId}')">
                                🗑️ ลบ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ========================================
// Select Vehicle
// ========================================

function selectVehicle(vehicleId) {
    appState.switchVehicle(vehicleId);
    loadVehicles();
    utils.showNotification('เปลี่ยนรถสำเร็จ', 'success');
}

// ========================================
// Add Vehicle Modal
// ========================================

function openAddVehicleModal() {
    document.getElementById('modalTitle').textContent = 'เพิ่มรถใหม่';
    document.getElementById('vehicleForm').reset();
    document.getElementById('editVehicleId').value = '';
    modal.open('vehicleModal');
}

// ========================================
// Edit Vehicle Modal
// ========================================

function openEditVehicleModal(vehicleId) {
    const vehicle = mockData.vehicles.find(v => v.vehicleId === vehicleId);
    if (!vehicle) {
        utils.showNotification('ไม่พบข้อมูลรถ', 'error');
        return;
    }

    document.getElementById('modalTitle').textContent = 'แก้ไขข้อมูลรถ';
    document.getElementById('editVehicleId').value = vehicle.vehicleId;
    document.getElementById('make').value = vehicle.make;
    document.getElementById('model').value = vehicle.model;
    document.getElementById('year').value = vehicle.year;
    document.getElementById('licensePlate').value = vehicle.licensePlate;
    document.getElementById('mileage').value = vehicle.mileage;
    document.getElementById('vin').value = vehicle.vin || '';

    modal.open('vehicleModal');
}

// ========================================
// Submit Vehicle Form (Add/Edit)
// ========================================

function submitVehicleForm(event) {
    event.preventDefault();

    const form = event.target;
    const editVehicleId = document.getElementById('editVehicleId').value;
    const formData = {
        make: form.make.value.trim(),
        model: form.model.value.trim(),
        year: parseInt(form.year.value),
        licensePlate: form.licensePlate.value.trim(),
        mileage: parseInt(form.mileage.value),
        vin: form.vin.value.trim() || null
    };

    // Validate
    if (!formData.make || !formData.model || !formData.licensePlate) {
        utils.showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        return;
    }

    if (formData.year < 1900 || formData.year > 2030) {
        utils.showNotification('ปีไม่ถูกต้อง', 'error');
        return;
    }

    if (formData.mileage < 0) {
        utils.showNotification('เลขไมล์ไม่ถูกต้อง', 'error');
        return;
    }

    if (editVehicleId) {
        // Edit existing vehicle
        const vehicle = mockData.vehicles.find(v => v.vehicleId === editVehicleId);
        if (vehicle) {
            vehicle.make = formData.make;
            vehicle.model = formData.model;
            vehicle.year = formData.year;
            vehicle.licensePlate = formData.licensePlate;
            vehicle.mileage = formData.mileage;
            vehicle.vin = formData.vin;

            utils.showNotification('แก้ไขข้อมูลรถสำเร็จ', 'success');
        }
    } else {
        // Add new vehicle
        const newVehicleId = `V${String(mockData.vehicles.length + 1).padStart(3, '0')}`;
        const newVehicle = {
            vehicleId: newVehicleId,
            ownerId: appState.currentUser.userId,
            make: formData.make,
            model: formData.model,
            year: formData.year,
            vin: formData.vin,
            licensePlate: formData.licensePlate,
            mileage: formData.mileage,
            lastServiceDate: new Date().toISOString().split('T')[0],
            nextServiceDue: formData.mileage + 5000,
            image: null
        };

        mockData.vehicles.push(newVehicle);
        appState.currentUser.registeredVehicles.push(newVehicleId);

        utils.showNotification('เพิ่มรถใหม่สำเร็จ', 'success');
    }

    modal.close('vehicleModal');
    loadVehicles();
}

// ========================================
// Delete Vehicle
// ========================================

function deleteVehicle(vehicleId) {
    const vehicle = mockData.vehicles.find(v => v.vehicleId === vehicleId);
    if (!vehicle) {
        utils.showNotification('ไม่พบข้อมูลรถ', 'error');
        return;
    }

    // Check if it's the only vehicle
    if (appState.getUserVehicles().length === 1) {
        utils.showNotification('ไม่สามารถลบรถคันสุดท้ายได้', 'error');
        return;
    }

    if (!confirm(`ต้องการลบรถ ${vehicle.make} ${vehicle.model} (${vehicle.licensePlate}) หรือไม่?\n\nการลบจะลบประวัติการซ่อมทั้งหมดด้วย`)) {
        return;
    }

    // Remove from mockData.vehicles
    const vehicleIndex = mockData.vehicles.findIndex(v => v.vehicleId === vehicleId);
    if (vehicleIndex > -1) {
        mockData.vehicles.splice(vehicleIndex, 1);
    }

    // Remove from user's registered vehicles
    const userVehicleIndex = appState.currentUser.registeredVehicles.indexOf(vehicleId);
    if (userVehicleIndex > -1) {
        appState.currentUser.registeredVehicles.splice(userVehicleIndex, 1);
    }

    // If deleted vehicle was current, switch to first available
    if (appState.currentVehicle && appState.currentVehicle.vehicleId === vehicleId) {
        const remainingVehicles = appState.getUserVehicles();
        if (remainingVehicles.length > 0) {
            appState.switchVehicle(remainingVehicles[0].vehicleId);
        }
    }

    utils.showNotification('ลบรถสำเร็จ', 'success');
    loadVehicles();
}

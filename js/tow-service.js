// ========================================
// Tow Service Logic
// ========================================

let towRequest = {
    vehicleId: null,
    problem: '',
    pickupLocation: '',
    destination: '',
    notes: '',
    estimatedDistance: 0,
    estimatedPrice: 0
};

let selectedOperator = null;

document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    navigation.setActiveLink('tow-service.html');

    // Setup modal
    modal.setupCloseOnOutsideClick('confirmModal');

    // Populate vehicle dropdown
    populateVehicleDropdown();

    // Handle form submission
    const form = document.getElementById('towRequestForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

// ========================================
// Populate Vehicle Dropdown
// ========================================

function populateVehicleDropdown() {
    const select = document.getElementById('vehicleSelect');
    const userVehicles = appState.getUserVehicles();

    userVehicles.forEach(vehicle => {
        const option = document.createElement('option');
        option.value = vehicle.vehicleId;
        option.textContent = `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})`;
        select.appendChild(option);
    });
}

// ========================================
// Handle Form Submission
// ========================================

function handleFormSubmit(e) {
    e.preventDefault();

    // Get form values
    towRequest.vehicleId = document.getElementById('vehicleSelect').value;
    towRequest.problem = document.getElementById('problemSelect').value;
    towRequest.pickupLocation = document.getElementById('pickupLocation').value;
    towRequest.destination = document.getElementById('destination').value;
    towRequest.notes = document.getElementById('notes').value;

    // Calculate distance (mock - in real app would use Google Maps API)
    towRequest.estimatedDistance = calculateDistance();

    // Calculate estimated price
    towRequest.estimatedPrice = calculatePrice(towRequest.estimatedDistance);

    // Show estimate
    showEstimate();

    // Show available tow trucks
    showAvailableTowTrucks();

    // Hide empty state
    document.getElementById('emptyState').style.display = 'none';

    // Show success notification
    utils.showNotification('ค้นหารถลากเรียบร้อย!', 'success');
}

// ========================================
// Calculate Distance (Mock)
// ========================================

function calculateDistance() {
    // In real app, would use Google Maps Distance Matrix API
    // For now, return random distance between 5-30 km
    return Math.floor(Math.random() * 25) + 5;
}

// ========================================
// Calculate Price
// ========================================

function calculatePrice(distance) {
    // Average price: 18 baht/km with minimum charge
    const avgPricePerKm = 18;
    const minCharge = 500;

    const calculatedPrice = distance * avgPricePerKm;
    return Math.max(calculatedPrice, minCharge);
}

// ========================================
// Show Estimate
// ========================================

function showEstimate() {
    const estimateCard = document.getElementById('estimateCard');
    const distanceEl = document.getElementById('estimatedDistance');
    const priceEl = document.getElementById('estimatedPrice');

    distanceEl.textContent = `${towRequest.estimatedDistance} กม.`;
    priceEl.textContent = utils.formatCurrency(towRequest.estimatedPrice);

    estimateCard.classList.remove('d-none');
}

// ========================================
// Show Available Tow Trucks
// ========================================

function showAvailableTowTrucks() {
    const section = document.getElementById('towTrucksSection');
    const list = document.getElementById('towTrucksList');
    const countEl = document.getElementById('availableCount');

    // Filter available operators
    const availableOperators = mockData.towTruckOperators
        .filter(op => op.available)
        .sort((a, b) => a.estimatedArrival - b.estimatedArrival);

    countEl.textContent = `พบ ${availableOperators.length} คัน`;

    // Render cards
    list.innerHTML = availableOperators.map(op => {
        const totalPrice = Math.max(
            towRequest.estimatedDistance * op.pricePerKm,
            op.minimumCharge
        );

        return `
            <div class="card">
                <div class="card-body">
                    <div class="flex-between mb-3">
                        <div>
                            <h3 class="mb-1">${op.name}</h3>
                            <p class="text-muted mb-1">🚛 ${op.truckType}</p>
                            <p class="text-muted mb-0">🔖 ${op.truckPlate}</p>
                        </div>
                        <div class="text-right">
                            <div style="display: flex; align-items: center; gap: 0.5rem; justify-content: flex-end; margin-bottom: 0.5rem;">
                                <span style="color: #F59E0B; font-size: 1.2rem;">⭐</span>
                                <span style="font-weight: 600; font-size: 1.1rem;">${op.rating}</span>
                                <span class="text-muted" style="font-size: 0.9rem;">(${op.reviewCount})</span>
                            </div>
                            ${op.verified ? '<span style="color: #10B981; font-size: 0.9rem;">✓ ตรวจสอบแล้ว</span>' : ''}
                        </div>
                    </div>

                    <div class="grid grid-3 gap-2 mb-3" style="background: var(--bg-light); padding: 0.75rem; border-radius: var(--radius-md);">
                        <div>
                            <p class="text-muted mb-1" style="font-size: 0.85rem;">จะถึงใน</p>
                            <p class="mb-0" style="font-weight: 600;">${op.estimatedArrival} นาที</p>
                        </div>
                        <div>
                            <p class="text-muted mb-1" style="font-size: 0.85rem;">ประสบการณ์</p>
                            <p class="mb-0" style="font-weight: 600;">${op.yearsExperience} ปี</p>
                        </div>
                        <div>
                            <p class="text-muted mb-1" style="font-size: 0.85rem;">งานสำเร็จ</p>
                            <p class="mb-0" style="font-weight: 600;">${utils.formatNumber(op.completedJobs)}</p>
                        </div>
                    </div>

                    <div class="flex-between mb-3" style="padding: 0.75rem; background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1)); border-radius: var(--radius-md); border: 1px solid rgba(245, 158, 11, 0.2);">
                        <div>
                            <p class="text-muted mb-0" style="font-size: 0.9rem;">ราคารวม (${towRequest.estimatedDistance} กม.)</p>
                            <p class="text-muted mb-0" style="font-size: 0.8rem;">฿${op.pricePerKm}/กม. | ขั้นต่ำ ฿${op.minimumCharge}</p>
                        </div>
                        <h2 class="text-primary mb-0">${utils.formatCurrency(totalPrice)}</h2>
                    </div>

                    <button class="btn btn-primary btn-block" onclick="requestTowTruck('${op.operatorId}')">
                        เรียกรถลากคันนี้
                    </button>
                </div>
            </div>
        `;
    }).join('');

    section.classList.remove('d-none');
}

// ========================================
// Use Current Location
// ========================================

function useCurrentLocation() {
    // In real app, would use Geolocation API
    // For now, just set a mock location
    document.getElementById('pickupLocation').value = 'ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร';
    utils.showNotification('ใช้ตำแหน่งปัจจุบัน', 'success');
}

// ========================================
// Request Tow Truck
// ========================================

function requestTowTruck(operatorId) {
    selectedOperator = mockData.towTruckOperators.find(op => op.operatorId === operatorId);

    if (!selectedOperator) {
        utils.showNotification('ไม่พบข้อมูลรถลาก', 'error');
        return;
    }

    // Show confirmation modal
    const vehicle = mockData.vehicles.find(v => v.vehicleId === towRequest.vehicleId);
    const totalPrice = Math.max(
        towRequest.estimatedDistance * selectedOperator.pricePerKm,
        selectedOperator.minimumCharge
    );

    const confirmDetails = `
        <div style="padding: 1rem 0;">
            <h4 class="mb-3">รายละเอียดการลาก</h4>
            
            <table style="width: 100%; font-size: 0.95rem;">
                <tr>
                    <td style="padding: 0.5rem 0; width: 40%;"><strong>รถที่ลาก:</strong></td>
                    <td>${vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})` : '-'}</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem 0;"><strong>จุดรับ:</strong></td>
                    <td>${towRequest.pickupLocation}</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem 0;"><strong>จุดหมาย:</strong></td>
                    <td>${towRequest.destination}</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem 0;"><strong>ระยะทาง:</strong></td>
                    <td>${towRequest.estimatedDistance} กม.</td>
                </tr>
            </table>

            <hr style="margin: 1rem 0;">

            <h4 class="mb-3">ข้อมูลรถลาก</h4>
            
            <table style="width: 100%; font-size: 0.95rem;">
                <tr>
                    <td style="padding: 0.5rem 0; width: 40%;"><strong>ผู้ให้บริการ:</strong></td>
                    <td>${selectedOperator.name}</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem 0;"><strong>เบอร์โทร:</strong></td>
                    <td>${selectedOperator.phone}</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem 0;"><strong>ทะเบียนรถลาก:</strong></td>
                    <td>${selectedOperator.truckPlate}</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem 0;"><strong>เวลาที่จะมาถึง:</strong></td>
                    <td>ประมาณ ${selectedOperator.estimatedArrival} นาที</td>
                </tr>
                <tr style="background: var(--bg-light);">
                    <td style="padding: 0.5rem;"><strong>ราคารวม:</strong></td>
                    <td style="padding: 0.5rem;"><strong class="text-primary" style="font-size: 1.2rem;">${utils.formatCurrency(totalPrice)}</strong></td>
                </tr>
            </table>
        </div>
    `;

    document.getElementById('confirmDetails').innerHTML = confirmDetails;
    modal.open('confirmModal');
}

// ========================================
// Confirm Tow Request
// ========================================

function confirmTowRequest() {
    if (!selectedOperator) return;

    // In real app, would send request to backend
    // For now, just save to localStorage and show success

    const towRequestData = {
        ...towRequest,
        operator: selectedOperator,
        requestDate: new Date().toISOString(),
        status: 'pending'
    };

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem('helpmecar_tow_requests') || '[]');
    existingRequests.push(towRequestData);
    localStorage.setItem('helpmecar_tow_requests', JSON.stringify(existingRequests));

    // Close modal
    modal.close('confirmModal');

    // Show success message
    utils.showNotification(
        `เรียกรถลากเรียบร้อย! ${selectedOperator.name} กำลังมาหาคุณ ประมาณ ${selectedOperator.estimatedArrival} นาที`,
        'success'
    );

    // Reset form after 2 seconds
    setTimeout(() => {
        document.getElementById('towRequestForm').reset();
        document.getElementById('estimateCard').classList.add('d-none');
        document.getElementById('towTrucksSection').classList.add('d-none');
        document.getElementById('emptyState').style.display = 'block';
    }, 2000);
}

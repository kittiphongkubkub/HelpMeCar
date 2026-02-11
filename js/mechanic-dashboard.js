// ========================================
// Mechanic Dashboard Logic
// ========================================

let currentMechanic = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize App State
    if (typeof appState !== 'undefined') {
        appState.init();
    }

    // Get current mechanic from appState
    // For demo, we'll use M001 (สมศักดิ์ ช่างฝีมือ)
    const mechanicId = localStorage.getItem('helpmecar_current_mechanic') || 'M001';
    currentMechanic = mockData.mechanics.find(m => m.mechanicId === mechanicId);

    // If still not found (e.g. fresh load), default to M001
    if (!currentMechanic) {
        console.warn('Mechanic not found, defaulting to M001');
        currentMechanic = mockData.mechanics.find(m => m.mechanicId === 'M001');
    }

    if (!currentMechanic) {
        // Should not happen with mock data
        alert('Data Error: Mechanic not found');
        return;
    }

    // Display mechanic name
    const mechanicNameEl = document.getElementById('mechanicName');
    if (mechanicNameEl) {
        mechanicNameEl.textContent = currentMechanic.name;
    }

    // Load stats
    loadStats();

    // Load jobs
    loadPendingJobs();
    loadActiveJobs();
});

// ========================================
// Load Stats
// ========================================

function loadStats() {
    const today = new Date().toISOString().split('T')[0];

    // Get all jobs for this mechanic
    const mechanicJobs = mockData.jobs.filter(j => j.mechanicId === currentMechanic.mechanicId);

    // Today's jobs
    const todayJobs = mechanicJobs.filter(j =>
        j.acceptedDate && j.acceptedDate.startsWith(today) ||
        j.requestDate && j.requestDate.startsWith(today)
    );
    document.getElementById('todayJobs').textContent = todayJobs.length;

    // Monthly earnings (current month)
    const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
    const monthlyEarnings = mechanicJobs
        .filter(j => j.status === 'completed' &&
            j.completedDate &&
            j.completedDate.startsWith(currentMonth))
        .reduce((sum, j) => sum + (j.totalCost || 0), 0);
    document.getElementById('monthlyEarnings').textContent = utils.formatCurrency(monthlyEarnings);

    // Rating
    document.getElementById('mechanicRating').textContent = `${currentMechanic.rating} ⭐`;

    // Completed jobs
    const completed = mechanicJobs.filter(j => j.status === 'completed').length;
    document.getElementById('completedJobs').textContent = completed;
}

// ========================================
// Load Pending Jobs (งานใหม่รอรับ)
// ========================================

function loadPendingJobs() {
    const pendingJobs = mockData.jobs.filter(j => j.status === 'pending' && j.mechanicId === null);
    const container = document.getElementById('pendingJobsList');

    if (pendingJobs.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5 text-muted bg-white rounded-lg shadow-sm">
                <p>ไม่มีงานใหม่ในขณะนี้</p>
                <small>งานใหม่จะปรากฏที่นี่เมื่อลูกค้าแจ้งซ่อม</small>
            </div>`;
        return;
    }

    container.innerHTML = pendingJobs.map(job => {
        const vehicle = mockData.vehicles.find(v => v.vehicleId === job.vehicleId);
        const isEmergency = job.serviceType === 'emergency';

        return `
            <div class="job-card">
                <div class="card-body">
                    <div class="job-header">
                        <span class="job-badge ${isEmergency ? 'badge-emergency' : 'badge-appointment'}">
                            ${isEmergency ? '🚨 ฉุกเฉิน' : '📅 นัดหมาย'}
                        </span>
                        <div class="text-end">
                            <small class="text-muted d-block" style="font-size: 0.8rem;">
                                ${utils.formatDate(job.requestDate)}
                            </small>
                            <span class="text-warning" style="font-size: 0.8rem;">⏳ รอรับงาน</span>
                        </div>
                    </div>

                    <div class="job-body">
                        <div class="mb-2">
                             <div class="d-flex justify-content-between align-items-center mb-1">
                                <h3 class="vehicle-info mb-0">${vehicle ? `${vehicle.make} ${vehicle.model}` : 'รถยนต์'}</h3>
                                <span class="license-plate ms-2">${vehicle ? vehicle.licensePlate : '-'}</span>
                            </div>
                        </div>
                        
                        <div class="symptom-box">
                            <strong>อาการ:</strong> ${job.symptoms}
                        </div>

                        <div class="customer-row">
                            <span>👤</span> ${job.customerName} (${job.customerPhone})
                        </div>
                         <div class="customer-row">
                            <span>📍</span> <span class="text-truncate">${job.location}</span>
                        </div>
                    </div>

                    <div class="job-footer d-flex gap-2">
                         <button class="btn btn-action-primary flex-grow-1" onclick="acceptJob('${job.jobId}')">รับงาน</button>
                         <button class="btn btn-action-outline flex-grow-1" onclick="rejectJob('${job.jobId}')">ปฏิเสธ</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ========================================
// Load Active Jobs (งานที่กำลังทำ)
// ========================================

function loadActiveJobs() {
    const activeJobs = mockData.jobs.filter(j =>
        j.mechanicId === currentMechanic.mechanicId &&
        (j.status === 'accepted' || j.status === 'in_progress')
    );
    const container = document.getElementById('activeJobsList');

    if (activeJobs.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5 text-muted bg-white rounded-lg shadow-sm">
                <p>ไม่มีงานที่กำลังทำในขณะนี้</p>
            </div>`;
        return;
    }

    container.innerHTML = activeJobs.map(job => {
        const vehicle = mockData.vehicles.find(v => v.vehicleId === job.vehicleId);
        const statusText = job.status === 'accepted' ? '👍 รับงานแล้ว' : '🔧 กำลังทำ';
        const statusClass = job.status === 'accepted' ? 'text-primary' : 'text-info';

        return `
             <div class="job-card" style="border-left: 4px solid var(--primary-blue);">
                <div class="card-body">
                    <div class="job-header">
                        <span class="job-badge badge-appointment">Job #${job.jobId}</span>
                        <div class="text-end">
                            <span class="${statusClass}" style="font-weight: 600;">${statusText}</span>
                             <small class="text-muted d-block" style="font-size: 0.8rem;">
                                ${utils.formatDate(job.acceptedDate)}
                            </small>
                        </div>
                    </div>

                    <div class="job-body">
                         <div class="mb-2">
                            <span class="license-plate">${vehicle ? vehicle.licensePlate : '-'}</span>
                            <h3 class="vehicle-info">${vehicle ? `${vehicle.make} ${vehicle.model}` : '-'}</h3>
                        </div>
                        
                        <div class="symptom-box">
                            <strong>อาการ:</strong> ${job.symptoms}
                        </div>

                        <div class="customer-row">
                            <span>👤</span> ${job.customerName}
                        </div>
                    </div>

                    <div class="job-footer d-flex gap-2">
                        <a href="mechanic-job-detail.html?jobId=${job.jobId}" class="btn btn-secondary flex-grow-1" style="border-radius: 999px;">ดูรายละเอียด</a>
                        ${job.status === 'in_progress' ?
                `<button class="btn btn-success flex-grow-1" style="border-radius: 999px;" onclick="completeJob('${job.jobId}')">แจ้งซ่อมเสร็จ</button>`
                : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ========================================
// Accept Job
// ========================================

function acceptJob(jobId) {
    const job = mockData.jobs.find(j => j.jobId === jobId);
    if (!job) return;

    // Update job
    job.mechanicId = currentMechanic.mechanicId;
    job.status = 'accepted';
    job.acceptedDate = new Date().toISOString();

    // Save to localStorage (in real app, would send to backend)
    localStorage.setItem('helpmecar_jobs', JSON.stringify(mockData.jobs));

    utils.showNotification(`รับงาน ${jobId} เรียบร้อย!`, 'success');

    // Reload
    loadStats();
    loadPendingJobs();
    loadActiveJobs();
}

// ========================================
// Reject Job
// ========================================

function rejectJob(jobId) {
    utils.showNotification(`ปฏิเสธงาน ${jobId}`, 'info');
    // In real app, would update status or remove from list
    // For now, just show notification
}

// ========================================
// Complete Job (Quick)
// ========================================

function completeJob(jobId) {
    // Redirect to detail page for proper completion
    window.location.href = `mechanic-job-detail.html?jobId=${jobId}`;
}

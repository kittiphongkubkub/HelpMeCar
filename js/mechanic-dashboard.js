// ========================================
// Mechanic Dashboard Logic
// ========================================

let currentMechanic = null;

document.addEventListener('DOMContentLoaded', () => {
    // Get current mechanic from appState
    // For demo, we'll use M001 (สมศักดิ์ ช่างฝีมือ)
    const mechanicId = localStorage.getItem('helpmecar_current_mechanic') || 'M001';
    currentMechanic = mockData.mechanics.find(m => m.mechanicId === mechanicId);

    if (!currentMechanic) {
        window.location.href = '../pages/login.html';
        return;
    }

    // Display mechanic name
    document.getElementById('mechanicName').textContent = currentMechanic.name;

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
        container.innerHTML = '<p class="text-muted text-center">ไม่มีงานใหม่ในขณะนี้</p>';
        return;
    }

    container.innerHTML = pendingJobs.map(job => {
        const vehicle = mockData.vehicles.find(v => v.vehicleId === job.vehicleId);
        const isEmergency = job.serviceType === 'emergency';

        return `
            <div class="card mb-3" style="border-left: 4px solid ${isEmergency ? 'var(--danger)' : 'var(--steel-blue)'};">
                <div class="card-body">
                    <div class="flex-between mb-2">
                        <div>
                            <h4>${isEmergency ? '🚨 ฉุกเฉิน' : '📅 นัดหมาย'}</h4>
                            <p class="text-muted mb-0">Job ID: ${job.jobId}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-muted mb-0">${utils.formatDate(job.requestDate)}</p>
                        </div>
                    </div>

                    <div class="grid grid-2 gap-3 mb-3">
                        <div>
                            <p class="text-muted mb-1"><strong>👤 ลูกค้า:</strong></p>
                            <p class="mb-0">${job.customerName}</p>
                            <p class="text-muted mb-0">📞 ${job.customerPhone}</p>
                        </div>
                        <div>
                            <p class="text-muted mb-1"><strong>🚗 รถ:</strong></p>
                            <p class="mb-0">${vehicle ? `${vehicle.make} ${vehicle.model}` : '-'}</p>
                            <p class="text-muted mb-0">${vehicle ? vehicle.licensePlate : '-'}</p>
                        </div>
                    </div>

                    <div class="mb-3">
                        <p class="text-muted mb-1"><strong>⚠️ ปัญหา:</strong></p>
                        <p class="mb-0">${job.symptoms}</p>
                    </div>

                    <div class="mb-3">
                        <p class="text-muted mb-1"><strong>📍 สถานที่:</strong></p>
                        <p class="mb-0">${job.location}</p>
                    </div>

                    <div class="flex-between">
                        <button class="btn btn-outline" onclick="rejectJob('${job.jobId}')">ปฏิเสธ</button>
                        <button class="btn btn-primary" onclick="acceptJob('${job.jobId}')">รับงาน</button>
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
        container.innerHTML = '<p class="text-muted text-center">ไม่มีงานที่กำลังทำในขณะนี้</p>';
        return;
    }

    container.innerHTML = activeJobs.map(job => {
        const vehicle = mockData.vehicles.find(v => v.vehicleId === job.vehicleId);

        return `
            <div class="card mb-3" style="border-left: 4px solid var(--primary);">
                <div class="card-body">
                    <div class="flex-between mb-2">
                        <div>
                            <h4>Job #${job.jobId}</h4>
                            <span class="badge" style="background: var(--primary);">${job.status === 'accepted' ? 'รับงานแล้ว' : 'กำลังทำ'}</span>
                        </div>
                        <div class="text-right">
                            <p class="text-muted mb-0">รับงาน: ${utils.formatDate(job.acceptedDate)}</p>
                        </div>
                    </div>

                    <div class="grid grid-2 gap-3 mb-3">
                        <div>
                            <p class="text-muted mb-1"><strong>👤 ลูกค้า:</strong></p>
                            <p class="mb-0">${job.customerName}</p>
                        </div>
                        <div>
                            <p class="text-muted mb-1"><strong>🚗 รถ:</strong></p>
                            <p class="mb-0">${vehicle ? `${vehicle.make} ${vehicle.model}` : '-'}</p>
                        </div>
                    </div>

                    <div class="mb-3">
                        <p class="text-muted mb-1"><strong>⚠️ ปัญหา:</strong></p>
                        <p class="mb-0">${job.symptoms}</p>
                    </div>

                    <div class="flex-between">
                        <a href="mechanic-job-detail.html?jobId=${job.jobId}" class="btn btn-outline">รายละเอียด</a>
                        <button class="btn btn-success" onclick="completeJob('${job.jobId}')">เสร็จสิ้น</button>
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

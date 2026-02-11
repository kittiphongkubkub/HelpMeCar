document.addEventListener('DOMContentLoaded', () => {
    // Initialize app state
    appState.init();

    // Check if user is mechanic
    // Check if user is mechanic - Auto Login for Demo
    let currentUser = appState.currentUser;

    if (!currentUser || currentUser.role !== 'mechanic') {
        // Auto-login as Mechanic M001 for demo convenience
        const demoMechanic = mockData.users.find(u => u.userId === 'M001');
        if (demoMechanic) {
            appState.currentUser = demoMechanic;
            localStorage.setItem('helpmecar_currentUser', JSON.stringify(demoMechanic));
            currentUser = demoMechanic;

            // Show toast to inform user
            setTimeout(() => {
                utils.showNotification('เข้าสู่ระบบอัตโนมัติ (Demo Mode: ช่างสมศักดิ์)', 'info');
            }, 500);
        } else {
            window.location.href = '../pages/login.html';
            return;
        }
    }

    // Initialize Jobs Page
    initJobsPage();
});

function initJobsPage() {
    const jobsList = document.getElementById('jobsList');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const jobCount = document.getElementById('jobCount');

    let currentFilter = 'all';

    // Load jobs from mockData
    // In a real app, this would be an API call
    const allJobs = mockData.jobs || [];

    // Filter jobs relevant to this mechanic (or unassigned jobs)
    // For demo, we show all jobs that are either unassigned (pending) or assigned to this mechanic
    const myJobs = allJobs.filter(job => {
        return job.mechanicId === appState.currentUser.userId ||
            (job.status === 'pending' && !job.mechanicId);
    });

    // Render initial list
    renderJobs(myJobs, currentFilter);

    // Setup Filter Event Listeners
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked
            tab.classList.add('active');

            // Update filter
            currentFilter = tab.dataset.filter;

            // Re-render
            renderJobs(myJobs, currentFilter);
        });
    });

    function renderJobs(jobs, filter) {
        jobsList.innerHTML = '';

        // Filter jobs based on selected tab
        let filteredJobs = jobs;

        if (filter === 'pending') {
            filteredJobs = jobs.filter(j => j.status === 'pending');
        } else if (filter === 'accepted') {
            // "Active" tab shows accepted and in_progress
            filteredJobs = jobs.filter(j => ['accepted', 'in_progress'].includes(j.status));
        } else if (filter === 'completed') {
            filteredJobs = jobs.filter(j => j.status === 'completed' || j.status === 'cancelled');
        }

        // Update count
        jobCount.textContent = `${filteredJobs.length} งาน`;

        // Sort by date (newest first)
        filteredJobs.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

        if (filteredJobs.length === 0) {
            jobsList.innerHTML = `
                <div class="text-center py-5 text-muted">
                    <p style="font-size: 3rem;">📭</p>
                    <p>ไม่มีงานในหมวดหมู่นี้</p>
                </div>
            `;
            return;
        }

        filteredJobs.forEach(job => {
            const customer = mockData.users.find(u => u.userId === job.customerId) || { name: 'ลูกค้าทั่วไป', phone: '-' };
            const vehicle = mockData.vehicles.find(v => v.id === job.vehicleId) || { brand: 'รถยนต์', model: '', licensePlate: '-' };

            const isEmergency = job.serviceType === 'emergency';
            const badgeClass = isEmergency ? 'badge-emergency' : 'badge-appointment';
            const badgeText = isEmergency ? '🚨 ฉุกเฉิน' : '📅 นัดหมาย';

            // Status Badge
            let statusBadge = '';
            if (job.status === 'pending') statusBadge = '<span class="text-warning">⏳ รอรับงาน</span>';
            else if (job.status === 'accepted') statusBadge = '<span class="text-primary">👍 รับงานแล้ว</span>';
            else if (job.status === 'in_progress') statusBadge = '<span class="text-info">🔧 กำลังซ่อม</span>';
            else if (job.status === 'completed') statusBadge = '<span class="text-success">✅ เสร็จสิ้น</span>';
            else if (job.status === 'cancelled') statusBadge = '<span class="text-danger">❌ ยกเลิก</span>';

            const card = document.createElement('div');
            card.className = 'job-card';
            card.innerHTML = `
                <div class="card-body">
                    <div class="job-header">
                        <span class="job-badge ${badgeClass}">${badgeText}</span>
                        <div class="text-end">
                            <small class="text-muted d-block" style="font-size: 0.8rem;">
                                ${utils.formatDate(job.requestDate)}
                            </small>
                            ${statusBadge}
                        </div>
                    </div>

                    <div class="job-body">
                        <div class="mb-2">
                            <span class="license-plate">${vehicle.licensePlate}</span>
                            <h3 class="vehicle-info">${vehicle.brand} ${vehicle.model}</h3>
                        </div>
                        
                        <div class="symptom-box">
                            <strong>อาการ:</strong> ${job.symptoms}
                        </div>

                        <div class="customer-row">
                            <span>👤</span> ${customer.name}
                        </div>
                        <div class="customer-row">
                            <span>📍</span> <span class="text-truncate">${job.location}</span>
                        </div>
                    </div>

                    <div class="job-footer d-flex gap-2">
                        ${renderActionButtons(job)}
                    </div>
                </div>
            `;
            jobsList.appendChild(card);
        });
    }

    function renderActionButtons(job) {
        if (job.status === 'pending') {
            return `
                <button class="btn btn-action-primary flex-grow-1" onclick="acceptJob('${job.jobId}')">รับงาน</button>
                <button class="btn btn-action-outline flex-grow-1" onclick="rejectJob('${job.jobId}')">ปฏิเสธ</button>
            `;
        } else {
            return `
                <a href="mechanic-job-detail.html?id=${job.jobId}" class="btn btn-secondary flex-grow-1" style="border-radius: 999px;">ดูรายละเอียด</a>
            `;
        }
    }

    // Make functions global for onclick
    window.acceptJob = function (jobId) {
        if (!confirm('ยืนยันที่จะรับงานนี้?')) return;

        const jobIndex = mockData.jobs.findIndex(j => j.jobId === jobId);
        if (jobIndex !== -1) {
            mockData.jobs[jobIndex].status = 'accepted';
            mockData.jobs[jobIndex].mechanicId = appState.currentUser.userId; // Assign to current mechanic

            // Save to localStorage
            localStorage.setItem('helpmecar_mockData', JSON.stringify(mockData));

            utils.showNotification('รับงานเรียบร้อยแล้ว! กำลังไปที่รายละเอียกงาน...', 'success');

            setTimeout(() => {
                window.location.href = `mechanic-job-detail.html?id=${jobId}`;
            }, 1000);
        }
    };

    window.rejectJob = function (jobId) {
        if (!confirm('ต้องการปฏิเสธงานนี้?')) return;

        // In a real app, this might reassign to another mechanic or mark as 'rejected'
        // For demo, we'll just hide it or mark cancelled
        const jobIndex = mockData.jobs.findIndex(j => j.jobId === jobId);
        if (jobIndex !== -1) {
            mockData.jobs[jobIndex].status = 'cancelled'; // Or specific logic

            // Save
            localStorage.setItem('helpmecar_mockData', JSON.stringify(mockData));

            utils.showNotification('ปฏิเสธงานแล้ว', 'info');

            // Refresh list
            currentFilter = document.querySelector('.filter-tab.active').dataset.filter;
            renderJobs(myJobs, currentFilter); // Note: Need to re-fetch myJobs better here in real app

            // Simple reload for demo to re-fetch clean list
            setTimeout(() => location.reload(), 500);
        }
    };
}

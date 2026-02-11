// ========================================
// HelpMeCar - Core Application
// ========================================

// ========================================
// Mock Data
// ========================================

const mockData = {
    // ========================================
    // Mock Users - All Test Accounts
    // ========================================

    users: [
        // Owner Accounts
        {
            userId: 'U001',
            name: 'สมชาย ใจดี',
            email: 'somchai@example.com',
            phone: '081-234-5678',
            role: 'owner',
            profileImage: null,
            registeredVehicles: ['V001', 'V002', 'V003', 'V004'],
            memberSince: '2023-01-15',
            totalSpent: 45890,
            totalServices: 38
        },
        {
            userId: 'U002',
            name: 'สมหญิง รักสะอาด',
            email: 'somying@example.com',
            phone: '082-345-6789',
            role: 'owner',
            profileImage: null,
            registeredVehicles: ['V005'],
            memberSince: '2024-03-20',
            totalSpent: 12450,
            totalServices: 8
        },
        {
            userId: 'U003',
            name: 'ประสิทธิ์ มั่งคั่ง',
            email: 'prasit@example.com',
            phone: '083-456-7890',
            role: 'owner',
            profileImage: null,
            registeredVehicles: ['V006', 'V007'],
            memberSince: '2023-06-10',
            totalSpent: 28340,
            totalServices: 15
        },
        {
            userId: 'U004',
            name: 'วิไล ละเอียด',
            email: 'wilai@example.com',
            phone: '084-567-8901',
            role: 'owner',
            profileImage: null,
            registeredVehicles: ['V008'],
            memberSince: '2025-01-05',
            totalSpent: 5680,
            totalServices: 4
        },
        {
            userId: 'U005',
            name: 'ธนา พูนทรัพย์',
            email: 'thana@example.com',
            phone: '085-678-9012',
            role: 'owner',
            profileImage: null,
            registeredVehicles: ['V009', 'V010'],
            memberSince: '2024-08-12',
            totalSpent: 19780,
            totalServices: 11
        },

        // Mechanic Accounts
        {
            userId: 'M001',
            name: 'สมศักดิ์ ช่างฝีมือ',
            email: 'somsak@mechanic.com',
            phone: '089-111-2222',
            role: 'mechanic',
            profileImage: null,
            experience: 15,
            specializations: ['เครื่องยนต์', 'ระบบส่งกำลัง', 'ระบบเบรก'],
            rating: 4.8,
            reviewCount: 234,
            verified: true,
            startingPrice: 500,
            currentLocation: { lat: 13.7563, lng: 100.5018 },
            available: true,
            memberSince: '2022-01-01',
            completedJobs: 234,
            totalEarnings: 456780
        },
        {
            userId: 'M002',
            name: 'วิชัย ช่างไฟ',
            email: 'wichai@mechanic.com',
            phone: '089-333-4444',
            role: 'mechanic',
            profileImage: null,
            experience: 10,
            specializations: ['ระบบไฟฟ้า', 'แอร์', 'ระบบคอมพิวเตอร์'],
            rating: 4.6,
            reviewCount: 189,
            verified: true,
            startingPrice: 450,
            currentLocation: { lat: 13.7465, lng: 100.5342 },
            available: true,
            memberSince: '2022-06-15',
            completedJobs: 189,
            totalEarnings: 345600
        },
        {
            userId: 'M003',
            name: 'ประยุทธ ช่างช่วง',
            email: 'prayut@mechanic.com',
            phone: '089-555-6666',
            role: 'mechanic',
            profileImage: null,
            experience: 20,
            specializations: ['ช่วงล่าง', 'ระบบกันสะเทือน', 'ตั้งศูนย์'],
            rating: 4.9,
            reviewCount: 312,
            verified: true,
            startingPrice: 600,
            currentLocation: { lat: 13.7245, lng: 100.4930 },
            available: false,
            memberSince: '2021-03-20',
            completedJobs: 312,
            totalEarnings: 578900
        },
        {
            userId: 'M004',
            name: 'อนุชา ช่างยาง',
            email: 'anucha@mechanic.com',
            phone: '089-777-8888',
            role: 'mechanic',
            profileImage: null,
            experience: 8,
            specializations: ['ยาง', 'ล้อแม็ก', 'ถ่วงล้อ'],
            rating: 4.5,
            reviewCount: 145,
            verified: true,
            startingPrice: 350,
            currentLocation: { lat: 13.7650, lng: 100.5380 },
            available: true,
            memberSince: '2023-02-10',
            completedJobs: 145,
            totalEarnings: 289000
        },
        {
            userId: 'M005',
            name: 'สุรชัย ช่างสี',
            email: 'surachai@mechanic.com',
            phone: '089-999-0000',
            role: 'mechanic',
            profileImage: null,
            experience: 12,
            specializations: ['ซ่อมสี', 'พ่นสี', 'ซ่อมตัวถัง'],
            rating: 4.7,
            reviewCount: 167,
            verified: true,
            startingPrice: 800,
            currentLocation: { lat: 13.7580, lng: 100.5450 },
            available: true,
            memberSince: '2022-09-05',
            completedJobs: 167,
            totalEarnings: 412300
        },
        {
            userId: 'M006',
            name: 'บุญส่ง ช่างกุญแจ',
            email: 'boonsong@mechanic.com',
            phone: '090-111-2222',
            role: 'mechanic',
            profileImage: null,
            experience: 6,
            specializations: ['กุญแจรถยนต์', 'รีโมท', 'ระบบกันขโมย'],
            rating: 4.4,
            reviewCount: 92,
            verified: true,
            startingPrice: 400,
            currentLocation: { lat: 13.7320, lng: 100.5210 },
            available: true,
            memberSince: '2023-11-12',
            completedJobs: 92,
            totalEarnings: 156700
        }
    ],

    // Tow Truck Operators
    towTruckOperators: [
        {
            operatorId: 'T001',
            name: 'สมบัติ รถลาก',
            phone: '090-111-2222',
            truckType: 'รถเก๋ง/รถกระบะ',
            truckPlate: 'กข 1234 กรุงเทพ',
            currentLocation: { lat: 13.7563, lng: 100.5018 },
            available: true,
            rating: 4.9,
            reviewCount: 156,
            pricePerKm: 18,
            minimumCharge: 500,
            estimatedArrival: 15, // minutes
            verified: true,
            yearsExperience: 12,
            completedJobs: 890
        },
        {
            operatorId: 'T002',
            name: 'วิชัย รถยก',
            phone: '091-222-3333',
            truckType: 'รถเก๋ง/รถกระบะ/รถตู้',
            truckPlate: 'คง 5678 กรุงเทพ',
            currentLocation: { lat: 13.7399, lng: 100.5607 },
            available: true,
            rating: 4.7,
            reviewCount: 234,
            pricePerKm: 20,
            minimumCharge: 600,
            estimatedArrival: 25,
            verified: true,
            yearsExperience: 8,
            completedJobs: 567
        },
        {
            operatorId: 'T003',
            name: 'ประยุทธ รถกู้ภัย',
            phone: '092-333-4444',
            truckType: 'รถทุกประเภท',
            truckPlate: 'กท 9012 กรุงเทพ',
            currentLocation: { lat: 13.7563, lng: 100.5668 },
            available: false,
            rating: 4.8,
            reviewCount: 189,
            pricePerKm: 22,
            minimumCharge: 700,
            estimatedArrival: 0,
            verified: true,
            yearsExperience: 15,
            completedJobs: 1234
        },
        {
            operatorId: 'T004',
            name: 'อนุชา บริการลาก',
            phone: '093-444-5555',
            truckType: 'รถเก๋ง',
            truckPlate: 'ขฆ 3456 กรุงเทพ',
            currentLocation: { lat: 13.7278, lng: 100.5241 },
            available: true,
            rating: 4.6,
            reviewCount: 112,
            pricePerKm: 15,
            minimumCharge: 450,
            estimatedArrival: 20,
            verified: true,
            yearsExperience: 5,
            completedJobs: 345
        },
        {
            operatorId: 'T005',
            name: 'สุรชัย ลากฉุกเฉิน',
            phone: '094-555-6666',
            truckType: 'รถเก๋ง/รถกระบะ',
            truckPlate: 'กฉ 7890 กรุงเทพ',
            currentLocation: { lat: 13.7650, lng: 100.5380 },
            available: true,
            rating: 4.9,
            reviewCount: 278,
            pricePerKm: 19,
            minimumCharge: 550,
            estimatedArrival: 10,
            verified: true,
            yearsExperience: 10,
            completedJobs: 678
        }
    ],

    // Job Bookings (งานจากลูกค้า)
    jobs: [
        // --- Completed Jobs ---
        {
            jobId: 'J001',
            customerId: 'U001',
            customerName: 'คุณสมชาย ใจดี',
            customerPhone: '081-234-5678',
            vehicleId: 'V001',
            mechanicId: 'M001',
            serviceType: 'emergency',
            symptoms: 'เครื่องยนต์ดับกะทันหัน มีเสียงผิดปกติจากเครื่อง ควันสีดำออกมาสตาร์ทไม่ติด',
            location: 'ปั๊ม ปตท. วิภาวดีรังสิต ขาออก',
            locationGPS: { lat: 13.7850, lng: 100.5600 },
            status: 'completed',
            requestDate: '2026-02-05T08:30:00',
            acceptedDate: '2026-02-05T08:35:00',
            completedDate: '2026-02-05T11:00:00',
            scheduledDate: null,
            images: [],
            partsCost: 1050,
            laborCost: 1500,
            totalCost: 2800,
            mechanicNotes: 'เปลี่ยนหัวเทียนและสายหัวเทียน ทดสอบเครื่องยนต์เรียบร้อย',
            partsUsed: [
                { name: 'หัวเทียน NGK', quantity: 4, price: 600 },
                { name: 'สายหัวเทียน', quantity: 1, price: 450 }
            ]
        },
        {
            jobId: 'J002',
            customerId: 'U002',
            customerName: 'คุณสมหญิง รักสะอาด',
            customerPhone: '082-345-6789',
            vehicleId: 'V005',
            mechanicId: 'M001',
            serviceType: 'emergency',
            symptoms: 'ยางแบน มีตะปูตำที่ล้อหน้าขวา',
            location: 'คอนโด The Base สุขุมวิท 77',
            locationGPS: { lat: 13.7100, lng: 100.6000 },
            status: 'completed',
            requestDate: '2026-02-08T15:20:00',
            acceptedDate: '2026-02-08T15:25:00',
            completedDate: '2026-02-08T16:30:00',
            scheduledDate: null,
            images: [],
            partsCost: 350,
            laborCost: 500,
            totalCost: 850,
            mechanicNotes: 'ปะยางแบบสตรีม และเติมลมยางทุกล้อ',
            partsUsed: [
                { name: 'ค่าวัสดุปะยาง', quantity: 1, price: 350 }
            ]
        },

        // --- In Progress Jobs ---
        {
            jobId: 'J003',
            customerId: 'U003',
            customerName: 'คุณประสิทธิ์ มั่งคั่ง',
            customerPhone: '083-456-7890',
            vehicleId: 'V006',
            mechanicId: 'M001',
            serviceType: 'emergency',
            symptoms: 'รถสตาร์ทไม่ติด แบตเตอรี่น่าจะหมด (Honda Civic FD)',
            location: 'ห้าง Central World ลานจอดรถชั้น B2',
            locationGPS: { lat: 13.7460, lng: 100.5390 },
            status: 'in_progress',
            requestDate: new Date(Date.now() - 3600000).toISOString(), // 1 ชม.ที่แล้ว
            acceptedDate: new Date(Date.now() - 3000000).toISOString(),
            completedDate: null,
            scheduledDate: null,
            images: [],
            partsCost: null,
            laborCost: null,
            totalCost: null,
            mechanicNotes: null,
            partsUsed: []
        },

        // --- Pending Jobs (Waiting for acceptance) ---
        {
            jobId: 'J004',
            customerId: 'U004',
            customerName: 'คุณวิไล ละเอียด',
            customerPhone: '084-567-8901',
            vehicleId: 'V008',
            mechanicId: null, // ยังไม่มีช่างรับ
            serviceType: 'emergency',
            symptoms: 'ความร้อนขึ้นสูง มีควันพุ่งจากฝากระโปรง',
            location: 'แยกอโศก-เพชรบุรี',
            locationGPS: { lat: 13.7490, lng: 100.5630 },
            status: 'pending',
            requestDate: new Date(Date.now() - 900000).toISOString(), // 15 นาทีที่แล้ว
            acceptedDate: null,
            completedDate: null,
            scheduledDate: null,
            images: [],
            partsCost: null,
            laborCost: null,
            totalCost: null,
            mechanicNotes: null,
            partsUsed: []
        },
        {
            jobId: 'J005',
            customerId: 'U005',
            customerName: 'คุณธนา พูนทรัพย์',
            customerPhone: '085-678-9012',
            vehicleId: 'V009',
            mechanicId: null,
            serviceType: 'scheduled',
            symptoms: 'เช็คระยะ 100,000 กม. เปลี่ยนน้ำมันเครื่องและไส้กรอง',
            location: 'หมู่บ้านนันทวัน บางนา กม.7',
            locationGPS: { lat: 13.6300, lng: 100.6800 },
            status: 'pending',
            requestDate: new Date(Date.now() - 7200000).toISOString(), // 2 ชม.ที่แล้ว
            acceptedDate: null,
            completedDate: null,
            scheduledDate: new Date(Date.now() + 86400000).toISOString(), // พรุ่งนี้
            images: [],
            partsCost: null,
            laborCost: null,
            totalCost: null,
            mechanicNotes: null,
            partsUsed: []
        },
        {
            jobId: 'J006',
            customerId: 'U002',
            customerName: 'คุณสมหญิง รักสะอาด',
            customerPhone: '082-345-6789',
            vehicleId: 'V005',
            mechanicId: null,
            serviceType: 'emergency',
            symptoms: 'เบรกแล้วมีเสียงดังเอี๊ยดๆ น่าจะเป็นที่ผ้าเบรก',
            location: 'ตลาดนัดจตุจักร ประตู 1',
            locationGPS: { lat: 13.8000, lng: 100.5500 },
            status: 'pending',
            requestDate: new Date(Date.now() - 1800000).toISOString(), // 30 นาทีที่แล้ว
            acceptedDate: null,
            completedDate: null,
            scheduledDate: null,
            images: [],
            partsCost: null,
            laborCost: null,
            totalCost: null,
            mechanicNotes: null,
            partsUsed: []
        }
    ],

    // Current User (mock logged in user)
    currentUser: {
        userId: 'U001',
        name: 'สมชาย ใจดี',
        email: 'somchai@example.com',
        phone: '081-234-5678',
        role: 'owner', // 'owner' or 'mechanic'
        profileImage: null,
        registeredVehicles: ['V001', 'V002', 'V003', 'V004'] // User มีรถ 4 คัน
    },

    // Maintenance History Logs
    maintenanceLogs: [
        // V001 - Toyota Camry
        {
            logId: 'L001',
            vehicleId: 'V001',
            mechanicId: 'M001',
            serviceDate: '2026-01-15',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง + ไส้กรอง',
            laborCost: 300,
            partsCost: 850,
            totalCost: 1150,
            mileageAtService: 45000,
            notes: 'เปลี่ยนน้ำมัน Full Synthetic, ตรวจเช็คสภาพทั่วไป'
        },
        {
            logId: 'L002',
            vehicleId: 'V001',
            mechanicId: 'M003',
            serviceDate: '2025-11-20',
            serviceType: 'เปลี่ยนผ้าเบรกหน้า',
            laborCost: 800,
            partsCost: 2400,
            totalCost: 3200,
            mileageAtService: 42000,
            notes: 'ผ้าเบรกหมดตามอายุการใช้งาน'
        },
        {
            logId: 'L003',
            vehicleId: 'V001',
            mechanicId: 'M001',
            serviceDate: '2025-08-10',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 300,
            partsCost: 750,
            totalCost: 1050,
            mileageAtService: 40000,
            notes: 'บำรุงรักษาตามกำหนด'
        },

        // V002 - Honda Civic
        {
            logId: 'L004',
            vehicleId: 'V002',
            mechanicId: 'M002',
            serviceDate: '2025-12-20',
            serviceType: 'เปลี่ยนแบตเตอรี่',
            laborCost: 200,
            partsCost: 2800,
            totalCost: 3000,
            mileageAtService: 62000,
            notes: 'แบตเก่าอายุครบ 3 ปี'
        },
        {
            logId: 'L005',
            vehicleId: 'V002',
            mechanicId: 'M004',
            serviceDate: '2025-10-05',
            serviceType: 'เปลี่ยนยางทั้ง 4 เส้น',
            laborCost: 400,
            partsCost: 8000,
            totalCost: 8400,
            mileageAtService: 60000,
            notes: 'ยางเดิมสึกหมดแล้ว'
        },
        {
            logId: 'L006',
            vehicleId: 'V002',
            mechanicId: 'M001',
            serviceDate: '2025-07-15',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 300,
            partsCost: 800,
            totalCost: 1100,
            mileageAtService: 57000,
            notes: 'บำรุงรักษาปกติ'
        },

        // V003 - Mazda 3
        {
            logId: 'L007',
            vehicleId: 'V003',
            mechanicId: 'M001',
            serviceDate: '2026-01-25',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง + ตรวจเช็ค 30,000 กม.',
            laborCost: 500,
            partsCost: 1200,
            totalCost: 1700,
            mileageAtService: 28000,
            notes: 'ตรวจเช็คสภาพครบทุกระบบ ทุกอย่างปกติดี'
        },
        {
            logId: 'L008',
            vehicleId: 'V003',
            mechanicId: 'M003',
            serviceDate: '2025-09-10',
            serviceType: 'เปลี่ยนผ้าเบรกหลัง',
            laborCost: 600,
            partsCost: 1800,
            totalCost: 2400,
            mileageAtService: 25000,
            notes: 'ผ้าเบรกหลังบางเกินไป'
        },
        {
            logId: 'L009',
            vehicleId: 'V003',
            mechanicId: 'M001',
            serviceDate: '2025-06-20',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 300,
            partsCost: 900,
            totalCost: 1200,
            mileageAtService: 22000,
            notes: 'บำรุงรักษาตามระยะ'
        },

        // V004 - Isuzu D-Max
        {
            logId: 'L010',
            vehicleId: 'V004',
            mechanicId: 'M001',
            serviceDate: '2026-02-01',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง + ไส้กรองดีเซล',
            laborCost: 400,
            partsCost: 1300,
            totalCost: 1700,
            mileageAtService: 15000,
            notes: 'บำรุงรักษาตามกำหนดสำหรับรถกระบะดีเซล'
        },
        {
            logId: 'L011',
            vehicleId: 'V004',
            mechanicId: 'M004',
            serviceDate: '2025-11-15',
            serviceType: 'ตั้งศูนย์ล้อ + ถ่วงล้อ',
            laborCost: 500,
            partsCost: 200,
            totalCost: 700,
            mileageAtService: 12000,
            notes: 'รถเบี่ยง ตั้งศูนย์ใหม่'
        },
        {
            logId: 'L012',
            vehicleId: 'V004',
            mechanicId: 'M001',
            serviceDate: '2025-08-20',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 400,
            partsCost: 1200,
            totalCost: 1600,
            mileageAtService: 10000,
            notes: 'บำรุงรักษา 10,000 กม. แรก'
        },

        // Additional maintenance records
        // V001 - Toyota Camry (More history)
        {
            logId: 'L013',
            vehicleId: 'V001',
            mechanicId: 'M002',
            serviceDate: '2025-05-15',
            serviceType: 'ซ่อมแอร์ + เติมน้ำยา',
            laborCost: 1200,
            partsCost: 800,
            totalCost: 2000,
            mileageAtService: 38000,
            notes: 'คอมเพรสเซอร์อ่อน ล้างระบบแอร์ เติมน้ำยาใหม่'
        },
        {
            logId: 'L014',
            vehicleId: 'V001',
            mechanicId: 'M004',
            serviceDate: '2025-02-20',
            serviceType: 'เปลี่ยนโช้คอัพหน้า',
            laborCost: 1500,
            partsCost: 4500,
            totalCost: 6000,
            mileageAtService: 35000,
            notes: 'โช้คอัพหน้ารั่ว เปลี่ยนทั้งสองข้าง'
        },

        // V002 - Honda Civic (More history)
        {
            logId: 'L015',
            vehicleId: 'V002',
            mechanicId: 'M001',
            serviceDate: '2025-04-10',
            serviceType: 'เปลี่ยนหัวเทียน + สายหัวเทียน',
            laborCost: 800,
            partsCost: 1200,
            totalCost: 2000,
            mileageAtService: 55000,
            notes: 'เครื่องสะดุด เปลี่ยนหัวเทียนทั้ง 4 จุด'
        },
        {
            logId: 'L016',
            vehicleId: 'V002',
            mechanicId: 'M003',
            serviceDate: '2025-01-25',
            serviceType: 'ล้างหัวฉีด + เติมน้ำยาทำความสะอาด',
            laborCost: 600,
            partsCost: 400,
            totalCost: 1000,
            mileageAtService: 52000,
            notes: 'เครื่องยนต์สะดุดตอนติดเครื่อง'
        },

        // V003 - Mazda 3 (More history)
        {
            logId: 'L017',
            vehicleId: 'V003',
            mechanicId: 'M002',
            serviceDate: '2025-04-15',
            serviceType: 'เปลี่ยนน้ำมันเกียร์ออโต้',
            laborCost: 700,
            partsCost: 1800,
            totalCost: 2500,
            mileageAtService: 20000,
            notes: 'เปลี่ยนน้ำมันเกียร์ออโต้ตามระยะ 20,000 กม.'
        },
        {
            logId: 'L018',
            vehicleId: 'V003',
            mechanicId: 'M001',
            serviceDate: '2025-02-10',
            serviceType: 'ตรวจเช็คสภาพรถ + เปลี่ยนไส้กรองอากาศ',
            laborCost: 300,
            partsCost: 450,
            totalCost: 750,
            mileageAtService: 18000,
            notes: 'ตรวจเช็คระบบทั่วไป ทุกอย่างปกติดี'
        },

        // V004 - Isuzu D-Max (More history)
        {
            logId: 'L019',
            vehicleId: 'V004',
            mechanicId: 'M003',
            serviceDate: '2025-06-25',
            serviceType: 'เปลี่ยนน้ำหล่อเย็น + ล้างหม้อน้ำ',
            laborCost: 500,
            partsCost: 800,
            totalCost: 1300,
            mileageAtService: 8000,
            notes: 'น้ำหล่อเย็นสกปรก ล้างหม้อน้ำและเปลี่ยนใหม่'
        },
        {
            logId: 'L020',
            vehicleId: 'V004',
            mechanicId: 'M001',
            serviceDate: '2025-05-10',
            serviceType: 'ตรวจเช็คสภาพรถ 5,000 กม.',
            laborCost: 300,
            partsCost: 200,
            totalCost: 500,
            mileageAtService: 5000,
            notes: 'ตรวจเช็คครบตามระยะ ทุกอย่างปกติ'
        },

        // Additional Records - V001 Toyota Camry
        {
            logId: 'L021',
            vehicleId: 'V001',
            mechanicId: 'M001',
            serviceDate: '2024-12-05',
            serviceType: 'เปลี่ยนหม้อน้ำ + ท่อน้ำ',
            laborCost: 2000,
            partsCost: 4500,
            totalCost: 6500,
            mileageAtService: 32000,
            notes: 'หม้อน้ำรั่ว เปลี่ยนหม้อน้ำและท่อน้ำทั้งหมด'
        },
        {
            logId: 'L022',
            vehicleId: 'V001',
            mechanicId: 'M003',
            serviceDate: '2024-09-15',
            serviceType: 'เปลี่ยนไส้กรองแอร์ + ทำความสะอาดระบบแอร์',
            laborCost: 500,
            partsCost: 600,
            totalCost: 1100,
            mileageAtService: 30000,
            notes: 'ไส้กรองแอร์สกปรก มีกลิ่นอับ'
        },
        {
            logId: 'L023',
            vehicleId: 'V001',
            mechanicId: 'M002',
            serviceDate: '2024-06-20',
            serviceType: 'เปลี่ยนดิสเบรกหน้า + ผ้าเบรก',
            laborCost: 1200,
            partsCost: 3800,
            totalCost: 5000,
            mileageAtService: 28000,
            notes: 'ดิสเบรกบาง ผ้าเบรกหมด เปลี่ยนทั้งหมด'
        },

        // Additional Records - V002 Honda Civic
        {
            logId: 'L024',
            vehicleId: 'V002',
            mechanicId: 'M004',
            serviceDate: '2024-11-10',
            serviceType: 'เปลี่ยนหม้อพักน้ำมันเพาเวอร์',
            laborCost: 800,
            partsCost: 1500,
            totalCost: 2300,
            mileageAtService: 50000,
            notes: 'หม้อพักน้ำมันเพาเวอร์รั่ว'
        },
        {
            logId: 'L025',
            vehicleId: 'V002',
            mechanicId: 'M001',
            serviceDate: '2024-08-25',
            serviceType: 'เปลี่ยนยางอะไหล่ + ยางหน้า 2 เส้น',
            laborCost: 300,
            partsCost: 4200,
            totalCost: 4500,
            mileageAtService: 48000,
            notes: 'ยางหน้าปะหลายจุด เปลี่ยนใหม่พร้อมยางอะไหล่'
        },
        {
            logId: 'L026',
            vehicleId: 'V002',
            mechanicId: 'M003',
            serviceDate: '2024-05-15',
            serviceType: 'เปลี่ยนไดชาร์จ + สายไฟ',
            laborCost: 1500,
            partsCost: 3500,
            totalCost: 5000,
            mileageAtService: 45000,
            notes: 'ไดชาร์จเสีย แบตเตอรี่ชาร์จไม่เข้า'
        },
        {
            logId: 'L027',
            vehicleId: 'V002',
            mechanicId: 'M001',
            serviceDate: '2024-03-10',
            serviceType: 'เปลี่ยนลูกหมาก + ปลอกหมาก',
            laborCost: 1000,
            partsCost: 2800,
            totalCost: 3800,
            mileageAtService: 42000,
            notes: 'ลูกหมากหลวม มีเสียงดังตอนเลี้ยว'
        },

        // Additional Records - V003 Mazda 3
        {
            logId: 'L028',
            vehicleId: 'V003',
            mechanicId: 'M002',
            serviceDate: '2024-12-20',
            serviceType: 'เปลี่ยนใบปัดน้ำฝน + น้ำยาล้างกระจก',
            laborCost: 200,
            partsCost: 800,
            totalCost: 1000,
            mileageAtService: 16000,
            notes: 'ใบปัดน้ำฝนแตก ปัดไม่สะอาด'
        },
        {
            logId: 'L029',
            vehicleId: 'V003',
            mechanicId: 'M001',
            serviceDate: '2024-10-05',
            serviceType: 'เปลี่ยนหลอดไฟหน้า LED',
            laborCost: 300,
            partsCost: 1200,
            totalCost: 1500,
            mileageAtService: 14000,
            notes: 'หลอดไฟหน้าซ้ายดับ เปลี่ยนใหม่'
        },
        {
            logId: 'L030',
            vehicleId: 'V003',
            mechanicId: 'M004',
            serviceDate: '2024-07-15',
            serviceType: 'หมุนยาง + ถ่วงล้อ',
            laborCost: 400,
            partsCost: 150,
            totalCost: 550,
            mileageAtService: 12000,
            notes: 'หมุนยางตามระยะ เพื่อยืดอายุยาง'
        },

        // Additional Records - V004 Isuzu D-Max
        {
            logId: 'L031',
            vehicleId: 'V004',
            mechanicId: 'M003',
            serviceDate: '2025-03-20',
            serviceType: 'เปลี่ยนน้ำมันเฟืองท้าย',
            laborCost: 600,
            partsCost: 1000,
            totalCost: 1600,
            mileageAtService: 7000,
            notes: 'บำรุงรักษาเฟืองท้าย ตามระยะ'
        },
        {
            logId: 'L032',
            vehicleId: 'V004',
            mechanicId: 'M001',
            serviceDate: '2025-01-10',
            serviceType: 'เปลี่ยนไส้กรองน้ำมันดีเซล',
            laborCost: 300,
            partsCost: 450,
            totalCost: 750,
            mileageAtService: 4000,
            notes: 'เปลี่ยนไส้กรองตามระยะ'
        },
        {
            logId: 'L033',
            vehicleId: 'V003',
            mechanicId: 'M002',
            serviceDate: '2024-05-10',
            serviceType: 'เปลี่ยนแบตเตอรี่',
            laborCost: 200,
            partsCost: 2600,
            totalCost: 2800,
            mileageAtService: 10000,
            notes: 'แบตเก่าอายุครบ ติดเครื่องยาก'
        },
        {
            logId: 'L034',
            vehicleId: 'V002',
            mechanicId: 'M004',
            serviceDate: '2024-01-15',
            serviceType: 'เปลี่ยนน้ำมันเบรก',
            laborCost: 500,
            partsCost: 600,
            totalCost: 1100,
            mileageAtService: 40000,
            notes: 'น้ำมันเบรกสีดำ เปลี่ยนใหม่ทั้งระบบ'
        },
        {
            logId: 'L035',
            vehicleId: 'V001',
            mechanicId: 'M001',
            serviceDate: '2024-04-10',
            serviceType: 'ล้างระบบฉีดน้ำมัน',
            laborCost: 800,
            partsCost: 500,
            totalCost: 1300,
            mileageAtService: 26000,
            notes: 'เครื่องยนต์สะดุด ล้างหัวฉีดและระบบน้ำมันเชื้อเพลิง'
        },
        {
            logId: 'L050',
            vehicleId: 'V001',
            mechanicId: 'M001',
            serviceDate: '2026-02-05',
            serviceType: 'ตรวจเช็คระยะ 50,000 กม.',
            laborCost: 800,
            partsCost: 2500,
            totalCost: 3300,
            mileageAtService: 45000,
            notes: 'เปลี่ยนน้ำมันเครื่อง ไส้กรอง และตรวจเช็คระบบเบรก'
        },
        {
            logId: 'L051',
            vehicleId: 'V001',
            mechanicId: 'M002',
            serviceDate: '2025-11-20',
            serviceType: 'เปลี่ยนยางปัดน้ำฝน',
            laborCost: 100,
            partsCost: 400,
            totalCost: 500,
            mileageAtService: 42000,
            notes: 'ยางปัดน้ำฝนเสื่อมสภาพ'
        },
        {
            logId: 'L052',
            vehicleId: 'V002',
            mechanicId: 'M003',
            serviceDate: '2025-12-15',
            serviceType: 'เปลี่ยนแบตเตอรี่',
            laborCost: 300,
            partsCost: 3000,
            totalCost: 3300,
            mileageAtService: 62000,
            notes: 'แบตเตอรี่เสื่อม สตาร์ทไม่ติด'
        },
        {
            logId: 'L053',
            vehicleId: 'V002',
            mechanicId: 'M001',
            serviceDate: '2025-06-10',
            serviceType: 'เช็คเบรก',
            laborCost: 500,
            partsCost: 1200,
            totalCost: 1700,
            mileageAtService: 60000,
            notes: 'เบรกมีเสียงดัง'
        },
        {
            logId: 'L054',
            vehicleId: 'V003',
            mechanicId: 'M001',
            serviceDate: '2026-01-20',
            serviceType: 'ถ่ายน้ำมันเครื่อง',
            laborCost: 400,
            partsCost: 1500,
            totalCost: 1900,
            mileageAtService: 28000,
            notes: 'ตามรอบระยะเวลา'
        },
        {
            logId: 'L055',
            vehicleId: 'V003',
            mechanicId: 'M002',
            serviceDate: '2025-08-05',
            serviceType: 'เคลือบแก้ว',
            laborCost: 3000,
            partsCost: 2000,
            totalCost: 5000,
            mileageAtService: 25000,
            notes: 'ป้องกันรอยขีดข่วน'
        },
        {
            logId: 'L056',
            vehicleId: 'V004',
            mechanicId: 'M004',
            serviceDate: '2026-01-30',
            serviceType: 'เปลี่ยนยาง 4 เส้น',
            laborCost: 1000,
            partsCost: 12000,
            totalCost: 13000,
            mileageAtService: 15000,
            notes: 'เปลี่ยนยางใหม่ Michelin'
        },
        {
            logId: 'L057',
            vehicleId: 'V004',
            mechanicId: 'M001',
            serviceDate: '2025-10-12',
            serviceType: 'ติดตั้งกล้องหน้ารถ',
            laborCost: 500,
            partsCost: 2500,
            totalCost: 3000,
            mileageAtService: 12000,
            notes: 'ติดตั้งกล้อง Xiaomi 70mai'
        },

        // ========================================
        // V005 - Honda Jazz (สมหญิง รักสะอาด)
        // ========================================
        {
            logId: 'L058',
            vehicleId: 'V005',
            mechanicId: 'M001',
            serviceDate: '2026-01-10',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 300,
            partsCost: 850,
            totalCost: 1150,
            mileageAtService: 18000,
            notes: 'เปลี่ยนน้ำมันเครื่อง + ไส้กรอง บำรุงรักษาตามระยะ'
        },
        {
            logId: 'L059',
            vehicleId: 'V005',
            mechanicId: 'M002',
            serviceDate: '2025-10-15',
            serviceType: 'เช็คระบบแอร์ + เติมน้ำยา',
            laborCost: 800,
            partsCost: 600,
            totalCost: 1400,
            mileageAtService: 15000,
            notes: 'แอร์เย็นไม่เพียงพอ เติมน้ำยาแอร์'
        },
        {
            logId: 'L060',
            vehicleId: 'V005',
            mechanicId: 'M001',
            serviceDate: '2025-07-20',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 300,
            partsCost: 800,
            totalCost: 1100,
            mileageAtService: 12000,
            notes: 'บำรุงรักษาตามกำหนด'
        },
        {
            logId: 'L061',
            vehicleId: 'V005',
            mechanicId: 'M004',
            serviceDate: '2025-05-10',
            serviceType: 'ตั้งศูนย์ล้อ + ถ่วงล้อ',
            laborCost: 400,
            partsCost: 150,
            totalCost: 550,
            mileageAtService: 10000,
            notes: 'รถเบี่ยงเล็กน้อย ตั้งศูนย์ใหม่'
        },

        // ========================================
        // V006 - BMW 320d (ประสิทธิ์ มั่งคั่ง)
        // ========================================
        {
            logId: 'L062',
            vehicleId: 'V006',
            mechanicId: 'M001',
            serviceDate: '2025-12-28',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง + ไส้กรอง',
            laborCost: 800,
            partsCost: 2500,
            totalCost: 3300,
            mileageAtService: 52000,
            notes: 'ใช้น้ำมัน BMW Original 5W-30'
        },
        {
            logId: 'L063',
            vehicleId: 'V006',
            mechanicId: 'M003',
            serviceDate: '2025-09-15',
            serviceType: 'เปลี่ยนผ้าเบรกหน้า + ดิสเบรก',
            laborCost: 1500,
            partsCost: 5500,
            totalCost: 7000,
            mileageAtService: 48000,
            notes: 'เปลี่ยนชุดเบรกหน้า BMW แท้'
        },
        {
            logId: 'L064',
            vehicleId: 'V006',
            mechanicId: 'M002',
            serviceDate: '2025-06-20',
            serviceType: 'เช็คระบบไฟฟ้า + รีเซ็ตคอมพิวเตอร์',
            laborCost: 1200,
            partsCost: 800,
            totalCost: 2000,
            mileageAtService: 45000,
            notes: 'มีไฟ warning ขึ้น เช็คพบเซนเซอร์ออกซิเจนมีปัญหา'
        },
        {
            logId: 'L065',
            vehicleId: 'V006',
            mechanicId: 'M001',
            serviceDate: '2025-03-10',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 800,
            partsCost: 2400,
            totalCost: 3200,
            mileageAtService: 42000,
            notes: 'บำรุงรักษาตามระยะ'
        },

        // ========================================
        // V007 - Mercedes-Benz C200 (ประสิทธิ์ มั่งคั่ง)
        // ========================================
        {
            logId: 'L066',
            vehicleId: 'V007',
            mechanicId: 'M001',
            serviceDate: '2026-01-20',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง + ตรวจเช็คระบบ',
            laborCost: 900,
            partsCost: 2800,
            totalCost: 3700,
            mileageAtService: 38000,
            notes: 'ใช้น้ำมัน Mercedes-Benz MB 229.5'
        },
        {
            logId: 'L067',
            vehicleId: 'V007',
            mechanicId: 'M002',
            serviceDate: '2025-11-05',
            serviceType: 'เปลี่ยนแบตเตอรี่',
            laborCost: 300,
            partsCost: 4500,
            totalCost: 4800,
            mileageAtService: 35000,
            notes: 'แบตเดิมอายุครบ 3 ปี เปลี่ยนแบต AGM'
        },
        {
            logId: 'L068',
            vehicleId: 'V007',
            mechanicId: 'M005',
            serviceDate: '2025-08-15',
            serviceType: 'ซ่อมสีกันชนหน้า',
            laborCost: 3500,
            partsCost: 2000,
            totalCost: 5500,
            mileageAtService: 32000,
            notes: 'กันชนขีดข่วนจากอุบัติเหตุเล็กน้อย พ่นสีใหม่'
        },
        {
            logId: 'L069',
            vehicleId: 'V007',
            mechanicId: 'M001',
            serviceDate: '2025-05-20',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 900,
            partsCost: 2700,
            totalCost: 3600,
            mileageAtService: 28000,
            notes: 'บำรุงรักษาตามกำหนด'
        },

        // ========================================
        // V008 - Suzuki Swift (วิไล ละเอียด)
        // ========================================
        {
            logId: 'L070',
            vehicleId: 'V008',
            mechanicId: 'M001',
            serviceDate: '2026-02-05',
            serviceType: 'ตรวจเช็คสภาพรถ 10,000 กม.',
            laborCost: 500,
            partsCost: 1200,
            totalCost: 1700,
            mileageAtService: 8500,
            notes: 'เปลี่ยนถ่ายน้ำมันเครื่อง + ตรวจเช็คระบบทั้งหมด'
        },
        {
            logId: 'L071',
            vehicleId: 'V008',
            mechanicId: 'M001',
            serviceDate: '2025-11-10',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 300,
            partsCost: 750,
            totalCost: 1050,
            mileageAtService: 5000,
            notes: 'เปลี่ยนน้ำมันครั้งแรก ตรวจเช็คทั่วไป'
        },
        {
            logId: 'L072',
            vehicleId: 'V008',
            mechanicId: 'M006',
            serviceDate: '2025-09-20',
            serviceType: 'ทำรีโมทสำรอง + ตั้งค่าระบบกันขโมย',
            laborCost: 800,
            partsCost: 1200,
            totalCost: 2000,
            mileageAtService: 2000,
            notes: 'ทำรีโมทสำรองเพิ่ม 1 ดวง ตั้งค่าระบบกันขโมย'
        },

        // ========================================
        // V009 - Toyota Fortuner (ธนา พูนทรัพย์)
        // ========================================
        {
            logId: 'L073',
            vehicleId: 'V009',
            mechanicId: 'M001',
            serviceDate: '2026-01-18',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง + ไส้กรอง',
            laborCost: 500,
            partsCost: 1400,
            totalCost: 1900,
            mileageAtService: 32000,
            notes: 'เปลี่ยนน้ำมันเครื่องดีเซล + ไส้กรองน้ำมันดีเซล'
        },
        {
            logId: 'L074',
            vehicleId: 'V009',
            mechanicId: 'M004',
            serviceDate: '2025-11-25',
            serviceType: 'เปลี่ยนยางทั้ง 4 เส้น',
            laborCost: 800,
            partsCost: 14000,
            totalCost: 14800,
            mileageAtService: 28000,
            notes: 'เปลี่ยนยาง Bridgestone Dueler H/T ขนาด 265/65R17'
        },
        {
            logId: 'L075',
            vehicleId: 'V009',
            mechanicId: 'M003',
            serviceDate: '2025-08-10',
            serviceType: 'เปลี่ยนโช้คอัพหลัง',
            laborCost: 1800,
            partsCost: 6000,
            totalCost: 7800,
            mileageAtService: 25000,
            notes: 'โช้คหลังอ่อน เปลี่ยนทั้งสองข้าง'
        },
        {
            logId: 'L076',
            vehicleId: 'V009',
            mechanicId: 'M001',
            serviceDate: '2025-05-15',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 500,
            partsCost: 1350,
            totalCost: 1850,
            mileageAtService: 22000,
            notes: 'บำรุงรักษาตามระยะ'
        },

        // ========================================
        // V010 - Ford Ranger (ธนา พูนทรัพย์)
        // ========================================
        {
            logId: 'L077',
            vehicleId: 'V010',
            mechanicId: 'M001',
            serviceDate: '2026-02-01',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง + ตรวจเช็ค 50,000 กม.',
            laborCost: 800,
            partsCost: 2200,
            totalCost: 3000,
            mileageAtService: 45000,
            notes: 'เปลี่ยนน้ำมันเครื่อง + ตรวจเช็คระบบทั้งหมด'
        },
        {
            logId: 'L078',
            vehicleId: 'V010',
            mechanicId: 'M003',
            serviceDate: '2025-11-20',
            serviceType: 'เปลี่ยนผ้าเบรกหลัง',
            laborCost: 700,
            partsCost: 2200,
            totalCost: 2900,
            mileageAtService: 42000,
            notes: 'ผ้าเบรกหลังบาง เปลี่ยนใหม่'
        },
        {
            logId: 'L079',
            vehicleId: 'V010',
            mechanicId: 'M005',
            serviceDate: '2025-09-05',
            serviceType: 'ซ่อมตัวถังด้านขวา + พ่นสี',
            laborCost: 5000,
            partsCost: 3500,
            totalCost: 8500,
            mileageAtService: 38000,
            notes: 'รถโดนชน ซ่อมประตูด้านขวา + บังโคลนหน้า พ่นสีใหม่'
        },
        {
            logId: 'L080',
            vehicleId: 'V010',
            mechanicId: 'M001',
            serviceDate: '2025-06-15',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            laborCost: 500,
            partsCost: 1500,
            totalCost: 2000,
            mileageAtService: 35000,
            notes: 'บำรุงรักษาตามกำหนด'
        },
        {
            logId: 'L081',
            vehicleId: 'V010',
            mechanicId: 'M004',
            serviceDate: '2025-03-20',
            serviceType: 'ตั้งศูนย์ล้อ + ถ่วงล้อ',
            laborCost: 600,
            partsCost: 200,
            totalCost: 800,
            mileageAtService: 32000,
            notes: 'รถเบี่ยง ยางกินข้างเดียว ตั้งศูนย์ใหม่'
        }
    ],

    // Vehicles
    vehicles: [
        // สมชาย ใจดี (U001)
        {
            vehicleId: 'V001',
            ownerId: 'U001',
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            vin: '1HGBH41JXMN109186',
            licensePlate: 'กท 1234',
            mileage: 45000,
            lastServiceDate: '2026-01-15',
            nextServiceDue: 50000,
            image: null
        },
        {
            vehicleId: 'V002',
            ownerId: 'U001',
            make: 'Honda',
            model: 'Civic',
            year: 2019,
            vin: '2HGFC2F59KH123456',
            licensePlate: 'กท 5678',
            mileage: 62000,
            lastServiceDate: '2025-12-20',
            nextServiceDue: 65000,
            image: null
        },
        {
            vehicleId: 'V003',
            ownerId: 'U001',
            make: 'Mazda',
            model: '3',
            year: 2021,
            vin: '3MZBN1U77KM123789',
            licensePlate: 'กท 9012',
            mileage: 28000,
            lastServiceDate: '2026-01-25',
            nextServiceDue: 30000,
            image: null
        },
        {
            vehicleId: 'V004',
            ownerId: 'U001',
            make: 'Isuzu',
            model: 'D-Max',
            year: 2022,
            vin: '4ISUZ1J32NM456123',
            licensePlate: 'นม 3456',
            mileage: 15000,
            lastServiceDate: '2026-02-01',
            nextServiceDue: 20000,
            image: null
        },

        // สมหญิง รักสะอาด (U002)
        {
            vehicleId: 'V005',
            ownerId: 'U002',
            make: 'Honda',
            model: 'Jazz',
            year: 2021,
            vin: '5HGJZ1F22LK567890',
            licensePlate: 'บท 2468',
            mileage: 18000,
            lastServiceDate: '2026-01-10',
            nextServiceDue: 20000,
            image: null
        },

        // ประสิทธิ์ มั่งคั่ง (U003)
        {
            vehicleId: 'V006',
            ownerId: 'U003',
            make: 'BMW',
            model: '320d',
            year: 2019,
            vin: '6WBAB91070K987654',
            licensePlate: 'ธศ 5555',
            mileage: 52000,
            lastServiceDate: '2025-12-28',
            nextServiceDue: 55000,
            image: null
        },
        {
            vehicleId: 'V007',
            ownerId: 'U003',
            make: 'Mercedes-Benz',
            model: 'C200',
            year: 2020,
            vin: '7WDDG8EB2KF234567',
            licensePlate: 'ฉง 7777',
            mileage: 38000,
            lastServiceDate: '2026-01-20',
            nextServiceDue: 40000,
            image: null
        },

        // วิไล ละเอียด (U004)
        {
            vehicleId: 'V008',
            ownerId: 'U004',
            make: 'Suzuki',
            model: 'Swift',
            year: 2022,
            vin: '8SUZK1A85NK345678',
            licensePlate: 'ชล 1357',
            mileage: 8500,
            lastServiceDate: '2026-02-05',
            nextServiceDue: 10000,
            image: null
        },

        // ธนา พูนทรัพย์ (U005)
        {
            vehicleId: 'V009',
            ownerId: 'U005',
            make: 'Toyota',
            model: 'Fortuner',
            year: 2021,
            vin: '9TFOR1D98MK456789',
            licensePlate: 'กก 9999',
            mileage: 32000,
            lastServiceDate: '2026-01-18',
            nextServiceDue: 35000,
            image: null
        },
        {
            vehicleId: 'V010',
            ownerId: 'U005',
            make: 'Ford',
            model: 'Ranger',
            year: 2020,
            vin: '0FRGR2K73LM567890',
            licensePlate: 'พบ 3690',
            mileage: 45000,
            lastServiceDate: '2026-02-01',
            nextServiceDue: 50000,
            image: null
        }
    ],

    // Mechanics
    mechanics: [
        {
            mechanicId: 'M001',
            name: 'สมศักดิ์ ช่างฝีมือ',
            email: 'somsak@mechanic.com',
            phone: '089-111-2222',
            experience: 15,
            specializations: ['เครื่องยนต์', 'ระบบส่งกำลัง', 'ระบบเบรก'],
            rating: 4.8,
            reviewCount: 234,
            verified: true,
            startingPrice: 500,
            currentLocation: { lat: 13.7563, lng: 100.5018 }, // Bangkok
            profileImage: null,
            available: true
        },
        {
            mechanicId: 'M002',
            name: 'วิชัย ช่างไฟ',
            email: 'wichai@mechanic.com',
            phone: '089-333-4444',
            experience: 10,
            specializations: ['ระบบไฟฟ้า', 'แอร์', 'ระบบคอมพิวเตอร์'],
            rating: 4.6,
            reviewCount: 189,
            verified: true,
            startingPrice: 450,
            currentLocation: { lat: 13.7465, lng: 100.5342 },
            profileImage: null,
            available: true
        },
        {
            mechanicId: 'M003',
            name: 'ประยุทธ ช่างช่วง',
            email: 'prayut@mechanic.com',
            phone: '089-555-6666',
            experience: 20,
            specializations: ['ช่วงล่าง', 'ระบบกันสะเทือน', 'ตั้งศูนย์'],
            rating: 4.9,
            reviewCount: 312,
            verified: true,
            startingPrice: 600,
            currentLocation: { lat: 13.7245, lng: 100.4930 },
            profileImage: null,
            available: false
        },
        {
            mechanicId: 'M004',
            name: 'อนุชา ช่างยาง',
            email: 'anucha@mechanic.com',
            phone: '089-777-8888',
            experience: 8,
            specializations: ['ยาง', 'ล้อแม็ก', 'ถ่วงล้อ'],
            rating: 4.5,
            reviewCount: 145,
            verified: true,
            startingPrice: 350,
            currentLocation: { lat: 13.7650, lng: 100.5380 },
            profileImage: null,
            available: true
        }
    ],

    // Service Requests
    // Service Requests
    serviceRequests: [
        // สมชาย ใจดี (U001)
        {
            jobId: 'J001',
            vehicleId: 'V001',
            ownerId: 'U001',
            mechanicId: 'M001',
            serviceType: 'emergency',
            symptomDescription: 'เครื่องยนต์ดับกระทันหัน ไม่สามารถสตาร์ทได้',
            location: { lat: 13.7563, lng: 100.5018, address: 'ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2026-02-05T14:30:00',
            completedAt: '2026-02-05T16:45:00',
            estimatedCost: 2500,
            finalCost: 2800,
            rating: 5,
            review: 'ซ่อมเร็ว บริการดีมาก แก้ปัญหาได้ตรงจุด'
        },
        {
            jobId: 'J002',
            vehicleId: 'V001',
            ownerId: 'U001',
            mechanicId: 'M002',
            serviceType: 'scheduled',
            symptomDescription: 'ตรวจเช็คระบบไฟฟ้า แอร์เย็นไม่เพียงพอ',
            location: { lat: 13.7563, lng: 100.5018, address: 'ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2026-01-28T10:00:00',
            completedAt: '2026-01-28T12:30:00',
            estimatedCost: 1500,
            finalCost: 1650,
            rating: 4,
            review: 'ดี แต่รอนานหน่อย'
        },

        // สมหญิง รักสะอาด (U002)
        {
            jobId: 'J003',
            vehicleId: 'V005',
            ownerId: 'U002',
            mechanicId: 'M001',
            serviceType: 'scheduled',
            symptomDescription: 'เปลี่ยนถ่ายน้ำมันเครื่องตามระยะ',
            location: { lat: 13.7245, lng: 100.4930, address: 'ถนนพระราม 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2026-01-10T09:00:00',
            completedAt: '2026-01-10T10:30:00',
            estimatedCost: 1000,
            finalCost: 1150,
            rating: 5,
            review: 'ช่างเก่งมาก อธิบายชัดเจน ราคาไม่แพง'
        },
        {
            jobId: 'J004',
            vehicleId: 'V005',
            ownerId: 'U002',
            mechanicId: 'M002',
            serviceType: 'scheduled',
            symptomDescription: 'แอร์เย็นไม่เพียงพอ ต้องการตรวจสอบ',
            location: { lat: 13.7245, lng: 100.4930, address: 'ถนนพระราม 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2025-10-15T14:00:00',
            completedAt: '2025-10-15T16:00:00',
            estimatedCost: 1200,
            finalCost: 1400,
            rating: 5,
            review: 'แก้ปัญหาได้ดี แอร์เย็นฉ่ำากขึ้นมาก'
        },

        // ประสิทธิ์ มั่งคั่ง (U003)
        {
            jobId: 'J005',
            vehicleId: 'V006',
            ownerId: 'U003',
            mechanicId: 'M001',
            serviceType: 'scheduled',
            symptomDescription: 'เปลี่ยนถ่ายน้ำมันเครื่อง BMW',
            location: { lat: 13.7650, lng: 100.5380, address: 'ถนนวิภาวดี แขวงจตุจักร เขตจตุจักร กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2025-12-28T10:00:00',
            completedAt: '2025-12-28T11:45:00',
            estimatedCost: 3000,
            finalCost: 3300,
            rating: 5,
            review: 'ช่างมีความเชี่ยวชาญรถยุโรปมาก ใช้น้ำมันแท้'
        },
        {
            jobId: 'J006',
            vehicleId: 'V006',
            ownerId: 'U003',
            mechanicId: 'M003',
            serviceType: 'scheduled',
            symptomDescription: 'เบรกมีเสียงดัง ต้องการตรวจสอบ',
            location: { lat: 13.7650, lng: 100.5380, address: 'ถนนวิภาวดี แขวงจตุจักร เขตจตุจักร กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2025-09-15T13:00:00',
            completedAt: '2025-09-15T16:30:00',
            estimatedCost: 6500,
            finalCost: 7000,
            rating: 5,
            review: 'ผู้เชี่ยวชาญด้านช่วงล่าง ตรวจสอบละเอียดมาก'
        },
        {
            jobId: 'J007',
            vehicleId: 'V007',
            ownerId: 'U003',
            mechanicId: 'M005',
            serviceType: 'scheduled',
            symptomDescription: 'กันชนหน้าขีดข่วน ต้องการซ่อมสี',
            location: { lat: 13.7650, lng: 100.5380, address: 'ถนนวิภาวดี แขวงจตุจักร เขตจตุจักร กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2025-08-15T09:00:00',
            completedAt: '2025-08-16T17:00:00',
            estimatedCost: 5000,
            finalCost: 5500,
            rating: 5,
            review: 'งานสวยมาก สีเข้ากันเป๊ะ ไม่เห็นรอยต่อเลย'
        },

        // วิไล ละเอียด (U004)
        {
            jobId: 'J008',
            vehicleId: 'V008',
            ownerId: 'U004',
            mechanicId: 'M006',
            serviceType: 'scheduled',
            symptomDescription: 'ต้องการทำรีโมทสำรอง',
            location: { lat: 13.7320, lng: 100.5210, address: 'ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2025-09-20T10:30:00',
            completedAt: '2025-09-20T12:00:00',
            estimatedCost: 1800,
            finalCost: 2000,
            rating: 4,
            review: 'บริการดี รีโมทใช้งานได้ดี'
        },
        {
            jobId: 'J009',
            vehicleId: 'V008',
            ownerId: 'U004',
            mechanicId: 'M001',
            serviceType: 'scheduled',
            symptomDescription: 'ตรวจเช็คสภาพรถครบ 10,000 กม.',
            location: { lat: 13.7320, lng: 100.5210, address: 'ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2026-02-05T08:00:00',
            completedAt: '2026-02-05T10:00:00',
            estimatedCost: 1500,
            finalCost: 1700,
            rating: 5,
            review: 'ตรวจเช็คละเอียด อธิบายเข้าใจง่าย'
        },

        // ธนา พูนทรัพย์ (U005)
        {
            jobId: 'J010',
            vehicleId: 'V009',
            ownerId: 'U005',
            mechanicId: 'M004',
            serviceType: 'scheduled',
            symptomDescription: 'เปลี่ยนยางทั้ง 4 เส้น',
            location: { lat: 13.7580, lng: 100.5450, address: 'ถนนลาดพร้าว แขวงจันทรเกษม เขตจตุจักร กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2025-11-25T09:00:00',
            completedAt: '2025-11-25T11:30:00',
            estimatedCost: 14000,
            finalCost: 14800,
            rating: 5,
            review: 'แนะนำยางดี ราคาสมเหตุสมผล ติดตั้งรวดเร็ว'
        },
        {
            jobId: 'J011',
            vehicleId: 'V009',
            ownerId: 'U005',
            mechanicId: 'M003',
            serviceType: 'scheduled',
            symptomDescription: 'รถสั่นตอนวิ่งความเร็วสูง ต้องการตรวจสอบ',
            location: { lat: 13.7580, lng: 100.5450, address: 'ถนนลาดพร้าว แขวงจันทรเกษม เขตจตุจักร กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2025-08-10T13:00:00',
            completedAt: '2025-08-10T16:30:00',
            estimatedCost: 7000,
            finalCost: 7800,
            rating: 5,
            review: 'วินิจฉัยถูกต้อง เปลี่ยนโช้คหลัง รถนิ่งขึ้นมาก'
        },
        {
            jobId: 'J012',
            vehicleId: 'V010',
            ownerId: 'U005',
            mechanicId: 'M005',
            serviceType: 'emergency',
            symptomDescription: 'รถโดนชนด้านข้าง ต้องการซ่อมด่วน',
            location: { lat: 13.7580, lng: 100.5450, address: 'ถนนลาดพร้าว แขวงจันทรเกษม เขตจตุจักร กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2025-09-05T10:00:00',
            completedAt: '2025-09-07T18:00:00',
            estimatedCost: 8000,
            finalCost: 8500,
            rating: 4,
            review: 'งานโอเค แต่ใช้เวลานานหน่อย'
        },
        {
            jobId: 'J013',
            vehicleId: 'V010',
            ownerId: 'U005',
            mechanicId: 'M004',
            serviceType: 'scheduled',
            symptomDescription: 'ล้อหน้าเบี่ยง ยางกินข้างเดียว',
            location: { lat: 13.7580, lng: 100.5450, address: 'ถนนลาดพร้าว แขวงจันทรเกษม เขตจตุจักร กรุงเทพฯ' },
            status: 'completed',
            requestedAt: '2025-03-20T11:00:00',
            completedAt: '2025-03-20T12:30:00',
            estimatedCost: 700,
            finalCost: 800,
            rating: 5,
            review: 'ตั้งศูนย์แม่นยำ รถวิ่งตรงดี'
        }
    ],

    // Maintenance Logs (Service History)
    maintenanceLogs: [
        {
            logId: 'L001',
            vehicleId: 'V001',
            jobId: 'J001',
            mechanicId: 'M001',
            serviceDate: '2026-02-05',
            serviceType: 'ซ่อมเครื่องยนต์ฉุกเฉิน',
            partsUsed: [
                { partId: 'P001', name: 'หัวเทียน NGK', quantity: 4, unitPrice: 150, totalPrice: 600 },
                { partId: 'P015', name: 'สายหัวเทียน', quantity: 1, unitPrice: 450, totalPrice: 450 }
            ],
            laborCost: 1500,
            totalCost: 2800,
            mileageAtService: 44800,
            beforePhotos: [],
            afterPhotos: [],
            notes: 'เปลี่ยนหัวเทียนและสายหัวเทียน ทดสอบเครื่องยนต์เรียบร้อย'
        },
        {
            logId: 'L002',
            vehicleId: 'V001',
            jobId: 'J002',
            mechanicId: 'M002',
            serviceDate: '2026-01-28',
            serviceType: 'ตรวจเช็คระบบแอร์',
            partsUsed: [
                { partId: 'P030', name: 'น้ำยาแอร์ R134a', quantity: 1, unitPrice: 450, totalPrice: 450 }
            ],
            laborCost: 1200,
            totalCost: 1650,
            mileageAtService: 44200,
            beforePhotos: [],
            afterPhotos: [],
            notes: 'เติมน้ำยาแอร์ ทำความสะอาดคอมเพรสเซอร์'
        },
        {
            logId: 'L003',
            vehicleId: 'V001',
            jobId: null,
            mechanicId: 'M001',
            serviceDate: '2026-01-15',
            serviceType: 'เปลี่ยนถ่ายน้ำมันเครื่อง',
            partsUsed: [
                { partId: 'P005', name: 'น้ำมันเครื่อง Mobil 1 5W-30', quantity: 4, unitPrice: 280, totalPrice: 1120 },
                { partId: 'P006', name: 'ไส้กรองน้ำมันเครื่อง', quantity: 1, unitPrice: 180, totalPrice: 180 }
            ],
            laborCost: 500,
            totalCost: 1800,
            mileageAtService: 43500,
            beforePhotos: [],
            afterPhotos: [],
            notes: 'เปลี่ยนถ่ายน้ำมันเครื่องตามระยะ'
        }
    ],

    // Parts Store Inventory
    partsInventory: [
        {
            sku: 'P001',
            name: 'หัวเทียน NGK',
            category: 'ระบบจุดระเบิด',
            brand: 'NGK',
            compatibleModels: ['Toyota Camry', 'Honda Civic', 'Honda Accord'],
            price: 150,
            stock: 50,
            image: null,
            description: 'หัวเทียนคุณภาพสูง เหมาะสำหรับรถยนต์ทั่วไป'
        },
        {
            sku: 'P002',
            name: 'แบตเตอรี่ GS 55B24L',
            category: 'แบตเตอรี่',
            brand: 'GS Battery',
            compatibleModels: ['Toyota Camry', 'Honda Civic'],
            price: 2800,
            stock: 15,
            image: null,
            description: 'แบตเตอรี่รถยนต์ คุณภาพดี อายุการใช้งานยาวนาน'
        },
        {
            sku: 'P003',
            name: 'ยาง Bridgestone Turanza T001',
            category: 'ยาง',
            brand: 'Bridgestone',
            compatibleModels: ['Toyota Camry', 'Honda Accord'],
            price: 3200,
            stock: 20,
            image: null,
            description: 'ยางรถยนต์ขนาด 215/55R17 เงียบ นุ่มนวล'
        },
        {
            sku: 'P004',
            name: 'ผ้าเบรกหน้า Toyota Camry',
            category: 'ระบบเบรก',
            brand: 'Genuine Toyota',
            compatibleModels: ['Toyota Camry'],
            price: 1800,
            stock: 25,
            image: null,
            description: 'ผ้าเบรกแท้จากโรงงาน คุณภาพมาตรฐาน'
        },
        {
            sku: 'P005',
            name: 'น้ำมันเครื่อง Mobil 1 5W-30',
            category: 'น้ำมันเครื่อง',
            brand: 'Mobil',
            compatibleModels: ['Toyota Camry', 'Honda Civic', 'Honda Accord', 'Mazda 3'],
            price: 280,
            stock: 100,
            image: null,
            description: 'น้ำมันเครื่องสังเคราะห์แท้ 100% ประสิทธิภาพสูง'
        },
        {
            sku: 'P006',
            name: 'ไส้กรองน้ำมันเครื่อง',
            category: 'ไส้กรอง',
            brand: 'Denso',
            compatibleModels: ['Toyota Camry', 'Honda Civic'],
            price: 180,
            stock: 60,
            image: null,
            description: 'ไส้กรองน้ำมันเครื่องคุณภาพสูง'
        },
        {
            sku: 'P015',
            name: 'สายหัวเทียน',
            category: 'ระบบจุดระเบิด',
            brand: 'Denso',
            compatibleModels: ['Toyota Camry', 'Honda Accord'],
            price: 450,
            stock: 30,
            image: null,
            description: 'สายหัวเทียนคุณภาพดี ทนความร้อนสูง'
        },
        {
            sku: 'P030',
            name: 'น้ำยาแอร์ R134a',
            category: 'ระบบแอร์',
            brand: 'Dupont',
            compatibleModels: ['Toyota Camry', 'Honda Civic', 'Honda Accord', 'Mazda 3'],
            price: 450,
            stock: 40,
            image: null,
            description: 'น้ำยาแอร์สำหรับรถยนต์ทั่วไป'
        }
    ]
};

// ========================================
/**
 * HelpMeCar - Main Application Logic
 * Handles state management, navigation, and mock data
 */

const appState = {
    isAuthenticated: false,
    currentUser: null,
    currentVehicle: null,
    cart: [],

    // Initialize app state
    init() {
        const savedCart = localStorage.getItem('helpmecar_cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    },

    // Login user
    login(user) {
        this.currentUser = user;
        this.isAuthenticated = true;
        localStorage.setItem('helpmecar_user', JSON.stringify(user));

        // Load primary vehicle
        if (user.registeredVehicles && user.registeredVehicles.length > 0) {
            this.currentVehicle = mockData.vehicles.find(v => v.vehicleId === user.registeredVehicles[0]);
        }
    },

    // Logout user
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.currentVehicle = null;
        this.cart = [];
        localStorage.removeItem('helpmecar_user');
        localStorage.removeItem('helpmecar_cart');
    },

    // Add to cart
    addToCart(item) {
        this.cart.push(item);
        localStorage.setItem('helpmecar_cart', JSON.stringify(this.cart));
    },

    // Remove from cart
    removeFromCart(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('helpmecar_cart', JSON.stringify(this.cart));
    },

    // Clear cart
    clearCart() {
        this.cart = [];
        localStorage.removeItem('helpmecar_cart');
    },

    // Switch to different vehicle
    switchVehicle(vehicleId) {
        const vehicle = mockData.vehicles.find(v => v.vehicleId === vehicleId);
        if (vehicle) {
            this.currentVehicle = vehicle;
            localStorage.setItem('helpmecar_selected_vehicle', vehicleId);

            // Show notification
            if (typeof showNotification === 'function') {
                showNotification(`เปลี่ยนรถเป็น ${vehicle.make} ${vehicle.model} แล้ว`, 'success');
            }

            // Reload page data
            if (typeof loadDashboardData === 'function') loadDashboardData();
            if (typeof loadHistoryData === 'function') loadHistoryData();
            if (typeof loadStoreData === 'function') loadStoreData();
        }
    },

    // Get all user vehicles
    getUserVehicles() {
        if (!this.currentUser || !this.currentUser.registeredVehicles) return [];
        return mockData.vehicles.filter(v => this.currentUser.registeredVehicles.includes(v.vehicleId));
    },

    // Render vehicle selector dropdown HTML
    renderVehicleSelector() {
        const vehicles = this.getUserVehicles();
        if (vehicles.length <= 1) return ''; // Don't show selector if only 1 vehicle

        let html = '<select id="vehicleSelector" class="form-control" onchange="appState.switchVehicle(this.value)" style="max-width: 400px;">';
        vehicles.forEach(v => {
            const selected = this.currentVehicle && v.vehicleId === this.currentVehicle.vehicleId ? 'selected' : '';
            html += `<option value="${v.vehicleId}" ${selected}>${v.make} ${v.model} (${v.year}) - ${v.licensePlate}</option>`;
        });
        html += '</select>';
        return html;
    }
};

// ========================================
// Utility Functions
// ========================================

const utils = {
    // Format currency (Thai Baht)
    formatCurrency(amount) {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    // Format date (Thai locale)
    formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    // Format date and time
    formatDateTime(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    },

    // Format number with commas
    formatNumber(num) {
        return new Intl.NumberFormat('th-TH').format(num);
    },

    // Generate star rating HTML
    generateStars(rating, maxStars = 5) {
        let html = '<div class="rating">';
        for (let i = 1; i <= maxStars; i++) {
            if (i <= Math.floor(rating)) {
                html += '<span class="star">★</span>';
            } else if (i - rating < 1 && i - rating > 0) {
                html += '<span class="star">★</span>'; // Could use half star
            } else {
                html += '<span class="star empty">★</span>';
            }
        }
        html += `<span class="rating-text">${rating.toFixed(1)}</span>`;
        html += '</div>';
        return html;
    },

    // Calculate distance between two coordinates (Haversine formula)
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    },

    // Show notification (toast)
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--info)'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 3000;
      animation: slideIn 0.3s ease-out;
    `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // Mock auto-login for demo purposes
    mockLogin() {
        appState.login(mockData.currentUser);
        console.log('Mock user logged in:', mockData.currentUser);
    }
};

// Add notification animations to document
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);
}

// ========================================
// Navigation
// ========================================

const navigation = {
    // Toggle mobile menu
    toggleMenu() {
        const menu = document.querySelector('.navbar-menu');
        if (menu) {
            menu.classList.toggle('active');
        }
    },

    // Set active nav link
    setActiveLink(currentPage) {
        const links = document.querySelectorAll('.navbar-link');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

// ========================================
// Modal Functions
// ========================================

const modal = {
    open(modalId) {
        const modalEl = document.getElementById(modalId);
        if (modalEl) {
            modalEl.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    close(modalId) {
        const modalEl = document.getElementById(modalId);
        if (modalEl) {
            modalEl.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    },

    // Close modal when clicking outside
    setupCloseOnOutsideClick(modalId) {
        const modalEl = document.getElementById(modalId);
        if (modalEl) {
            modalEl.addEventListener('click', (e) => {
                if (e.target === modalEl) {
                    this.close(modalId);
                }
            });
        }
    }
};

// ========================================
// Initialize App
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Mock login FIRST for demo (remove in production)
    utils.mockLogin();

    // THEN initialize app state (will load selected vehicle from localStorage)
    appState.init();

    // Setup mobile menu toggle
    const menuToggle = document.querySelector('.navbar-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', navigation.toggleMenu);
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.navbar-menu');
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
    });

    console.log('HelpMeCar App Initialized');
    console.log('Current User:', appState.currentUser);
    console.log('Current Vehicle:', appState.currentVehicle);

    // Initialize theme
    initializeTheme();


});

// ========================================
// Dark Mode / Light Mode Toggle
// ========================================

function initializeTheme() {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('helpmecar_theme') || 'dark';
    setTheme(savedTheme, false); // false = don't show notification on init
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme, true); // true = show notification
}

function setTheme(theme, showNotif = false) {
    // Set data-theme attribute on html element
    document.documentElement.setAttribute('data-theme', theme);

    // Save to localStorage
    localStorage.setItem('helpmecar_theme', theme);

    // Update icon
    const iconElement = document.getElementById('themeIcon');
    if (iconElement) {
        iconElement.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Show notification
    if (showNotif) {
        const message = theme === 'dark' ? 'เปลี่ยนเป็นโหมดกลางคืนแล้ว 🌙' : 'เปลี่ยนเป็นโหมดกลางวันแล้ว ☀️';
        utils.showNotification(message, 'info');
    }
}

// Export for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mockData, appState, utils, navigation, modal };
}

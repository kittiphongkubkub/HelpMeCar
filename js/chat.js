// ========================================
// AI Consultation Chat Logic
// ========================================

let chatHistory = [];
let uploadedImage = null;

document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    navigation.setActiveLink('consultation.html');

    // Load chat history from localStorage
    const savedChat = localStorage.getItem('helpmecar_chat');
    if (savedChat) {
        chatHistory = JSON.parse(savedChat);
        renderChatHistory();
    }

    // Focus on input
    document.getElementById('messageInput').focus();
});

// ========================================
// Send Message
// ========================================

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message && !uploadedImage) {
        return;
    }

    // Add user message to chat
    addMessage('user', message, uploadedImage);

    // Clear input
    input.value = '';
    uploadedImage = null;
    document.getElementById('uploadPreview').innerHTML = '';
    document.getElementById('uploadPreview').classList.add('d-none');

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI response after delay
    setTimeout(() => {
        hideTypingIndicator();
        generateAIResponse(message);
    }, 1500 + Math.random() * 1000);
}

function sendQuickMessage(message) {
    document.getElementById('messageInput').value = message;
    sendMessage();
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// ========================================
// Add Message to Chat
// ========================================

function addMessage(sender, text, image = null) {
    const message = {
        sender,
        text,
        image,
        timestamp: new Date().toISOString()
    };

    chatHistory.push(message);
    localStorage.setItem('helpmecar_chat', JSON.stringify(chatHistory));

    renderMessage(message);
    scrollToBottom();
}

function renderMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const isAI = message.sender === 'ai';

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isAI ? 'ai-message' : 'user-message'}`;
    messageDiv.style.cssText = `
    display: flex;
    justify-content: ${isAI ? 'flex-start' : 'flex-end'};
    margin-bottom: 1rem;
  `;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.style.cssText = `
    background: ${isAI ? 'var(--bg-light)' : 'var(--steel-blue)'};
    color: ${isAI ? 'var(--text-dark)' : 'white'};
    padding: 1rem;
    border-radius: var(--radius-md);
    max-width: 80%;
  `;

    if (isAI) {
        bubble.innerHTML = `
      <strong style="color: var(--slate-blue);">Slate</strong>
      ${message.image ? `<div style="margin: 0.5rem 0;"><em>กำลังวิเคราะห์รูปภาพ...</em></div>` : ''}
      <p style="margin: 0.5rem 0 0 0;">${message.text}</p>
    `;
    } else {
        let content = '';
        if (message.image) {
            content += `<div style="margin-bottom: 0.5rem; background: white; padding: 0.5rem; border-radius: 4px;"><strong style="color: var(--text-dark);">📷 รูปภาพที่อัปโหลด</strong></div>`;
        }
        if (message.text) {
            content += `<p style="margin: 0;">${message.text}</p>`;
        }
        bubble.innerHTML = content;
    }

    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
}

function renderChatHistory() {
    const chatMessages = document.getElementById('chatMessages');
    // Clear except welcome message
    const welcomeMsg = chatMessages.firstElementChild;
    chatMessages.innerHTML = '';
    chatMessages.appendChild(welcomeMsg);

    chatHistory.forEach(message => renderMessage(message));
    scrollToBottom();
}

// ========================================
// Typing Indicator
// ========================================

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const indicator = document.createElement('div');
    indicator.id = 'typingIndicator';
    indicator.style.cssText = 'margin-bottom: 1rem;';
    indicator.innerHTML = `
    <div style="background: var(--bg-light); padding: 1rem; border-radius: var(--radius-md); max-width: 80%; display: inline-block;">
      <strong style="color: var(--slate-blue);">Slate</strong>
      <p style="margin: 0.5rem 0 0 0; color: var(--text-muted);">
        <span class="typing-dot">.</span><span class="typing-dot">.</span><span class="typing-dot">.</span>
      </p>
    </div>
  `;

    chatMessages.appendChild(indicator);
    scrollToBottom();

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
    .typing-dot {
      animation: typing 1.4s infinite;
      opacity: 0;
    }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typing {
      0%, 60%, 100% { opacity: 0; }
      30% { opacity: 1; }
    }
  `;
    document.head.appendChild(style);
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// ========================================
// Generate AI Response (Simulated)
// ========================================

function generateAIResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    let response = '';

    // Pattern matching for common issues
    if (lowerMsg.includes('ดับ') || lowerMsg.includes('สตาร์ท') || lowerMsg.includes('ติด')) {
        response = `จากอาการที่คุณอธิบาย "รถดับกะทันหัน" มีสาเหตุที่เป็นไปได้ดังนี้:\n\n` +
            `🔍 **สาเหตุที่เป็นไปได้:**\n` +
            `1. หัวเทียนเสื่อมสภาพหรือชำรุด\n` +
            `2. ระบบจ่ายเชื้อเพลิงมีปัญหา (ปั๊มน้ำมัน, หัวฉีด)\n` +
            `3. แบตเตอรี่อ่อน หรือขั้วต่อหลวม\n` +
            `4. เซนเซอร์ต่างๆ ทำงานผิดปกติ\n\n` +
            `💰 **ราคาซ่อมโดยประมาณ:**\n` +
            `• เปลี่ยนหัวเทียน: 600-1,200 บาท\n` +
            `• ตรวจเช็คระบบจ่ายเชื้อเพลิง: 1,500-3,000 บาท\n` +
            `• เปลี่ยนแบตเตอรี่: 2,500-4,000 บาท\n\n` +
            `⚠️ **ขั้นตอนเบื้องต้นที่คุณควรทำ:**\n` +
            `1. ตรวจสอบขั้วแบตเตอรี่ว่าแน่นหรือไม่\n` +
            `2. ลองสตาร์ทรถอีกครั้งและฟังเสียงประกอบ\n` +
            `3. ถ้ารถดับระหว่างขับ อย่าบังคับขับต่อ\n` +
            `4. เรียกช่างมาตรวจเช็คโดยเร็วเพื่อความปลอดภัย`;
    }
    else if (lowerMsg.includes('เสียง') || lowerMsg.includes('ดัง') || lowerMsg.includes('เครื่อง')) {
        response = `เสียงผิดปกติจากเครื่องยนต์อาจบ่งบอกถึงปัญหาต่างๆ:\n\n` +
            `🔍 **วิเคราะห์ตามลักษณะเสียง:**\n` +
            `• เสียงเคาะ/เคียว → น้ำมันเครื่องไม่พอ หรือคุณภาพไม่ดี\n` +
            `• เสียงหวีด/หอน → สายพานหลวม หรือแบริ่งเสื่อม\n` +
            `• เสียงระเบิดจากท่อไอเสีย → การจุดระเบิดผิดปกติ\n\n` +
            `💰 **ราคาซ่อมโดยประมาณ:**\n` +
            `• เปลี่ยนสายพาน: 800-2,000 บาท\n` +
            `• เปลี่ยนแบริ่ง: 2,500-5,000 บาท\n` +
            `• ตรวจเช็คระบบจุดระเบิด: 1,200-2,500 บาท\n\n` +
            `🚨 **คำเตือน:**\nถ้าเสียงดังมากหรือมีควันผิดปกติ แนะนำให้หยุดรถและเรียกช่างทันที`;
    }
    else if (lowerMsg.includes('แอร์') || lowerMsg.includes('เย็น') || lowerMsg.includes('ร้อน')) {
        response = `ปัญหาแอร์ไม่เย็นมักมาจาก:\n\n` +
            `🔍 **สาเหตุหลัก:**\n` +
            `1. น้ำยาแอร์หมดหรือรั่ว\n` +
            `2. คอมเพรสเซอร์ทำงานผิดปกติ\n` +
            `3. ถังกรองแอร์อุดตัน\n` +
            `4. พัดลมควบแน่นไม่ทำงาน\n\n` +
            `💰 **ราคาซ่อมโดยประมาณ:**\n` +
            `• เติมน้ำยาแอร์: 450-800 บาท\n` +
            `• ล้างถังกรองแอร์: 300-600 บาท\n` +
            `• ซ่อมคอมเพรสเซอร์: 5,000-15,000 บาท\n\n` +
            `✅ **ขั้นตอนทดลองก่อน:**\n` +
            `1. ตรวจสอบว่าพัดลมทำงานหรือไม่\n` +
            `2. ล้างถังกรองแอร์ (อาจแก้ปัญหาได้)\n` +
            `3. ถ้ายังไม่ดี ติดต่อช่างตรวจเช็คระบบแอร์`;
    }
    else if (lowerMsg.includes('เบรก') || lowerMsg.includes('หยุด') || lowerMsg.includes('ผ้า')) {
        response = `ปัญหาระบบเบรกต้องดูแลให้รวดเร็ว เพื่อความปลอดภัย:\n\n` +
            `🔍 **อาการและสาเหตุ:**\n` +
            `• เบรกมีเสียง → ผ้าเบรกเหลือน้อย หรือจานเบรกผิดรูป\n` +
            `• เบรกอ่อน → น้ำมันเบรกหมด หรือมีอากาศในระบบ\n` +
            `• คันเบรกสั่น → จานเบรกบิดงอ\n\n` +
            `💰 **ราคาซ่อมโดยประมาณ:**\n` +
            `• เปลี่ยนผ้าเบรกหน้า: 1,800-3,500 บาท\n` +
            `• เปลี่ยนจานเบรก: 2,500-5,000 บาท/คู่\n` +
            `• เปลี่ยนน้ำมันเบรก: 500-1,200 บาท\n\n` +
            `⚠️ **สำคัญมาก:**\nถ้าเบรกทำงานผิดปกติ แนะนำให้ขับรถไปซ่อมทันที อย่ารอช้า!`;
    }
    else {
        response = `ขอบคุณสำหรับข้อมูลครับ 🙏\n\n` +
            `เพื่อให้ผมสามารถวินิจฉัยได้แม่นยำ กรุณาให้รายละเอียดเพิ่มเติม:\n\n` +
            `• อาการเกิดขึ้นเมื่อไร? (ขณะติดเครื่อง, ขับขี่, หยุดรถ)\n` +
            `• มีเสียงผิดปกติหรือไม่? (ลักษณะเสียงแบบไหน)\n` +
            `• มีกลิ่นผิดปกติหรือควันหรือไม่?\n` +
            `• เมื่อไรที่ซ่อมบำรุงครั้งล่าสุด?\n\n` +
            `คุณสามารถอัปโหลดรูปภาพหรือวิดีโอเพื่อช่วยในการวินิจฉัยได้ครับ 📷`;
    }

    addMessage('ai', response);
}

// ========================================
// Image Upload Handler
// ========================================

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size (max 5MB for demo)
    if (file.size > 5 * 1024 * 1024) {
        utils.showNotification('ไฟล์ใหญ่เกินไป (สูงสุด 5MB)', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImage = {
            name: file.name,
            type: file.type,
            data: e.target.result
        };

        showUploadPreview(uploadedImage);
    };
    reader.readAsDataURL(file);
}

function showUploadPreview(image) {
    const preview = document.getElementById('uploadPreview');
    preview.classList.remove('d-none');

    const isVideo = image.type.startsWith('video/');

    preview.innerHTML = `
    <div class="card" style="background: var(--bg-light); box-shadow: none; padding: 0.5rem;">
      <div class="flex-between">
        <div class="flex-center gap-2">
          <span>${isVideo ? '🎥' : '📷'}</span>
          <span style="font-size: 0.875rem;">${image.name}</span>
          <span class="badge badge-success">พร้อมส่ง</span>
        </div>
        <button class="btn btn-sm" style="background: var(--danger); color: white;" onclick="clearUpload()">✕</button>
      </div>
    </div>
  `;
}

function clearUpload() {
    uploadedImage = null;
    document.getElementById('uploadPreview').innerHTML = '';
    document.getElementById('uploadPreview').classList.add('d-none');
    document.getElementById('imageUpload').value = '';
}

// ========================================
// Clear Chat
// ========================================

function clearChat() {
    if (confirm('ต้องการล้างประวัติการสนทนาทั้งหมดหรือไม่?')) {
        chatHistory = [];
        localStorage.removeItem('helpmecar_chat');

        const chatMessages = document.getElementById('chatMessages');
        const welcomeMsg = chatMessages.firstElementChild;
        chatMessages.innerHTML = '';
        chatMessages.appendChild(welcomeMsg);

        utils.showNotification('ล้างประวัติการสนทนาแล้ว', 'info');
    }
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

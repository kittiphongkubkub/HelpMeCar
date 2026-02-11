// ========================================
// Image Optimization Utility
// ========================================

/**
 * Image Optimizer for HelpMeCar
 * Compresses images client-side before upload to prevent performance issues
 * - Supports JPG, PNG, WebP
 * - Generates thumbnails
 * - Automatic resizing
 * - Format conversion to WebP
 */

const imageOptimizer = {
    // Configuration
    config: {
        maxFullImageWidth: 1200,
        maxFullImageHeight: 1200,
        maxThumbnailWidth: 300,
        maxThumbnailHeight: 300,
        quality: 0.8,
        outputFormat: 'image/webp', // Convert to WebP for better compression
        maxFileSizeKB: {
            beforeAfterPhotos: 2048, // 2MB
            partsImages: 1024, // 1MB
            chatImages: 2048 // 2MB
        }
    },

    /**
     * Optimize image file
     * @param {File} file - Image file to optimize
     * @param {string} type - Image type: 'beforeAfter', 'parts', 'chat'
     * @param {Function} progressCallback - Progress callback (0-100)
     * @returns {Promise<Object>} - Optimized image data
     */
    async optimizeImage(file, type = 'beforeAfter', progressCallback = null) {
        try {
            // Validate file
            if (!file || !file.type.startsWith('image/')) {
                throw new Error('ไฟล์ไม่ใช่รูปภาพ');
            }

            if (progressCallback) progressCallback(10);

            // Get max file size for this type
            const maxSize = this.config.maxFileSizeKB[type] || this.config.maxFileSizeKB.beforeAfterPhotos;

            // Load image
            const img = await this.loadImage(file);
            if (progressCallback) progressCallback(30);

            // Create full-size optimized image
            const fullImage = await this.resizeAndCompress(
                img,
                this.config.maxFullImageWidth,
                this.config.maxFullImageHeight,
                this.config.quality
            );
            if (progressCallback) progressCallback(60);

            // Create thumbnail
            const thumbnail = await this.resizeAndCompress(
                img,
                this.config.maxThumbnailWidth,
                this.config.maxThumbnailHeight,
                this.config.quality * 0.9
            );
            if (progressCallback) progressCallback(80);

            // Get file sizes
            const fullImageBlob = await this.dataURLtoBlob(fullImage);
            const thumbnailBlob = await this.dataURLtoBlob(thumbnail);

            const fullImageSizeKB = Math.round(fullImageBlob.size / 1024);
            const thumbnailSizeKB = Math.round(thumbnailBlob.size / 1024);
            const originalSizeKB = Math.round(file.size / 1024);

            // Check if full image exceeds max size
            if (fullImageSizeKB > maxSize) {
                // Further compress
                const lowerQuality = this.config.quality * (maxSize / fullImageSizeKB);
                const recompressed = await this.resizeAndCompress(
                    img,
                    this.config.maxFullImageWidth,
                    this.config.maxFullImageHeight,
                    Math.max(lowerQuality, 0.5) // Minimum quality 0.5
                );
                const recompressedBlob = await this.dataURLtoBlob(recompressed);

                if (progressCallback) progressCallback(90);

                return {
                    success: true,
                    original: {
                        name: file.name,
                        size: originalSizeKB,
                        type: file.type,
                        dimensions: { width: img.width, height: img.height }
                    },
                    fullImage: {
                        dataURL: recompressed,
                        blob: recompressedBlob,
                        size: Math.round(recompressedBlob.size / 1024),
                        type: this.config.outputFormat
                    },
                    thumbnail: {
                        dataURL: thumbnail,
                        blob: thumbnailBlob,
                        size: thumbnailSizeKB,
                        type: this.config.outputFormat
                    },
                    compressionRatio: ((1 - (recompressedBlob.size / file.size)) * 100).toFixed(1)
                };
            }

            if (progressCallback) progressCallback(100);

            return {
                success: true,
                original: {
                    name: file.name,
                    size: originalSizeKB,
                    type: file.type,
                    dimensions: { width: img.width, height: img.height }
                },
                fullImage: {
                    dataURL: fullImage,
                    blob: fullImageBlob,
                    size: fullImageSizeKB,
                    type: this.config.outputFormat
                },
                thumbnail: {
                    dataURL: thumbnail,
                    blob: thumbnailBlob,
                    size: thumbnailSizeKB,
                    type: this.config.outputFormat
                },
                compressionRatio: ((1 - (fullImageBlob.size / file.size)) * 100).toFixed(1)
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    },

    /**
     * Load image from file
     * @param {File} file 
     * @returns {Promise<HTMLImageElement>}
     */
    loadImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();

                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error('ไม่สามารถโหลดรูปภาพได้'));

                img.src = e.target.result;
            };

            reader.onerror = () => reject(new Error('ไม่สามารถอ่านไฟล์ได้'));
            reader.readAsDataURL(file);
        });
    },

    /**
     * Resize and compress image
     * @param {HTMLImageElement} img 
     * @param {number} maxWidth 
     * @param {number} maxHeight 
     * @param {number} quality 
     * @returns {Promise<string>} Data URL
     */
    async resizeAndCompress(img, maxWidth, maxHeight, quality) {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
        }

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to data URL
        return canvas.toDataURL(this.config.outputFormat, quality);
    },

    /**
     * Convert data URL to Blob
     * @param {string} dataURL 
     * @returns {Promise<Blob>}
     */
    async dataURLtoBlob(dataURL) {
        const response = await fetch(dataURL);
        return response.blob();
    },

    /**
     * Optimize multiple images
     * @param {FileList|File[]} files 
     * @param {string} type 
     * @param {Function} progressCallback 
     * @returns {Promise<Array>}
     */
    async optimizeMultiple(files, type = 'beforeAfter', progressCallback = null) {
        const results = [];
        const total = files.length;

        for (let i = 0; i < total; i++) {
            const result = await this.optimizeImage(files[i], type, (progress) => {
                if (progressCallback) {
                    const overallProgress = ((i / total) * 100) + (progress / total);
                    progressCallback(Math.round(overallProgress));
                }
            });
            results.push(result);
        }

        return results;
    },

    /**
     * Get preview HTML for optimized image
     * @param {Object} result - Result from optimizeImage
     * @returns {string} HTML string
     */
    getPreviewHTML(result) {
        if (!result.success) {
            return `
        <div class="card" style="background: var(--bg-light); padding: 1rem; border-left: 4px solid var(--danger);">
          <strong style="color: var(--danger);">❌ ข้อผิดพลาด:</strong>
          <p style="margin: 0.5rem 0 0 0;">${result.error}</p>
        </div>
      `;
        }

        return `
      <div class="card" style="background: var(--bg-light); padding: 1rem;">
        <div class="grid grid-2" style="gap: 1rem; align-items: center;">
          <div>
            <img src="${result.thumbnail.dataURL}" alt="Preview" style="width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
          </div>
          <div>
            <strong>${result.original.name}</strong>
            <p class="text-muted" style="font-size: 0.875rem; margin: 0.5rem 0;">
              <strong>ขนาดต้นฉบับ:</strong> ${result.original.size} KB<br>
              <strong>ขนาดหลังบีบอัด:</strong> ${result.fullImage.size} KB<br>
              <strong>ประหยัด:</strong> <span class="text-success">${result.compressionRatio}%</span><br>
              <strong>ขนาด:</strong> ${result.original.dimensions.width} × ${result.original.dimensions.height}
            </p>
            <span class="badge badge-success">✓ พร้อมอัปโหลด</span>
          </div>
        </div>
      </div>
    `;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = imageOptimizer;
}

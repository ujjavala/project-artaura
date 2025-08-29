import React, { useState, useRef } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImageUpload, onImageRemove, maxFiles = 5, maxSize = 10 * 1024 * 1024 }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = async (files) => {
    const validFiles = [];
    const errors = [];

    Array.from(files).forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name} is not a valid image file`);
        return;
      }

      // Validate file size
      if (file.size > maxSize) {
        errors.push(`${file.name} is too large (max ${maxSize / (1024 * 1024)}MB)`);
        return;
      }

      // Check if we're not exceeding max files
      if (uploadedImages.length + validFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      const newImages = [];
      
      for (const file of validFiles) {
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        
        // Simulate upload process
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const imageData = {
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          previewUrl,
          uploadedAt: new Date(),
          status: 'uploaded'
        };
        
        newImages.push(imageData);
      }

      setUploadedImages(prev => [...prev, ...newImages]);
      
      // Notify parent component
      if (onImageUpload) {
        onImageUpload(newImages);
      }
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      // Reset input
      e.target.value = '';
    }
  };

  const removeImage = (imageId) => {
    const imageToRemove = uploadedImages.find(img => img.id === imageId);
    
    if (imageToRemove) {
      // Revoke object URL to free memory
      URL.revokeObjectURL(imageToRemove.previewUrl);
      
      const updatedImages = uploadedImages.filter(img => img.id !== imageId);
      setUploadedImages(updatedImages);
      
      if (onImageRemove) {
        onImageRemove(imageToRemove, updatedImages);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="image-upload-container">
      <div className="upload-header">
        <h3>Upload Art Images</h3>
        <p>Share your artwork for the Artaura project - Art Beyond Barriers</p>
      </div>

      <div
        className={`upload-zone ${dragActive ? 'drag-active' : ''} ${isUploading ? 'uploading' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleInputChange}
          className="file-input"
        />
        
        {isUploading ? (
          <div className="upload-loading">
            <div className="upload-spinner"></div>
            <p>Uploading images...</p>
          </div>
        ) : (
          <div className="upload-content">
            <div className="upload-icon">📸</div>
            <h4>Drag & drop images here</h4>
            <p>or <span className="upload-link">browse files</span></p>
            <div className="upload-info">
              <p>Maximum {maxFiles} files • Up to {maxSize / (1024 * 1024)}MB each</p>
              <p>Supported: JPG, PNG, GIF, WEBP</p>
            </div>
          </div>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div className="uploaded-images">
          <h4>Uploaded Images ({uploadedImages.length}/{maxFiles})</h4>
          <div className="image-grid">
            {uploadedImages.map(image => (
              <div key={image.id} className="image-item">
                <div className="image-preview">
                  <img src={image.previewUrl} alt={image.name} />
                  <button
                    className="remove-btn"
                    onClick={() => removeImage(image.id)}
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
                <div className="image-info">
                  <p className="image-name" title={image.name}>
                    {image.name.length > 20 ? 
                      `${image.name.substring(0, 20)}...` : 
                      image.name
                    }
                  </p>
                  <p className="image-size">{formatFileSize(image.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="upload-guidelines">
        <h4>📋 Submission Guidelines</h4>
        <ul>
          <li>Ensure your artwork is original or you have permission to use it</li>
          <li>High-resolution images work best for large-scale printing</li>
          <li>Include diverse themes that represent inclusive communities</li>
          <li>Consider weather resistance for outdoor display</li>
          <li>Images will be reviewed for appropriateness and alignment with project goals</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;
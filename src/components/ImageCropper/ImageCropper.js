import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './css/ImageCropper.css';

const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise(resolve => { image.onload = resolve });

    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return null;
    }

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                console.error('Canvas is empty');
                return;
            }
            resolve(new File([blob], 'cropped-image.jpeg', { type: 'image/jpeg' }));
        }, 'image/jpeg');
    });
};

const ImageCropper = ({ imageSrc, onCropComplete, onClose }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixelsValue) => {
        setCroppedAreaPixels(croppedAreaPixelsValue);
    }, []);

    const handleCrop = async () => {
        if (croppedAreaPixels) {
            const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels);
            onCropComplete(croppedImageFile);
        }
    };

    return (
        <div className="cropper-overlay">
            <div className="cropper-container">
                <div className="cropper-content">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropCompleteCallback}
                    />
                </div>
                <div className="cropper-controls">
                    <label>Zoom</label>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(e.target.value)}
                        className="zoom-slider"
                    />
                </div>
                <div className="cropper-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                    <button className="btn-save" onClick={handleCrop}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
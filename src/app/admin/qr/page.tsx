'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function AdminQRGenerator() {
  const [eventName, setEventName] = useState('Strangers and Stories');
  const [domain, setDomain] = useState('');

  // Get current domain dynamically to handle dev vs production gracefully
  useEffect(() => {
    setDomain(window.location.origin);
  }, []);

  const qrUrl = `${domain}/feedback?event=${encodeURIComponent(eventName)}`;

  const downloadQR = () => {
    const svg = document.getElementById('QRCode');
    if (!svg) return;
    
    // Parse the SVG string to create a blob for download
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Create padding and white background
      const padding = 20;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;
      
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, padding, padding);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `QR_${eventName.replace(/\s+/g, '_')}.png`;
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <main style={{ minHeight: '100vh', padding: '100px 20px', background: 'var(--bg)', color: 'white' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(20,20,20,0.8)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(226, 185, 115, 0.3)' }}>
        
        <h1 style={{ color: 'var(--gold)', marginBottom: '24px', fontFamily: "'Playfair Display', serif" }}>
          Generate Event QR Code
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Type tonight's event name below. It will automatically generate a scannable QR code that attendees can use to instantly leave a review.
        </p>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Event Name</label>
          <input 
            type="text" 
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--gold)',
                color: 'white',
                borderRadius: '8px',
                fontSize: '1.1rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '40px', borderRadius: '16px', marginBottom: '32px' }}>
          {domain ? (
            <QRCodeSVG 
              id="QRCode"
              value={qrUrl} 
              size={256} 
              level="H" 
              includeMargin={false}
              fgColor="#000000"
              bgColor="#FFFFFF"
            />
          ) : (
            <p style={{ color: 'black' }}>Loading URL map...</p>
          )}
        </div>

        <p style={{ textAlign: 'center', wordBreak: 'break-all', marginBottom: '24px', color: '#ffc371' }}>
          {qrUrl}
        </p>

        <button 
            onClick={downloadQR}
            style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(45deg, #ff5f6d, #ffc371)',
                color: 'black',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                cursor: 'pointer'
            }}
        >
          Download QR Code (PNG)
        </button>

      </div>
    </main>
  );
}

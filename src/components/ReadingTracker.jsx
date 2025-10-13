import { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';

export default function ReadingTracker() {
  const location = useLocation();
  const [lastReading, setLastReading] = useState(null);

  console.log('📍 location.pathname =', location.pathname);

  // Lưu vị trí đọc nếu là trang docs
  useEffect(() => {
    if (location.pathname.includes('/docs/')) {
      console.log('💾 Lưu vị trí đọc:', location.pathname);
      localStorage.setItem('currentReading', location.pathname);
    }
  }, [location.pathname]);

  // Đọc lại vị trí đọc cuối
  useEffect(() => {
    const saved = localStorage.getItem('currentReading');
    console.log('📖 Dữ liệu trong localStorage:', saved);
    if (saved && saved !== location.pathname) {
      setLastReading(saved);
    } else {
      setLastReading(null);
    }
  }, [location.pathname]);

  if (!lastReading || location.pathname.includes('/docs/')) return null;

  const handleContinue = () => {
    window.location.href = lastReading;
  };

  return (
    <button
      onClick={handleContinue}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 16px',
        borderRadius: '8px',
        backgroundColor: '#2e8555',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      📖 Tiếp tục đọc
    </button>
  );
}

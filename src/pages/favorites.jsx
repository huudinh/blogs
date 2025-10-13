import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(stored);
  }, []);

  return (
    <Layout title="Bài yêu thích">
      <div style={{ padding: '2rem' }}>
        <h1>📚 Danh sách bài yêu thích</h1>
        {favorites.length === 0 ? (
          <p>Bạn chưa đánh dấu bài nào.</p>
        ) : (
          <ul>
            {favorites.map((item) => (
              <li key={item.id} style={{ margin: '8px 0' }}>
                <Link to={item.id} style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                  {item.title || item.id}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}

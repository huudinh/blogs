import React, { useState, useEffect } from 'react';

export default function FavoriteButton({ docId, title }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Kiểm tra theo id
    setIsFavorite(favorites.some(item => item.id === docId));
  }, [docId]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.some(item => item.id === docId)) {
      favorites = favorites.filter(item => item.id !== docId);
    } else {
      favorites.push({ id: docId, title });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className='favorite'
     
    >
      {isFavorite ? '💖 Đã yêu thích' : '🤍 Yêu thích'}
    </button>
  );
}

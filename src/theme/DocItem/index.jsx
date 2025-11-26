import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';
import FavoriteButton from '../../components/FavoriteButton';

export default function DocItemWrapper(props) {
  const { content } = props;
  const metadata = content?.metadata || {};
  const docId = metadata.permalink;
  const title = metadata.title;

  return (
    <>
      <OriginalDocItem {...props} />
      <div style={{ textAlign: 'right' }}>
        <FavoriteButton docId={docId} title={title} />
      </div>
    </>
  );
}
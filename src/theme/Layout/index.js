import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import ReadingTracker from '../../components/ReadingTracker';

export default function LayoutWrapper(props) {
  return (
    <>
      <ReadingTracker />
      <OriginalLayout {...props} />
    </>
  );
}

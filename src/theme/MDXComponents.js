import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import ToggleTOC from '@site/src/components/ToggleTOC';

export default {
  ...MDXComponents,
  ToggleTOC, // giờ bạn có thể dùng <ToggleTOC /> mà không cần import
};

import React from 'react';
import SimilarTools from '@/components/SimilarTools';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SimilarTools />
    </>
  );
}

import React from 'react';
import { Outlet } from 'react-router-dom';
import StickyCartBar from '../../components/student/StickyCartBar';

const StudentLayout = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <Outlet />
      <StickyCartBar />
    </div>
  );
};

export default StudentLayout;
import React from 'react';

const BodyWrapper = ({children}) => {
  return (
      <div className="relative h-screen">
        <main className="w-full h-screen">{children}</main>
      </div>
  );
};

export default BodyWrapper;

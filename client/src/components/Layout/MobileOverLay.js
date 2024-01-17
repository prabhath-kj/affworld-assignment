import React from "react";

const MobileOverLay = ({handleLogout}) => {
  return (
    <ul className="flex flex-col items-center py-4 cursor-pointer">
      <li onClick={handleLogout}>Logout</li>
    </ul>
  );
};

export default MobileOverLay;

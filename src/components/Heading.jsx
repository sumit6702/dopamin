import React from "react";

const Heading = ({ heading}) => {
  return (
    <div className="flex justify-center mb-8 text-xl lg:text-3xl text-gray-900 font-bold dark:text-white">
      <h1>
        <span className="material-symbols-outlined text-red-500">
          local_fire_department
        </span>
        <span className="mx-4">{heading}</span>
        <span className="material-symbols-outlined text-red-500">
          local_fire_department
        </span>
      </h1>
    </div>
  );
};

export default Heading;

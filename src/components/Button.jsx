import React from "react";

const Button = ({ value, size, color  }) => {
  const sizes = ["btn_xs", "btn_sm", "btn_md", "btn_lg", "btn_xl", "btn_2xl","btn_3xl"];
  const colors = ["btn_primary", "btn_secondary", "btn_primary_outline", "btn_secondary_outline", "btn_danger", "btn_danger_outline" ];
  return (
    <button
      className={`middle none center rounded-lg   py-2 px-4 font-sans text-xs font-bold uppercase  shadow-md  transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${sizes.includes(size) ? size : "btn_sm"} ${colors.includes(color) ? color : "btn_primary"}`}
      data-ripple-light="true">
      {value}
    </button>
  );
};

export default Button;

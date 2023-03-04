import React, { useState } from "react";

const Select_com = ({ handleChange, index, index2 }) => {
  const [SelectedOption, SetSelectedOption] = useState("الرتبة");
  return (
    <select
      style={{
        width: "100%",
        minHeight: "35px",
        fontSize: "15px",
        fontWeight: "bold",
      }}
      className="custom-select"
      placeholder="الرتبة"
      value={SelectedOption}
      onChange={(e) => {
        const SelectedOption = e.target.value;
        SetSelectedOption(SelectedOption);
        handleChange(SelectedOption, index, index2);
      }}
    >
      <option value="الرتبة">الرتبة</option>
      <option value="رقيب">رقيب</option>
      <option value="رقيب اول">رقيب اول</option>
      <option value="مساعد">مساعد</option>
      <option value="مساعد اول">مساعد اول</option>
    </select>
  );
};

export default Select_com;

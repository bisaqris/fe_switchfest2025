"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Checkbox from "../input/Checkbox";

export default function CheckboxComponents() {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const [isCheckedDisabled, setIsCheckedDisabled] = useState(false);
  return (
    <ComponentCard title="Checkbox">
      <div className="flex flex-col items-left gap-4">
        <div className="flex items-left gap-3">
          <Checkbox checked={isChecked} onChange={setIsChecked} label="Text" />
        </div>
        <div className="flex items-left gap-3">
          <Checkbox
            checked={isCheckedTwo}
            onChange={setIsCheckedTwo}
            label="Text"
          />
        </div>
      </div>
    </ComponentCard>
  );
}

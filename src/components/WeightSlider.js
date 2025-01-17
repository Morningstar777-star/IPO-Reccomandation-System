import React from 'react';

const WeightSlider = ({ label, weight, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={weight}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="mt-1 w-full"
    />
    <div className="text-sm text-gray-500">Value: {weight}</div>
  </div>
);

export default WeightSlider;
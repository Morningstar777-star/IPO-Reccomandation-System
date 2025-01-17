import React from 'react';

const IPOList = ({ ipos, formatNumber }) => (
  <div className="grid grid-cols-2 gap-4">
    {ipos.map((ipo, index) => (
      <div key={index} className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800">{ipo.name}</h4>
        <div className="text-sm text-blue-600">
          <p>GMP: {ipo.gmp}%</p>
          <p>Amount: ₹{formatNumber(ipo.amount)}</p>
        </div>
      </div>
    ))}
  </div>
);

export default IPOList;
import React from 'react';

const AccountList = ({ accounts, formatNumber }) => (
  <div className="grid grid-cols-2 gap-4">
    {accounts.map((account, index) => (
      <div key={index} className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800">Account {index + 1}</h4>
        <div className="text-sm text-blue-600">
          <p>Funds: ₹{formatNumber(account.funds)}</p>
        </div>
      </div>
    ))}
  </div>
);

export default AccountList;
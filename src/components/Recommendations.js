import React from 'react';
import { BarChart2 } from 'lucide-react';

const Recommendations = ({ ipos, recommendations, combinedChances, formatNumber }) => {
  const renderIPOPriorityList = () => (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <BarChart2 className="w-5 h-5 text-gray-600" />
        IPO Priority Rankings
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IPO Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Allotment Chances
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount (₹)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ipos
              .sort((a, b) => b.priorityScore - a.priorityScore)
              .map((ipo, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ipo.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ipo.priorityScore?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.round((1 / ipo.subscription) * 100)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(ipo.amount)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAccountRecommendations = () => {
    if (!recommendations || recommendations.length === 0) {
      return <p className="text-gray-500">No recommendations available</p>;
    }

    return (
      <div className="space-y-8">
        <h3 className="text-lg font-medium mb-4">Account-wise Recommendations</h3>
        {recommendations.map((rec) => (
          <div key={rec.accountNumber} className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-blue-800">Account {rec.accountNumber}</h4>
              <div className="text-sm">
                <span className="text-gray-600">Total Funds: </span>
                <span className="font-medium">₹{formatNumber(rec.totalFunds)}</span>
              </div>
            </div>

            {rec.recommendations && rec.recommendations.length > 0 ? (
              <div className="space-y-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        IPO Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount (₹)
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Priority
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Chances
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rec.recommendations.map((ipo, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2 text-sm text-gray-900">{ipo.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {formatNumber(ipo.amount)}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {ipo.priorityScore?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {Math.round((1 / ipo.subscription) * 100)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="4" className="px-4 py-2 text-sm text-gray-600">
                        Remaining Funds: ₹{formatNumber(rec.remainingFunds)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No eligible IPOs for this account</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCombinedChances = () => {
    if (!combinedChances || Object.keys(combinedChances).length === 0) {
      return <p className="text-gray-500">No combined chances available</p>;
    }

    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Combined Chances if Applying from All Accounts</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IPO Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Combined Allotment Chances
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.keys(combinedChances).map((ipoName, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {ipoName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {combinedChances[ipoName]}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {renderIPOPriorityList()}
      {renderAccountRecommendations()}
      {renderCombinedChances()}
    </>
  );
};

export default Recommendations;
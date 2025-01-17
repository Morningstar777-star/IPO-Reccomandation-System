import React, { useCallback } from 'react';
import { ArrowDownCircle, PlusCircle, Building, Tag, BarChart2, Filter } from 'lucide-react';
import useStore from './store';
import './styles.scss';
import FormInput from './components/FormInput';
import IPOList from './components/IPOList';
import AccountList from './components/AccountList';
import WeightSlider from './components/WeightSlider';
import Recommendations from './components/Recommendations';

const IPORecommendationSystem = () => {
  const {
    step,
    ipos,
    accounts,
    weights,
    recommendations,
    setStep,
    addIPO,
    addAccount,
    setWeights,
    undoLastIPO,
    undoLastAccount,
    calculatePriority
  } = useStore();

  const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);

  const handleAddIPO = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newIpo = {
      name: formData.get('name'),
      gmp: parseFloat(formData.get('gmp')),
      category: formData.get('category'),
      type: formData.get('type'),
      subscription: parseFloat(formData.get('subscription')),
      amount: parseFloat(formData.get('amount')),
      priorityScore: 0,
    };
    addIPO(newIpo);
    e.target.reset();
  }, [addIPO]);

  const handleAddAccount = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAccount = {
      funds: parseFloat(formData.get('funds')),
    };
    addAccount(newAccount);
    e.target.reset();
  }, [addAccount]);

  const handleCalculateRecommendations = () => {
    calculatePriority();
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">IPO Recommendation System</h1>
        <div className="flex justify-between mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`flex items-center ${s <= step ? 'text-blue-600' : 'text-gray-400'}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${s <= step ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
              >
                {s}
              </div>
              {s < 4 && <div className={`w-full h-1 ${s < step ? 'bg-blue-600' : 'bg-gray-300'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Add IPOs
            </h2>
            <form onSubmit={handleAddIPO} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput label="IPO Name" name="name" type="text" required />
                <FormInput label="GMP (%)" name="gmp" type="number" required />
                <FormInput label="Category" name="category" type="select" options={['retail', 'hni']} required />
                <FormInput label="Type" name="type" type="select" options={['mainboard', 'sme']} required />
                <FormInput label="Subscription (times)" name="subscription" type="number" required />
                <FormInput label="Amount" name="amount" type="number" required />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add IPO
                </button>
                <button type="button" onClick={undoLastIPO} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Undo
                </button>
              </div>
            </form>
            {ipos.length > 0 && (
              <>
                <div className="mt-8 flex justify-between">
                  <h3 className="text-lg font-medium mb-4">Added IPOs</h3>
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Next
                  </button>
                </div>
                <IPOList ipos={ipos} formatNumber={formatNumber} />
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Building className="w-5 h-5" />
              Add Account Details
            </h2>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <FormInput label="Available Funds" name="funds" type="number" required />
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add Account
                </button>
                <button type="button" onClick={undoLastAccount} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Undo
                </button>
              </div>
            </form>

            {accounts.length > 0 && (
              <>
                <div className="mt-8 flex justify-between">
                  <h3 className="text-lg font-medium mb-4">Added Accounts</h3>
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Next
                  </button>
                </div>
                <AccountList accounts={accounts} formatNumber={formatNumber} />
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Configure Weights
            </h2>
            <WeightSlider
              label="GMP Weight"
              weight={weights.gmp}
              onChange={(value) => setWeights({
                gmp: value,
                chance: Math.round((1 - value) * 10) / 10
              })}
            />
            <div className="text-sm text-gray-500">Allotment Chances Weight: {weights.chance}</div>
            <div className="flex justify-between">
              <button
                onClick={handleCalculateRecommendations}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Calculate Recommendations
              </button>
              <button
                onClick={() => setStep(2)}
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Previous
              </button>
            </div>
          </div>
        )}

        {step === 4 && recommendations && (
          <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ArrowDownCircle className="w-5 h-5" />
              IPO Recommendations
            </h2>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-medium">Priority Rankings</h3>
              </div>
              <button className="flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                <Filter className="w-4 h-4" />
                Sort Options
              </button>
            </div>
            <Recommendations
              ipos={ipos}
              recommendations={recommendations}
              formatNumber={formatNumber}
            />
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Previous
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Print Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IPORecommendationSystem;
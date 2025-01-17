import { create } from 'zustand';

const useStore = create((set) => ({
  step: 1,
  ipos: [],
  accounts: [],
  weights: {
    gmp: 0.5,
    chance: 0.5,
  },
  recommendations: [],
  combinedChances: {},
  setStep: (step) => set({ step }),
  addIPO: (ipo) => set((state) => ({
    ipos: [...state.ipos, ipo],
  })),
  addAccount: (account) => set((state) => ({
    accounts: [...state.accounts, account],
  })),
  setWeights: (weights) => set({ weights }),
  undoLastIPO: () => set((state) => ({
    ipos: state.ipos.slice(0, -1),
  })),
  undoLastAccount: () => set((state) => ({
    accounts: state.accounts.slice(0, -1),
  })),
  calculatePriority: () => set((state) => {
    const combinedChances = {};
    const newRecommendations = state.accounts.map((account, index) => {
      let remainingFunds = account.funds;
      const accountRecommendations = state.ipos
        .map((ipo) => ({
          ...ipo,
          priorityScore: ipo.gmp * state.weights.gmp + (1 / ipo.subscription) * state.weights.chance,
        }))
        .sort((a, b) => b.priorityScore - a.priorityScore)
        .filter((ipo) => {
          if (remainingFunds >= ipo.amount) {
            remainingFunds -= ipo.amount;
            if (!combinedChances[ipo.name]) {
              combinedChances[ipo.name] = 0;
            }
            combinedChances[ipo.name] += Math.round((1 / ipo.subscription) * 100);
            return true;
          }
          return false;
        });

      return {
        accountNumber: index + 1,
        totalFunds: account.funds,
        remainingFunds,
        recommendations: accountRecommendations,
      };
    });

    // Ensure the combined chances do not exceed 100%
    Object.keys(combinedChances).forEach((ipoName) => {
      combinedChances[ipoName] = Math.min(combinedChances[ipoName], 100);
    });

    return { recommendations: newRecommendations, combinedChances, step: 4 };
  }),
}));

export default useStore;
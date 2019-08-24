import calculateProductivity from '../calculateProductivity';

describe.skip('utils', () => {
  describe('calculateProductivity', () => {
    it('should calculate productivity score', () => {
      const gaugeStats = {
        totalTime: 100,
        productive: {
          totalTime: 70,
          percentage: 0.7,
        },
        neutral: {
          totalTime: 10,
          percentage: 0.1,
        },
        distracting: {
          totalTime: 20,
          percentage: 0.2,
        },
      };

      const productivity = calculateProductivity(gaugeStats);

      expect(productivity).toBe(0.75);
    });
    it('should return 0.5 for only neutral time', () => {
      const gaugeStats = {
        totalTime: 100,
        productive: {
          totalTime: 0,
          percentage: 0,
        },
        neutral: {
          totalTime: 100,
          percentage: 1,
        },
        distracting: {
          totalTime: 0,
          percentage: 0,
        },
      };

      const productivity = calculateProductivity(gaugeStats);

      expect(productivity).toBe(0.5);
    });
  });
});

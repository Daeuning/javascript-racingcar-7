import Race from '../../src/Race.js';
import { getRandomNumber } from '../../src/utils.js';

jest.mock('../../src/utils.js', () => ({
  getCarName: jest.fn().mockResolvedValue("Audi,BMW,Ford"),
  getAttempt: jest.fn().mockResolvedValue("5"),
  getRandomNumber: jest.fn(),
}));

describe("Race 클래스 테스트", () => {
  let race;

  beforeEach(() => {
    race = new Race();
  });

  describe("setCarName() 테스트", () => {

    test("자동차 이름마다 Car 객체가 생성되어야 한다", async () => {
      await race.setCarName(); 

      expect(race.cars).toHaveLength(3); 
      expect(race.cars.map(car => car.name)).toEqual(["Audi", "BMW", "Ford"]); 
    });
  });

  describe("generateRandomDistances() 테스트", () => {

    test("무작위 값이 4 이상일 때만 Car 객체가 이동해야 한다", async () => {
      getRandomNumber.mockReturnValueOnce(3)
                     .mockReturnValueOnce(5)
                     .mockReturnValueOnce(7);
      
      await race.setCarName();

      race.generateRandomDistances();

      expect(race.cars[0].distance).toBe(0); 
      expect(race.cars[1].distance).toBe(1); 
      expect(race.cars[2].distance).toBe(1); 
    });
  });

  describe("printRaceStatus() 테스트", () => {

    test("자동차 이동 상태가 올바르게 출력되어야 한다", async () => {
      getRandomNumber.mockReturnValueOnce(4) 
                     .mockReturnValueOnce(3) 
                     .mockReturnValueOnce(4); 

      await race.setCarName();
      race.generateRandomDistances();
      console.log = jest.fn(); 

      race.printRaceStatus();

      expect(console.log).toHaveBeenCalledWith("pobi : -");
      expect(console.log).toHaveBeenCalledWith("woni : ");
      expect(console.log).toHaveBeenCalledWith("jun : -");
    });
  });

});

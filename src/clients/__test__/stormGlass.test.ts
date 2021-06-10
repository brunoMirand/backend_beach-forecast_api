import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassMock from '@tests/fixtures/stormglass_weather.json';
import stormGlassNormalize from '@tests/fixtures/stormglass_normalize.json';

jest.mock('axios');

describe('Starting Unit Tests', () => {
  describe('StormGlass Client', () => {
    it('should return the normalized forecast from the StormGlass service', async () => {
      const lat = -33.666333;
      const lng = 151.666333;

      axios.get = jest.fn().mockResolvedValue(stormGlassMock);

      const stormGlass = new StormGlass(axios);
      const response = await stormGlass.fetchPoints(lat, lng);
      expect(response).toEqual(stormGlassNormalize);
    });
  });
});

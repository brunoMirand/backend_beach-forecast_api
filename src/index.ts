import axios from 'axios';
import { StormGlass } from './clients/stormGlass';


(async () => {
  const stormGlass = new StormGlass(axios);
  const points = await stormGlass.fetchPoints(58.7984, 17.8081);

  console.log(points);
})();



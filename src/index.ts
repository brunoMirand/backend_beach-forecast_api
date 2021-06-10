import axios from 'axios';
import { StormGlass } from './clients/stormGlass';



const stormGlass = new StormGlass(axios);

stormGlass.testConsole();

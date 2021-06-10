import { AxiosStatic } from 'axios';
import dotevn from 'dotenv';

dotevn.config();

const {
  STORM_GLASS_API_KEY,
  STORM_GLASS_API
} = process.env;


export interface StormGlassPointSource {
  [key: string]: number;
}

export interface StormGlassPoint {
  readonly time: string;
  readonly waveHeight: StormGlassPointSource;
  readonly waveDirection: StormGlassPointSource;
  readonly swellDirection: StormGlassPointSource;
  readonly swellHeight: StormGlassPointSource;
  readonly swellPeriod: StormGlassPointSource;
  readonly windDirection: StormGlassPointSource;
  readonly windSpeed: StormGlassPointSource;
}

export interface StormGlassForecastResponse {
  hours: StormGlassPoint[];
}

export interface ForecastPoint {
  time: string;
  waveHeight: number;
  waveDirection: number;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  windDirection: number;
  windSpeed: number;
}

export class StormGlass {
  readonly stormGlassAPIParams = 'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  readonly stormGlassAPISource = 'noaa';
  readonly configRequest = {
    headers: {
      'Authorization': `${STORM_GLASS_API_KEY}`
    }
  }

  constructor(protected request: AxiosStatic) { }

  public async fetchPoints(lat: number, lng: number): Promise<{}> {
    const response = this.request.get<StormGlassForecastResponse>(
      `${STORM_GLASS_API}/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&lat=${lat}&lng=${lng}`,
      this.configRequest
    );

    return response;
  }

  private normalizeReponse(point: StormGlassForecastResponse): ForecastPoint[] {
    return []
  }

  private isValidPoint(point: Partial<StormGlassPoint>): boolean {
    return !!(
      point.time &&
      point.swellDirection?.[this.stormGlassAPIParams] &&
      point.swellHeight?.[this.stormGlassAPIParams] &&
      point.swellPeriod?.[this.stormGlassAPIParams] &&
      point.waveDirection?.[this.stormGlassAPIParams] &&
      point.waveHeight?.[this.stormGlassAPIParams] &&
      point.windDirection?.[this.stormGlassAPIParams] &&
      point.windSpeed?.[this.stormGlassAPIParams]
    );
  }

  public async testConsole(): Promise<{}> {
    const response = await this.fetchPoints(58.7984, 17.8081);
    return response;
  }
}

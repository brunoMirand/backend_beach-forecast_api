import { AxiosStatic } from 'axios';
import dotevn from 'dotenv';
import { inflateSync } from 'zlib';

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

  public async fetchPoints(lat: number, lng: number): Promise<ForecastPoint[]> {
    const response = this.request.get<StormGlassForecastResponse>(
      `${STORM_GLASS_API}/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&lat=${lat}&lng=${lng}`,
      this.configRequest
    );

    return this.normalizeReponse((await response).data);
  }

  private normalizeReponse(points: StormGlassForecastResponse): ForecastPoint[] {
    return points.hours.filter(this.isValidPoint).map((point) => ({
      "swellDirection": point.swellDirection[this.stormGlassAPISource],
      "swellHeight": point.swellDirection[this.stormGlassAPISource],
      "swellPeriod": point.swellPeriod[this.stormGlassAPISource],
      "time": point.time,
      "waveDirection": point.waveDirection[this.stormGlassAPISource],
      "waveHeight": point.waveHeight[this.stormGlassAPISource],
      "windDirection": point.windDirection[this.stormGlassAPISource],
      "windSpeed": point.windSpeed[this.stormGlassAPISource]
    }));
  }

  private isValidPoint(point: Partial<StormGlassPoint>): boolean {
    return !!(
      point.time &&
      point.swellDirection?.noaa &&
      point.swellHeight?.noaa &&
      point.swellPeriod?.noaa &&
      point.waveDirection?.noaa &&
      point.waveHeight?.noaa &&
      point.windDirection?.noaa &&
      point.windSpeed?.noaa
    );
  }
}

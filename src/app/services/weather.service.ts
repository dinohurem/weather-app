import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Weather } from '../models/weather.model';
import { environment } from '../../environments/environment';
import { AirPollution } from '../models/air-pollution.model';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    private apiKey: string = environment.openWeatherMapApiKey;
    private weatherUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
    private airPollutionUrl: string = 'https://api.openweathermap.org/data/2.5/air_pollution';
    private geocodingUrl: string = 'https://api.openweathermap.org/geo/1.0/direct';

    constructor(private http: HttpClient) { }

    getWeatherAndAirPollution(city: string): Observable<{ weather: Weather; airPollution: AirPollution }> {
        return this.getCoordinates(city).pipe(
            switchMap((coords) =>
                forkJoin({
                    weather: this.getWeather(coords.lat, coords.lon),
                    airPollution: this.getAirPollution(coords.lat, coords.lon),
                })
            ),
            catchError((error) => {
                return throwError(() => new Error(error.message || 'An error occurred.'));
            })
        );
    }

    private getCoordinates(city: string): Observable<{ lat: number; lon: number }> {
        const params = new HttpParams().set('q', city).set('limit', '1').set('appid', this.apiKey);

        return this.http.get<any[]>(this.geocodingUrl, { params }).pipe(
            map((data) => {
                if (data.length === 0) {
                    throw new Error('City not found. Please enter a valid city name.');
                }
                return {
                    lat: data[0].lat,
                    lon: data[0].lon,
                };
            })
        );
    }

    private getWeather(lat: number, lon: number): Observable<Weather> {
        const params = new HttpParams()
            .set('lat', lat.toString())
            .set('lon', lon.toString())
            .set('appid', this.apiKey)
            .set('units', 'metric');

        return this.http.get<any>(this.weatherUrl, { params }).pipe(
            map((data) => this.transformToWeather(data))
        );
    }

    private getAirPollution(lat: number, lon: number): Observable<AirPollution> {
        const params = new HttpParams()
            .set('lat', lat.toString())
            .set('lon', lon.toString())
            .set('appid', this.apiKey);

        return this.http.get<any>(this.airPollutionUrl, { params }).pipe(
            map((data) => this.transformToAirPollution(data))
        );
    }

    private transformToWeather(data: any): Weather {
        return {
            temperature: data.main.temp,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            city: data.name,
            country: data.sys.country,
        };
    }

    private transformToAirPollution(data: any): AirPollution {
        const components = data.list[0].components;
        const aqi = data.list[0].main.aqi;
        return {
            airQualityIndex: aqi,
            components: {
                co: components.co,
                no: components.no,
                no2: components.no2,
                o3: components.o3,
                so2: components.so2,
                pm2_5: components.pm2_5,
                pm10: components.pm10,
                nh3: components.nh3,
            },
        };
    }
}

// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Weather } from '../models/weather.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root' // Ensures the service is available application-wide
})
export class WeatherService {
    private apiKey: string = environment.openWeatherMapApiKey; // Use environment variable
    private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

    constructor(private http: HttpClient) { }

    // src/app/services/weather.service.ts
    getWeather(city: string): Observable<Weather> {
        const params = new HttpParams()
            .set('q', city)
            .set('appid', this.apiKey)
            .set('units', 'metric');

        return this.http.get<any>(this.apiUrl, { params }).pipe(
            map(data => this.transformToWeather(data)),
            catchError(error => {
                // Handle specific error scenarios
                if (error.status === 404) {
                    return throwError(() => new Error('City not found'));
                }
                return throwError(() => new Error('An error occurred while fetching weather data'));
            })
        );
    }


    private transformToWeather(data: any): Weather {
        return {
            temperature: data.main.temp,
            condition: data.weather[0].main,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            city: data.name,
            country: data.sys.country
        };
    }
}

// src/app/app.component.ts
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherService } from './services/weather.service';
import { AirPollution } from './models/air-pollution.model';
import { Weather } from './models/weather.model';
import { CommonModule } from '@angular/common';
import { ToastService } from './services/toast.service';
import { ToastComponent } from "./components/toast/toast.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Indicates a standalone component
  imports: [
    HttpClientModule,
    WeatherDisplayComponent,
    SearchBarComponent,
    CommonModule,
    ToastComponent
  ]
})
export class AppComponent {
  weather?: Weather;
  airPollution?: AirPollution;
  error: string = '';
  isLoading: boolean = false;

  constructor(private weatherService: WeatherService,
    private toastService: ToastService,
  ) { }

  fetchWeather(city: string) {
    this.isLoading = true;
    this.weatherService.getWeatherAndAirPollution(city).subscribe({
      next: (data) => {
        this.weather = data.weather;
        this.airPollution = data.airPollution;
        this.error = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.showToast('error', 'This is an error message.');
        console.error(err);
        this.error = err.message;
        this.weather = undefined;
        this.airPollution = undefined;
        this.isLoading = false;
      },
    });
  }
}

// src/app/app.component.ts
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Indicates a standalone component
  imports: [
    HttpClientModule, // Add HttpClientModule here
    WeatherDisplayComponent,
    SearchBarComponent,
    // Add other modules or components as needed
  ]
})
export class AppComponent {
  weather: any;
  error: string = '';

  constructor(private weatherService: WeatherService) { }

  fetchWeather(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.weather = data;
        this.error = '';
      },
      error: (err) => {
        console.error(err);
        this.error = 'Could not fetch weather data. Please try again.';
        this.weather = null!;
      }
    });
  }
}

import { Component, Input } from '@angular/core';
import { Weather } from '../../models/weather.model';
import { AirPollution, AirPollutionComponents } from '../../models/air-pollution.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class WeatherDisplayComponent {
  @Input() weather?: Weather;
  @Input() airPollution?: AirPollution;
  @Input() error: string = '';

  // Explicitly type the pollutantList
  pollutantList: Array<{ key: keyof AirPollutionComponents; label: string }> = [
    { key: 'co', label: 'CO' },
    { key: 'no', label: 'NO' },
    { key: 'no2', label: 'NO₂' },
    { key: 'o3', label: 'O₃' },
    { key: 'so2', label: 'SO₂' },
    { key: 'pm2_5', label: 'PM₂.₅' },
    { key: 'pm10', label: 'PM₁₀' },
    { key: 'nh3', label: 'NH₃' },
  ];
}

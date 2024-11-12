// src/app/components/weather-display/weather-display.component.ts
import { Component, Input } from '@angular/core';
import { Weather } from '../../models/weather.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent {
  @Input() weather!: Weather;
  @Input() error: string = '';
}

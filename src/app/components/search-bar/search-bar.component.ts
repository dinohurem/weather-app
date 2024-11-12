// src/app/components/search-bar/search-bar.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  city: string = '';
  @Output() citySelected: EventEmitter<string> = new EventEmitter();

  search() {
    if (this.city.trim()) {
      this.citySelected.emit(this.city.trim());
      this.city = '';
    }
  }
}

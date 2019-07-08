import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'ff3d82a6bb7157490990656e71dd81ac';
  units = 'metric';
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://api.openweathermap.org/data/2.5/forecast?';
  }

  getWeatherByName(city, lang) {
    return this.http.get(`${this.url}q=${city}&units=${this.units}&lang=${lang}&appid=${this.apiKey}`);
  }

  getWeatherByLocation(lat, lon, lang) {
    return this.http.get(`${this.url}lat=${lat}&lon=${lon}&units=${this.units}&lang=${lang}&appid=${this.apiKey}`);
  }
}

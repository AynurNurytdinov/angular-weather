import { Component, AfterViewInit, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  math = Math;
  selectedDay;
  days = [];
  side = 'left';
  currentTab = 0;
  weather = {
    descriptionENG: [
      'clear sky', 'light rain', 'scattered clouds'
    ],
    descriptionRU: [
      'Ясно', 'Небольшой дождь', 'Переменная облачность'
    ]
  };
  dayMoment = ['Сегодня', 'Завтра', 'Послезавтра'];

  constructor(private service: WeatherService) {}

  ngAfterViewInit() {
    this.service.getWeather().subscribe(
      (res) => {
        res.list.map((day, i) => {
          day.dt = new Date(day.dt * 1000);
          day.moment = this.dayMoment[i];
        });
        this.selectedDay = res.list[0];
        this.days = res.list;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  slide(n) {
    this.side = n > this.currentTab ? 'right' : 'left';
    this.currentTab = n;
    this.selectedDay = this.days[n];
    for (let i = 0; i < document.getElementsByClassName('tab').length; i++) {
      document.getElementsByClassName('tab')[i].className = i === n ? 'tab active ' : 'tab';
    }
  }
}

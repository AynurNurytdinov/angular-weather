import { Component, AfterViewInit, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import {
  trigger,
  transition,
  query,
  style,
  animate,
  group
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('slider', [
      transition(':increment', group([
        query(':enter', [
          style({
            left: '100%'
          }),
          animate('0.2s ease-out', style('*'))
        ], { optional: true }),
        query(':leave', [
          animate('0.2s ease-out', style({
            left: '-100%'
          }))
        ], { optional: true })
      ])),
      transition(':decrement', group([
        query(':enter', [
          style({
            left: '-100%'
          }),
          animate('0.2s ease-out', style('*'))
        ], { optional: true }),
        query(':leave', [
          animate('0.2s ease-out', style({
            left: '100%'
          }))
        ], { optional: true })
      ])),
    ]),
    trigger('slider2', [
      transition(':increment', group([
        query(':enter', [
          style({
            left: '100%'
          }),
          animate('0.4s ease-out', style('*'))
        ], { optional: true }),
        query(':leave', [
          animate('0.4s ease-out', style({
            left: '-100%'
          }))
        ], { optional: true })
      ])),
      transition(':decrement', group([
        query(':enter', [
          style({
            left: '-100%'
          }),
          animate('0.4s ease-out', style('*'))
        ], { optional: true }),
        query(':leave', [
          animate('0.4s ease-out', style({
            left: '100%'
          }))
        ], { optional: true })
      ])),
    ])
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  math = Math;
  data = [];
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
          day.temp.day = this.math.round(day.temp.day - 273.15);
        });
        this.data = res.list;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get currentDay() {
    return [this.data[this.currentTab]];
  }

  slide(n) {
    this.currentTab = n;
    for (let i = 0; i < document.getElementsByClassName('tab').length; i++) {
      const element = document.getElementsByClassName('tab')[i];
      if ( i === n) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    }
  }
}

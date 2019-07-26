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
  error = false;

  constructor(private service: WeatherService) {}

  ngAfterViewInit() {
    this.service.getWeather().subscribe(
      (res) => {
        this.error = false;
        res.list.map((day, i) => {
          day.dt = new Date(day.dt * 1000);
          day.moment = this.dayMoment[i];
          day.temp.day = Math.round(day.temp.day - 273.15);
        });
        this.data = res.list;
      },
      (err) => {
        this.error = true;
        console.log(err);
      }
    );
  }

  get currentDay() {
    return [this.data[this.currentTab]];
  }

  slide(n) {
    this.currentTab = n;
    const tab = document.getElementsByClassName('tab');
    for (let i = 0; i < tab.length; i++) {
      const element = tab[i];
      if ( i === n) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    }
  }
}

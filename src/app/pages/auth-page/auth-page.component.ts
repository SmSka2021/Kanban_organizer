import { Component, OnInit } from '@angular/core';
import { Tabs } from './models/tabs';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  public tabIndex: Tabs;

  private subs: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs = this.route.params.subscribe((parameter: Params) => {
      if (parameter['tab'] === 'login') {
        this.tabIndex = Tabs.Login;
      } else if (parameter['tab'] === 'signup') {
        this.tabIndex = Tabs.SignUp;
      }
    });
  }
}

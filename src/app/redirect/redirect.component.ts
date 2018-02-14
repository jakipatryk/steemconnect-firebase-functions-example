import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    const url = `<FUNCTIONS-URL>/callback?code=${code}`;

    if (code) {
      this.http
        .post<any>(url, {})
        .pipe(
          switchMap(res => {
            return fromPromise(this.auth.signIn(res.token));
          })
        )
        .subscribe();
    }
  }
}

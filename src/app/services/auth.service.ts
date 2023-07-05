import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AuthData } from "../models/auth-data.model";
import { Subject } from "rxjs";
import { LOGIN_ROUTE_URLS } from "../app.routes.names";
import { environment } from "src/environments/environment.prod";
@Injectable({
    providedIn: "root"
})
export class AuthService {
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated: boolean = false;
    constructor(private router: Router, public route: ActivatedRoute,
    ) { }

    getIsAuth() {
        return this.isAuthenticated;
    }
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
      }
    login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };

        // this should be POST API but this code was added for testing purposes 
        if (authData.email === 'rashedmrabadi@gmail.com' && authData.password === 'Pass@123') {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            //this should navigate to the main screen
            this.router.navigate(["/"]);
            alert('Logged in successfully');
        }
        else
        {
            this.isAuthenticated = false;  
            this.authStatusListener.next(true);
            //this is just a mockup and it should return the user to login screen after implementing a guard
            this.router.navigate([LOGIN_ROUTE_URLS.LOGIN]);
        }
    }

}

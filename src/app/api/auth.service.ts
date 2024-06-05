import {HttpClient, HttpStatusCode} from "@angular/common/http";
import {environment} from "../../environment";
import {User} from "../models/User";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LoginBody} from "../interfaces/login-body";
import {catchError, map, Observable, of} from "rxjs";
import {UserBody} from "../interfaces/user-body";

@Injectable({
  providedIn: "root",
})

/**
 * Service Class for the authentication functionality and api calls
 * allows access to the loggedInUser and the loggedIn flag
 */
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  private loggedInUser!: User | null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  /**
   * returns the loggedIn Status by checking if the access token and the refresh token are set in the local storage
   *
   */
  isLoggedIn(): boolean {
    return (
      localStorage.getItem("access_token") !== null &&
      localStorage.getItem("access_token") !== undefined
    );
  }

  /**
   * post the login data to the api
   * if the login is successful: the tokens are saved in the local storage, the user is saved in the service and an Observable of true is returned
   * otherwise: the loggedIn flag will be set to false and an Observable of false is returned
   * @param loginBody the login data containing the email and password
   */
  login(loginBody: LoginBody): Observable<Boolean> {
    return this.http
      .post<User>(this.baseUrl + "/login", loginBody, {
        observe: "response",
      })
      .pipe(
        map((response) => {
          if (response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.Created || response.status === HttpStatusCode.Accepted) {
            this.setTokens(
              response.body?.access_token!,
            );
            this.setLoggedInUser(response.body!);
            return true;
          }
          return false;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }

  register(registerBody: UserBody): Observable<User | null> {
    return this.http.post<User>(this.baseUrl + 'register', registerBody).pipe(
      map((res) => {
        this.setLoggedInUser(res);
        this.setTokens(res.access_token!,)
        return res;
      }),
      catchError(() => {
        return of(null); // Default return if post fails
      }),
    );
  }

  /**
   * Logs out the user by removing the tokens from the local storage and navigating to the login page
   */
  logout() {
    this.loggedInUser = null;
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    this.router.navigateByUrl('http://localhost:4200/login');
  }

  getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  setTokens(access_token: string) {
    localStorage.setItem("access_token", access_token);
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getLoggedInUser(): User | null {
    if (this.loggedInUser) {
      return this.loggedInUser;
    }
    const userJSON = localStorage.getItem("user");
    const parsedUser = JSON.parse(userJSON || "{}");
    return new User(parsedUser);
  }
}

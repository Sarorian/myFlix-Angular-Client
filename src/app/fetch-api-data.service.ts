import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataService } from './data.service';

const apiUrl = 'https://supercoolmovieapi.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient,
        private dataService: DataService
        ) { }

        private tokenHeader(): HttpHeaders {
          if (typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('token');
            return new HttpHeaders({
              Authorization: 'Bearer ' + token
            });
          } else {
            // Handle the case where localStorage is not available (e.g., server-side rendering)
            return new HttpHeaders();
          }
        }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  userLogin(credentials: any): Observable<any> {
    return this.http.post(apiUrl + 'login', credentials, {
      headers: {
          'Content-Type': 'application/json',
      },
    }).pipe(
      catchError(this.handleError),
      map((resData: any) => {
        if(resData.user) {
            //Save user / token to localStorage
            localStorage.setItem('user', JSON.stringify(resData.user));
            localStorage.setItem('token', resData.token);
            this.dataService.setUser(resData.user);
            return JSON.stringify(resData.user);
        } else {
            throw new Error('No such user');
        }
      })
    );
  }
  
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies',{headers: this.tokenHeader() })
    .pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  getMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movieId, {headers: this.tokenHeader() })
    .pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }
  getDirector(directorId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + directorId, {headers: this.tokenHeader() })
    .pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }
  getGenre(genreId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + genreId,{headers: this.tokenHeader() })
    .pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }
  getUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + userId,{headers: this.tokenHeader() })
    .pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }
  getFavoriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + userId + '/favorites',{headers: this.tokenHeader() })
    .pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }
  addToFavorites(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const body = { movieId: movieId };
    return this.http.post(apiUrl + 'users/' + userId + '/favorites', body,{headers: this.tokenHeader() })
    .pipe(
      catchError(this.handleError)
    );
  }
  editUser(userId: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userId, userDetails, {headers: this.tokenHeader() })
    .pipe(
      catchError(this.handleError)
    );
  }
  deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userId, {headers: this.tokenHeader() })
    .pipe(
      catchError(this.handleError)
    );
  }
  deleteFromFavorites(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userId + '/favorites/' + movieId,{headers: this.tokenHeader() })
    .pipe(
      catchError(this.handleError)
    );
  }
  
// Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  // Your FetchApiDataService code goes here...

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
      } else {
      console.error(
          `Error Status code ${error.status}, ` +
          `Error body is: ${error.error}`);
      }
      return throwError(
      'Something bad happened; please try again later.');
    }
  }


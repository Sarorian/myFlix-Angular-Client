import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * @description Service providing data handling for movies and user information.
 * @@Injectable
 */

@Injectable({
  providedIn: 'root'
})

export class DataService {

    /** Array holding movie data. */
    private movies: any[] = [];

    /** Object holding user data. */
    private user: any = {};

    /** Subject for observing changes in the current movie list. */
    private currentMovies: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    /** Observable for the current movie list. */
    public currentMovies$: Observable<any[]> = this.currentMovies.asObservable();

    /**
     * @description Attempt to sign in the user by retrieving user data from localStorage.
     */
    signin(): void {
        const userString = localStorage.getItem('user');
        if (userString) {
        this.user = JSON.parse(userString);
        }
    }

    /**
     * @description Check if a user is currently signed in.
     * @returns {boolean} - True if a user is signed in, false otherwise.
     */
    hasUser(): boolean {
        return Object.keys(this.user).length > 0;
    }

    /**
     * @description Sign out the user by clearing user data and localStorage.
     */
    signout(): void {
        this.user = {};
        localStorage.clear();
    }

    /**
     * @description Set the movie data and notify observers.
     * @param {any[]} data - Array of movie data.
     */
    setMovies(data: any[]): void {
        this.movies = data;
        this.currentMovies.next(data);
    }

    /**
     * @description Get the currently stored movie data.
     * @returns {any[]} - Array of movie data.
     */
    getMovies(): any[] {
        return this.movies;
    }

    /**
     * @description Set the user data.
     * @param {any} data - User data.
     */
    setUser(data: any): void {
        this.user = data;
    }

    /**
     * @description Get the currently stored user data.
     * @returns {any} - User data.
     */
    getUser(): any {
        return this.user;
    }

    /**
     * @description Get the list of favorite movies from the user data.
     * @returns {any[]} - Array of favorite movies.
     */
    getFavoriteMovies(): any[] {
        return this.user.favoriteMovies;
    }
}
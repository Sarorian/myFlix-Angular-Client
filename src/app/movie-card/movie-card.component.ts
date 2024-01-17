import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  if (typeof window !== 'undefined') {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    }, (error) => {
      this.snackBar.open('Unauthorized - please click "home" and then login', 'OK', {
        duration: 2000
    });
    console.error('Unauthorized: ', error);
    });
  }
  }

openGenreCardDialog(genre: any): void {
    this.dialog.open(GenreCardComponent, {
        width: "80%",
        height: "80%",
        data: {genre}
    });
}
openDirectorCardDialog(director: any): void {
  this.dialog.open(DirectorCardComponent, {
      width: "80%",
      height: "80%",
      data: {director}
  });
}
}
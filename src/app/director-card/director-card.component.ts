import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';


/**
 * @description Component representing a director card.
 * @selector: 'app-director-card'
 * @templateUrl: './director-card.component.html'
 * @styleUrls: ['../movie-card/movie-card.component.scss']
 */
@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent {

    /** The director data associated with the card. */
    director: any;
    /** List of similar movies to the director. */
    similarMovies: any[];

    /**
    * @constructor
    * @param {any} data - Data injected into the component via MAT_DIALOG_DATA.
    * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
    * @param {MatDialogRef<MovieCardComponent>} dialogRef - Reference to the dialog.
    */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<MovieCardComponent>,
    ) {
        this.director = this.data.director;

        if(!this.director.image)
            this.director.image = 'assets/genre.png';
    }

}
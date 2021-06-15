import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Movie, MovieAPIResult } from 'src/app/shared/components/movies/models/movie';
import { MoviesService } from 'src/app/shared/components/movies/services/movies.service';
import { MovieDetailDialogComponent } from '../../shared/components/movies/dialog/movie-detail-dialog.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  progressSpin: boolean = true;
 
  unsubscribe$: Subject<void> = new Subject<void>();
  movieFavourites: Movie[] = [];

  constructor(private movieService: MoviesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.movieService.getFavourites()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        this.movieFavourites = results;
        this.progressSpin = false;
      });
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

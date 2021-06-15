import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieDetailDialogComponent } from './dialog/movie-detail-dialog.component';
import { Movie } from './models/movie';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  @Input() movie!: Movie;

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private movieService: MoviesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  onClickView(movieDetail: Movie) {
    this.dialog.open(MovieDetailDialogComponent, { data:{ movieDetail}
    });
  }

  onClickToggleFavourite(movie: Movie) {
    this.movieService.toggleFavourite(movie).pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  
  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}

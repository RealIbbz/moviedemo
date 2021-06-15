import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Movie } from 'src/app/shared/components/movies/models/movie';
import { MoviesService } from 'src/app/shared/components/movies/services/movies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  progressSpin: boolean = true;
  unsubscribe$: Subject<void> = new Subject<void>();
  movies!: Movie[];
  favourites!: Movie[];
  currentPageNumber!: number;
  totalResults!: number;
  totalPages!: number;

  constructor(private movieService: MoviesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    forkJoin(this.movieService.getMovies(), this.movieService.getFavourites())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([movieResult,
        favourites        
      ]) => {
        this.movies = movieResult.results;
        this.favourites = favourites;
        this.currentPageNumber = movieResult.page;
        this.totalResults = movieResult.total_results;
        this.totalPages = movieResult.total_pages;
        this.movieService.markMoviesAsFavourites();
        this.progressSpin = false;
        // mark the movies which are already favourites.
      });
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}

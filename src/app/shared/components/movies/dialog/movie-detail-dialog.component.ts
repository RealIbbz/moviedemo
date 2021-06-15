import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnDestroy } from '@angular/core';
import { first, takeUntil } from 'rxjs/operators';
import { Movie } from 'src/app/shared/components/movies/models/movie';
import { MoviesService } from 'src/app/shared/components/movies/services/movies.service';
import { Tweet } from '../models/tweet';
import { Subject } from 'rxjs';


@Component({
  // tslint:disable-next-line:component-selector
  selector: "movie-detail-dialog",
  template: `
    <h1 mat-dialog-title>{{movie.title}}</h1>
    <app-loading *ngIf="progressSpin"></app-loading>
    <div mat-dialog-content style="min-width: 500px; max-width: 1000px;" *ngIf="!progressSpin">
      <div fxLayout="row" fxLayoutAlign="center start">
        <img src="https://image.tmdb.org/t/p/original/{{movie.poster_path}}" style="object-fit: contain; max-width: 900px;max-height: 600px;">
        <div style="margin-left: 20px;">        
        <table>
          <tr><td>Release Date: </td> <td>{{movie.release_date}}  </td></tr>
          <tr><td>Original Title:  </td><td> {{movie.original_title}}</td></tr>
          <tr><td>Original Language:  </td><td> {{movie.original_language}}</td></tr>
          <tr><td>Popularity:  </td><td>{{movie.popularity}} </td></tr>
          <tr><td>Vote Count: </td><td> {{movie.vote_count}} </td></tr>
          <tr><td>Vote Average: </td><td>  {{movie.vote_average}}</td></tr>
        </table>
        <p style="padding: 5px;">{{movie.overview}}</p>
        <mat-divider></mat-divider>
        <div fxLayout="row" fxLayoutAlign="start center" style="width: 300px;">
            <h3 style="margin: 20px 20px 20px 0px;">Tweets</h3><img src="/assets/twitter.png" style="width:30px; height:30px;">
        </div>
        <div *ngFor="let tweet of movieTweets" style="border: 1px solid lightgray;border-radius: 3px;padding: 5px;margin-bottom: 10px;">
          <table>
            <tr><td>Author: </td> <td>{{tweet.author}}  </td></tr>
            <tr><td>Created At:  </td><td> {{tweet.created_at}}</td></tr>            
          </table>
          <p style="padding: 5px;">{{tweet.text}}</p>
        </div>
      </div>
      </div>
      
    </div>
    <div mat-dialog-actions class="default-button"  fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="20px" *ngIf="!progressSpin">
      <button mat-raised-button (click)="onClickClose()" color="primary">CLOSE</button>
      <button mat-fab color="primary" (click)="onClickToggleFavourite()">
                <mat-icon *ngIf="movie.favourite" matTooltip="Unfavourite Movie">star</mat-icon>
                <mat-icon *ngIf="!movie.favourite" matTooltip="Favourite Movie">star_border</mat-icon>
            </button>
    </div>
  `
})
export class MovieDetailDialogComponent implements OnDestroy {
  progressSpin:boolean = true;
  unsubscribe$: Subject<void> = new Subject<void>();
  movie: Movie;
  movieTweets: Tweet[] = [];

  constructor(public dialogRef: MatDialogRef<MovieDetailDialogComponent>
    , private moviesService: MoviesService
    , @Inject(MAT_DIALOG_DATA) public data: { movieDetail: Movie}) {
      this.movie = data.movieDetail;
      moviesService
        .getMovieTweets(this.movie.title)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(results => {
          this.movieTweets = results;
          this.progressSpin = false;
        });
  }
  
  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickClose() {
    this.dialogRef.close();
  }

  onClickToggleFavourite() {
    this.moviesService.toggleFavourite(this.movie).pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/models/User';
import { NotificationService } from 'src/app/core/services/notification-service';
import { UsersService } from 'src/app/core/services/users.service';
import { environment } from 'src/environments/environment';
import { Movie, MovieAPIResult } from '../models/movie';
import { Tweet } from '../models/tweet';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  uri: string = environment.movieAPIURI;

  movies: Movie[] = [];
  movieFavourites: Movie[] = [];

  
  constructor(private http: HttpClient
    , private authenticationService: AuthenticationService
    , private notificationService: NotificationService) { 

  }

  getFavourites(): Observable<Movie[]> {
    return this.http.get<{favourites: Movie[]}>(this.uri+"movies/favourites").pipe(map(movieResult => {
      this.movieFavourites = movieResult.favourites;
      this.movieFavourites.forEach(favourite => favourite.favourite = true);
      return movieResult.favourites;
    }));
  }

  getMovies(): Observable<MovieAPIResult> {
    return this.http.get<MovieAPIResult>(this.uri+"movies").pipe(map(moviesAPIResult => {
      this.movies = moviesAPIResult.results;
      return moviesAPIResult;
    }));;
  }

  getMovieTweets(movieTitle: string):Observable<Tweet[]> {
    let params = new HttpParams().set('searchTerm', movieTitle);
    return this.http.get<Tweet[]>(this.uri+"movies/tweets", {params});
  }


  toggleFavourite(movie: Movie):Observable<boolean> {
    if (this.authenticationService.isLoggedIn()) {
      if (this.movieFavourites.some(favouriteMovie => favouriteMovie.id === movie.id)) {
        return this.removeFavourite(movie);
      } else {        
        return this.addFavourite(movie);
      }
    } else {
      // throw error 
      return of(false);
    }
  }

  addFavourite(movie: Movie):Observable<boolean> {
    if (this.authenticationService.isLoggedIn()) {
      return this.http.post(this.uri+"movies/favourites", {movie}).pipe(map(success => {
        if (success) {
          movie.favourite = true;
          this.movieFavourites.push(movie);
          this.notificationService.show('Favourite added.',false, '', 2000);
          return true;
        } else {
          return false;
        }
      }));
    } else {
      // throw error user must be logged in.
      return of(false);
    }
  }

  removeFavourite(movie: Movie):Observable<boolean> {
    if (this.authenticationService.isLoggedIn()) {
      let httpParams = new HttpParams().set('movieId',movie.id);
      let options = { params: httpParams };
      return this.http.delete(this.uri+"movies/favourites",options).pipe(map(success => {
        if (success) {        
          movie.favourite = false;
          const index = this.movieFavourites.findIndex(favourite => favourite.id === movie.id);
          this.movieFavourites.splice(index, 1);
          this.notificationService.show('Favourite removed.',false, '', 2000);
          return true;
        } else {
          return false;
        }
      }));
    } else {
      // throw error user must be logged in.
      return of(false);
    }
  }

  markMoviesAsFavourites() {
    this.movies.forEach(movie => movie.favourite = this.movieFavourites.some(favourite => favourite.id === movie.id));
  }

  
}

import {Subscription} from 'rxjs';
import {Injectable, OnDestroy} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {MatSnackBarRef, SimpleSnackBar} from '@angular/material/snack-bar';

class SnackBarMessage  {
  message!: string;
  action: string = '';
  config!: MatSnackBarConfig;
}

// Used from
// https://stackoverflow.com/questions/47409869/angular-2-4-material-design-snackbars-multiple-message-in-sequence

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messages: Array<any> = Array<any>();
  private snackBarRef!: MatSnackBarRef<SimpleSnackBar>;
  private isInstanceVisible = false;

  constructor(public snackBar: MatSnackBar) {}

  /**
   * Add a message
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar.
   * @param classOverride Adds a css class on the snackbar so you can add color.

   */
  show(
    message: string,
    dismissExistingMessage?: boolean,
    action?: string,
    duration?: number,
    config?: MatSnackBarConfig,
    classOverride: string = 'blue-snackbar'
  ): void {
    if (!config) {
      config = new MatSnackBarConfig();
      config.duration = duration? duration : 5000;
      config.verticalPosition = 'bottom';
      config.horizontalPosition = 'center';
      config.panelClass = [classOverride];
    }

    const sbMessage = new SnackBarMessage();
    sbMessage.message = message;
    sbMessage.action = action || '';
    sbMessage.config = config;

    if (dismissExistingMessage) {
      this.messages = [sbMessage];
    } else {
      // make sure the same message isnt already in queue
      if (!this.messages.find(existingMessage => existingMessage.message === sbMessage.message)) {
        this.messages.push(sbMessage);
      }
    }


    if (!this.isInstanceVisible) {
      this.showNext();
    } else {
      if (dismissExistingMessage) {
        this.snackBarRef.dismiss();
      }
    }
  }

  private showNext() {
    if (this.messages.length === 0) {
      return;
    }

    // We dont use this.messages.shift here as the message that we're displaying may end up being the same
    // as another message we're adding.
    const message = this.messages[0];
    this.isInstanceVisible = true;

    this.snackBarRef = this.snackBar.open(
      message.message,
      message.action,
      message.config
    );

    this.snackBarRef.afterDismissed().subscribe(() => {
      this.isInstanceVisible = false;
      this.messages.shift();
      this.showNext();
    });
  }
}

import { setup, TestContextWithHost, setupWithHost} from 'src/testing/test-context';
import { Component } from '@angular/core';
import { ComponentsModule } from '../components.module';
import { LoadingComponent } from './loading.component';

@Component({
  template: `<app-loading></app-loading>`
})
class LoadingTestComponent {
}

describe('LoadingComponent', () => {
  /*setupWithHost();

  beforeEach(function(this: TestContextWithHost<LoadingComponent,LoadingTestComponent>) {
      this.create(LoadingComponent, LoadingTestComponent, [ComponentsModule]);
  });

  it('should create', function(this: TestContextWithHost<LoadingComponent,LoadingTestComponent>) {
    expect(this.testedElement).toBeTruthy();
  });*/


});

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { DifficultySelectorComponent } from './components/difficulty-selector/difficulty-selector.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { difficultyReducer } from './shared/store/reducers/difficulty/difficulty.reducer';
import { viewReducer } from './shared/store/reducers/view/view.reducer';

@NgModule({
  declarations: [
    AppComponent,
    DifficultySelectorComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    StoreModule.forRoot({
      difficulty: difficultyReducer,
      views: viewReducer
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

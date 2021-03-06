import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { DifficultySelectorComponent } from './components/difficulty-selector/difficulty-selector.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { viewReducer } from './shared/store/reducers/view/view.reducer';
import { wordsReducer } from './shared/store/reducers/words/words.reducer';

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
      views: viewReducer,
      words: wordsReducer
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './components/form/form.component';
import { InformationComponent } from './components/information/information.component';
import { TextAreaComponent } from './components/inputs/text-area/text-area.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { ModalComponent } from './components/modal/modal.component';
import { WordsComponent } from './components/words/words.component';
import { AutoFocusDirective } from './directives/auto-focus/auto-focus.directive';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { ScrollIntoViewDirective } from './directives/scroll-into-view/scroll-into-view.directive';
import { PreventCutCopyPasteDirective } from './directives/text/prevent-cut-copy-paste.directive';

@NgModule({
  declarations: [
    FormComponent,
    InformationComponent,
    TextAreaComponent,
    InstructionsComponent,
    ModalComponent,
    WordsComponent,
    AutoFocusDirective,
    HighlightDirective,
    ScrollIntoViewDirective,
    PreventCutCopyPasteDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    CommonModule,
    FormComponent,
    TextAreaComponent,
    InstructionsComponent,
    ModalComponent,
    WordsComponent,
    AutoFocusDirective,
    HighlightDirective,
    ScrollIntoViewDirective,
    PreventCutCopyPasteDirective
  ]
})
export class SharedModule { }

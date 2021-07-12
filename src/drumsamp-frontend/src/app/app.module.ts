import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {LocalStorageService} from 'ngx-webstorage';
import { SamplelistComponent } from './components/samplelist/samplelist.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SampleDetailComponent } from './components/sample-detail/sample-detail.component';
import { SampleSuggestionsComponent } from './components/sample-suggestions/sample-suggestions.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { SampleUploadDialogComponent } from './components/sample-upload-dialog/sample-upload-dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LibrarySelectionDialogComponent } from './components/library-selection-dialog/library-selection-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SamplelistComponent,
    SampleDetailComponent,
    SampleSuggestionsComponent,
    SampleUploadDialogComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LibrarySelectionDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatDialogModule,
    HttpClientModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home/:token', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}

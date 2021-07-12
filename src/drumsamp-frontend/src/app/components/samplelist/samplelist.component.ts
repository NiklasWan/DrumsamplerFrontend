import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AudioFile } from 'src/app/model/AudioFile';
import { AppStateService } from 'src/app/services/app-state.service';
import { SampleService } from 'src/app/services/sample.service';
import {TagColorizer} from '../../util/TagColorizer';

@Component({
  selector: 'app-samplelist',
  templateUrl: './samplelist.component.html',
  styleUrls: ['./samplelist.component.scss']
})
export class SamplelistComponent implements OnInit, AfterContentInit {

  @Input()
  token: string | null = null;

  @Input()
  libName!: string

  constructor(private appState: AppStateService, private sampleService: SampleService) { }

  ngAfterContentInit(): void {
    this.appState.files.subscribe(newValue => {
      this.files = newValue;
    })
  }

  files: AudioFile[] = [];

  isFavourite = false

  ngOnInit(): void {
    
  }

  selectFile(file: AudioFile) {
    this.appState.selectAudioFile(file);
  }

  onFavoriteClick(file: AudioFile) {
    file.isFavorite = !file.isFavorite;
    
    if (this.token != null) {
      this.sampleService.toggleFavorite(this.token, this.libName, file.file.name, file.isFavorite).subscribe(res => {
        console.log(res)
      });
    }
  }

  getTagColor(tag: string): string {
    return TagColorizer.instance.getColor(tag)
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { AudioFile } from 'src/app/model/AudioFile';
import { AppStateService } from 'src/app/services/app-state.service';
import { SampleService } from 'src/app/services/sample.service';
import { TagColorizer } from 'src/app/util/TagColorizer';

@Component({
  selector: 'app-sample-suggestions',
  templateUrl: './sample-suggestions.component.html',
  styleUrls: ['./sample-suggestions.component.scss']
})
export class SampleSuggestionsComponent implements OnInit {
  @Input()
  token: string | null = null;

  @Input()
  libName!: string
  
  constructor(private appState: AppStateService, private sampleService: SampleService) { }

  files: AudioFile[] = []

  ngOnInit(): void {
    this.appState.recommendedFiles.subscribe(newFiles => this.files = newFiles )
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

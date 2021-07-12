import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AudioFile } from 'src/app/model/AudioFile';
import { AppStateService } from 'src/app/services/app-state.service';
import { SampleService } from 'src/app/services/sample.service';
import { TagColorizer } from 'src/app/util/TagColorizer';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-sample-detail',
  templateUrl: './sample-detail.component.html',
  styleUrls: ['./sample-detail.component.scss']
})
export class SampleDetailComponent implements OnInit {
  @Input()
  token: string | null = null;

  @Input()
  libName!: string

  constructor(private appState: AppStateService, private sampleService: SampleService) { }

  @ViewChild('sampleDetailContainer') sampleDetailContainer?: ElementRef;

  file: (AudioFile | undefined)

  wavesurfer: (WaveSurfer | undefined)

  hideContainer = true

  isPlaying = false

  isDisabled = true

  isTagInputVisible = false
  tagname = ""

  ngOnInit(): void {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
    });

    this.wavesurfer.on('ready', ev => {
      this.isDisabled = false
    })

    this.wavesurfer.on('pause', ev => { 
      this.isPlaying = false;
    });

    this.wavesurfer.on('play', ev => { 
      this.isPlaying = true;
    });

    this.wavesurfer.on('finish', ev => { 
      this.isPlaying = false
    });

    this.appState.selectedFile.subscribe(newValue => {
      if (newValue != undefined) {
        this.hideContainer = false;
        this.file = newValue;
      
        const url = URL.createObjectURL(this.file?.file);
  
        this.wavesurfer?.load(url);
      } else {
        this.hideContainer = true;
      }
      
      
    });
  }

  startPlayback() {
    this.wavesurfer?.play()
  }

  pausePlayback() {
    this.wavesurfer?.pause()
  }

  stopPlayback() {
    this.wavesurfer?.stop()
  }

  getTagColor(tag: string): string {
    return TagColorizer.instance.getColor(tag)
  }

  removeTag(tag: string) {
    if (this.file != undefined && this.token != undefined) {
      const tagList = this.file.tags.filter(savedTag => {
        return tag != savedTag;
      });

      this.file.tags = tagList;
      this.sampleService.modifyTags(this.token, this.libName, this.file.file.name, this.file.tags).subscribe(resp => {
        console.log(resp);
      });
    }
  }

  toggleTagInput() {
    this.isTagInputVisible = !this.isTagInputVisible
  }

  onSubmit(model: NgForm) {
    if (this.file != undefined && this.token != undefined) {
      this.file?.tags.push(model.value.tag);
      this.sampleService.modifyTags(this.token, this.libName, this.file.file.name, this.file.tags).subscribe(resp => {
        console.log(resp);
      });
      model.reset();
      this.isTagInputVisible = false;
    }
  }

}

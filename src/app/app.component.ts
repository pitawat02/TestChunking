import { Component } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Test } from './models/test';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  maxBlockSize : number = 256 * 1024;//Each file will be split in 256 KB.
  numberOfBlocks : number = 1;
  selectedFile = null;
  currentFilePointer = 0;
  totalBytesRemaining = 0;
  blockIds = new Array();
  blockIdPrefix = "block-";
  submitUri = null;
  bytesUploaded = 0;

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    // this.uploadService.getTest().subscribe((res:Test) => console.log(JSON.stringify(res.test)));
  }

  upload():void {
    console.log("tst");
  }

}

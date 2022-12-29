import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Upload } from '../models/upload';
import { UploadList } from '../models/uploadList';
import { uploadResponse } from '../models/uploadResponse';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file

  // Inject service
  constructor(private fileUploadService: UploadService) {}

  ngOnInit(): void {}

  // On file Select
  // onChange(event) {
  //   this.file = event.target.files[0];
  // }

  // OnClick of button Upload
  // onUpload() {
  //     this.loading = !this.loading;
  //     console.log(this.file);
  //     const chunkSize = 512*1024
  //     const blockList = new UploadList;
  //     blockList.fileName = this.file.name;
  //     blockList.blockList = [];
  //     for (let start = 0; start < this.file.size; start += chunkSize) {
  //       const chunk = this.file.slice(start, start + chunkSize + 1);
  //       var parameter = new Upload();
  //       parameter.index = start.toString();
  //       parameter.fileName = this.file.name;
  //       this.fileUploadService.upload(chunk,parameter).subscribe(
  //         (res) => {
  //           console.log(JSON.stringify(res));
  //           blockList.blockList.push(JSON.stringify(res));
  //         }
  //       );
  //     }

  //     this.fileUploadService.uploadList(blockList).subscribe();

  // }

  onChange(event) {
    this.file = event.target.files[0];
    const chunkSize = 512 * 1024;
    const fileSize = this.file?.size;
    const numberOfChunk = parseInt((fileSize / chunkSize).toString(), 10)+1;
    console.log("FileSize " , fileSize);
    console.log("chunkSize " , chunkSize);
    console.log("numberOfChunk " , numberOfChunk);

    const blockList = new UploadList;
    blockList.fileName = this.file.name;
    blockList.blockList = [];

    let index = 0;
    for (let start = 0; start < fileSize; start += chunkSize) {
      const chunk = this.file.slice(start, start + chunkSize +1);
      console.log("chunk " , chunkSize);
      console.log("start " , start);

      var parameter = new Upload();
      parameter.index = start.toString();
      parameter.fileName = this.file.name;

      this.fileUploadService.upload(chunk,parameter).subscribe((res:uploadResponse) => {
        console.log(res.blockId);
        blockList.blockList.push(res.blockId);
        console.log("///////////" , blockList.blockList);
        // this.currentProgress = (100.0 * index) / numberOfChunk;
        index++;
      });
    }

    if (index === numberOfChunk) {
      this.fileUploadService.uploadList(blockList).subscribe(() => {
        console.log('Complete: ' + blockList.fileName);
      });
    }

  }
}

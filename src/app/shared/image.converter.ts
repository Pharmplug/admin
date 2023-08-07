import { Component } from '@angular/core';

@Component({
  selector: 'app-image',
  template: `
   
  `
})

export class ImageConverter {
  

  convertToImage(base64Img: any) {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64Img}`;
    return img.src;
  }
}

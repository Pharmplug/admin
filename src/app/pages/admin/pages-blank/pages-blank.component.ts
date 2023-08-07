import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-pages-blank',
  templateUrl: './pages-blank.component.html',
  styleUrls: ['./pages-blank.component.css']
})
export class PagesBlankComponent implements OnInit {

  constructor(public _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
   this.convertToImage()
  }


  imageUrl: any;

 

  // Define the convertToImage() method

  convertToImage() {
   
  }
  

 

  
  
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtlService } from './reset-net.service';
import Mtl from '../../../models/mtl.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-settings',
  templateUrl: './reset-net.component.html',

})
export class ResetComponent implements OnInit {

  mtl!:Mtl;
  setupState='Init...'
  mtlStateCheck!:boolean;
  perc=0

  constructor(private mtlService: MtlService,private toastr: ToastrService) { }

  async ngOnInit() {
    const snapshot = await this.mtlService.getById();
    snapshot.forEach((doc:any) => {
      this.mtl=doc.data();
  
      this.mtlStateCheck= this.mtl.mtl_state_check
      console.log(this.mtlStateCheck)
    });
  }

 

 async onSubmit() {
  
    
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtlService } from './mtl.service';
import Mtl from '../../../models/mtl.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-settings',
  templateUrl: './mtl.component.html',
  styleUrls: ['./mtl.component.scss']
})
export class MtlComponent implements OnInit {

  mtl!:Mtl;
  mtlStateCheck!:boolean;

  constructor(private mtlService: MtlService,private toastr: ToastrService) { }

  async ngOnInit() {
    const snapshot = await this.mtlService.getById();
    snapshot.forEach((doc:any) => {
      this.mtl=doc.data();
  
      this.mtlStateCheck= this.mtl.mtl_state_check
      console.log(this.mtlStateCheck)
    });
  }

 

  onSubmit() {
      
    console.log(this.mtlStateCheck)
      const data = {
        mtl_state_check: this.mtlStateCheck,
      };

      this.mtlService.update(data).then(() => {
        this.toastr.success('MTL license updated successfully', 'Success', {
          timeOut: 3000,
        });
      }).catch(err => console.log(err));

    
  }
}

import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact-form/contact.module';
import { ContactService } from '../service/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  contacts:Contact[]=[];
  constructor(
    private contactService:ContactService,
    private toastr:ToastrService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.loadContacts();
  }
  loadContacts(){
    this.contactService.getContacts().subscribe(contacts=>{
      this.contacts = contacts;
    })
  }
  editContact(contact: Contact) {
    this.router.navigate(['/edit-contact', contact.id]);
  }
  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.loadContacts();
      this.toastr.warning('Contact deleted successfully');
    });
  }
}

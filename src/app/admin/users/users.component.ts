import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {UserInterface} from "./user.interface";
import {ToasterService} from "../../shared/toasts/toaster.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserModalComponent} from "../user-modal/user-modal.component";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users: UserInterface[] = [];
    isLoading = false;
    userModalComponentRef!: NgbModalRef;
    confirmationModalRef!: NgbModalRef;
    constructor(private adminService: AdminService,
                private modalService: NgbModal,
                private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.isLoading = true;
        this.adminService.getUsers().subscribe({
            next: (users) => {
                this.isLoading = false;
                this.users = users;
            },
            error: () => {
                this.isLoading = false;
                this.toasterService.show('Error while getting list of users', {className: 'bg-danger text-light'})
            }
        })
    }

    openUserModal(user: any) {
        this.userModalComponentRef = this.modalService.open(UserModalComponent, {centered: true});
        this.userModalComponentRef.componentInstance.user = user;
        this.userModalComponentRef.componentInstance.cancel.subscribe({
            next: () => {
                this.userModalComponentRef.close();
            }
        });
        this.userModalComponentRef.componentInstance.updatedUser.subscribe({
            next: (updatedUser: UserInterface) => {
               this.updateUserByIndex(updatedUser);
            }
        })
    }

    updateUserByIndex(updatedUser: UserInterface) {
        const userIndex = this.users.findIndex(user => user.id === updatedUser.id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 0, updatedUser);
        }
    }

    onDeleteUser(user: UserInterface) {
        this.confirmationModalRef = this.modalService.open(ConfirmationModalComponent, {centered: true});

        this.confirmationModalRef.componentInstance.user = user

        this.confirmationModalRef.componentInstance.close.subscribe({
            next: () => {
                this.confirmationModalRef.close();
            }
        });

        this.confirmationModalRef.componentInstance.deletedUser.subscribe({
            next: (deletedUser: UserInterface) => {
                const deletedUserIndex = this.users.findIndex(user => user.id === deletedUser.id);

                if (deletedUserIndex !== -1) {
                    this.users.splice(deletedUserIndex, 1);
                }
            }
        })

    }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {UserInterface} from "./user.interface";
import {ToasterService} from "../../shared/toasts/toaster.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserModalComponent} from "../user-modal/user-modal.component";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
    users: UserInterface[] = [];
    isLoading = false;
    userModalComponentRef!: NgbModalRef;
    confirmationModalRef!: NgbModalRef;
    closeConfirmationModalSubscription!: Subscription;
    deleteUserSubscription!: Subscription;
    userModalCancelSubscription!: Subscription;
    updateUserSubscription!: Subscription;
    constructor(private adminService: AdminService,
                private modalService: NgbModal,
                private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    ngOnDestroy() {
        this.deleteUserSubscription?.unsubscribe();
        this.closeConfirmationModalSubscription?.unsubscribe()
        this.userModalCancelSubscription?.unsubscribe();
        this.updateUserSubscription?.unsubscribe();
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

        this.onUserModalCancelSubscription();

        this.onUserUpdated()
    }

    onUserModalCancelSubscription() {
        this.userModalCancelSubscription = this.userModalComponentRef.componentInstance.cancel.subscribe({
            next: () => {
                this.userModalComponentRef.close();
            }
        });
    }

    onUserUpdated() {
        this.updateUserSubscription = this.userModalComponentRef.componentInstance.updatedUser.subscribe({
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

        this.onConfirmationModalCancel();

        this.onDeleteUserSubscription();

    }

    onDeleteUserSubscription() {
        this.deleteUserSubscription = this.confirmationModalRef.componentInstance.deletedUser.subscribe({
            next: (deletedUser: UserInterface) => {
                const deletedUserIndex = this.users.findIndex(user => user.id === deletedUser.id);

                if (deletedUserIndex !== -1) {
                    this.users.splice(deletedUserIndex, 1);
                }
            }
        })
    }

    onConfirmationModalCancel() {
        this.closeConfirmationModalSubscription = this.confirmationModalRef.componentInstance.close.subscribe({
            next: () => {
                this.confirmationModalRef.close();
            }
        });
    }

    openAddNewUserModal() {
        this.userModalComponentRef = this.modalService.open(UserModalComponent, { centered: true });

        this.onUserModalCancel();

        this.onCreatedNewUser();
    }

    onUserModalCancel() {
        this.userModalComponentRef.componentInstance.cancel.subscribe({
            next: () => {
                this.userModalComponentRef.close();
            }
        });
    }

    onCreatedNewUser() {
        this.userModalComponentRef.componentInstance.createdUser.subscribe({
            next: (createdUser: UserInterface) => {
                this.users.unshift(createdUser);
            }
        });
    }

}

import {Component, EventEmitter} from '@angular/core';
import {UserInterface} from "../users/user.interface";
import {AdminService} from "../admin.service";
import {ToasterService} from "../../shared/toasts/toaster.service";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
    user!: UserInterface;
    close: EventEmitter<any> = new EventEmitter();
    deletedUser: EventEmitter<UserInterface> = new EventEmitter();
    isLoading = false;
    constructor(private adminService: AdminService,
                private toasterService: ToasterService) {}

    onClose() {
        this.close.emit();
    }

    deleteUser() {
        this.isLoading = true;
        this.adminService.deleteUser(this.user).subscribe({
            next: () => {
                this.isLoading = false
                this.toasterService.show(`User have been deleted successfully`, {className: 'bg-success text-light'});
                this.onClose();
                this.deletedUser.emit(this.user);
            },
            error: () => {
                this.isLoading = false
                this.toasterService.show(`Error while deleting the user`, {className: 'bg-danger text-light'})
            }
        });
    }
}

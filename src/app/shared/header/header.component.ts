import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/login.service";
import {User} from "../../login/model/user";
import {RolesEnum} from "../../login/enums/roles.enum";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {LanguageEnum} from "../enum/language.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user: User | null = null;
    RolesEnum = RolesEnum;
    currentLanguage: LanguageEnum = LanguageEnum.EN;
    LanguageEnum = LanguageEnum;
    constructor(private loginService: LoginService, private translateService: TranslateService) {}

    ngOnInit() {
        this.loginService.getUser.subscribe({
            next: (user) => {
                this.user = user;
            }
        });

        this.translateService.onLangChange.subscribe({
            next: (lang: LangChangeEvent) => {
                this.currentLanguage = lang.lang as LanguageEnum;
            }
        })
    }

    logout() {
        this.loginService.logout();
    }

    changeViewRole(tempRole: RolesEnum) {
        this.loginService.changeUserRole(tempRole);
    }

    changeLanguage(language: LanguageEnum) {
        this.translateService.use(language);
    }

}

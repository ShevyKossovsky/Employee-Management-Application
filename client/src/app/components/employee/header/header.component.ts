import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  isHebrew: boolean = false;

  toggleLanguage(): void {
    if (this.isHebrew) {
      // עברית -> אנגלית
      document.documentElement.lang = 'en';
    } else {
      // אנגלית -> עברית
      document.documentElement.lang = 'he';
    }
  }
  
}

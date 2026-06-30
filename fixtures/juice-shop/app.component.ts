// Juice Shop-style Angular component — exercises sec-ng-bypass (DomSanitizer bypass).
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent {
  trusted: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {}

  showResult(searchValue: string) {
    // Disables Angular's built-in XSS sanitization on attacker-influenced input:
    this.trusted = this.sanitizer.bypassSecurityTrustHtml(searchValue);
  }

  openLink(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

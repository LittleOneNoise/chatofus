import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, words: string[]): SafeHtml {
    if (!words || words.length === 0) return text;

    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    const newText = text.replace(regex, '<span class="bg-yellow-500/30">$1</span>');

    return this.sanitizer.bypassSecurityTrustHtml(newText);
  }
}

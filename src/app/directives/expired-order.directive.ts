import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appexpiredOrder]'
})
export class ExpiredOrderDirective implements OnInit {
  @Input() dateFinal!: Date;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.applyHighlight();
  }

  private applyHighlight() {
    const today = new Date();

    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const finalDate = typeof this.dateFinal === 'string' ? new Date(this.dateFinal) : new Date(this.dateFinal);

    const dateFinalDateOnly = new Date(finalDate.getFullYear(), finalDate.getMonth(), finalDate.getDate());

    const diffTime = dateFinalDateOnly.getTime() - todayDateOnly.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));


    if (diffDays <= 2 && diffDays >= 0) {
      this.renderer.addClass(this.el.nativeElement, 'red-highlight');
      this.renderer.removeClass(this.el.nativeElement, 'blue-highlight');
    }
    else {

      this.renderer.addClass(this.el.nativeElement, 'blue-highlight');
      this.renderer.removeClass(this.el.nativeElement, 'red-highlight');

    }
  }
}
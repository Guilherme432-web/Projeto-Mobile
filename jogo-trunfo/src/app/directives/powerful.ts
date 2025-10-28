import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPowerful]',
  standalone: true
})
export class Powerful implements OnInit { 
  @Input() appPowerful: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appPowerful > 80) {
      this.el.nativeElement.style.backgroundColor = 'lightgreen';
    }
  }
}
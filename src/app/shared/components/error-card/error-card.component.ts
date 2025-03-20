import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.css'],
})
export class ErrorCardComponent {
  @Input('errorMessage') errorMessage: string | null = null;
  @Output('onCancelClick') cancelEmitter = new EventEmitter<void>();

  // This function is invoked when the user clicks on the cancel button
  onCancelClick() {
    this.cancelEmitter.emit();
  }
}

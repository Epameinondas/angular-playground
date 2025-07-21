import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-playground';
  isEditing = false;
  informationText = 'This is the information section.';
  titleText = '';

  enableEditing(event: Event) {
    event.stopPropagation();
    this.isEditing = true;
    // Focus on the contenteditable div after a short delay
    setTimeout(() => {
      const editableDiv = document.querySelector('.editable-content') as HTMLElement;
      if (editableDiv) {
        editableDiv.focus();
      }
    }, 0);
  }

  disableEditing() {
    console.log('Disabling editing, titleText:', this.titleText);
    this.isEditing = false;
  }

  updateInformation(event: Event) {
    const target = event.target as HTMLElement;
    this.informationText = target.textContent || '';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const editableContainer = document.getElementById('information-and-title');
    
    // Only disable editing if clicking outside the container and not on editable elements
    if (this.isEditing && editableContainer && !editableContainer.contains(target)) {
      this.disableEditing();
    }
  }
}

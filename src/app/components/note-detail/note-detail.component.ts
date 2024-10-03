import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  note: Note | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.viewNoteById(id);
  }

  viewNoteById(id: number): void {
    this.noteService.getNoteById(id).subscribe(
      (note: Note) => {
        this.note = note;
      },
      (error) => {
        this.errorMessage = 'Error fetching note: ' + error.message;
        console.error('Error fetching note:', error);
      }
    );
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  errorMessage: string = '';

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe(
      (data: Note[]) => {
        console.log('Received notes:', data);
        this.notes = data;

        this.notes.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      },
      (error) => {
        this.errorMessage = 'Error fetching notes: ' + error.message;
        console.error('Error fetching notes:', error);
      }
    );
  }

  viewNoteById(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/notes/view', id]);
    } else {
      console.error('Note ID is undefined, cannot navigate.');
    }
  }
}

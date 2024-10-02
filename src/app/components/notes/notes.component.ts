// src/app/components/notes/notes.component.ts
import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  errorMessage: string = '';

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(
      (data: Note[]) => {
        console.log('Received notes:', data); // Log received data
        this.notes = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching notes: ' + error.message;
        console.error('Error fetching notes:', error);
      }
    );
  }
}

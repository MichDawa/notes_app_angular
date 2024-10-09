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

  createNewNote(): void {
    const newNote = {
      title: '',
      content: ''
    };
  
    this.noteService.createNote(newNote).subscribe(
      (response) => {
        console.log('New note created:', response);
        
        const newNoteId = response.note.id;
  
        if (newNoteId) {
          this.noteService.getNoteById(newNoteId).subscribe(
            (note) => {
              console.log('Note fetched after creation:', note);

              this.router.navigate(['/notes/view', newNoteId]).then((navigated) => {
                if (navigated) {
                  console.log(`Successfully navigated to /notes/view/${newNoteId}`);
                } else {
                  console.error(`Navigation to /notes/view/${newNoteId} failed.`);
                }
              });
            },

            (error) => {
              console.error('Error fetching the new note:', error);
            }
          );

        } else {
          console.error('New note ID not found in response.');
        }
      },
      
      (error) => {
        console.error('Error creating new note:', error);
      }
    );
  }
  
  
}

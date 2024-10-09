import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';
import { HttpClient } from '@angular/common/http';

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
    private noteService: NoteService,
    private router: Router,
    private http: HttpClient,
  ) { }

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

  saveNote(): void {
    if (!this.note) {
      console.error('Note is null. Cannot save.');
      return;
    }

    const noteData = {
      title: this.note.title,
      content: this.note.content
    };

    this.http.put(`/api/notes/edit/${this.note.id}`, noteData).subscribe(
      (response) => {
        console.log('Note updated successfully', response);
        this.router.navigate([`/notes/view/${this.note?.id}`]).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Error updating note:', error);
      }
    );
  }

  deleteNote(): void {
    if (!this.note) {
      console.error('Note is null. Cannot delete.');
      return;
    }

    const confirmation = window.confirm('Are you sure you want to delete this note?');

    if (confirmation) {
      this.http.delete(`/api/notes/delete/${this.note.id}`).subscribe(
        (response) => {
          console.log('Note deleted successfully', response);
          this.router.navigate(['/notes']);
        },
        (error) => {
          console.error('Error deleting note:', error);
        }
      );
    } else {
      console.log('Note deletion canceled.');
    }
  }



}

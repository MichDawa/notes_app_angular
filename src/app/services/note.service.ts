import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:8080/notes'; // Adjust this URL to your backend endpoint

  constructor(private http: HttpClient) {}

  // Fetch all notes
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  // Fetch a single note by ID
  getNote(id: number): Observable<Note> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Note>(url);
  }

  // Add a new note
  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  // Update an existing note
  updateNote(note: Note): Observable<Note> {
    const url = `${this.apiUrl}/${note.id}`;
    return this.http.put<Note>(url, note);
  }

  // Delete a note by ID
  deleteNote(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

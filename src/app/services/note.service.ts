import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = '/api/notes';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<{ notes: Note[] }>(this.apiUrl).pipe(
      map(response => response.notes)
    );
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<{ note: Note }>(`${this.apiUrl}/view/${id}`).pipe(
      map(response => response.note)
    );
  }


}

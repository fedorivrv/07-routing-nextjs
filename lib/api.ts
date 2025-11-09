import type { Note, CreateNotePayload } from '../types/note';
import axios from 'axios';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface GetNoteResponse {
  notes: Note[];
  page?: number;
  perPage?: number;
  totalPages: number;
  totalNotes?: number;
}

// === Отримати нотатки ===
export async function fetchNotes(
  query?: string,
  page: number = 1,
  perPage: number = 10
): Promise<GetNoteResponse> {
  const params: Record<string, any> = { page, perPage };
  if (query) params.search = query;

  const response = await api.get<GetNoteResponse>('/notes', { params });
  return response.data;
}

// === Видалити нотатку ===
export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

// === Створити нотатку ===
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>('/notes', payload);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}
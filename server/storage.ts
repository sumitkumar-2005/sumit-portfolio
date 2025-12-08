import { type ContactFormData } from "@shared/schema";
import { randomUUID } from "crypto";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
}

export interface IStorage {
  saveContactSubmission(data: ContactFormData): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.contactSubmissions = new Map();
  }

  async saveContactSubmission(data: ContactFormData): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      id,
      name: data.name,
      email: data.email,
      message: data.message,
      submittedAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
    );
  }
}

export const storage = new MemStorage();

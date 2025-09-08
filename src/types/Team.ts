export type Team = {
  id: string;
  name: string;
  participants: Participant[];
  color: string;
  position: { x: number; y: number };
  createdAt: Date;
};

export type Specialization = 'IA' | 'Cyber' | 'WEB';

export interface Participant {
  id: string;
  name: string;
  email: string;
  discordId: string;
  specialization: Specialization;
};

export type TeamFormData = {
  name: string;
  participants: Participant[];
};
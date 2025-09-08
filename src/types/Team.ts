export type Team = {
  id: string;
  name: string;
  participants: Participant[];
  color: string;
  position: { x: number; y: number };
  createdAt: Date;
};

export type Participant = {
  id: string;
  name: string;
  discordId: string;
};

export type TeamFormData = {
  name: string;
  participants: Participant[];
};
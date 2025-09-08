import React, { useState } from 'react';
import type { Team, TeamFormData, Participant, Specialization } from '../types/Team';
import './TeamForm.css';

interface TeamFormProps {
  onTeamCreate: (team: Omit<Team, 'id'>) => void
}

const TeamForm: React.FC<TeamFormProps> = ({ onTeamCreate }) => {
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    participants: []
  });
  
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '', discordId: '', specialization: 'IA' as Specialization });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teamColors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#06b6d4', '#ef4444', '#84cc16'
  ];

  const getSpecializationColor = (specialization: Specialization): string => {
    switch (specialization) {
      case 'IA': return '#3b82f6'; // Blue
      case 'Cyber': return '#ef4444'; // Red
      case 'WEB': return '#10b981'; // Green
      default: return '#6b7280'; // Gray
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleParticipantChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewParticipant(prev => ({ ...prev, [name]: value }));
  };

  const addParticipant = () => {
    if (newParticipant.name && newParticipant.email && newParticipant.discordId) {
      const participant: Participant = {
        id: Date.now().toString(),
        ...newParticipant
      };
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, participant]
      }));
      setNewParticipant({ name: '', email: '', discordId: '', specialization: 'IA' as Specialization });
    }
  };

  const removeParticipant = (id: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== id)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newTeam = {
      name: formData.name,
      participants: formData.participants,
      color: teamColors[Math.floor(Math.random() * teamColors.length)],
      position: { x: 0, y: 0 },
      createdAt: new Date()
    };

    await onTeamCreate(newTeam);
    setFormData({ name: '', participants: [] });
    setIsSubmitting(false);
  };

  return (
    <div className="team-form">
      <div className="form-header">
        <h2>Create New Team</h2>
        <p>Build your dream team with the right people</p>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Team Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter team name"
            required
          />
        </div>



        <div className="participants-section">
          <h3>Team Members</h3>
          
          <div className="add-participant">
            <div className="participant-inputs">
              <input
                type="text"
                name="name"
                value={newParticipant.name}
                onChange={handleParticipantChange}
                placeholder="Member name"
              />
              <input
                type="email"
                name="email"
                value={newParticipant.email}
                onChange={handleParticipantChange}
                placeholder="Email address"
              />
              <input
                type="text"
                name="discordId"
                value={newParticipant.discordId}
                onChange={handleParticipantChange}
                placeholder="Discord ID"
              />
              <select
                name="specialization"
                value={newParticipant.specialization}
                onChange={handleParticipantChange}
                className="specialization-select"
              >
                <option value="IA">IA</option>
                <option value="Cyber">Cyber</option>
                <option value="WEB">WEB</option>
              </select>
            </div>
            <button type="button" onClick={addParticipant} className="add-btn">
              Add Member
            </button>
          </div>

          <div className="participants-list">
            {formData.participants.map((participant) => (
              <div key={participant.id} className="participant-item">
                <div className="participant-info">
                  <span className="participant-name">{participant.name}</span>
                  <span className="participant-email">{participant.email}</span>
                  <span className="participant-discord">{participant.discordId}</span>
                  <span 
                    className="participant-specialization"
                    style={{ color: getSpecializationColor(participant.specialization) }}
                  >
                    {participant.specialization}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeParticipant(participant.id)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Creating Team...
            </>
          ) : (
            'Create Team'
          )}
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
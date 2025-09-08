import React from 'react';
import type { Team, Specialization } from '../types/Team';
import './TeamCanvas.css';

interface TeamCanvasProps {
  teams: Team[];
  selectedTeam: Team | null;
  onTeamSelect: (team: Team) => void;
}

const TeamCanvas: React.FC<TeamCanvasProps> = ({ teams, selectedTeam, onTeamSelect }) => {
  const getSpecializationColor = (specialization: Specialization): string => {
    switch (specialization) {
      case 'IA': return '#3b82f6'; // Blue
      case 'Cyber': return '#ef4444'; // Red
      case 'WEB': return '#10b981'; // Green
      default: return '#6b7280'; // Gray
    }
  };
  return (
    <div className="team-canvas">
      <div className="canvas-header">
        <h2>Octopouce Participants</h2>
        <p>Visualize and manage your teams</p>
      </div>
      
      <div className="canvas-area">
        {teams.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h3>No teams yet</h3>
            <p>Create your first team to get started</p>
          </div>
        ) : (
          <div className="teams-grid">
            {teams.map((team) => (
              <div
                key={team.id}
                className={`team-card ${selectedTeam?.id === team.id ? 'selected' : ''}`}
                onClick={() => onTeamSelect(team)}
                style={{
                  '--team-color': team.color,
                } as React.CSSProperties}
              >
                <div className="team-info">
                  <h3>{team.name}</h3>
                  <div className="team-stats">
                    <span>{team.participants.length} members</span>
                  </div>
                </div>
                <div className="team-members">
                  {team.participants.slice(0, 3).map((participant) => (
                    <div 
                      key={participant.id} 
                      className="member-avatar"
                      style={{
                        background: `linear-gradient(135deg, ${getSpecializationColor(participant.specialization)}, ${getSpecializationColor(participant.specialization)}dd)`,
                        borderColor: getSpecializationColor(participant.specialization)
                      }}
                    >
                      <span>{participant.name.charAt(0)}</span>
                      <div className="member-tooltip">
                        <strong>{participant.name}</strong>
                        <span>{participant.email}</span>
                        <span>{participant.discordId}</span>
                        <span style={{ color: getSpecializationColor(participant.specialization) }}>{participant.specialization}</span>
                      </div>
                    </div>
                  ))}
                  {team.participants.length > 3 && (
                    <div className="member-avatar more">
                      <span>+{team.participants.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCanvas;
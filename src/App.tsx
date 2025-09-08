import { useState, useEffect } from 'react'
import './App.css'
import TeamCanvas from './components/TeamCanvas'
import TeamForm from './components/TeamForm'
import type { Team } from './types/Team'
import { db } from './firebase'
import { collection, addDoc, onSnapshot } from 'firebase/firestore'

function App() {
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFormPanelOpen, setIsFormPanelOpen] = useState(false)

  // Load teams from Firestore on component mount
  useEffect(() => {
    const teamsCollection = collection(db, 'teams')
    
    const unsubscribe = onSnapshot(teamsCollection, 
      (snapshot) => {
        const teamsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        })) as Team[]
        
        setTeams(teamsData)
        setLoading(false)
      },
      (error) => {
        console.error('Erreur lors de la récupération des équipes:', error)
        setLoading(false)
        // En cas d'erreur, on utilise les données locales
        setTeams([])
      }
    )

    return () => unsubscribe()
  }, [])

  const handleTeamCreate = async (team: Omit<Team, 'id'>) => {
    try {
      await addDoc(collection(db, 'teams'), {
        ...team,
        createdAt: new Date()
      })
      console.log('Équipe créée avec succès!')
      // Close the form panel after successful creation
      setIsFormPanelOpen(false)
    } catch (error) {
      console.error('Erreur lors de la création de l\'équipe:', error)
      alert('Erreur lors de la création de l\'équipe. Veuillez réessayer.')
    }
  }

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team)
  }

  if (loading) {
    return (
      <div className="app">
        <main className="main-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des équipes...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <main className="main-content">
        {/* Toggle Button */}
        <button 
          className="toggle-form-btn"
          onClick={() => setIsFormPanelOpen(!isFormPanelOpen)}
        >
          {isFormPanelOpen ? '✕' : '+'} {isFormPanelOpen ? 'Close' : 'Create Team'}
        </button>

        {/* Full Screen Teams View */}
        <div className="teams-fullscreen">
          <TeamCanvas 
            teams={teams} 
            selectedTeam={selectedTeam}
            onTeamSelect={handleTeamSelect}
          />
        </div>

        {/* Sliding Form Panel */}
        <div className={`form-panel-overlay ${isFormPanelOpen ? 'open' : ''}`}>
          <div className="form-panel-content">
            <TeamForm onTeamCreate={handleTeamCreate} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

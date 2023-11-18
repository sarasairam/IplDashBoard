// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {team} = props
  const {name, teamImageUrl, id} = team

  return (
    <Link to={`/team-matches/${id}`} className="link-list-card">
      <li className="team-card-card">
        <img src={teamImageUrl} alt={name} className="team-card-img" />
        <p className="team-name"> {name}</p>
      </li>
    </Link>
  )
}

export default TeamCard

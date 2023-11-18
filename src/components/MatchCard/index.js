import './index.css'

const MatchCard = props => {
  const {recentMatchesData} = props

  const classNames = recentMatchesData.matchStatus === 'Won' ? 'won' : 'lose'

  return (
    <li className="match-card-list">
      <img
        src={recentMatchesData.competingTeamLogo}
        alt={`"competing team ${recentMatchesData.competingTeam}`}
        className="opponent-logo"
      />
      <p> {recentMatchesData.competingTeam}</p>
      <p> {recentMatchesData.result}</p>
      <p className={classNames}> {recentMatchesData.matchStatus}</p>
    </li>
  )
}

export default MatchCard

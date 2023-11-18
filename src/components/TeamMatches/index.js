import Loader from 'react-loader-spinner'

import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import Chart from '../Chart'

import './index.css'

class TeamMatches extends Component {
  state = {teamObj: {}, isLoading: true, bgColor: '', newDataObj: {}}

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updateData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }

    const updateLatestDetails = this.updateLatestDetails(updateData)
    this.changeBgColor(id)
    const updateRecentMatches = this.updateRecentMatches(updateData)

    const newData = {
      latestMatchDetails: updateLatestDetails,
      recentMatches: updateRecentMatches,
    }

    this.setState({teamObj: updateData, newDataObj: newData, isLoading: false})
  }

  updateRecentMatches = updateData => {
    const result = updateData.recentMatches.map(each => ({
      id: each.id,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      date: each.date,
      firstInnings: each.first_innings,
      manOfTheMatch: each.man_of_the_match,
      matchStatus: each.match_status,
      result: each.result,
      secondInnings: each.second_innings,
      umpires: each.umpires,
      venue: each.venue,
    }))

    return result
  }

  updateLatestDetails = updateData => {
    const updateLatestDetails = {
      competingTeam: updateData.latestMatchDetails.competing_team,
      competingTeamLogo: updateData.latestMatchDetails.competing_team_logo,
      date: updateData.latestMatchDetails.date,
      firstInnings: updateData.latestMatchDetails.first_innings,
      manOfTheMatch: updateData.latestMatchDetails.man_of_the_match,
      matchStatus: updateData.latestMatchDetails.match_status,
      result: updateData.latestMatchDetails.result,
      secondInnings: updateData.latestMatchDetails.second_innings,
      umpires: updateData.latestMatchDetails.umpires,
      venue: updateData.latestMatchDetails.venue,
    }

    return updateLatestDetails
  }

  changeBgColor = id => {
    switch (id) {
      case 'RCB':
        this.setState({bgColor: 'rcb'})
        break
      case 'KKR':
        this.setState({bgColor: 'kkr'})
        break
      case 'KXP':
        this.setState({bgColor: 'kxp'})
        break
      case 'CSK':
        this.setState({bgColor: 'csk'})
        break
      case 'RR':
        this.setState({bgColor: 'rr'})
        break
      case 'MI':
        this.setState({bgColor: 'mi'})
        break
      case 'SH':
        this.setState({bgColor: 'srh'})
        break
      case 'DC':
        this.setState({bgColor: 'dc'})
        break

      default:
        break
    }
  }

  back = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {teamObj, isLoading, bgColor, newDataObj} = this.state
    const {latestMatchDetails, recentMatches} = newDataObj
    const {teamBannerUrl} = teamObj
    return (
      <div>
        {isLoading ? (
          <div className="loader">
            <Loader
              testid="loader"
              type="Oval"
              color="#1e293b"
              height={50}
              width={50}
            />
          </div>
        ) : (
          <div className={`selected-team-bg-container ${bgColor}`}>
            <img src={teamBannerUrl} alt="team banner" className="banner-img" />
            <Chart data1={recentMatches} />
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="match-card-container">
              {recentMatches.map(each => (
                <MatchCard recentMatchesData={each} key={each.id} />
              ))}
            </ul>
            <button type="button" className="button-back" onClick={this.back}>
              Back
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches

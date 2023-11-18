import Loader from 'react-loader-spinner'

import {Component} from 'react'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamData: [], isLoading: true}

  componentDidMount() {
    this.getIPLTeams()
  }

  getIPLTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updateData = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))

    this.setState({teamData: updateData, isLoading: false})
  }

  render() {
    const {teamData, isLoading} = this.state

    return (
      <div className="home-bg-container">
        {isLoading ? (
          <div>
            <Loader
              testid="loader"
              type="Oval"
              color="#ffffff"
              height={50}
              width={50}
            />{' '}
          </div>
        ) : (
          <div className="home-bg-container">
            <div className="header-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="ipl-logo"
              />
              <h1 className="ipl-heading"> IPL DASHBOARD</h1>
            </div>
            <ul className="team-card-container">
              {teamData.map(eachTeam => (
                <TeamCard team={eachTeam} key={eachTeam.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home

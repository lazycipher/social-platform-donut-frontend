import React, { Component } from 'react'
import { Timeline } from "antd";
import "antd/dist/antd.css";
import './activity.scss'
import Navigation from '../dashboard/navigation/navigation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { getEventById } from '../../actions/eventAction'
// import { getProjectById } from '../../actions/projectAction'
import { getPostById } from '../../actions/postAction'
import LeftNav from '../dashboard/Community/LeftNav'
import OrgProfile from '../dashboard/Community/components/OrgProfile';
import OrgPermission from '../dashboard/Community/components/OrgPermission';
import OrgSettings from '../dashboard/Community/components/OrgSettings';
import OrgAuth from '../dashboard/Community/components/OrgAuth';
import OrgMaintenance from '../dashboard/Community/components/OrgMaintenance';
import Users from './Users';
import ActivityTimeline from './ActivityTimeline';
import { Accordion, Button } from 'react-bootstrap'; 

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: true,
      option: {
        profile: false,
        settings: false,
        permission: false,
        authentication: false,
        maintenance: false,
        activity: true,
        details: true,
        sidebarOpen: false
      },
    };
  }

  changeOption = (name) => {
    const keys = Object.keys(this.state.option);
    let item = keys.filter((k) => k === name);
    console.log("changeOption items ", item);
    this.setState({ option: { profile: false } });
    this.setState({ option: { [name]: true } });
    this.setState({ view: name });
  };

  componentDidMount() {
    this.setState({ view: 'details' })
  }

  render() {
    const { view } = this.state
    const toggleSidebar = () => {
      this.setState((prevState) => {
        return {
          sidebarOpen: !prevState.sidebarOpen
        }
      })
    }
    return (
      <>
        <Navigation orgSettings={this.state.org} user={this.props.user} />
            <div className="main_section">
              <div className="left_nav">
                <p className="header_text">Community Settings</p>
                <div className="left_nav_container">
                  <LeftNav
                      data={{
                        option: this.state.option,
                        changeOption: this.changeOption.bind(this),
                      }}
                    />
                </div>
                <Accordion className="activity_accordion">
                    <Accordion.Toggle onClick={() => toggleSidebar()} variant="outline-secondary" size="sm" as={Button} eventKey="0">
                      {this.state.sidebarOpen?"Close Menu":"Setting Menu"}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <LeftNav
                        data={{
                          option: this.state.option,
                          changeOption: this.changeOption.bind(this),
                        }}
                      />
                    </Accordion.Collapse>
                </Accordion>
              </div>
              <div className="right_section">
                {view === "profile" ? <OrgProfile /> : null}
                {view === "permission" ? <OrgPermission /> : null}
                {view === "settings" ? <OrgSettings /> : null}
                {view === "authentication" ? <OrgAuth /> : null}
                {view === "maintenance" ? <OrgMaintenance /> : null}
                {view === "activity" ? (
                  <Users
                    handleOption={{ changeOption: this.changeOption.bind(this) }}
                  />
                ) : null}
                {view === "details" ? (
                  <ActivityTimeline />
                ) : null}
              </div>
            </div>
      </>
    );
  }
}
// map state to props 
const mapStateToProps = (state) => ({
  event: state.event,
  project: state.project,
  post: state.post
})

export default connect(mapStateToProps, { getEventById, getPostById })(withRouter(Activity));

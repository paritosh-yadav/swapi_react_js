import React, { Component } from 'react';
import { connect } from 'react-redux'

//Actions
import { searchPlanet } from '../../redux/landing-page/actions';

//Presentational View
import LandingPageView from './LandingPageView.js';

class LandingPageContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchedCity: null
		}
	}

	setSearchTerm = async (event) => {
		if (event.target.value !== '') {
			await this.props.searchPlanet(event.target.value);
			this.setState({
				searchedCity: this.props.searchedPlanet && this.props.searchedPlanet.results
			})
		} else {
			this.setState({
				searchedCity: null
			})
		}
		
	}
	render() {
		return (
			<LandingPageView
				setSearchTerm={this.setSearchTerm.bind(this)}
				searchedCity={this.state.searchedCity}
				isFetching={this.props.isFetching} />
		)
	}
}

function mapStateToProps(state) {
	return {
		searchedPlanet: state.landingPage.searchedPlanet,
		isFetching: state.landingPage.isFetching,
		error: state.landingPage.error,
	}
}

function mapDispatchToProps(dispatch) {
	return ({
		searchPlanet: (item) => dispatch(searchPlanet(item)),
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContainer)
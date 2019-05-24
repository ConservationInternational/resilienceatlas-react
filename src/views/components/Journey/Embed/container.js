import { connect } from 'react-redux';
import {
  load as loadLayer,
  setActives as setActiveLayer,
} from '@modules/layers';
import JourneyEmbed from './component';

const mapStateToProps = state => ({
  countries: state.countries.byISO,
  countryName: state.journey.title,
  activeLayers: [],
});

const mapDispatchToProps = {
  loadLayer,
  setActiveLayer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JourneyEmbed);

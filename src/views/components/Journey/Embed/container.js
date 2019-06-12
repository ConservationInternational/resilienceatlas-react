import { connect } from 'react-redux';
import { setActives as setActiveLayer } from '@modules/layers';
import JourneyEmbed from './component';

const mapStateToProps = state => ({
  countries: state.countries.byISO,
  countryName: state.journey.title,
});
const mapDispatchToProps = {
  setActiveLayer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JourneyEmbed);

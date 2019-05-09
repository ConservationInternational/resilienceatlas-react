import { connect } from 'react-redux';

import { setDrawing, setGeojson } from '@modules/map';
import { load as loadCountries, makeCountries } from '@modules/countries';

import { AnalysisPanel } from './AnalysisPanel.component';

const mapStateToProps = state => {
  const getCountries = makeCountries();
  return {
    countries: getCountries(state),
    drawing: state.map.drawing,
    geojson: state.map.geojson,
  };
};

const mapDispatchToProps = {
  loadCountries,
  setDrawing,
  setGeojson,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalysisPanel);

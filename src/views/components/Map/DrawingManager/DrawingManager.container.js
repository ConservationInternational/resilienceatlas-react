import { connect } from 'react-redux';

import { setGeojson, setDrawing } from '@modules/map';

import { DrawingManager } from './DrawingManager.component';

const mapStateToProps = state => ({
  drawing: state.map.drawing,
  geojson: state.map.geojson,
});

const mapDispatchToProps = {
  setGeojson,
  setDrawing,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawingManager);

import { connect } from 'react-redux';
import {
  load as loadModels,
  select,
  toggleIndicator,
  updateIndicator,
  makeAll as makeAllModels,
  makeSelected as makeSelectedModel,
} from '@modules/predictive_models';

import PredictiveModels from './PredictiveModels.component';

const makeMapStateToProps = () => {
  const getAllModels = makeAllModels();
  const getSelectedModel = makeSelectedModel();

  const mapStateToProps = state => ({
    models: getAllModels(state),
    model: getSelectedModel(state),
    selectedModel: state.predictive_models.selected,
    modelsLoading: state.predictive_models.loading,
    modelsLoaded: state.predictive_models.loaded,
  });

  return mapStateToProps;
};

const mapDispatchToProps = {
  loadModels,
  select,
  toggleIndicator,
  updateIndicator,
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(PredictiveModels);

import React, { useReducer, useCallback } from 'react';
import moment from 'moment';
import numeral from 'numeral';

const LayerPopup = ({
  onChangeInteractiveLayer,
  data: { layers, layersInteraction, layersInteractionSelected },
  popup,
}) => {
  const [state, dispatch] = useReducer((state, action) => {}, {
    interaction: {},
    loading: true,
  });

  const formatValue = useCallback((item, data) => {
    if (item.type === 'date' && item.format && data) {
      data = moment(data).format(item.format);
    } else if (item.type === 'number' && item.format && data) {
      data = numeral(data).format(item.format);
    }

    function removeHtmlTags(str) {
      if (!str || !str.toString) return str;
      return str.toString().replace(/<\/?[a-z]+>/gi, '');
    }

    return `${item.prefix || ''}${removeHtmlTags(data) || '-'}${item.suffix ||
      ''}`;
  }, []);

  const layer = layersInteractionSelected
    ? layers.find(l => l.id === layersInteractionSelected)
    : layers[0];

  if (!layer) {
    popup.remove();
    return null;
  }
  // Get interactionConfig
  const { interactionConfig: output } = layer;

  // Get data from props or state
  const interaction = layersInteraction[layer.id] || {};
  const interactionState = state.interaction[layer.id] || {};

  return (
    <div className="c-map-popup">
      <header className="popup-header">
        <select
          className="popup-header-select"
          name="interactionLayers"
          value={layer.id}
          onChange={e => onChangeInteractiveLayer(e.target.value)}
        >
          {layers.map(o => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </header>

      <div className="popup-content">
        {(interaction.data || interactionState.data) && (
          <table className="popup-table">
            <tbody>
              {output.map(outputItem => {
                const { column } = outputItem;
                const columnArray = column.split('.');
                const value = columnArray.reduce(
                  (acc, c) => acc[c],
                  interaction.data || interactionState.data,
                );
                return (
                  <tr
                    className="dc"
                    key={outputItem.property || outputItem.column}
                  >
                    <td className="dt">
                      {outputItem.property || outputItem.column}:
                    </td>
                    <td className="dd">{formatValue(outputItem, value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* {state.loading &&
          (!interaction.data || !interactionState.data) &&
          interactionConfig.config &&
          interactionConfig.config.url && (
            <div className="popup-loader">
              <Spinner isLoading className="-tiny -inline -pink-color" />
            </div>
          )} */}

        {/* {!state.loading &&
          (!interaction.data && !interactionState.data) &&
          interactionConfig.config &&
          interactionConfig.config.url &&
          'No data available'}

        {!interaction.data &&
          !interactionState.data &&
          (!interactionConfig.config || !interactionConfig.config.url) &&
          'No data available'} */}
      </div>
    </div>
  );
};

export default LayerPopup;

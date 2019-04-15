import React from 'react';
import cx from 'classnames';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { sortBy } from '@utilities';
import LegendItem from './LegendItem';

const byOrder = sortBy('order');

const Legend = ({ activeLayers }) => (
  <DragDropContext>
    <Droppable droppableId="legendLayers">
      {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => (
        <div className={cx('m-legend', { 'is-changing': isDraggingOver })}>
          <div className="wrapper">
            <header className="m-legend__header">
              <h2 className="title">Legend</h2>
              <span className="btn-minimize" />
            </header>

            <div className="m-legend__content">
              <ul {...droppableProps} ref={innerRef} className="m-legend__list">
                {activeLayers
                  .sort(byOrder)
                  .map(
                    (
                      { id, name, notAvailableByZoom, opacity, legend },
                      index,
                    ) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {({
                          draggableProps,
                          dragHandleProps,
                          innerRef: dragRef,
                        }) => (
                          <li
                            className={cx('drag-items', {
                              'is-not-available-by-zoom': notAvailableByZoom,
                            })}
                            data-id={id}
                            ref={dragRef}
                            {...draggableProps}
                            {...dragHandleProps}
                          >
                            <header>
                              <span className="draggable-icon">
                                <svg>
                                  <use xlinkHref="#icon-drag" />
                                </svg>
                              </span>

                              <h3>{name}</h3>

                              {id !== -1 && (
                                <div className="actions">
                                  <button
                                    type="button"
                                    className="btn-remove"
                                    data-layer-id={id}
                                  >
                                    <svg className="icon">
                                      <use xlinkHref="#icon-remove" />
                                    </svg>
                                  </button>

                                  <button
                                    type="button"
                                    className={cx(
                                      'btn-action',
                                      'btn-visibility',
                                      // TODO: clear out what class was applied
                                      // no_opacity
                                    )}
                                    data-id={id}
                                  >
                                    <svg>
                                      <use
                                        xlinkHref={`#icon-visibility${
                                          opacity === 0 ? 'off' : 'on'
                                        }`}
                                      />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </header>
                            <LegendItem legend={legend} />
                          </li>
                        )}
                      </Draggable>
                    ),
                  )}
                {placeholder}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

export default Legend;

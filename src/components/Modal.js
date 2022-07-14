import React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import BatteryDetails from "./BatteryDetails";
import { Spinner } from "react-bootstrap";
import Chart from "./Chart";

function Modal({ isShowing, hide, modalData, loading }) {

    return (
        isShowing ? createPortal(
            <React.Fragment>
                <div className="modal-overlay">
                    <div className="modal-wrapper">
                        <div className="modal"></div>
                        <div className="modal-header">
                            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* conditional rendering to avoid displaying empty graphs and battery level when data is not available */}
                        {loading &&
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        }
                        {!loading && <span>Looking at data for {modalData.id}</span>}
                        {modalData && !loading && <BatteryDetails battery={modalData} />}
                        <br></br>
                        {modalData.stateOfCharge && <p>scroll and hover on the graph for details</p>}
                        {modalData.stateOfCharge && <Chart stamp={modalData.measurements} stateOfCharge={modalData.stateOfCharge} /* deadline={modalData.endOfLifeDate} */ />}
                        {!modalData.stateOfCharge && !loading && <p>state of charge data is not available</p>}
                    </div>
                </div>
            </React.Fragment>, document.body
        ) : null
    )
}

export default Modal;
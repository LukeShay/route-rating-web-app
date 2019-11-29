import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

function InlineHiddenInput(props) {
    return (
        <>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor={props.id}>
                    {props.label}
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="password"
                        id={props.id}
                        value={props.value}
                        onChange={props.handleChange}
                    />
                    <small id={props.id + "Help"} class="form-text text-danger">
                        {props.helpText}
                    </small>
                </div>
            </div>
        </>
    );
}

InlineHiddenInput.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    helpText: PropTypes.string
};

InlineHiddenInput.defaultProps = {
    helpText: ""
};

export default InlineHiddenInput;

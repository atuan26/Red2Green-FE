import React from "react";
import { CgPlayListAdd, CgRemove } from "react-icons/cg";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
// import { deleteEvent } from "../../../../redux/actions/eventAction";
import {
    ColorEventInput,
    EventInput,
    EventTextArea,
    FieldDatePicker,
    SubmitButton,
} from "../EventModal/EventInput";

let AirdropForm = (props) => {
    const { error, handleSubmit, submitting } =
        props;

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-lg px-6 overflow-y-scroll max-h-[80vh] pb-4 space-y-3 lg:px-8 sm:pb-6 xl:pb-8"
        >
            <Field
                name="name"
                type="text"
                component={EventInput}
                label="Name"
                autoFocus={true}
                noWaring={true}
            />
            <Field
                name="link"
                type="text"
                component={EventInput}
                label="Link"
            />
            <div className="flex justify-between items-center !mt-0">
                <Field
                    component={FieldDatePicker}
                    name="start"
                    placeholder="YYYY/MM/DD"
                    label="Time: "
                />
                <div className="text-gray-400 ml-2">-</div>
                <Field
                    component={FieldDatePicker}
                    name="end"
                    placeholder="YYYY/MM/DD"
                />
                <div className="text-gray-400 ml-2">-</div>
                <Field
                    component={FieldDatePicker}
                    name="result"
                    placeholder="YYYY/MM/DD"
                />
            </div>
            <Field
                name="description"
                type="text"
                component={EventTextArea}
                label="Description"
            />
            <FieldArray name="task_list" component={renderTasks} />
            {error && <strong>{error}</strong>}
            <SubmitButton
                disabled={submitting}
            />
        </form>
    );
};

const validate = (values) => {
    const errors = {};
    const requiredFields = ["title", "start"];
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = "*Required";
        }
    });
    return errors;
};

const renderTasks = ({ fields, meta: { touched, error } }) => (
    <ul>
        <li>
            <button type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                onClick={() => fields.push({})}>
                <CgPlayListAdd className="inline w-4 h-4 mr-2" />Add task
            </button>
            {touched && error && <span>{error}</span>}
        </li>
        {fields.map((task, index) =>
            <li key={index}>
                <button
                    type="button"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={() => fields.remove(index)}
                >
                    <CgRemove className="inline w-4 h-4 " />
                </button>
                <h4>Task #{index + 1}</h4>
                <Field
                    name={`${task}.title`}
                    type="text"
                    component={EventInput}
                    label="Title" />
                <Field
                    name={`${task}.detail`}
                    type="text"
                    component={EventTextArea}
                    label="Detail" />
            </li>
        )}
    </ul>
)
AirdropForm = reduxForm({
    form: "airdropForm",
    validate,
})(AirdropForm);

const mapDispatchtoProps = (dispatch) => ({
    // deleteEvent: (initialValues) => dispatch(deleteEvent(initialValues)),
});

export default connect(null, mapDispatchtoProps)(AirdropForm);

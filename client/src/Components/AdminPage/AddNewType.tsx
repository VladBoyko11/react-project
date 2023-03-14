import React from "react";
import {Button, Form} from "react-bootstrap";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormControl";
import {connect, ConnectedProps} from "react-redux";
import {addType} from "../../redux/adminPageSlice";
import { RootState } from "../../redux/store";
import redirectToSomePage from "../common/RedirectToSomePage";
import { Type } from "../../redux/types";

const AddNewType: React.FC<AddNewTypeProps> = (props) => {

    const submitForm: FormSubmitHandler = (formData: {type?: string}) => {
        if(formData.type) props.addType({name: formData.type})
        redirectToSomePage('/admin-page', {replace: true})
    }
    return (
        <AddNewTypeReduxForm onSubmit={submitForm}/>
    )
}

const AddNewTypeForm: React.FC<InjectedFormProps<Type>> = ({handleSubmit}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label htmlFor="type">New type</Form.Label>
                <Field id="type" placeholder='type' name='type' component={Input}/>
            </Form.Group>
            <Button className={'btn-warning'} type='submit'>Create</Button>
        </Form>
    )
}

const AddNewTypeReduxForm = reduxForm({
    form: 'addNewType'
})(AddNewTypeForm)

const mapStateToProps = (state: RootState) => ({
    type: state.adminPage.type
})

const connector = connect(mapStateToProps, { addType })
type ReduxPropsType = ConnectedProps<typeof connector>
type AddNewTypeProps = ReduxPropsType

export default connector(AddNewType)
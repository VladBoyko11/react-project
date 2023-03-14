import React from "react";
import {Button, Form} from "react-bootstrap";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormControl";
import {connect, ConnectedProps} from "react-redux";
import {addBrand} from '../../redux/adminPageSlice';
import redirectToSomePage from '../common/RedirectToSomePage'
import { Brand } from "../../redux/types";

const AddNewBrand: React.FC<AddNewBrandPropsType> = (props) => {

    const submitForm: FormSubmitHandler = (formData: {brandName?: string}) => {
        props.addBrand({name: formData.brandName})
        redirectToSomePage('/admin-page', {replace: true})
    }
    return (
        <AddNewBrandReduxForm onSubmit={submitForm}/>
    )
}

const AddNewBrandForm: React.FC<InjectedFormProps<Brand>> = ({handleSubmit}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label htmlFor="brand">New brand</Form.Label>
                <Field id="brand" placeholder='brand' name='brand' component={Input}/>
            </Form.Group>
            <Button className={'btn-warning'} type='submit'>Create</Button>
        </Form>
    )
}

const AddNewBrandReduxForm = reduxForm({
    form: 'addNewBrand'
})(AddNewBrandForm)

const connector = connect(() => ({}), { addBrand })
type ReduxPropsType = ConnectedProps<typeof connector>
type AddNewBrandPropsType = ReduxPropsType

export default connector(AddNewBrand)
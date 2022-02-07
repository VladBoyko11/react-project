import React from "react";
import style from "./Messages.module.css";
import Person from "./Person.jsx";
import Message from "./Message";
import { Field, reduxForm } from "redux-form";
import {required} from '../../../Validators/Validators'
import {TextareaMessage} from '../../common/FormsControl/FormsControl'

const addMessagesForm = (props) => {
  return (
    <form className={style.formForNewMessage} onSubmit={props.handleSubmit}>
      <Field name='newMessageBody' component={TextareaMessage} placeholder='your message ...' className={style.inputMessage} validate={[required]}/>
      <button className={style.submitButton} >Send</button>
    </form>
  );
};

const AddMessagesReduxForm = reduxForm({ form: 'addMessagesForm' })(addMessagesForm)

const Messages = (props) => {

  let sendMessage = (values) => {
    props.sendMessage(values.newMessageBody)
  };

  return (
    <div className={style.messages}>
      <div className={style.persons}>
        {props.arrNames.map((el) => (
          <Person name={el.name} id={el.id} />
        ))}
      </div>
      <div className={style.messageFromUser}>
        {props.arrMessages.map((el) => (
          <Message message={el} />
        ))}
        <AddMessagesReduxForm onSubmit={sendMessage}/>
      </div>
    </div>
  );
};

export default Messages;

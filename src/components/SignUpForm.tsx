import React, { FormEvent, useState } from 'react';
import { defaultSignUpFormType, UserType } from '../api/types';
import { messages } from '../data/constants';

const defaultFormState: defaultSignUpFormType = {
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  contact: '',
};

interface SignUpFormProps {
  setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ setNewUser }) => {
  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState('');
  const [spinnerShow, setSpinnerShow] = useState(false);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).every((x) => x !== '');

    if (!isEmpty) {
      alert(messages.form.required);
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      alert(messages.form.pass_not_matched);
      return;
    }

    if (formData.password.length < 6) {
      alert(messages.form.pass_length_error);
      return;
    }

    var pattern = new RegExp(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
    );
    if (!pattern.test(formData.contact) || formData.contact.length !== 12) {
      alert(messages.form.not_valid_number);
      return;
    }

    // registerNewUserApiRequest(
    //   formData,
    //   setErrors,
    //   props.setNewUser,
    //   setSpinnerShow
    // );
  };

  return <div>SignUpForm</div>;
};

export default SignUpForm;

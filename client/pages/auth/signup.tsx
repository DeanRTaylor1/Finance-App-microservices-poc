import { Fragment } from 'react';
import SignupForm from '../../Components/Form/Signup-Form';
import Stripes from '../../Components/Fragments/Stripes';

const Signup: React.FC = () => {
  return (
    <Fragment>
      <SignupForm />
      <Stripes />
    </Fragment>
  );
};

export default Signup;

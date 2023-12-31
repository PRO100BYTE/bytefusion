import { FacebookOutlined, GithubFilled, GoogleOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithFacebook, signInWithGithub, signInWithGoogle } from '@/redux/actions/authActions';

const SocialLogin = ({ isLoading }) => {
  const dispatch = useDispatch();

  const onSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  const onSignInWithGithub = () => {
    dispatch(signInWithGithub());
  };

  return (
    <div className="auth-provider">
      <button
        className="button auth-provider-button provider-google"
        disabled={isLoading}
        onClick={onSignInWithGoogle}
        type="button"
      >
        <GoogleOutlined />
        Войти через Google
      </button>
      <button
        className="button auth-provider-button provider-github"
        disabled={isLoading}
        onClick={onSignInWithGithub}
        type="button"
      >
        <GithubFilled />
        Войти через GitHub
      </button>
    </div>
  );
};

SocialLogin.propTypes = {
  isLoading: PropType.bool.isRequired
};

export default SocialLogin;

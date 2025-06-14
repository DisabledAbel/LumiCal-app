
import React from 'react';

interface SocialAuthButtonProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const SocialAuthButton = ({ loading, setLoading }: SocialAuthButtonProps) => {
  // GitHub authentication removed - component now returns null
  return null;
};

export default SocialAuthButton;

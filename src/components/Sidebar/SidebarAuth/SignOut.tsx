import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import React from 'react';
import { AuthView } from '../../../../pages/auth';
import ButtonRound from '../../ButtonRound';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';
export const SignOut = ({
  setView,
}: {
  setView: React.Dispatch<React.SetStateAction<AuthView>>;
}) => {
  const content = useLocalizedContent();
  const supabase = useSupabaseClient();
  return (
    <>
      <ButtonRound
        onClick={e => {
          e?.preventDefault();
          supabase.auth.signOut().then(({ error }) => {
            if (error) throw error;
            Router.push('/');
            setView('signin');
          });
        }}
      >
        {content.sidebar.profile.logoutAction}
      </ButtonRound>
    </>
  );
};

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import React from 'react';
import { AuthView } from '../../../../pages/auth';
import ButtonRound from '../../ButtonRound';
export const SignOut = ({
  setView,
}: {
  setView: React.Dispatch<React.SetStateAction<AuthView>>;
}) => {
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
        Ausloggen
      </ButtonRound>
    </>
  );
};

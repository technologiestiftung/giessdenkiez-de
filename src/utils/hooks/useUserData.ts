import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { OptionalUserDataType, UserDataType } from '../../common/interfaces';
import { getUserData } from '../requests/getUserData';
import { useSupabaseUser } from './useSupabaseUser';
import { useSupabaseToken } from './useSupabaseToken';
import { useSupabaseProfile } from './useSupabaseProfile';
type UserDataError = Error | null;

const fetchUserData: QueryFunction<OptionalUserDataType | undefined> = async ({
  queryKey,
}) => {
  const [, token, userId] = queryKey;
  if (
    !token ||
    !userId ||
    typeof token !== 'string' ||
    typeof userId !== 'string'
  )
    return undefined;
  const userData = await getUserData({ userId, token });
  return userData;
};

export const useUserData = (): {
  userData: UserDataType | undefined;
  error: Error | null;
  invalidate: () => void;
} => {
  const user = useSupabaseUser();
  const profile = useSupabaseProfile();

  const token = useSupabaseToken();
  const queryClient = useQueryClient();

  const queryParams = ['userData', token, user?.id];
  const { data: partialUserData, error } = useQuery<
    OptionalUserDataType | undefined,
    UserDataError
  >(queryParams, fetchUserData, { staleTime: Infinity });

  let userData: UserDataType | undefined;
  if (user && partialUserData && profile) {
{

Create a trigger function that updates the table trees_watered whenever the table column username on the table
profiles changes.

CREATE TABLE "public"."profiles" (
    "id" uuid NOT NULL,
    "username" text
);
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS trees_watered_id_seq;

-- Table Definition
CREATE TABLE "public"."trees_watered" (
    "time" text,
    "uuid" text,
    "amount" numeric NOT NULL CHECK (amount > (0)::numeric),
    "timestamp" timestamptz NOT NULL,
    "username" text,
    "id" int4 NOT NULL DEFAULT nextval('trees_watered_id_seq'::regclass),
    "tree_id" text NOT NULL,
    CONSTRAINT "fk_trees_watered_trees" FOREIGN KEY ("tree_id") REFERENCES "public"."trees"("id"),
    PRIMARY KEY ("id")
);
}    userData = {
      id: user.id,
      email: user.email!,
      isVerified: user.email_confirmed_at !== undefined ? true : false,
      username: profile.username!,
      ...partialUserData,
    };
  }
  return {
    userData,
    error,
    invalidate: () => queryClient.invalidateQueries(queryParams),
  };
};

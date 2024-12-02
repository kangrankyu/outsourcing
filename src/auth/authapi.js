import supabase from '../utils/supabaseClient';
export const signUpNewUser = async (formdata) => {
  const { email, password, nickname } = formdata;
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  console.log('signup: ', { data, error });
};

export const signInUser = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  console.log('signin: ', { data, error });
};

export const signOutUser = async () => {
  const { data, error } = await supabase.auth.signOut();
  console.log('signout: ', { data, error });
  setUser(null);
};

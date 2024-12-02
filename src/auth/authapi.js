import supabase from '../utils/supabaseClient';
export const signUpNewUser = async (formdata) => {
  const { email, password } = formdata;
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  return data;
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
export const tablenickname = async (formdata, user) => {
  const { nickname } = formdata;
  const userid = user.id;

  const { data, error } = await supabase.from('users').insert([{ nickname }]).select();
  console.log(error);
  return data;
};

export const signUpNewUser = async (e) => {
  e.preventDefault();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    nickname
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
  console.log('signout: ', { data, error }); // data는 딱히 필요없을 듯
  setUser(null);
};

import supabase from '../utils/supabaseClient';
export const signUpNewUser = async (formdata) => {
  const { email, password, nickname } = formdata;
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  console.log('signup: ', { data, error });
};


export const signInUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("이메일과 비밀번호를 모두 입력해야 합니다.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("로그인 실패:", error.message);
    return { error };
  }

  console.log("로그인 성공:", data);
  return { data };
};

// export const signInUser = async () => {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password
//   });
//   console.log('signin: ', { data, error });
// };

export const signOutUser = async () => {
  const { data, error } = await supabase.auth.signOut();
  console.log('signout: ', { data, error });
  setUser(null);
};

import supabase from '../utils/supabaseClient';
export const signUpNewUser = async (formdata) => {
  const { email, password } = formdata;
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  return data;
};

export const signInUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('이메일과 비밀번호를 모두 입력해야 합니다.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
   localStorage.setItem('user', JSON.stringify(data));
  if (error) {
    console.error('로그인 실패:', error.message);
    return { error };
  }

  console.log('로그인 성공:', data);
  
  return { data };
};

export const signOutUser = async () => {
  const { data, error } = await supabase.auth.signOut();
  console.log('signout: ', { data, error });
  setUser(null);
};

export const tablenickname = async (formdata, userId) => {
  const { nickname } = formdata;
  console.log(userId);
  console.log(nickname);
  const { data, error } = await supabase
    .from('users')
    .insert([{ nickname, id: userId }])
    .select();
  console.log(error);
  return data;
};

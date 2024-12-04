import { supabase } from '../supabase/supabaseClient';

export const fetchRestaurants = async () => {
  const { data, error } = await supabase.from('restaurants').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

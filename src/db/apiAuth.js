import supabase, { supabaseUrl } from "./supabase";

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);

  return data;
};

export const signup = async ({ name, email, password, profile_pic }) => {
  //handle profile pic upload logic
  const fileName = `dp-${name}-${Math.random()}`;
  const { error: picError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (picError) {
    throw new Error(picError.message);
  }

  //signup logic
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    //to add any extra details we use options
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  console.log("SIGNUPPPP", data.user);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  if (!data.session) {
    return null;
  }

  return data?.session?.user;
};

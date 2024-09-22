import supabase from "./supabase";

export const getUrlsClicks = async (urlIds) => {
  // get all the clicks for the urls for a user
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

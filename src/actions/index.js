import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  // use lodash to get and array of unique ids
  // this way the bare minimum of requests will be made
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  // fetch the users with the ids present in the array
  userIds.forEach(id => dispatch(fetchUser(id)));

  // alternate syntax for fetching unique users using the chain() method
  // _.chain(getState(posts))
  // .map("userId")
  // .uniq()
  // .forEach(id => dispatch(fetchUser(id)))
  // .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// fetch each user only once using memoize() method
/* const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
}); 
*/

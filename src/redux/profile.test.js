import { addPost, profileReducer } from "./profile-reducer";

let state = {
    posts: [
      { post: "my post 1", id: "1" },
      { post: "my post 2", id: "2" },
      { post: "my post 3", id: "3" },
      { post: "my post 4", id: "4" },
      { post: "my post 5", id: "5" },
    ]
  };

it('add new post', () =>{
    let action = addPost('hello')
    let newTest = profileReducer(state, action)
    expect(newTest.posts.length).toBe(6)
});

it('expect some post in state', () =>{
    expect(state.posts[2].post).toBe('my post 3')
});
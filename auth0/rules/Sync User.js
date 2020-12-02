// TODO: pull and deploy these value from environment variables

function (user, context, callback) {
  const admin_secret = "secret";
  const url = "https://brandywine.ngrok.io/v1/graphql";
  const query = `mutation($user_id:String!, $email:String!, $name:String!, $picture:String!, $locale: String!){
  insert_users_one(
    object:{
      email: $email
      id:$user_id
      name: $name
      picture:$picture
      locale: $locale
    }
    on_conflict:{
      constraint:users_pkey
      update_columns:[name, picture, locale]
    }
  )
  {
    email
    id
    name
    picture
  }
  }`;
  // locale doesn't exist on GitHub's user
  console.log('sync user');
  const {user_id,name,picture,email, locale = 'en'} = user;
  console.log(user);

  const variables = { user_id, name, email, picture, locale };
  request.post({
      url: url,
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
      body: JSON.stringify({
        query: query,
        variables: variables
      })
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}
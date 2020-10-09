insert into users (username, password)
values (${username}, ${password})
returning id, username, profile_pic;
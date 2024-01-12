# React Admin notes

Based on https://marmelab.com/react-admin/NextJs.html#data-provider

- Needs auth via user login (currently uses service role key)
  - Should pass the user session key and check if the user has the admin flag

There is also

- https://github.com/marmelab/ra-supabase but there is no clear example how to use it with next
- Our Next version is getting old
- I had to install npm install @raphiniert/ra-data-postgrest with --force because a peer dep history is pretty old

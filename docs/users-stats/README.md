# Collection Stats and Managing Users

These are some [Deno](https://deno.land/) scripts to use the management api. Currently it gets a token and makes a call to the users endpoint to retrieve data and identify unverified emails.


## Prerequisites

- Rename `env.example` to `.env` and fill in the blanks. Needs an application on auth0.com with access to the users management.
- install [Deno](https://deno.land/)
- install [Velociraptor](https://github.com/umbopepato/velociraptor)

Current used Deno and Velociraptor versions are:

```bash
$ deno --version
> deno 1.0.2
> v8 8.4.300
> typescript 3.9.2


$ vr help
> Version: v1.0.0-beta.8
```

## Usage

Get a token

```bash
vr run token
```

run the script

```bash
vr run start
```

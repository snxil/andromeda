<!--
  ANDROMEDA, BY GITHUB.COM/COSMOSCODES
  How to interact with andromeda!
-->

<div align="center">
  <h1 align="center">andromeda commands</h1>
  <strong>Everything you need for interacting with and utilising andromeda!</strong>
  <p align="center">Andromeda aims to provide a full suite of commands to make your life easier, more convenient, and a little bit more fun! Read on if you'd like to know how to interact with andromeda, and take advantage of andromeda's tag system!<p>
</div>

## Commands
Below are some commands that you may use to interact with andromeda! Commands always start with the command prefix chosen in your `config.json`!

- `colour <colour hex>`: View a preview of a colour from a hex code!
  - **Alias:** `color`
- `embed <colour hex> <description>`: Create an embed! If a valid colour is not specified, andromeda will use the colour specified in your `config.json`!
- `help`: Opens this page in your browser!
  - Use `help dev` to access command help in the `dev` branch!
- `ping`: Check andromeda's ping and response time!
- `quote <guild ID> <channel name> <message ID>`: Quote a message! Channel names are required for cross-channel and cross-guild quoting, but are not necessary if the message exists in the current channel!
- `playing <game>`: Set your current "playing" status! Leave blank to reset!
  - **Alias:** `setgame`
- `streaming <game>`: Set your current "streaming" status! Same as above, except purple is pretty!
  - **Alias:** `setstreaming`
- `status <status>`: Change your status with a command!
  - Status must be either `online`, `idle`, `dnd` (Do Not Disturb), or `invisible`!
  - **Alias:** `setstatus`
- `time`: Show people your system time!
  - **Alias:** `thetime`
- `uptime`: Check how long andromeda's been running!

### Guild Management
- `emoji`: Create, delete, and list emojis in your guild!
  - `create <name> <link>`: Create a guild emoji with the specified name and image!
  - `delete <name>`: Delete the guild emoji with the specified name!
  - `list`: List all of the custom emojis in a guild!
  - **Requires emoji managing permissions**
  - **Alias:** `emojis`
- `kick <mention/ID> <reason>`: Kick a member from a guild! Reason is optional!
  - **Requires kick permissions**
- `ban <mention/ID> <days to clear> <reason>`: Ban a member from a guild! Days and reason are optional!
  - **Requires ban permissions**
- `unban <ID>`: Unban a member from a guild with an ID!
  - **Requires ban permissions**
- `bans`: Lists bans in a guild!
  - **Requires ban permissions**

## Tags
Andromeda has a simple tag system that allows you to quickly and easily paste text, as well as list and manage your tags! Tags and tag commands always start with the tag prefix chosen in your `config.json`!
- `(tag)`: Use a tag!
- `create <name> <content>`: Create a new tag!
- `delete <name>`: Delete a tag!
- `update <name> <content>`: Update an existing tag with new content!
- `info <name>`: Get some info on a tag!
- `list`: List your tags, if applicable!

`$MESSAGE$` in your tags will be replaced with the message content following the tag!

I'm always working on more features to make andromeda the best it can be, and I'm definitely always welcome to suggestions if there's something you really want to see!

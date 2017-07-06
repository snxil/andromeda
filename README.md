<!--
  ANDROMEDA, BY GITHUB.COM/COSMOSCODES
  Everything you need to know about andromeda!
-->

<div align="center">
  <h1 align="center">andromeda</h1>
  <strong>A powerful, feature-packed, and customisable Discord selfbot written in the Discord.js library</strong>
  <p align="center">Easy to set up and quick to launch! (As long as you have the right software!)</p>
</div>

> Whilst using a selfbot, ensure you exercise precaution. Although unsuported by Discord, a blind eye is turned to selfbots as long as:
> - They *do not* respond to other people's messages; it's a selfbot, it should only ever respond to you
> - They *do not* "invite scrape", or automatically join guilds from invite links
> - They *do not* abuse the API and follow Discord's Terms of Service at all times  

Selfbots are cool and can do some pretty neat things, although they should only ever be used to make *your* life easier, not anyone else's! Now that that's out of the way, let's set up this selfbot!

- [Why andromeda?](#why-andromeda)
- [Required programs](#required-programs)
- [Downloading files](#downloading-files)
- [Configuring andromeda](#configuring-andromeda)
- [Starting andromeda](#starting-andromeda)
- [TL;DR](#tldr)
- [Commands](../master/COMMANDS.md)
- [License](../master/LICENSE)

## Why andromeda?
Selfbots can do some pretty neat things, may allow for functionality absent from Discord's vanilla client, and often can simply make your life a little easier! With *many* selfbots available out in the wild, andromeda aspires to be the only selfbot you'll need, with a stable, functional, and useful feature set!

- Complete tags system!
- Quote messages with ease!
- Set a custom game for some added flair!
  - Alternatively, randomly get a new game between set intervals!
- Easily create custom embeds!
- Quickly and easily previews colours from a hex code!

## Setup

### Required programs
Sadly this puppy can't run without a little help before-hand! Before we continue, make sure that you have [**git**](https://git-scm.com) and the latest version of [**Node JS**](https://nodejs.org) installed, as we can't run the selfbot without them! Done? Great, we can continue!

### Downloading Files
Now that we have everything we need installed, let's download the selfbot; you may wish to download the ZIP, but if you're more of a console kinda guy, feel free to use `git clone https://github.com/cosmoscodes/andromeda`! With andromeda now downloaded, navigate to the directory in your console and type `npm i` to install all the packages required for andromeda to run! Everything's installed? Awesome, let's start configuring!

### Configuring andromeda
With all of our files downloaded, there should be a folder called `config`! In here should be a `defaultconfig.json` and a `games.json`, but we'll be taking a look at the `defaultconfig.json` first! There should be a few options for configuring andromeda in here, and I'll outline what each of them mean below!
- `commandPrefix`: This is the prefix you will use to interact with andromeda!
- `tagPrefix`: This prefix is used for interactions with andromeda's tag system!
- `embeds`: Options for configuring andromeda's embed responses!
  - `useRoleColor`: True or false! If *true*, andromeda will use the colour of your highest role in embeds when applicable!
  - `defaultColor`: This is the colour andromeda will use for embeds if `useRoleColor` is false or when a role colour does not apply! Format this as a hex, but use `0x` instead of a hash!
- `games`: Options for considering auto game switching!
  - `rotateGame`: True or false! If *true*, andromeda will set a random game from `games.json`!  
  Ignore the rest of the `games` options if you set this to false!
  - `rotateGameTime`: If the above is *true*, this is the interval between each new game (in milliseconds)!
  - `requireOnline`: If the client status has to be *online* for a new game to be set!
  - `streaming`: True or false! If *true*, the game will be set with a `streaming` status!
- `defaultStatus`: This is the status andromeda will automatically apply! `online`, `idle`, `dnd` (Do Not Disturb), or `invisible` (self explanatory)!
- `token`: Finally, this is your Discord token that will allow andromeda to log in~!

You may have noticed a few options for rotating your playing game status! If you've set the aforementioned to true, navigate to `games.json` and add some games you want to add to the list! If you follow the format of the pre-existing file, you should have no issues!

### Starting andromeda
Everything is set up, awesome! Configuring andromeda is cool and all, but we want to actually *run* it, don't we? Navigate to andromeda's main directory in your console and type `node index.js` to start up the bot, and if everything has been configured correctly, andromeda should be up and running! When you first start andromeda, the `defaultconfig.json` file we configured earlier will be automatically renamed to `config.json`, although you may rename this yourself if you so desire!

> On first starting the bot, andromeda will automatically create any databases that may be missing. Don't worry about anything that may pop up, this is normal, and you'll be able to use andromeda just fine!

### TL;DR
I get it, a huge wall of text may be scary, uninteresting, or just simply a huge turn-off; don't worry, dear reader, I've got your back! If you'd rather cut the chit-chat and jump straight into setting up and using andromeda, follow the basic steps below!

1. Ensure you have [**git**](https://git-scm.com) and [**Node JS**](https://nodejs.org) installed, andromeda can't work without them!
2. Download andromeda, either by downloading the zip above or using `git clone https://github.com/cosmoscodes/andromeda`!
3. Navigate to andromeda's directory in your console and type `npm i` to install all of the packages necessary for andromeda to run!
4. Now that everything's installed, edit `defaultconfig.json` (and maybe `games.json`) to your hearts content
5. Run andromeda with `node index.js`! `defaultconfig.json` *should* be renamed to `config.json` automatically, but if it doesn't work or you'd rather do it yourself, feel free to!

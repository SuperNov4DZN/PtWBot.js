# PtW Helper bot
Bot oficial do grupo PtW Discord (WIP) **W I P  A S  F U K  B O Y**

## Building localy
* (Windows Only) Download the ffmpeg binaries from http://ffmpeg.org/download.html then put it on the root directory of this project
* Run npm install
* Go to config.json.example, remove "example" from the end of the filename then change the fields.

## Using containers
The dockerfile provided is already "ready to go", you can easily generate the image required to run the bot anywhere.

## TODO
* Add "Try catch" -> Setrole.js line : 18
* Update the old hardcoded roles to the new standard (dm command)
* Change the key from "user ID" to "guild ID" -> mute.js line : 52 & unmute.js line : 26
* Verify if the guild is empty -> (mutes.json) bot.js line : 30 & unmute.js line : 26
* Add a command to customize the current prefix for each server

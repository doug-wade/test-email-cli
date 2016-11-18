# test-email-cli

test-email-cli is a cli application for generating and managing test email
addresses.

## Installation

To install, make sure you have node installed

    sudo apt-get install nodejs

Then install test-email-cli globally

    npm install -g test-email-cli

Before using it the first time, make sure to initialize the configuration

    test-email init

## Use

To generate a new test email address, run `test-email generate`

    test-email generate
    > doug+2016-11-17-1@dougwade.io

You may also want to pipe the results to your clipboard directly
with [xclip](https://linux.die.net/man/1/xclip) (on Linux) or
[pbcopy](http://ss64.com/osx/pbcopy.html)

    test-email generate | xclip
    # doug+2016-11-17-2@dougwade.io is now on the clipboard

You can search old generated test emails with `test-email find`

    test-email find
    > doug+2016-11-17-1@dougwade.io

You can limit searches by `date` and by ticket number, if provided when
generated

    test-email generate
    > doug+2016-11-17-1@dougwade.io
    test-email generate --ticket=1
    > doug+2016-11-17-2@dougwade.io
    test-email find --date=2016-11-17 --ticket=1
    > doug+2016-11-17-2@dougwade.io

To get help, or to get the list of all sub commands, simply run `help`

    test-email help

`help` is also used to discover how to use sub commands

    test-email help init
    > Set up configuration for example. Runs interactive commands to walk you through setting up config.
    > Usage:
    >     test-email init
    >     # output from test-email

To update test-email, use update

    test-email update

Though if you haven't updated in a while, test-email-cli will remind you 😀

Before you run any commands, you'll need to set up some config by running `init`

    test-email init

Then follow the prompts

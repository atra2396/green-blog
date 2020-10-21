---
layout: blog
title: Don't Object Orient-ify Dockerfiles
date: 2020-10-21T13:21:52.044Z
---
Many of us work with object-oriented languages every day. The OO paradigm has all sorts of principles and pillars which take a lifetime to master. Many of us, myself very much included, can have trouble when trying to learn a new language that's of a different paradigm. Even closely-related languages which still fall into the "imperative" bucket can feel esoteric, and sometimes even archaic.

<br>

Then there are the declarative languages.

<br>

Most people know of the "declarative" paradigm because of its most popular sub-paradigm: functional programming. I still think functional languages are like black magic. I've tried a few times to pick up Haskell, but have yet to have my "Aha!" moment. Even F#, which is supposed to be easier to pick up, still gave me more trouble than I'm willing to admit as I tried to grind through some HackerRank problems with it a while back. The style of these declarative programs is quite different from what I'm used to. It's nothing like what I use in my everyday coding at work, nor is it like any class that I ever took in college. Many of the OO principles I've internalized over the years just don't fit, and can actually be detrimental.

<br>

While not quite "functional" programming, Dockerfiles certainly fall into the "declarative" bucket. I have always wondered if that is why despite their simple syntax, people like me initially struggle when learning how to write and organize them. The paradigm is different, and so the frame of mind necessary to write an efficient Dockerfile is different. When I was working on containerizing my very first application, it went something like this:

<br>

I've got an application which is composed of a few different pieces. Their specific functions aren't all that important, but generally this is what they did:

\- an API which is used to access processed data and check the status of certain jobs. It doesn't do much on its own, mostly just handling authentication and then passing the work to another component or putting a message into a queue

\- a component which accepts data, transforms it a bit, and submits it to one of several 3rd party APIs for processing

\- a component which periodically checks the 3rd party APIs for results
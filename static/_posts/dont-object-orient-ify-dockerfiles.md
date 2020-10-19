---
layout: blog
title: Don't Object Orient-ify Dockerfiles
date: 2020-10-19T23:01:18.159Z
---
Many of us work with object-oriented languages every day. The OO paradigm has all sorts of principles and pillars which take a lifetime to master. Many of us, myself very much included, can have trouble when trying to learn a new language that's of a different paradigm. Even closely-related languages which still fall into the "imperative" bucket can feel esoteric, and sometimes even archaic.

<br>

Then there are the declarative languages.

<br>

Most people know of the "declarative" paradigm because of its most popular sub-paradigm: functional programming. I still think functional languages are like black magic. I've tried a few times to pick up Haskell, but have yet to have my "Aha!" moment. Even F#, which is supposed to be easier to pick up, still gave me more trouble than I'm willing to admit as I tried to grind through some HackerRank problems with it a while back. The style of these declarative programs is quite different from what I'm used to. It's nothing like what I use in my everyday coding at work, nor is it like any class that I ever took in college. Many of the OO principles I've internalized over the years just don't fit, and can actually be detrimental.

<br>

While not quite "functional" programming, Dockerfiles certainly fall into the "declarative" bucket. I have always wondered if that is why despite their simple syntax, people like me initially struggle when learning how to write and organize them. The paradigm is different, and so the frame of mind necessary to write an efficient Dockerfile is different.

Some of this might be common sense to those who are more seasoned at writing Dockerfiles, but I personally did not find the best practices intuitive when I first started. 
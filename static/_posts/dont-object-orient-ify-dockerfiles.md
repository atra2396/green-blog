---
layout: blog
title: Don't Object Orient-ify Dockerfiles
date: 2020-11-15T15:38:52.294Z
---
# Intuition is not a perfect guide

Many of us work with object-oriented languages every day. The OO paradigm has all sorts of principles and pillars which take a lifetime to master. Many of us, myself very much included, can have trouble when trying to learn a new language that's of a different paradigm. Even closely-related languages which still fall into the "imperative" bucket can feel esoteric, and sometimes even archaic.

<br>

Then there are the declarative languages.

<br>

Most people know of the "declarative" paradigm because of its most popular sub-paradigm: functional programming. I still think functional languages are like black magic. I've tried a few times to pick up Haskell, but have yet to have my "Aha!" moment. Even F#, which is supposed to be easier to pick up, still gave me more trouble than I'm willing to admit as I tried to grind through some HackerRank problems with it a while back. The style of these declarative programs is quite different from what I'm used to. It's nothing like what I use in my everyday coding at work, nor is it like any class that I ever took in college. Many of the OO principles I've internalized over the years just don't fit, and can actually be detrimental.

<br>

While not quite "functional" programming, Dockerfiles certainly fall into the "declarative" bucket. I have always wondered if that is why despite their simple syntax, people like me initially struggle when learning how to write and organize them. The paradigm is different, and so the frame of mind necessary to write an efficient Dockerfile is different. When I was working on containerizing my very first application, it went something like this:

<br>

I've got an application which is composed of a few different pieces, written in .NET Core. Their specific functions aren't all that important, but generally this is what they did:

<br>

* an API which is used to access processed data and check the status of certain jobs. It doesn't do much on its own, mostly just handling authentication and then passing the work to another component or putting a message into a queue
* a component which accepts data, transforms it a bit, and submits it to one of several 3rd party APIs for processing
* a component which periodically checks the 3rd party APIs for results

<br>

An important point to note is that these components are not microservices. This is *one* application, with several deployable components.

<br>

These services are all in the same Solution, so there are a few bits of code that they all share. I wanted to avoid having to compile the same pieces more than once, and was unsure of the best way to go about it. From what I understood, multi-stage builds were the way to go. But how would I organize the stages? Every example Dockerfile I had seen online up to this point was only ever building one component, so it made sense for all the stages to live in the same file. My case seemed different though - I had *multiple* components, and therefore putting them all in the same Dockerfile was not a good separation of concerns. Docker images are kind of like classes, right? All I would need to do is create a Dockerfile that built the entire solution, then I could have an individual Dockerfile for each component which would simply "inherit" from the build image and copy over the pieces that it needed to function. In the end, this is what the folder structure looked like:

![Example folder structure: a solution with 3 sub-folders, each of which with its own Dockerfile, as well as on at the top-level](/uploads/old-dockerfile-structure.png)

<br>

As I said earlier, all three of these components comprise a single application. I wasn't planning on _ever_ needing to run them individually. I wrote up a simple docker-compose.yml file which looked like this:

```
version: "3.1"
services:
  build_image:
    build:
      context: .
      dockerfile: .
  api:
    build:
      context: .
      dockerfile: ./API
    depends_on:
      - build_image
  submissions:
    build:
      context: .
      dockerfile: ./DataSubmitter
    depends_on:
      - build_image
  results:
    build:
      context: .
      dockerfile: ./ResultsProcessor
    depends_on:
      - build_image
```

<br>

This worked. Compose would run the build image first, and then the three real components would proceed to build in some random order, each simply copying out of the "build" image only the artifacts that it needed and declare whatever entrypoint it needed to run. This resulted in four images instead of three every time docker-compose ran, instead of just the three I cared about. ```docker-compose up``` would start all four images, but the "build" image would immediately exit since it wasn't given a command to run. To my inexperienced mind, this _seemed_ like a sort of design pattern; I likened it to a space shuttle, which jettisons some of its parts after they've served their purpose. This mirrored the way that I'd been taught to organize my OO code, with different files for each module which were linked together by [whatever polymorphic practice is currently in fashion](https://www.thoughtworks.com/insights/blog/composition-vs-inheritance-how-choose). And most importantly, it worked. 

<br>

I came to learn that this is not the recommended way of structuring Docker builds. A couple of months ago I ended up refactoring the build. Instead of having four different files for three components, I condensed all of them into a single file which lives at the root of the repository. As I have come to learn, Dockerfiles should be treated like blueprints more than traditional OO code - they are useful not only for their function, but also for the documentation. They completely encapsulate what it takes to build the application; having to hunt around the repository to find all of the pieces is not only poor practice for the functionality (as it results in weird inert images which serve no purpose and extra layers hanging around and taking up precious storage), but also for those trying to figure out how all the components fit together into a single application. My intuition misled me; the object oriented principles that had come to serve as the foundation of much of my programming knowledge yielded a worse result than what probably would have come about if I had never used an object oriented language before.

<br>

## tl;dr
The point of all this can be generalized: don't assume that your intuition will always lead you to the path of righteousness. Object oriented thinking will get you far when working with an object oriented language, but do not assume that the principles are transferable. Next time you pick up a new language or technology, especially if it's not imperative, don't be afraid to toss some of your existing knowledge out the window. Try to approach new problems with an unbiased mind, and let the problem at hand lead you back to your experience if it really is the answer.
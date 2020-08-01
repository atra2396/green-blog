---
layout: blog
title: "Mistakes I've Made: Unit Test Abstraction"
date: 2020-07-12T23:22:51.563Z
---
I am a big proponent of unit testing. I've done a lot of it, too - I'd haven't kept count but I would guess that I've written somewhere between five and seven hundred tests in the past two years. There is no shortage of blog posts of people singing the praises of unit testing and how it's lowered the number of bugs that reach production, sped up development of new features, and made refactoring code a lot less painful. I have personally experienced all of these benefits which is why I continue to write tests and encourage my coworkers to do so as well. While sharing the personally-observed benefits of unit testing may be enough to convince someone that it's a worthwhile effort, it only shows half of the story. Test coverage doesn't happen over night, nor do good unit tests. Unit testing is a skill, one that is honed over time just like any other: by making mistakes. And boy have I made plenty of them.  
<br>

A quote from Dijkstra:
> The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise.

"_Absolutely_ precise". What a strong phrase! I don't think anyone would argue with this statement. Complexity (and therefore vague intent) can certainly be a by-product of abstraction, but it is not the purpose. The goal of an abstraction is to remove the concrete details about a specific pattern or function from places where they do not need to be known. All code has abstractions (well, maybe not some of my programming assignments from high school...), and I would go as far as to say that no developer would deny their importance. Abstractions play a key role in allowing new features to be added to a product without disrupting any existing features, or allowing components like persistence layers or frontends to be swapped in and out with ease, and so on. But what about unit tests? The ease at which they can be created certainly depends on the level of abstraction within them, but what about the test code itself? Do you ever think about the precision of those abstractions?  
<br>

For the past year, I've been working on a piece of software that automates a lot of the work a veterinarian needs to do in order to send 




- Why do I call these "mistakes"?
  - History: labs, testing from the beginning
  - Working out of the repo to this day
  - Highly praised from the outside, but sometimes a nightmare on the inside.
  - _Very_ low defect rate, only one bug report after a massive refactor
  - Time to develop new integrations is beginning to rise, not fall

- Other notes
  - The most simple kind of "flexibility" is not to enforce any "flexibility" at all 

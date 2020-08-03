---
layout: blog
title: "Mistakes I've Made: Unit Test Abstraction"
date: 2020-07-12T23:22:51.563Z
---
I am a big proponent of unit testing. I've done a lot of it, too - I haven't kept count but I would guess that I've written somewhere between five and seven hundred tests in the past two years. There is no shortage of blog posts of people singing the praises of unit testing and how it's lowered the number of bugs that reach production, sped up development of new features, and made refactoring code a lot less painful. I have personally experienced all of these benefits which is why I continue to write tests and encourage my coworkers to do so as well. While sharing the personally-observed benefits of unit testing may be enough to convince someone that it's a worthwhile effort, it only shows half of the story. Test coverage doesn't happen over night, nor do good unit tests. Unit testing is a skill, one that is honed over time just like any other: by making mistakes. And boy have I made plenty of them.

<br>

A quote from Dijkstra:

> The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise.

"*Absolutely* precise". What a strong phrase! I don't think anyone would argue with this statement. Complexity (and therefore vague intent) can certainly be a by-product of abstraction, but it is not the purpose. The goal of an abstraction is to remove the concrete details about a specific pattern or function from places where they do not need to be known. All code has abstractions (well, maybe not some of my programming assignments from high school...), and I would go as far as to say that no developer would deny their importance. Abstractions play a key role in allowing new features to be added to a product without disrupting any existing features, or allowing components like persistence layers or frontends to be swapped in and out with ease, and so on. But what about unit tests? The ease at which they can be created certainly depends on the level of abstraction within them, but what about the test code itself? Do you ever think about the precision of those abstractions?

<br>

For the past year, I've been working on a piece of software that automates a lot of the work a veterinarian needs to do to tests from diagnostic laboratories. When I originally started, the project had virtually no unit tests. Tests were hard to write since there was no dependency injection or mock-able interfaces; there was tons of business logic in impure static functions and references to concrete objects. Worse, business requirements had changed, and now there was a need for us to tease out a public-facing API from this soup. My team was tasked with refactoring this codebase to fulfill the new need. As we were imagining the ideal end-state of this to-be refactored system, we unanimously agreed that this would be a fantastic opportunity to greatly increase our test coverage. And boy, did we write some tests.

<br>

We wrote a lot of tests. This software had been in production for several years in its previous form, and we had a good handle on how it all fit together, how integrations with new laboratories typically went. We re-abstracted a bunch of the lab integration boilerplate to be OCP-compliant, so that we wouldn't need to modify code used by other integrations to add a new integration. We extracted interfaces from as many of the formerly-concrete classes as we could. :unit testing framework, inheritance, benefits. Success?:

:Success. Low defects. Team praised for unit-testing efforts. Great pride in work, for as while...:

:Onboarding new member. Finds a bug in unit tests. Takes a week to fix. Team member leaves with poor opinion of unit testing. Next integration deviates from the norm. More time to write/fix tests than to do the actual work.:

:What went wrong? Too much abstraction. Not enough care in designing unit tests. Too much fear of duplication. Could be done well, but ours is only okay. Does the job, still low defects, but definitely not ideal.:
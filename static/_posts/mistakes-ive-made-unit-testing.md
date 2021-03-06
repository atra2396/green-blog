---
layout: blog
title: "Mistakes I've Made: Unit Test Abstraction"
date: 2020-08-20T01:57:50.309Z
---
I am a big proponent of unit testing. I've done a lot of it, too - I haven't kept count but I would guess that I've written somewhere between five and seven hundred tests in the past two years. There are no shortage of blog posts of people singing the praises of unit testing and how it's lowered the number of bugs that reach production, sped up development of new features, and made refactoring code a lot less painful. I have personally experienced all of these benefits which is why I continue to write tests and encourage my coworkers to do so as well. While sharing the personally-observed benefits of unit testing may be enough to convince someone that it's a worthwhile effort, it only shows half of the story. Test coverage doesn't happen over night, nor do good unit tests. Unit testing is a skill, one that is honed over time just like any other: by making mistakes. And boy have I made plenty of them.

<br>

A quote from Dijkstra:

> The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise.

"*Absolutely* precise". What a strong phrase! I don't think anyone would argue with this statement. Complexity (and therefore vague intent) can certainly be a by-product of abstraction, but it is not the purpose. The goal of an abstraction is to remove the concrete details about a specific pattern or function from places where they do not need to be known. All code has abstractions (well, maybe not some of my programming assignments from high school...), and I would go as far as to say that no developer would deny their importance. Abstractions play a key role in allowing new features to be added to a product without disrupting any existing features, or allowing components like persistence layers or frontends to be swapped in and out with ease, and so on. But what about unit tests? The ease at which they can be created certainly depends on the level of abstraction within them, but what about the test code itself? Do you ever think about the precision of those abstractions?

<br>

## It was the best of times...

For the past year, I've been working on a piece of software that automates a lot of the work a veterinarian needs to do to tests from diagnostic laboratories. When I originally started, the project had virtually no unit tests. Tests were hard to write since there was no dependency injection or mock-able interfaces; there was tons of business logic in impure static functions and references to concrete objects. Worse, business requirements had changed, and now there was a need for us to tease out a public-facing API from this soup. My team was tasked with refactoring this codebase to fulfill the new need. As we were imagining the ideal end-state of this to-be refactored system, we unanimously agreed that this would be a fantastic opportunity to greatly increase our test coverage. And boy, did we write some tests.

<br>

We wrote a lot of tests. This software had been in production for several years in its previous form, and we had a good handle on how it all fit together, how integrations with new laboratories typically went. We refactored a bunch of the lab integration boilerplate to be OCP-compliant, so that we wouldn't need to modify code used by other integrations to add a new integration. We extracted interfaces from as many of the formerly-concrete classes as we could. And because we had a good handle on all of the requirements, we were able to set up some nice abstractions around a lot of our unit tests that made adding tests for a new integration take only a few minutes. To this day, most of the tests we have are within this "mini-framework" that we created, which is actually quite simple: for each of the larger components of our codebase, we have a base class which defines all of the "common" test cases that every integration must follow. The base class contains mocked instances of nearly everything, from API clients to persistence layers. Visual Studio tells me that we have about 550 tests in this repository, but I would wager that less than a third of those are actually unique.

<br>

We spent a lot of time on tests, but in the end it paid off: our refactor was a big success. In the 6 months following, we had only one bug reported in our logic, which we quickly fixed and wrote another test for. Our team was highly praised within our organization for our unit testing rigor; this was one of (if not the) first projects that we'd released that had significant unit test coverage. We gave some talks to the rest of the engineering team about what we did, what libraries we used, how we set up our tests, and so on. We took great pride in what we had accomplished.

<br>

## ...it was the worst of times.

That is, until some time later, when we had to onboard a new member onto our team. He was a junior developer who was interested in our project specifically because of our judicious unit testing. While he admitted that it seemed to work well for us, he was not convinced that unit testing so rigorously was worth the trouble, quoting [this](https://twitter.com/rauchg/status/807626710350839808?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E807626710350839808%7Ctwgr%5E&ref_url=https%3A%2F%2Fkentcdodds.com%2Fblog%2Fwrite-tests) popular tweet as his preferred methodology. His first few days with us were nothing unusual. We walked him through our stack, explained what the product we worked on actually did, and went to a bunch of meetings. We were in between Epics at the time, so things were pretty slow. He picked some smaller tickets, most of which were just cleaning up some areas of the codebase that we'd noticed had started to deteriorate. One ticket in particular involved a change to an interface that we had used all over the place. The ticket itself was very minor, so the change to the real code was not difficult. In doing so, we discovered something unfortunate: one of our component's unit tests were flat out wrong.  It was subtle, and generally *mostly* correct; but there were a few cases, ones that mattered for this ticket, that kept failing even though we could verify that the changes were correct by running the program locally. 

<br>

It took an entire week to fix. It was easy to see what was wrong, but fixing it was a different story. This framework that we had so wonderfully weaved together had begun to lose its luster. Our new team member played red-green whack-a-mole all week - he'd fix some of the broken tests, which would break a few others. He'd fix those, and another couple would break. The horrible changes we had to make are still there, and I fear the day that someone important sees our name attached to those commits. Needless to say, he did not leave our project convinced that unit testing was all that it's cracked up to be. This instance wasn't the end of the issues either - since then I feel like I have spent just as much time working on tests as I have working on new integrations. I've since found a few more bugs in the tests, and while none have compared to the herculean effort of the first big one, they still add up and reduce my overall confidence in the rest of the tests.

<br>

## Lessons Learned

So what went wrong? How did something that worked so well initially come crashing down so quickly? The answer is probably obvious at this point. The abstractions that we had settled upon for the real production code were good, and to this day have worked quite well despite many new integrations with shifting requirements and rules. The abstractions that we created over our unit tests, however, were not "absolutely precise". They had gaps that we didn't see because we were not nearly as diligent and methodical as we had been when writing the production code. In the end, abstraction is abstraction; it doesn't matter whether it's in the production code or in the test code, it all serves the same purpose and comes with the same potential costs. Sometimes duplication is the way to go, to avoid locking the test code into a pattern that nobody is going to want to fix. I still believe in unit tests; they have proven to be very useful to me and are not difficult to add if considered from the beginning. But they are still code - living, growing, shifting code. I would go as far as to say that poorly written tests are just as hard to maintain as that awful, test-less legacy codebase that every company has - that code that provides just enough value to be worth keeping, but heaven forbid it has to be changed.

<br>

In short: be careful with abstraction in unit tests. Unit tests can seem like a safe space, free from the typical burdens of good design, but adopting such a mindset will surely lead to pain and suffering to your future self. And who knows, they may even scare away the new guy...


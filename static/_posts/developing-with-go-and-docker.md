---
layout: blog
title: Developing with Go and Docker
date: 2020-06-25T00:21:32.189Z
---
Recently, I decided to start learning [Go](https://golang.org). It's been a while since I picked up a new language that isn't related to my job, and Go seemed to be the the perfect fit for me: it's a modern language with an exuberant community, it's got good first-party tooling, and it seems to be a rising star in the DevOps space.

That's all well and good, but unfortunately I've been spoiled by containerization. Yes, the Go CLI is easy to install. Yes, plenty of people have run it with no issues. But I still don't want to do it. And fortunately, I don't have to.

## The "golang" image
Fortunately, Go has an [official Docker image](https://hub.docker.com/_/golang). Getting started with Go in Docker is easy. First, pull the golang image from DockerHub:

```docker pull golang``` 

in development, I don't mind to use the latest version of the image (as implied by not giving a tag), since I'm only using this for the CLI. Alpine-based images are great for production builds but for development, the utility of having a (mostly) full toolkit of Unix commands at my fingertips is well worth the larger image size. Actually running the image is a piece of cake. With a command prompt open in the Go project's root directory run

``` docker run -it --name golang-dev -p 80:8080 -v ${PWD}:/go/[some folder name] golang ```

My current Go project is an api, so ```-p 80:8080``` maps my localhost's port 80 to the container's port 8080 (which is the arbitrary number I decided to use for my mux server). ```-v ${PWD}/:go/[folder]``` mounts the current directory to the /go/[whatever] folder in the container. This means that any changes that I make to my source code are immediately reflected in the container. At this point, I've got access to the Go CLI and bash. Hooray!

## So what does this gain us?
So far it sounds like we've achieved the same end as if we'd just installed the CLI on our host machine, only more steps to get up and running. But developing this way gains us a few things. One I already mentioned: we have access to a whole host of Unix commands which don't exist on Windows. If I want to profile my server for a bit, I can build and run my code, direct STDOUT to some log file and watch 'top' for a while I run some tests, all without needing to install anything extra onto my host machine. While not a direct benefit of building and running code in this container, knowing how to develop effectively with Docker can greatly aid in experimentation. In my current project, I've been able to experiment with sqlite, mysql, and postgres all without downloading any installers or running any thing on my host machine. 


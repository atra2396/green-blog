---
layout: blog
title: Developing with Go and Docker
date: 2020-06-25T00:21:32.189Z
---
Recently, I decided to start learning [Go](https://golang.org). It's been a while since I picked up a new language that isn't related to my job, and Go seemed to be the the perfect fit for me: it's a modern language with an exuberant community, it's got good first-party tooling, and it seems to be a rising star in the DevOps space.

That's all well and good, but unfortunately I've been spoiled by containerization. Yes, the Go CLI is easy to install. No, there's no convoluted dependencies if you're using Windows like I am. But I still don't want to do it. And fortunately, I don't have to.

## The "golang" image
Fortunately, Go has an [official Docker image](https://hub.docker.com/_/golang). Getting started with Go in Docker is easy. First, pull the golang image from DockerHub:

```docker pull golang``` 

in development, I don't mind to use the latest version of the image (as implied by not giving a tag), since I'm only using this for the CLI. 
---
title: "Notes on Moving a Domain to Cloudflare"
description: "A short checklist for connecting a new domain without getting lost in DNS screens."
pubDate: 2026-05-04
heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=82"
tags: ["cloudflare", "dns"]
---

The important thing to remember is that nameservers and DNS records are different layers.

Nameservers decide who manages the domain's DNS zone. DNS records decide where each hostname points after that manager is active.

## The safe order

First, add the domain to Cloudflare. Then copy the two Cloudflare nameservers into the registrar. After Cloudflare marks the domain active, configure records for the actual site.

For a Cloudflare Pages blog, the custom domain flow usually creates the right records for `morgenzhou.com` and `www.morgenzhou.com`.

## What to ignore at first

Old `127.0.0.1` records are not useful for a public website. They point to the visitor's own computer, not to your blog.

Once the Pages project exists, those placeholder records can be removed or replaced by the records Cloudflare suggests.

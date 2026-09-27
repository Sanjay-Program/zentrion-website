---
title: "Nmap Scanning Tutorial"
description: "A complete guide to network reconnaissance using Nmap, featuring 50+ practical commands."
category: "network"
difficulty: "Beginner"
readingTime: "45 min"
author: "Zentrion Security Team"
publishedDate: "2026-09-27"
tags: ["nmap", "recon", "networking"]
---

# Nmap Scanning Tutorial

Nmap (Network Mapper) is a free and open-source utility for network discovery and security auditing.

## Basic Scanning

To scan a single IP address:
```bash
nmap 192.168.1.1
```

To scan a subnet:
```bash
nmap 192.168.1.0/24
```

## Advanced Techniques

Nmap allows you to detect the OS and service versions of the target.
- `-O`: Enable OS detection
- `-sV`: Enable service version detection

```bash
nmap -A -T4 192.168.1.1
```

> **Warning:** Always ensure you have explicit permission before scanning targets on a network you do not own.

### Scripts

Nmap has a powerful scripting engine (NSE).
```bash
nmap --script vuln 192.168.1.1
```

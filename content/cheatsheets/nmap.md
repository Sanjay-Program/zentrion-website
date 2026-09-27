---
title: "Nmap"
description: "Network Mapper basic and advanced commands."
category: "cheatsheet"
difficulty: "Intermediate"
readingTime: "5 min"
author: "Zentrion Research"
publishedDate: "2026-10-01"
tags: ["Nmap", "Networking", "Recon"]
relatedGuides: ["nmap-scanning-tutorial"]
relatedTools: ["port-scanner", "nmap-generator"]
---

## Basic Scanning

| Command | Description |
|---------|-------------|
| `nmap <target>` | Scan top 1000 ports |
| `nmap -p- <target>` | Scan all 65535 ports |
| `nmap -p 80,443 <target>` | Scan specific ports |
| `nmap -sn <target>` | Ping sweep (no port scan) |

## Advanced Scanning

| Command | Description |
|---------|-------------|
| `nmap -sS <target>` | TCP SYN "Stealth" Scan |
| `nmap -sU <target>` | UDP Scan |
| `nmap -O <target>` | OS Detection |
| `nmap -sV <target>` | Version Detection |
| `nmap -A <target>` | Aggressive Scan (OS, Version, Script, Traceroute) |

## Output Formats

| Command | Description |
|---------|-------------|
| `nmap -oN output.txt <target>` | Normal output |
| `nmap -oX output.xml <target>` | XML output |
| `nmap -oG output.grep <target>` | Greppable output |
| `nmap -oA output <target>` | Output in all three formats |

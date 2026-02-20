---
title: "DNS server in F#"
date: "2026-02-20"
show: true
tags: ["telecom", "network", "infrastructure", "devops", "software", "engineering"]
---

## The journey

Yesterday, I decided that it was time to make public my DNS server implementation in F#. You can find it here: [64J0/DNS](https://github.com/64J0/DNS).

Overall, it was a fun experience to study the RFC 1035 document [1] while following the dnsguide [2] lessons. For some parts, it was also necessary to consult other references for clarification, and eventually dive deeper into F#.

I'm planning to do something similar for other RFCs in the future.

### Disclaimer

This project is not prepared to be used in "production environments".

## References

- [1] RFC 1035. DOMAIN NAMES - IMPLEMENTATION AND SPECIFICATION. Document [link](https://datatracker.ietf.org/doc/html/rfc1035).
- [2] Building a DNS server in Rust. GitHub: [EmilHernvall/dnsguide](https://github.com/EmilHernvall/dnsguide).

## Related articles

If you liked this post, perhaps you'll be interested in:

- [DNS Record Types](https://gaio.dev/posts/2022-09-25-dns-records)

---
title: "DNS Record Types"
date: "2022-09-25"
show: true
tags: ["telecom", "network", "devsecops", "devops"]
---

# Introduction

During the lifetime of someone working in the DevSecOps role, you'll need to
deal with networking topics, including DNS Record Types. Those are
configurations you make to set the domain that your clients or partners can use
to interact with your applications, for example.

In reality, DNS Record Types are a much bigger topic, with specialized
configurations for differrent scenarios.

> DNS records are essentially instructions created by and stored on DNS servers
> in what is called a Zone File. These records provide important and relevant
> details about domains and hostnames. It might be helpful to think of them as
> business listings or directories. These "listings" help DNS servers direct
> queries to where they need to go. --- [1]

In other words:

> DNS record types are records that provide important information about a
> hostname or domain. These records include the current IP address for a
> domain. --- [2]

# DNS - Domain Name System

Before diving into the DNS Records topic, we need to set some basic
knowledge. So, let's start with the DNS server.

> The domain name system, or DNS, is a global system responsible for mapping
> human-readable hostnames to their corresponding Internet Protocol (IP)
> addresses. For example, if you want to access a website using a domain name
> like example.com, that domain name must point to a valid IP address. --- [2]

Also, according to [2], DNS records are stored in text files (zone files) on the
**authoritative DNS server**.

# DNS Record Types

You can use the following table to better understand the most used DNS Record
Types:

| DNS Record Type               | Description                                                                                                                                                                                                                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A (address)                   | Most commonly used to map a fully qualified domain name (FQDN) to an IPv4 address and acts as a translator by converting domain names to IP addresses.                                                                                                                                             |
| AAAA (quad A)                 | Similar to A Records but maps to an IPv6 address.                                                                                                                                                                                                                                                  |
| ANAME                         | Allows you to point the root of your domain to a hostname or FQDN.                                                                                                                                                                                                                                 |
| CNAME (canonical name)        | An alias that points to another domain or subdomain, but never an IP address. Alias record mapping FQDN, multiple hosts to a single location. This record is also good for when you want to change an IP address over time as it allows you to make changes without affecting user bookmarks, etc. |
| SOA (start of authority)      | Stores information about domains and is used to direct how a DNS zone propagates to secondary name servers.                                                                                                                                                                                        |
| NS (name server)              | Specifies which name servers are authoritative for a domain or subdomains (these records should not be pointed to a CNAME).                                                                                                                                                                        |
| MX (mail exchange)            | Uses mail servers to map where to deliver email for a domain (should point to a mail server name and not to an IP address).                                                                                                                                                                        |
| TXT (text)                    | Allows administrators to add limited human and machine-readable notes and can be used for things such as email validation, site, and ownership verification, framework policies, etc., doesn't require specific formatting.                                                                        |
| SRV (service)                 | Allows services such as instant messaging or VoIP to be directed to a separate host and port location.                                                                                                                                                                                             |
| SPF (sender policy framework) | Helps prevent email spoofing and limits spammers.                                                                                                                                                                                                                                                  |
| PTR (pointer)                 | A reverse of A and AAAA records, which maps IP addresses to domain names. These records require domain authority and can't exist in the same zone as other DNS record types (put in reverse zones).                                                                                                |

If you have any question regarding this configuration in some specific platform,
make sure to consult the platform documentation about this service.

With the help of this table you can get a better understanding of what some
configurations really means.

# Other Configurations - TTL

Along with the DNS Record Type, we usually can configure the **TTL**, which
stands for **Time To Live**.

> The TTL is a value in a DNS record that determines the number of seconds
> before subsequent changes to the record go into effect. Each of your domain's
> DNS records, such as an MX record, CNAME record, and so on, has a TTL value. A
> record's current TTL determines how long it will take any change you make now
> to go into effect. Changes to a record that has a TTL of 86400 seconds, for
> example, will take up to 24 hours to go into effect.
>
> Note that changing a record's TTL affects how long it will take any
> *subsequent* change to happen. We recommend setting a TTL value of 3600, which
> tells servers across the Internet to check every hour for updates to the
> record. The shorter TTL will only take effect after the prior period
> expires. This means that next time you update the record, your change will
> take up to one hour to go into effect. To make subsequent changes happen even
> more quickly - for example, if you think you might want to quickly revert a
> change - you can set a shorter TTL, such as 300 seconds (5 minutes). Once the
> records are configured correctly, we recommend setting a TTL value of 86400,
> which tells servers across the Internet to check every 24 hours for updates to
> the record. --- [3]

# Conclusion

That's it for this post. It presents a very short introduction to the DNS Record
Types configuration.

You can find my references in the next section. Please consult it for more
information.

# References

+ [1] [Constellix - DNS Record Types Cheat Sheet](https://constellix.com/news/dns-record-types-cheat-sheet)
+ [2] [Site24x7 - DNS Record Types: Defined and Explained](https://www.site24x7.com/learn/dns-record-types.html)
+ [3] [Google Workspace Admin Help - DNS Basics](https://support.google.com/a/answer/48090?hl=en)

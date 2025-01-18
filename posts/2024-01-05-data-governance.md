---
title: "What is data governance?"
date: "2024-01-05"
show: true
tags: ["data engineering"]
---

# Introduction

From time to time I step into the term "data governance", which sounds a mysterious idea that could potentially mean many different things. In fact, what is it? Why is it necessary? How to implement it? Who is responsible for it? How is it different from "data management"?

This happened recently during one of my pos-graduation classes, where the teacher was talking about "Privacy by Design in Software Projects". She gave a short description of this term, and I decided to complement it with other sources, just to know how other people defines it.

Well, with this in mind I wrote this blog post with the information collected from my research on Google's first page links. Hope it is useful for you too. The links I read are mentioned in the last section under the **References** part.

# What is data governance?

"Data Governance is a system of decision rights and accountabilities for information-related processes, executed according to agreed-upon models which describe who can take what actions with what information, and when, under what circumstances, using what methods." [4]

According to [1], data governance is everything you do to ensure data is secure, private, accurate, available, and usable. It includes the actions people must take, the processes they must follow, and the technology that supports them throughout the data life cycle. It's a principled approach to managing data during its life cycle, from acquisition to use to disposal.

These processes determine data owners, data security measures, and intended uses for the data. [3]

This means that, in essence, the data governance team must be able to answer some questions about the data used in company's processes, like:

-   What data is collected?
-   What is the individual/team responsible for managing it and what is the process?
-   Where does this data come from?
-   How are we going to use this data? Does it comply with government regulations like LGPD and GDPR? Notice that these regulations have extraterritorial scope, so they imply even outside the proper territory that the process is actually executed. Take GDPR for example, some organizations established outside the EU will have to comply with this regulation or face enforcement action from data protection authorities in EU.
-   Who are we sharing this data with?
-   Where are we storing this data?
-   What are the security processes we use to make this data more safe? For example, anonymisation or pseudonymization, encryption in rest or traffic, least-privilege principle mechanisms, etc.
-   How long must we store this data? Some regulations demand that the data is stored for decades, you must be prepared for it.
-   What is the deletion process?
-   Are we complying with any regulation like PCI DSS or HIPAA?

And the list goes on, with specific demands from different scenarios.

A well-designed data governance program typically includes a governance team, a steering committee that acts as the governing body, and a group of data stewards. They work together to create the standards and policies for governing data, as well as implementation and enforcement procedures that are primarily carried out by the data stewards. Ideally, executives and other representatives from an organization's business operations take part, in addition to the IT and [data management](https://www.techtarget.com/searchdatamanagement/definition/data-management) teams. [5]

# What are the benefits of data governance?

Governance has historically been employed to lock down data in silos, with the goal of preventing data leakage or misuse. However, the consequence of data silos is that legitimate users must navigate barriers to get access to data when they need it. Inadvertently, data-driven innovation gets stifled. [2]

But, with the right data governance process we could:

-   **Make better, more timely decisions.** Users throughout your organization get the data they need to reach and service customers, design and improve products and services, and seize opportunities for new revenues. [1]
-   **Improve cost controls.** Data helps you manage resources more effectively. Because you can eliminate data duplication caused by information silos, you don't overbuy - and have to maintain - expensive hardware. [1] Notice that you would still have some duplication due to security (backups) and reliability concerns.
-   **Enhance regulatory compliance.** An increasingly complex regulatory climate has made it even more important for organizations to establish robust data governance practices. You avoid risks associated with noncompliance while proactively anticipating new regulations. [1]
-   **Earn greater trust from customers and suppliers.** By being in auditable compliance with both internal and external data policies, you gain the trust of customers and partners that you will protect their sensitive information, so they feel positive about doing business with you. [1]
-   **Manage risk more easily.** With strong governance, you can allay concerns about exposure of sensitive data to individuals or systems who lack proper authorization, security breaches from malicious outsiders, or even insiders accessing data they don't have the right to see. [1]
-   **Allow more personnel access to more data.** Strong data governance allows more personnel access to more data, with the confidence that these personnel get access to the right data and that this democratization of data does not negatively impact the organization. [1]

# What is data management?

According to [1], this is a broad concept encompassing all aspects of managing data as an enterprise asset, from collection and storage to usage and oversight, making sure it's being leveraged securely, efficiently, and cost-effectively before it's disposed of.

The scope of [data management](https://www.ibm.com/topics/data-management) is broader than data governance. It can be defined as the practice of ingesting, processing, securing and storing an organization's data, where it is then utilized for strategic decision-making to improve business outcomes. [3]

Now comes the difference as presented by this reference:

[&#x2026;] While this is inclusive of data governance, it also includes other areas of the data management lifecycle, such as data processing, data storage and data security. Since these other areas of data management can also impact data governance, these teams need to work together to execute against a data governance strategy. For example, a data governance team may identify commonalities across disparate datasets, but if they want to integrate them, they'll need to partner with a data management team to define the [data model](https://www.ibm.com/topics/data-modeling) and data architecture to facilitate those linkages. Another example can include data access, where a data governance team may set the policies around data access to specific types of data (e.g. personally identifiable information (PII)), but a data management team will either provide that access directly or set the mechanism in place to provide that access (e.g. leverage internally defined user roles to approve access). [3]

# What is machine learning (ML) governance?

ML governance applies many of the same data governance practices to ML. Data quality and data integration need to provide the data required for model training and production deployment (feature stores are one important aspect of this). [Responsible artificial intelligence](https://aws.amazon.com/machine-learning/responsible-ai/) (AI) is paying special attention to using sensitive data for building model. Additional ML governance capabilities include enabling people to participate in model building, deployment, and monitoring; documenting model training, versioning, supported use cases, and guiding ethical model use; and monitoring the model in production for accuracy, drift, overfitting, and underfitting. [2]

[Generative AI](https://aws.amazon.com/what-is/generative-ai/) requires additional data governance capabilities, like quality and integrity of data to support adaptation of foundation models for training and for inference, governance of Generative AI toxicity and bias, and foundation model (FM) operations: FMOps. [2]

You can support AI/ML with the same data governance program. [Data preparation](https://aws.amazon.com/what-is/data-preparation/) is necessary to transform data into a form that AI/ML models can use for training and production inference - but the most efficient data preparation is the preparation you don't have to do. Data scientists spend too much time preparing data for each use case - your data governance team can help alleviate this undifferentiated heavy lifting. In addition, data governance can oversee the creation of shaped feature stores to be used across AI and ML use cases. [2]

Finally, sensitive data needs to be protected appropriately, so your team can mitigate the risks of sensitive data being used to train the foundation models. [2]

Much like analytics in general, you have to govern the use of AI/ML models that you build or customize. Ideally, this should be closely associated with analytics governance, because that function will know how to support various business areas. [2]

# How to implement a data governance strategy?

Since this was out of scope, and considering that it could potentially become something pretty big, I decided to not dive into it this time. But, while doing my research, I found an interesting reference: [creating a data governance strategy](https://www.techtarget.com/searchdatamanagement/tip/6-key-steps-to-develop-a-data-governance-strategy) from Donald Farmer, principal of consultancy TreeHive Strategy.

Other than that, if you're already using public cloud services like AWS, Azure or GCP, there are many tools available in their ecosystem to help you start this process. Some are mentioned in the references listed in this article, so take a look there.

If you're not using public cloud, there are some data governance tools mentioned in reference [5] that could fit your need, just check their section on "Data governance vendors and tools".

# References

-   [1] <https://cloud.google.com/learn/what-is-data-governance>
-   [2] <https://aws.amazon.com/what-is/data-governance/?nc1=h_ls>
-   [3] <https://www.ibm.com/topics/data-governance>
-   [4] <https://datagovernance.com/defining-data-governance/>
-   [5] <https://www.techtarget.com/searchdatamanagement/definition/data-governance>

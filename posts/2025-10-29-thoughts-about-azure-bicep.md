---
title: "Thoughts about Azure Bicep"
date: "2025-10-29"
show: true
tags: ["Azure", "Microsoft", "IaC"]
---

### Changelog

-   [2025-10-29 Wed] First version released.

## About Azure Bicep

[Azure/bicep](https://github.com/Azure/bicep) is an exceptional tool for Infrastructure as Code (IaC) on Microsoft Azure. It empowers you to automate the provisioning and configuration of your infrastructure, providing all the benefits of declarative programming.

The developer experience (DX), especially within Visual Studio Code, is outstanding. The Bicep extension is rich with features like:

- **Intelligent Templates:** It offers a range of templates, from those covering only required fields to more complex, feature-rich configurations.

- **Pre-Deployment Validation:** It identifies incorrect or misconfigured settings before you attempt to deploy, saving valuable time.

- **Great Auto-completion:** The auto-completion capability significantly speeds up development.

- **Stateless Operations:** Crucially, Bicep eliminates the need to manage state files, avoiding the potential pain and risk of state corruption, common with other tools.

Furthermore, Azure Bicep can be used to enhance documentation and operational tasks. Its ability to generate architectural diagrams from your code is a standout feature, often outperforming similar capabilities in competitor tools and providing a valuable asset for documentation.

While many other features streamline operations, such as built-in functions for unique name generation and immediate access to new Azure services, they underscore Bicep's focus on ease of use.

If you're interest in learning more check the ["Fundamentals of Bicep" learning path](https://learn.microsoft.com/en-us/training/paths/fundamentals-bicep/).

However, a key limitation must be considered: Bicep does not natively handle certain destructive modifications. For instance, if you rename a deployed resource, the tool won't automatically recognize this as a destroy-and-recreate operation. Instead, it will attempt to deploy the "new" resource and ignore the "old" one, requiring manual intervention to clean up the orphaned resource.

For many scenarios, this is a minor issue, but it's a critical consideration for adoption, particularly in environments with frequent resource name changes.

# n8n-nodes-natscore

This is an n8n community node. It lets you use NATS.io in your n8n workflows.

NATS.io is a simple, secure, and high-performance open-source messaging system for cloud-native applications, IoT messaging, and microservices architectures.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node package currently supports the following operations:

*   **NATS Core Publish**: Sends messages to a NATS.io Server.

## Credentials

To use this node, you need to configure credentials for connecting to your NATS.io server. The following authentication method is supported:

### NATS Nkey API

This method uses NKey authentication. You will need to provide:

*   **NATS URL**: The URL of your NATS server (e.g., `nats://localhost:4222`).
*   **NKey**: Your public NKey.
*   **Seed**: Your private NKey seed. This is a sensitive value and will be stored encrypted by n8n.

Ensure your NATS server is configured to support NKey authentication.

## Compatibility

*   **n8n Version**: Built against n8n Nodes API version 1. Should be compatible with recent n8n versions.
*   **Node.js Version**: Requires Node.js version 18.10 or higher.

## Usage

### NATS Core Publish Node

This node allows you to publish messages to a NATS subject.

**Properties:**

*   **Subject**: The NATS subject to publish the message to (e.g., `updates`, `orders.new`).
*   **Message**: The content of the message to send. This can be a string or, if `JSON Parameters` is enabled, a JSON string.
*   **JSON Parameters**: If true, the `Message` field will be parsed as JSON.
*   **Send Input Data**: If true, the incoming n8n item's JSON data will be sent as the message payload, overriding the `Message` field.
*   **Queue Group Name**: (Optional) The name of the queue group if you are publishing to a queue group.

The node will output the published message.

For general n8n usage, refer to the [Try it out](https://docs.n8n.io/try-it-out/) documentation.

## Resources

*   [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
*   [NATS.io Documentation](https://docs.nats.io/)
*   [NATS.io Website](https://nats.io/)

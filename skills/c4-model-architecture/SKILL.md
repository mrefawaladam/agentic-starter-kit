---
name: c4-model-architecture
description: Architectural diagramming using the C4 Model (Context, Containers, Components, Code) rendered as text-based Mermaid or PlantUML diagrams.
---

# C4 Model Architecture

Hierarchical, structured visualization of software systems across multiple levels of abstraction.

## Abstraction Levels

1. **Level 1: System Context**
   - Shows the big picture: the system, users/actors, and external third-party systems it integrates with.
2. **Level 2: Container Diagram**
   - Shows high-level technical choices: Web Apps, Single Page Apps, API Services, Databases, Message Queues.
3. **Level 3: Component Diagram**
   - Zooms into a single container to show its internal modules, controllers, use cases, and repository adapters.
4. **Level 4: Code Diagram**
   - Rare and reserved for complex domain models (UML class diagrams or state machines).

## Rules

- MUST specify protocols (HTTPS, gRPC, WebSocket) and data formats (JSON, Protobuf) on relationship arrows
- MUST document responsibility boundaries in single-line summaries for each container
- MUST maintain diagrams as code in Markdown files (````mermaid`) to enable Git versioning

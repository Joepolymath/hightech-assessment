# HIGHTECH BACKEND TEST SUBMISSION

## Dependency Inversion Approach

---

## Introduction

In this submission, I've decided to dive deeper into the world of [Uncle Bob's Clean Code Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). This approach, which blends ideas from hexagonal and onion architectures, focuses on keeping the business logic separate from the framework.

### Why Choose Uncle Bob's Clean Code Architecture?

- **Framework Independence**: This architecture ensures that your system isn't tied to any specific framework. Frameworks are seen as tools that can be easily swapped out, making your system more adaptable.
- **Easier Testing**: It simplifies the process of setting up tests. I've started with some basic mock tests and plan to expand this to cover different parts of the codebase, ensuring thorough test coverage.
- **Database Flexibility**: It allows for easy swapping of databases, offering flexibility in data storage solutions and making it easier to transition to different database technologies as needed.

This Strictly follows the Dependency Inversion Principle by ensuring all logic depend strictly on abstractions instead of direct dependency implementations.

Developer has the ability to plug in fastify or express, sql or nosql dbs.

This is incomplete, but I decided to submit it to share and show case my idea of implementation in this structure (as a bonus.)

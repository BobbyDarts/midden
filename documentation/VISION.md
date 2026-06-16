# Midden

Midden is a collection of reusable tools, configurations, patterns, and libraries extracted from real projects.

The name comes from the archaeological term "midden", a collection of discarded materials that provides insight into how people lived and worked. In the same spirit, Midden is a collection of solutions, experiments, and lessons learned while building software.

Midden is not intended to be a framework.

It does not prescribe application architecture, folder structures, deployment strategies, or technology choices. Instead, it exists to reduce repetitive work and preserve useful solutions for future projects.

## Purpose

The primary goal of Midden is simple:

> Make future projects easier to build.

Every package should answer the question:

> Will this save time, reduce friction, or improve consistency in the next project?

If not, it probably does not belong in Midden.

## Philosophy

### Real Projects First

Nothing begins in Midden.

Solutions are discovered while building real applications and extracted only after they prove useful.

The typical lifecycle is:

Build application → Solve problem → Encounter problem again → Extract solution into Midden

Midden should not become a storage location for hypothetical abstractions or future ideas.

### Twice Is Enough

Code belongs in an application until it demonstrates reuse.

After a solution is needed in multiple projects, it becomes a candidate for extraction into Midden.

The goal is not to create general-purpose libraries. The goal is to avoid solving the same problem repeatedly.

### Simplicity Over Cleverness

When multiple abstractions are possible, prefer the simpler one.

Favor solutions that are easy to understand six months later over solutions that maximize flexibility or abstraction.

Midden should reduce complexity, not introduce it.

### Framework Agnostic Core

Whenever practical, Midden packages should remain independent of specific frontend frameworks.

Core packages should work equally well with Vue, React, TanStack Start, Node.js, or future technologies.

Framework-specific functionality may live in dedicated packages when necessary.

### Evolution Is Expected

Midden is a living collection of ideas.

Packages are expected to change as understanding improves.

Backward compatibility is valuable, but not at the expense of learning or simplicity.

Midden prioritizes evolution over permanence.

## What Belongs in Midden

Examples include:

- Shared development configuration
- TypeScript configuration
- ESLint configuration
- Formatting standards
- Testing utilities
- Database abstractions
- Reusable UI patterns
- Shared utilities
- Common application infrastructure

These packages may be unrelated to one another. Their only requirement is that they solve a recurring problem.

## What Does Not Belong in Midden

- Unused ideas
- Speculative abstractions
- Premature generalizations
- Solutions that have only been needed once
- Complexity without clear benefit

## Relationship to Applications

Applications are the primary source of innovation.

Projects such as Studs, Dishery, Job Hunt Daily, and future applications should drive Midden's development.

Applications are where ideas are tested.

Midden is where successful ideas are preserved.

## Success

Midden is successful if it reduces setup friction, eliminates repetitive work, and makes future projects easier to start and maintain.

It does not need to be large, popular, or complete.

It only needs to remain useful.

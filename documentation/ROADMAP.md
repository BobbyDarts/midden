# Midden Roadmap

This roadmap reflects current priorities and understanding.

It is expected to change over time.

## Current Priorities

### Shared Configuration

Reduce project setup friction by extracting common development tooling into reusable packages.

Initial targets:

- @midden/tsconfig
- @midden/eslint-config
- @midden/prettier-config
- @midden/oxlint-config

Goals:

- Consistent development environments
- Reduced project setup time
- Shared standards across projects

### Database Abstractions

Create reusable patterns for working with data across multiple projects.

Areas of exploration:

- Provider contracts
- Repository patterns
- Memory-backed implementations
- Local persistence
- Cloud providers
- Testing support

Initial validation project:

- Studs

### Testing Utilities

Reduce the need for complex mocking and repetitive test setup.

Potential areas:

- Memory databases
- Scenario seeding
- Test fixtures
- Time control
- Shared test helpers

## Active Projects

Projects currently helping shape Midden:

- Studs
- Dishery
- Job Hunt Daily

Future projects may introduce new requirements and opportunities for extraction.

## Future Exploration

Potential future packages include:

- UI utilities
- Framework-specific integrations
- Shared application patterns
- Additional database providers
- Development tooling

These remain exploratory until driven by real project needs.

## Non-Goals

The following are intentionally not priorities:

- Building a full application framework
- Prescribing application architecture
- Enforcing folder structures
- Large-scale code generation
- Enterprise-style platform development
- Abstractions without demonstrated need

## Guiding Rule

When deciding what to build next:

1. Solve the problem in a real project.
2. Use the solution again.
3. Extract the reusable portion into Midden.
4. Keep the abstraction as simple as possible.

If there is doubt, leave it in the application until the need becomes clear.

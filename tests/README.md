# HeliSync Testing Suite

This directory contains the test suite for the HeliSync platform. These tests cover various aspects of the application including API functionality, data processing, and user interface components.

## Test Categories

1. **Unit Tests**: Testing individual components and functions
2. **Integration Tests**: Testing the interaction between different parts of the application
3. **End-to-End Tests**: Testing full user workflows

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

To run specific test categories:

```bash
# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run end-to-end tests only
npm run test:e2e
```

## Test Coverage

Run test coverage to see how much of the codebase is covered by tests:

```bash
npm run test:coverage
```

## Test Environment

The tests run against a test database that's separate from the development and production databases. This ensures that tests don't interfere with actual user data.

## Mock Services

Some tests use mock services for external dependencies like the Helius API to ensure tests can run without external dependencies.
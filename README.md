# PubKey Stack

## Getting Started

### Prerequisites

- Node v18 or higher
- Yarn
- Docker

### Installation

Clone the repo and install dependencies:

```bash
git clone git@github.com:pubkeyapp/pubkey-stack.git
cd pubkey-stack
yarn
```

### Environment variables

Copy the `.env.example` file to `.env` and fill in the missing values.

```bash
cp .env.example .env
```

### Starting the services

You will need to start the database before starting the backend.

```bash
yarn dev:services
```

### Pushing the database schema

If you start from scratch, you will need to push the database schema to the database.

```bash
yarn prisma db push
```

Also, after each change to the schema in `prisma/schema.prisma`, you will need to run the above command again.

### Starting the API

```bash
yarn dev:api
```

### Starting the web ui

```bash
yarn dev:web
```

### Starting the SDK generator

```bash
yarn dev:sdk
```

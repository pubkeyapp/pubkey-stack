# PubKey Stack

## Getting Started

### Prerequisites

- Node v18 or higher
- PNPM
- Docker

### Installation

Clone the repo and install dependencies:

```bash
git clone git@github.com:pubkeyapp/pubkey-stack.git
cd pubkey-stack
pnpm
```

### Automatic setup

You can run the automatic setup script to create the `.env` file, test the setup and push the database schema.

```bash
pnpm setup
```

### Environment variables

Copy the `.env.example` file to `.env` and fill in the missing values.

```bash
cp .env.example .env
```

### Starting the services

You will need to start the database before starting the backend.

```bash
pnpm dev:services
```

### Pushing the database schema

If you start from scratch, you will need to push the database schema to the database.

```bash
pnpm prisma db push
```

Also, after each change to the schema in `prisma/schema.prisma`, you will need to run the above command again.

### Starting the API

```bash
pnpm dev:api
```

### Starting the web ui

```bash
pnpm dev:web
```

### Starting the SDK generator

```bash
pnpm dev:sdk
```

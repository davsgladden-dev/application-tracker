# Application Tracker

A job application tracker. Log applications, move them through statuses, and keep notes on each one.

Spring Boot REST API backed by a file-based H2 database, with a React single-page frontend.

## Features

- Dashboard with application counts grouped by status, colour-coded and clickable to filter
- Sortable, filterable table of all applications
- Inline status changes and note editing
- Add new applications with client-side validation
- Status filter reflected in the URL, so filtered views are bookmarkable and back-button safe

## Stack

**Backend** — Java 21, Spring Boot, Spring Data JPA, H2 (file mode), Lombok, Maven

**Frontend** — React, TypeScript, Vite, Tailwind CSS v4, React Router, TanStack Query

## Prerequisites

- JDK 21
- Node.js 20 or newer

Maven is not required — the project includes the Maven wrapper (`mvnw`).

## Project layout

```
application-tracker/
├── src/main/java/dev/application_tracker/   Spring Boot application
│   ├── contoller/
│   ├── converter/
│   ├── dto/
│   ├── entity/
│   ├── respository/
│   └── service/
├── src/main/resources/application.yml
├── frontend/                                React application
│   └── src/
│       ├── api/            fetch wrappers for the REST endpoints
│       ├── components/     reusable components
│       ├── pages/          one component per route
│       └── types/          shared TypeScript types
├── mvnw
└── pom.xml
```

## Setup

Clone the repository:

```bash
git clone https://github.com/davsgladden-dev/application-tracker.git
cd application-tracker
```

### Backend

No setup step is required. Dependencies resolve on first run, and the H2 schema is generated automatically from the JPA entities (`ddl-auto: update`).

### Frontend

```bash
cd frontend
npm install
```

## Running

The backend and frontend run as two separate processes. Start the backend first.

### Backend

From the repository root:

```bash
./mvnw spring-boot:run
```

On Windows:

```cmd
mvnw spring-boot:run
```

The API starts on **http://localhost:8075**.

### Frontend

From the `frontend` directory:

```bash
npm run dev
```

The dev server starts on **http://localhost:5173**. Open that in a browser.

Vite proxies any request beginning with `/tracker` through to the backend on port 8075, so the frontend makes same-origin requests and no CORS configuration is needed. The proxy is configured in `frontend/vite.config.ts`.

## Database

H2 runs in file mode. The database file lives outside the repository at:

```
~/.jobtracker/db.mv.db
```

On Windows that resolves to `C:\Users\<username>\.jobtracker\`.

Deleting that directory while the application is stopped will reset the database — the schema is recreated on the next start.

### H2 console

The web console is enabled at **http://localhost:8075/h2-console** while the backend is running.

| Field | Value |
|---|---|
| JDBC URL | `jdbc:h2:file:~/.jobtracker/db` |
| Username | `sa` |
| Password | *(blank)* |

## API

Base path: `/tracker`

| Method | Path | Description |
|---|---|---|
| GET | `/applications` | All applications |
| GET | `/application/{applicationId}` | A single application |
| GET | `/statuses` | Status constants mapped to display names |
| POST | `/saveApplication` | Create an application |
| PATCH | `/updateStatus` | Update an application's status |
| PATCH | `/updateNote` | Update an application's note |

The write endpoints return the saved `ApplicationDto` so the client can update without a second request.

## Configuration

Backend settings live in `src/main/resources/application.yml` — server port, datasource URL, and JPA options.

If you change the backend port, update the proxy target in `frontend/vite.config.ts` to match.

## Known gaps

- No backend exception handling; a request for a missing record returns 500 rather than 404
- No runtime validation of API responses on the client
- Not yet responsive below tablet widths
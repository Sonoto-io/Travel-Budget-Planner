# Travel Budget Planner

Travel Budget Planner is a self-hosted web application designed to help you track and analyze expenses while traveling across multiple countries.

You can define your own structure (countries, currencies, categories, subcategories, and users), then log expenses per country.  
The web interface is optimized for quick daily expense entry, while the API allows you to reuse the data elsewhere (for example in dashboards, automations, or Home Assistant).

---

## Features

- Multi-country expense tracking
- Multiple currencies with conversion to a main currency
- Custom categories and subcategories
- Multi-user support
- Expense summaries and basic dashboards
- REST API with Swagger documentation
- Designed for self-hosting

---

## Installation

### Prerequisites

Make sure you have the following installed:

- `make`
- `npm`
- `docker`
- `docker-compose`

### Start the app

```bash
make dev-up
```
Once started:

Access the web app via your IP address or app.localhost (when running locally)

The API is available at /api

Routing is handled via Traefik, as defined in the Docker Compose configuration.

---

## Usage
### Initial setup

Before adding expenses, configure the following in the Management section:

- Users
- Currencies
- Countries
- Categories
- Subcategories

### Adding expenses

1. Select a country from the Select a country menu
2. Add expenses linked to that country, category, and user

### Currency configuration

- Choose your main currency in the settings

- Currency conversion rates are defined relative to the main currency
  - The main currency rate must be 1

- Currency symbols are determined using the LOCALE value

The LOCALE follows the BCP 47 format:
```
language-REGION
```

#### Examples:

- ```en-US``` → USD
- ```fr-FR``` → EUR

A list of locale identifiers can be found here:
https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry

### Dashboards

After adding expenses, you can view:

- Total expenses
- Breakdown by country
- Breakdown by user

---

## API

Swagger documentation is available at:

```
/api/swagger
```

### Expense summaries

Summary endpoints are available under:

```
/api/expenses/summary
/api/expenses/summary/by-user
/api/expenses/summary/by-country
```

These endpoints are useful if you want to visualize or reuse the data in external tools (e.g. custom dashboards, Home Assistant, or other apps).

---

## License

This project is licensed under the MIT License.
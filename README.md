# miljan-portfolio

Personal portfolio: a static site with plain HTML, CSS and JavaScript. There are no dependencies and no build step.

- `site/` holds everything that gets served.
- `nginx.conf`, `Dockerfile` and `docker-compose.yml` hold the production setup.

## Run locally

```bash
python3 -m http.server 3000 --directory site
```

Open http://localhost:3000.

## Deploy

On the server, in the project folder:

```bash
git pull origin main
docker compose up -d --build
```

The site is published on port 3000.

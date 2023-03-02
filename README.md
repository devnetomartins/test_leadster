# TestLeadster

Agenda de contatos V1

## Setup

* Ruby 3.0.0
* Postgres :elephant:
* NodeJS 16.16.0

## Development

The project requires:

* Ruby 3.0.\*
* Rails 7.0.4
* PostgreSQL
* React 18.2.0
* MUI 5.11.10
* Docker

## Running

```
docker-compose build

docker-compose run web bundle exec rake db:create db:migrate db:seed

docker-compose up
```

### After Running
```
Go to localhost:3000 and use this login data:
Email: admin@leadster.com
Password: admin123
```

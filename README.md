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

## Running

```
# Before running the commands you need to have yarn and bundler installed

bundle install

yarn install

bundle exec rake db:create

bundle exe rake db:migrate

bundle exec rake db:seed
```

### Rails Server
```
bin/dev
```

### Sidekiq
```
bundle exec sidekiq -e development -C config/sidekiq.yml
```

### After Running
```
Go to localhost:3000 and use this login data:
Email: admin@leadster.com
Password: admin123
```

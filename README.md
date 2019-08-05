# Crossfeed
External monitoring for organization assets

Crossfeed is a tool that blends external asset information with known vulnerabilities from the VDP in order to better secure DoD systems. Crossfeed continually scans for public facing assets using a number of OSINT and minimally invasive techniques. This information is then used in scans to discover indicators of vulnerabilities.

Current features:

- Continually tracked database of DoD assets
- Database of vulnerability reports from VDP
- Passive scans for open ports utilizing Rapid7's [Project Sonar](https://www.rapid7.com/research/project-sonar/)
- Host fingerprinting using [Wappalyzer](https://www.wappalyzer.com/)
- Recurring vulnerability scans based on past vulnerabilities
- Slack notifications when new ports and vulnerabilities found

## Infrastructure

Crossfeed Web (this repository) sits as the user-facing end of Crossfeed. This displays all information and allows scheduling scans.

[Crossfeed Agent](https://github.com/deptofdefense/crossfeed-agent) is the backend scanner, which launches and coordinates scans.

Scans are queued via [Beanstalk](https://beanstalkd.github.io/) and dispatched by crossfeed agent. This is designed for a multi-host environment, where backend scanners process incoming scan requests asynchronously.

## Development

To get started, first copy relevent config files:
1. Run `cp .env.example .env`
2. Run `cp config/config.example.json config/config.json`
3. In the [agent](https://github.com/deptofdefense/crossfeed-agent), run `cp config.example.json config.json`

### Install and configure the following dependencies
- Install [Postgres](http://postgresguide.com/setup/install.html) and [start the server](https://www.postgresql.org/docs/8.2/server-start.html)
- Install [Beanstalk](https://beanstalkd.github.io/download.html) and [start the daemon](https://beanstalkd.github.io/)

Configure the Postgres database information in `config/config.json` on web and `config.json` for the agent. Likewise, configure the Beanstalk host and port in `.env` for web and `config.json` for the agent.

### Obtain API Keys

Crossfeed integrates with several APIs. Configure the following API keys to make full use of the tool:

- `SONAR_API_KEY` (agent) - The Rapid7 [Project Sonar](https://www.rapid7.com/research/project-sonar/) API key, used to download port scan data
- `SLACK_WEBHOOK_URL` (agent) - A Slack [incoming webhook](https://api.slack.com/incoming-webhooks) url, used to post alerts to Slack
- `BD_API_KEY` (web, optional) - A [BitDiscovery](https://bitdiscovery.com) API key, optionally used for importing data

### Quick start

1. Run `npm install`
2. Run `sequelize db:migrate`
3. Run `node server.js`

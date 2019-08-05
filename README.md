# Crossfeed
External asset monitoring for DoD websites

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

## Development (in process of dockerizing)

### Ensure the following are installed and running:
- Postgres
- Beanstalk

1. Run `npm install`
2. Copy `cp .env.example .env` and configure ENV variables
3. Copy `cp config/config.example.json config/config.json` and configure Postgres information
4. Run `sequelize db:migrate`
5. Run `node server.js`

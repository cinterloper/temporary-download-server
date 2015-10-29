This server allows you to generate a secure (JWT) token that expires after a time period

right now it will expire after 900 seconds

it will serve file(s) after you have authed with said token

if your really going to use this, it should only be over https (same protection you would give to basic auth)

(this can/will/should be replaced by ssh(supported) and complemented by http)
$ telnet localhost 3001
Trying ::1...
Connection failed: Connection refused
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
__      __ ______  _____  _______  __   __
\ \    / /|  ____||  _  \|__   __| \ \ / /
 \ \  / / | |____ | :_) |   | |     \   /
  \ \/ /  |  ____||   __/   | |      > /
   \  /   | |____ | |\ \    | |     / //\
    \/    |______||_| \_\   |_| o  /_/ \_\


% GetToken
your token:
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NDYxMDg0ODUsImV4cCI6MTQ0NjEwOTA4NX0=.4UOmF2tErHqZD-7C8CfAuhpEhjTraxdU58fTpqER6u8=
% Connection closed by foreign host.

$ curl -o config.tgz -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NDYxMDg0ODUsImV4cCI6MTQ0NjEwOTA4NX0=.4UOmF2tErHqZD-7C8CfAuhpEhjTraxdU58fTpqER6u8=' http://localhost:8080/my.cfg.tgz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2379  100  2379    0     0  11862      0 --:--:-- --:--:-- --:--:-- 11895




The primary use case for this is to allow a container running in a foreign/remote platform to retrieve a 1-time configuration package
that will populate its configuration 'volume'

the Token can be configured as an enviornment variable at launch time, and will expire, so safer then a user/password. 

obviously, the keystore should be regenerated if you use this

#!/bin/bash
curl -o /tmp/config.tgz -H "Authorization: Bearer $TOKEN" $CONFIGSERVERURLBASE/$NAME.cfg.tgz
mkdir /etc/app 2>/dev/null
tar -zxvf /tmp/config.tgz -C /etc/app/

FROM ubuntu

RUN apt-get update && apt-get install -y python git python-pip

ADD "docker/startup.sh" "/startup.sh"

RUN mkdir "/srv/{client,server}"
ADD "client/dist" "/srv/client"
ADD "server/" "srv/server"

RUN pip install -r "/srv/server/requirments.txt"

VOLUME "/var/repos"

EXPOSE [80,8080]
CMD ["/startup.sh"]
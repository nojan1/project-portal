FROM ubuntu

RUN apt-get update && apt-get install -y python3 python3-dev python3-setuptools git python3-pip

ADD "docker/startup.sh" "/startup.sh"

RUN mkdir "/srv/{client,server}"
ADD "client/dist" "/srv/client"
ADD "server/" "srv/server"

RUN pip3 install -r "/srv/server/requirments.txt"

VOLUME "/var/repos"

EXPOSE 80
EXPOSE 8080
CMD ["/startup.sh"]
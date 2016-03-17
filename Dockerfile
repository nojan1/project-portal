FROM ubuntu

RUN apt-get update && apt-get install -y python3 python3-dev python3-setuptools git python3-pip

ADD "docker/startup.sh" "/startup.sh"

ADD "client/dist" "/srv/client"
ADD "server/" "srv/server"

RUN cp srv/server/config-example.json /srv/server/config.json
RUN sed -i s:{GIT_REPO_DIRECTORY}:/var/repos: /srv/server/config.json

RUN pip3 install -r "/srv/server/requirments.txt"

RUN mkdir "/var/repos"
VOLUME "/var/repos"
ENV API_BASE_DOMAIN = ""

EXPOSE 3031
EXPOSE 3032
CMD ["/startup.sh"]
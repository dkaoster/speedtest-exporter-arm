FROM node:lts-alpine
MAINTAINER "Daniel Kao"

ARG PORT=9696

ENV PORT=$PORT
ENV HOME /home

RUN mkdir -p $HOME
WORKDIR $HOME

COPY . /home

RUN npm install --quiet

EXPOSE $PORT

CMD ["npm", "run", "start"]

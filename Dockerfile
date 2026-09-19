FROM node:22-alpine
ARG OCI_REVISION
ARG OCI_CREATED
LABEL org.opencontainers.image.revision=$OCI_REVISION \
      org.opencontainers.image.created=$OCI_CREATED
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

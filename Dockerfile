FROM ghcr.io/onecx/docker-spa-base:1.18.0

# Copy nginx configuration
# COPY nginx/locations.conf $DIR_LOCATION/locations.conf
# Copy application build
COPY dist/apps/test-webcomponent $DIR_HTML

# Application environments default values
# ENV BFF_URL=http://event-management-bff:8080/
ENV APP_BASE_HREF=/mfe/test-example-ui/
ENV CORS_ENABLED=true
ENV CONFIG_ENV_LIST BFF_URL,APP_BASE_HREF,CORS_ENABLED
RUN chmod 775 -R $DIR_HTML/assets
USER 1001
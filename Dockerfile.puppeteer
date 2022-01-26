ARG CHROME_FOLDER=/usr/local/share/puppeteer-chromium

FROM registry.gitlab.com/gitlab-org/gitlab-build-images:gitlab-puppeteer AS download

ARG PUPPETEER_VERSION
ARG CHROME_FOLDER

RUN yarn global add puppeteer@$PUPPETEER_VERSION \
  && mv $(yarn global dir)/node_modules/puppeteer/.local-chromium/linux-*/chrome-linux "$CHROME_FOLDER" \
  && test -d "$CHROME_FOLDER"

FROM registry.gitlab.com/gitlab-org/gitlab-build-images:gitlab-puppeteer

ARG CHROME_FOLDER
ENV PUPPETEER_EXECUTABLE_PATH $CHROME_FOLDER/chrome
ENV PUPPETEER_SKIP_DOWNLOAD true

COPY --from=download $CHROME_FOLDER $CHROME_FOLDER

RUN echo "Testing that the chrome executable ($PUPPETEER_EXECUTABLE_PATH) exists" \
  && test -f $PUPPETEER_EXECUTABLE_PATH \
  && test -x $PUPPETEER_EXECUTABLE_PATH

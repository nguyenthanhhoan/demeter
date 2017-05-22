FROM sutran/ruby-2.3-docker

RUN gem install bundler --no-ri --no-rdoc

# Install static server
RUN npm -g install static-server

# Cache bundle install
WORKDIR /tmp
ADD Gemfile      /tmp/
ADD Gemfile.lock /tmp/
RUN bundle install

# Add rails project to project directory
ADD ./ /rails

# set WORKDIR
WORKDIR /rails

# This is for building images only
ENV SECRET_KEY_BASE=please_enter_here
ENV S3_ACCESS_KEY=please_enter_here
ENV S3_SECRET_ACCESS_KEY=please_enter_here
ENV AWS_REGION=please_enter_here
ENV S3_BUCKET_NAME=please_enter_here

# Cleanup
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /var/tmp/*

# Publish port 4200 8080
EXPOSE 4200 8080

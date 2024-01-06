# Google Domains DDNS Auto-Updater

## Overview

This tool automatically updates the Dynamic DNS (DDNS) for domains registered with Google Domains, ensuring your domain points to the correct IP address even when it changes.

## Getting Started

Before building the Docker image, you need to set your domain details in the Dockerfile:

Open the Dockerfile in your preferred text editor.

Find the following lines:

```docker
ENV HOST_NAME="bityoungjae.com" \
 USER_NAME="username" \
 PASSWORD="password"
```

Replace `bityoungjae.com`, `username`, and `password` with your domain name, username, and password, respectively.

### Building the Docker Image

1. Clone this repository into your desired directory.
2. Navigate to the cloned directory.
3. Build the Docker image with the following command:

```sh
docker build -t update-ddns .
```

### Running the Container

To have the container run in the background and ensure it's always running, execute the following command:

```sh
docker run -d --name update-ddns --restart always update-ddns
```

## Contact Information:

If you have any inquiries, please contact the email address below.

Email: bityoungjae@gmail.com

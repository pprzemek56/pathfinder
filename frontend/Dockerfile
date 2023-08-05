# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /frontend

# Install dependencies
COPY package.json package-lock.json /frontend/
RUN npm install

# Copy the rest of the code
COPY . /frontend/

# Build the React app
CMD ["npm", "start"]
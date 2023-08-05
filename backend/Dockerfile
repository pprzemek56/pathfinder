FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Create a directory for the app
WORKDIR /backend

# Install dependencies
COPY requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . /backend/
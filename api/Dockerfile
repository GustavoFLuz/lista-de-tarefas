
# Use the official Go image as the base image
FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files
COPY api/go.mod api/go.sum ./

# Download and install the Go dependencies
RUN go mod download

# Copy the source code into the container
COPY api/*.go .

# Build the Go application
RUN go build -o /built-api .

# Expose the port on which the application will run
EXPOSE 8080

# Define the command to run the application
CMD ["/built-api"]

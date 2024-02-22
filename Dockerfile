# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /TEST/Backend

# Copy the packaged JAR file into the container at the specified path
COPY Backend/target/backend-0.0.1-SNAPSHOT.jar ./app.jar

EXPOSE 8080

# Define the command to run your application
CMD ["java", "-jar", "app.jar"]
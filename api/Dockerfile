# Build stage
FROM eclipse-temurin:21-jdk as builder
WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn/ .mvn/
COPY credentials.json ./credentials.json
RUN chmod +x ./mvnw
RUN ./mvnw dependency:go-offline -B

COPY src/ src/
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar
COPY --from=builder /app/src/main/resources/application.properties ./config/
COPY --from=builder /app/credentials.json ./credentials.json

# Defina a variável de ambiente no estágio de execução
ENV PATH_CREDENTIALS=/app/credentials.json

EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["sh", "-c", "java -jar app.jar --spring.config.location=file:./config/application.properties --server.address=0.0.0.0 --server.port=${PORT}"]
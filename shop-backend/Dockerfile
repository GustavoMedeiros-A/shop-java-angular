FROM eclipse-temurin:17

WORKDIR /app

# Copia o POM para o container e instala dependências
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Define o diretório de trabalho como o volume de código-fonte
COPY . .

# Expor a porta do Spring Boot
EXPOSE 8080

# Comando padrão (será sobrescrito pelo docker-compose)
CMD ["mvn", "spring-boot:run"]

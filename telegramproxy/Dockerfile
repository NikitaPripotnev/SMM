FROM openjdk:8-jdk-alpine
ARG JAR_FILE=build/libs/smm.agency.telegram-0.0.1.jar
COPY ${JAR_FILE} telegramproxy.jar
ENTRYPOINT ["java","-jar","telegramproxy.jar"]
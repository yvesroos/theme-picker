FROM gradle:8-jdk21 AS gradle_build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle bootJar --no-daemon

FROM amazoncorretto:21-alpine

EXPOSE 8080

RUN mkdir /server
COPY --from=gradle_build /home/gradle/src/build/libs/*.jar /server/server.jar
ENTRYPOINT ["java", "-jar", "server/server.jar"]
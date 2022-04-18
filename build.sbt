import com.typesafe.sbt.packager.docker.{DockerChmodType, DockerPermissionStrategy}

import scala.io.Source
import scala.util.Try

name := "prj1"
organization := "wmi.amu.edu.pl"

version := "1.0.0"
scalaVersion := "2.13.8"

scalacOptions ++= Seq(
  "-encoding", "utf8",
  "-Wunused",
  "-deprecation",
  "-Ywarn-dead-code",
  "-Ymacro-annotations",
  "-Yrangepos"
)

libraryDependencies ++= Seq(
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test
)

lazy val root = (project in file(".")).enablePlugins(PlayScala, JavaAppPackaging, DockerPlugin, AshScriptPlugin)

lazy val logger = ConsoleLogger()

lazy val envVariables = {
  val source = Try(Source.fromFile(".env")).getOrElse {
    logger.warn(".env file not found")
    Source.fromString("")
  }
  try {
    source.getLines
      .filterNot(_.isEmpty)
      .map(_.trim.split("=", 2))
      .map(env => env(0) -> env(1))
      .toMap
  } finally {
    source.close()
  }
}
Docker / maintainer := "Alex Glowacki"
Docker / version := "1.0.0"
dockerExposedPorts := Seq(9000)

run / envVars := envVariables
dockerEnvVars := envVariables

// java 11, Alpine OS
dockerBaseImage := "eclipse-temurin:11-jre-alpine"

// let Play create RUNNING_PID in docker
dockerChmodType := DockerChmodType.UserGroupWriteExecute
dockerPermissionStrategy := DockerPermissionStrategy.CopyChown

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "wmi.amu.edu.pl.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "wmi.amu.edu.pl.binders._"

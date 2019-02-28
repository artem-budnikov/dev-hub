# Installing and Starting GridGain

This chapter explains system requirements for running GridGain, how to install GridGain and start a GridGain node.

>Since GridGain is built on top of Apache Ignite, GridGain reuses Ignite's system properties, environment properties, startup scripts, etc. wherever possible.

## Prerequisites
GridGain was officially tested on:

Name | Value
---- | ----
JDK | Oracle JDK 8 and later<br/>Open JDK 8 and later<br/>IBM JDK 8 and later<br/><br/>If you use Java version 9 or later, see [Running GridGain with Java 9 or later](#running-gridgain-with-java-9-or-later) for details.
OS | Linux (any flavor),<br/>Mac OSX (10.6 and up)<br/>Windows (XP and up), <br/>Windows Server (2008 and up)<br/>Oracle Solaris
ISA | x86, x64, SPARC, PowerPC
Network | No restrictions (10G recommended)


### Running GridGain with Java 9 or later

To run GridGain with Java 9/10/11, perform the following steps:

 1. Set the `JAVA_HOME` variable to point to the Java installation directory.

 2. GridGain uses proprietary SDK APIs that are not available by default. You need to pass specific flags to JVM to
make these APIs available. If you use the start-up script `ignite.sh`, you do not need to do anything because these
flags are already set up in the script. Otherwise, provide the following parameters to the JVM of your application:

  ```
  --add-exports=java.base/jdk.internal.misc=ALL-UNNAMED
  --add-exports=java.base/sun.nio.ch=ALL-UNNAMED
  --add-exports=java.management/com.sun.jmx.mbeanserver=ALL-UNNAMED
  --add-exports=jdk.internal.jvmstat/sun.jvmstat.monitor=ALL-UNNAMED
  --add-exports=java.base/sun.reflect.generics.reflectiveObjects=ALL-UNNAMED
  --illegal-access=permit
  -Djdk.tls.client.protocols=TLSv1.2

  ```

 3. TLSv1.3, which is available in Java 11, is not supported at the moment. Consider adding `-Djdk.tls.client.protocols=TLSv1.2`
if SSL between nodes is used.

## Installation

Depending on the GridGain edition you choose - Community, Enterprise, or Ultimate - GridGain is
distributed as either binary or as source code. Additionally, all GridGain editions are available in docker and cloud images and via RPM/DEB.


### Using Binary Distribution

To get started with GridGain binary distribution:

 1. [Download GridGain](https://www.gridgain.com/resources/download) binary as a zip archive

 2. Unzip the zip archive into the installation folder in your system

 3. (Optional) Set `IGNITE_HOME` environment variable to point to the installation folder and make sure there is no trailing `/` in the path

### Using Source Distribution

>GridGain source distribution is available only for Community Edition.

To get started with GridGain Source distribution:

 1. [Download GridGain](https://www.gridgain.com/resources/download) binary as a zip archive 
 
 2. Build the binary using the following commands:

```
# Unpack the source package
$ unzip -q apache-ignite-{version}-src.zip
$ cd girdgain-{version}-src

# Compile and install
$ mvn clean install -Pall-java,all-scala,licenses -DskipTests

# Assemble GridGain
$ mvn initialize -Prelease

Look for gridgain-<version>-bin.zip in ./target/bin directory.
```
Refer to `DEVNOTES.txt` from the source package for more details.

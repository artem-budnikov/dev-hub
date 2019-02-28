# Installing GridGain

This chapter describes system requirements for running GridGain, how to download the software and install it on all
supported platforms.

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

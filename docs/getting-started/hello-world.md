# Running Your First GridGain Application

This tutorial shows you how to run a simple "Hello World" example in GridGain.

The following technologies are used in this example:

* Java Development Kit (JDK) 1.8
* GridGain Community Edition
* Maven 3.1.1
* IntelliJ IDEA 15 CE


## 1. Download and Install GridGain
Download the latest binary distribution from the [GridGain website](https://www.gridgain.com/resources/download) and extract the resulting .zip file to a location of your choice:
```shell
$ unzip gridgain-{version}-bin.zip
$ cd gridgain-{version}-bin
```

## 2. Start GridGain Cluster
Start a node using `bin/ignite.sh` command and specify an example configuration file provided in the GridGain installation:
```shell
$ bin/ignite.sh examples/config/example-ignite.xml
```

You can start as many nodes as you like. GridGain will automatically discover all the nodes in the cluster.

## 3. Add Maven Dependency
The easiest way to get started with GridGain in Java is to use Maven 2 dependency management.

Add the following Ignite dependencies in your project’s pom.xml file. Replace `${gridgain-version}` with the actual GridGain version you are using.
```xml
<dependency>
    <groupId>org.gridgain</groupId>
    <artifactId>ignite-core</artifactId>
    <version>${gridgain.version}</version>
</dependency>
<dependency>
    <groupId>org.gridgain</groupId>
    <artifactId>ignite-spring</artifactId>
    <version>${gridgain.version}</version>
</dependency>
```

## 4. HelloWorld.java
Here is a sample HelloWord.java file that prints ‘Hello World’ on all the nodes in the cluster.
```java
public class HelloWorld {
  public static void main(String[] args) throws IgniteException {
    try (Ignite ignite = Ignition.start("examples/config/example-ignite.xml")) {
      // Put values in cache.
      IgniteCache<Integer, String> cache = ignite.getOrCreateCache("myCache");
      cache.put(1, "Hello");
      cache.put(2, "World!");
      // Get values from cache
      // Broadcast 'Hello World' on all the nodes in the cluster.
      ignite.compute().broadcast(()->System.out.println(cache.get(1) + " " + cache.get(2)));
    }
  }
}
```

## 5. Set VM Options in IDEA
Go to Run —> Edit Configurations —> VM options (under Configuration tab) and enter:
```
-DIGNITE_HOME=<path-to-GridGain-installation-folder>
```

This step is required only because we are trying to provide a relative path to the configuration file in our code example above.
You can skip this step and provide an absolute path instead.

## 6. Output
Run HelloWorld.java. You will see ‘Hello World!’ printed on all the nodes.

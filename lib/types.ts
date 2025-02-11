/*
*
* Networking
*
 */

interface EndpointIPAMConfig {
  IPv4Address?: string;
  IPv6Address?: string;
  LinkLocalIPs: string[];
}

interface EndpointSettings {
  IPAMConfig?: EndpointIPAMConfig | undefined;
  Links?: string[];
  Aliases?: string[];
  NetworkID?: string;
  EndpointID?: string;
  Gateway?: string;
  IPAddress?: string;
  IPPrefixLen?: number;
  IPv6Gateway?: string;
  GlobalIPv6Address?: string;
  MacAddress?: string;
  DriverOpts?: object;
}

interface Network {
  [key: string]: EndpointSettings;
}

enum PortType {
  tcp = "tcp",
  udp = "udp",
  sctp = "stcp",
}

interface Port {
  IP?: string;
  PrivatePort: number;
  PublicPOrt?: number;
  Type: PortType;
}

interface HostConfig {
  // Network mode to use for this container. 
  // Supported standard values are: bridge, host, none, and container: <name | id>.
  // Any other value is taken as a custom network's name to which this container should connect to.
  NetworkMode?: string
  // PortMap describes the mapping of container ports to host ports, 
  // using the container's port-number and protocol as key in the format <port>/<protocol>, for example, 80/udp.
  PortBindings?: {
    [port: string]: {
      HostIp?: string;
      HostPort?: string;
    }[]
  };
  // A list of kernel capabilities to add to the container. Conflicts with option 'Capabilities'.
  CapAdd?: string[];
  // Specification for mounts to be added to the container. 
  Mounts?: {
    Type?: "bind" | "volume" | "tmpfs" | "npipe";
    Source?: string;
    Target?: string;
    ReadOnly?: boolean;
  }[];
  // Automatically remove the container when the container's process exits. 
  // This has no effect if RestartPolicy is set.
  AutoRemove?: boolean;
}

interface NetworkSettings {
  Networks: Network;
}

/*
*
* FileSystem
*
 */

interface BindOptions {
  Propagation: string;
  NonRecursive: boolean;
}

interface DriverConfig {
  Name?: string;
  Options?: object;
}

interface Labels { [label: string]: string }

interface VolumeOptions {
  NoCopy?: boolean;
  Labels?: Labels;
  DriverConfig?: DriverConfig;
}

interface TmpfsOptions {
  SizeBytes?: number;
  Mode?: number;
}

enum MountType {
  bind = "bind",
  volume = "volume",
  tmpfs = "tmpfs",
  npipe = "npipe",
}

enum MountConsistency {
  default = "default",
  consistent = "consistent",
  cached = "cached",
  delegated = "delegated",
}

interface Mount {
  Target?: string;
  Source?: string;
  Type?: MountType;
  Readonly?: boolean;
  Consistency?: MountConsistency;
  BindOptions?: BindOptions;
  VolumeOptions?: VolumeOptions;
  TmpfsOptions: TmpfsOptions;
}

/*
*
* Containers
*
 */

interface HealthConfig {
  /*
    The test to perform. Possible values are:

    [] inherit healthcheck from image or parent image
    ["NONE"] disable healthcheck
    ["CMD", args...] exec arguments directly
    ["CMD-SHELL", command] run command with system's default shell
     */
  Test?: string[];
  Interval?: number;
  Timeout?: number;
  Retries?: number;
  StartPeriod?: number;
}

interface ListContainer {
  Id?: string;
  Names?: string[];
  Image?: string;
  ImageID?: string;
  Command?: string;
  Created?: number;
  Ports?: Port[];
  SizeRw?: number;
  SizeRootFs?: number;
  Labels?: Labels;
  State?: string;
  Status?: string;
  HostConfig?: HostConfig;
  NetworkSettings: NetworkSettings;
  Mounts: Mount[];
}

export interface ContainerCreate {
  // The hostname to use for the container, as a valid RFC 1123 hostname.
  Hostname?: string;
  // The domain name to use for the container
  Domainname?: string;
  // The user that commands are run as inside the container.
  User?: string;
  // Whether to attach to stdin.
  AttachStdin?: boolean;
  // Whether to attach to stdout.
  AttachStdout?: boolean;
  // Whether to attach to stderr.
  AttachStderr?: boolean;
  // An object mapping ports to an empty object in the form:
  //{"<port>/<tcp|udp|sctp>": {}}
  ExposedPorts?: object;
  // Attach standard streams to a TTY, including stdin if it is not closed.
  Tty?: boolean;
  // Open stdin
  OpenStdin?: boolean;
  // Close stdin after one attached client disconnects
  StdinOne?: boolean;
  // A list of environment variables to set inside the container in the form ["VAR=value", ...]. A variable without = is removed from the environment, rather than to have an empty value.
  Env?: string[];
  // Command to run specified as a string or an array of strings.
  Cmd?: string[];
  // A test to perform to check that the container is healthy.
  Healthcheck?: HealthConfig;
  // Command is already escaped (Windows only)
  ArgsEscaped?: boolean;
  // The name of the image to use when creating the container
  Image?: string;
  // An object mapping mount point paths inside the container to empty objects
  Volumes?: { [key: string]: {} };
  // The working directory for commands to run in.
  WorkingDir?: string;
  // The entry point for the container as a string or an array of strings.
  // If the array consists of exactly one empty string ([""]) then the entry point is reset to system default (i.e., the entry point used by docker when there is no ENTRYPOINT instruction in the Dockerfile).
  Entrypoint?: string[];
  // Disable networking for the container.
  NetworkDisabled?: boolean;
  // MAC address of the container.
  MacAddress?: string;
  // ONBUILD metadata that were defined in the image's Dockerfile.
  OnBuild?: string[];
  // User-defined key/value metadata.
  Labels?: Labels;
  // Signal to stop a container as a string or unsigned integer
  StopSignal?: string;
  // Timeout to stop a container in seconds.
  StopTimeout?: number;
  // Shell for when RUN, CMD, and ENTRYPOINT uses a shell.
  Shell?: string[];
  // Container configuration that depends on the host we are running on
  HostConfig?: HostConfig;
  // This container's networking configuration.
  NetworkingConfig?: NetworkSettings;
}

export interface ContainerCreateResponse {
  Id?: string;
  Warnings?: string[];
  message?: string;
}

export type {
  ListContainer,
  Port,
};

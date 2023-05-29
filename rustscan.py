import argparse
import socket

# Parse command line arguments
parser = argparse.ArgumentParser()
parser.add_argument("host", help="Target host IP address")
parser.add_argument("--start-port", help="Starting port number (default: 1)", type=int, default=1)
parser.add_argument("--end-port", help="Ending port number (default: 65535)", type=int, default=65535)
args = parser.parse_args()

# Define timeout (in seconds) for socket connections
timeout = 0.5

# Define function to check if a given port is open on the target host
def is_port_open(host, port):
    try:
        # Create a TCP socket object
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        sock.settimeout(timeout)

        # Attempt to connect to the target port
        result = sock.connect_ex((host, port))

        # If the connection was successful, the port is open
        if result == 0:
            return True
        else:
            return False

        # Close the socket connection
        sock.close()

    except Exception as e:
        print(f"Error checking port {port}: {e}")
        pass

# Iterate through all ports in the specified range and check if they're open
for port in range(args.start_port, args.end_port + 1):
    if is_port_open(args.host, port):
        print(f"Port {port} is open.")

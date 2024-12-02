# Here are commands to check port-related information:

1. On Windows, you can use the netstat command:
netstat -ano | findstr :<port>
netstat -aon | findstr :8080

taskkill /PID 38288 /F




2. On Linux and macOS, you can use either netstat or ss command:
netstat -tuln | grep <port> or ss -tuln | grep <port>

Find process information:
1. On Windows, you can use the netstat command:
tasklist | findstr <PID>

2. On Linux and macOS, you can use the ps command:
ps -p <PID>





# Print out the variables in the .env file
- Unix/Linux 
cat .env | grep "DATABASE_URL"
- Windows 
type .env | findstr "DATABASE_URL"





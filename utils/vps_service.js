const ssh2 = require('ssh2');

const conn = new ssh2.Client();
let pm2Path = '/root/.nvm/versions/node/v18.0.0/bin/pm2'


conn.on('ready', () => {
  console.log('Connected to VPS');
});

conn.on('error', (err) => {
  console.error(`Error connecting to VPS: ${err.message}`);
});

// Connect to your VPS using SSH
conn.connect({
  host: '62.72.18.83',
  port: 22,
  username: 'root',
  password: 'ray01ocruwRiP=LgEvoQ',
});

function restartVPS(){
   // Restart your VPS by executing a command
  conn.exec(`export PATH=$PATH:/root/.nvm/versions/node/v18.0.0/bin/ && ${pm2Path} start nordic`, (err, stream) => {
    if (err) {
        console.log(err);
        throw err
    };
    
    stream.on('close', (code, signal) => {
      console.log(`Command execution completed with code ${code}`);
      conn.end(); // Close the SSH connection
    }).on('data', (data) => {
      console.log(`Command output: ${data}`);
      return data
    });
  });
}


function updateNordic(){
   // Restart your VPS by executing a command
   conn.exec('cd ~/workspace/Bilsjekkserverp && git pull', (err, stream) => {
    if (err) {
        console.log(err);
        throw err
    };
    
    stream.on('close', (code, signal) => {
        console.log(signal);
      console.log(`Command execution completed with code ${code}`);
      conn.end(); // Close the SSH connection
    }).on('data', (data) => {
      console.log(`Command output: ${data}`);
      restartVPS()
    });
  });
}

function stopNordic(){
   // Restart your VPS by executing a command
   conn.exec('pm2 stop techs', (err, stream) => {
    if (err) {
        console.log(err);
        throw err
    };
    
    stream.on('close', (code, signal) => {
        console.log(signal);
      console.log(`Command execution completed with code ${code}`);
      conn.end(); // Close the SSH connection
    }).on('data', (data) => {
      console.log(`Command output: ${data}`);
    });
  });
}

module.exports = {
  stopNordic,
  updateNordic,
  restarVPS 
}
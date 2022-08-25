const { DBType } = require('oracle-nosqldb/lib/constants');

const NoSQLClient = require('oracle-nosqldb').NoSQLClient;

function LogIn() {
    const client = new NoSQLClient({
        region: 'eu-frankfurt-1',
        auth: {
            iam: {
                tenantId: '',
                userId: '',
                fingerprint: '',
                privateKeyFile: ''
            }
        }
    });
    return client
}

module.exports = LogIn()
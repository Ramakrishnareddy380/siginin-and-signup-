pipeline {
    agent any

    stages {
        stage('Install Node.js') {
            steps {
                script {
                    // Install Node.js and npm
                    sh 'curl -sL https://deb.nodesource.com/setup_16.x | bash -'
                    sh 'sudo apt-get install -y nodejs'
                }
            }
        }

        stage('Clone Repository') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests
                sh 'npm test'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            deleteDir() // Clean up workspace after build
        }
        failure {
            echo 'The build failed!'
        }
    }
}

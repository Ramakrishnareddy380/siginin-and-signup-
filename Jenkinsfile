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

        stage('Install Global npm Packages') {
            steps {
                script {
                    // Install global npm packages
                    sh 'npm install -g webpack@5.75.0 eslint@7.32.0 nodemon@2.0.19'
                }
            }
        }

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests (if applicable)
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

pipeline {
    agent any

    environment {
        // You can configure the image name or other variables here
        NODE_ENV = 'NodeJS'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the project repository
                git branch: 'main', url: 'https://github.com/YourUsername/YourRepoName.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies using npm
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests if any (if you have a test script defined)
                sh 'npm test'
            }
        }

        stage('Start Application') {
            steps {
                // Start the Node.js application
                sh 'npm start'
            }
        }
    }

    post {
        always {
            // Cleanup workspace
            echo 'Cleaning up workspace...'
            deleteDir()
        }
        failure {
            // Handle failure
            echo 'The build failed!'
        }
    }
}

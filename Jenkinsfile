pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Name of your NodeJS installation in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub
                git url: 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Build with Maven') {
            steps {
                // Build the application using Maven
                sh 'mvn clean package'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                // Run Selenium tests (this assumes you have a script for running your tests)
                // You may need to adjust this command based on your test setup
                sh 'mvn test -Dtest=YourSeleniumTestClass'
            }
        }
    }

    post {
        success {
            echo 'Build and tests were successful!'
        }
        failure {
            echo 'Build or tests failed!'
        }
        always {
            // Clean up or send notifications
            echo 'Cleaning up...'
        }
    }
}


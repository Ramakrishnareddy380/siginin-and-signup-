
pipeline {
  agent any
  tools {nodejs "NodeJS"}
  stages {
    stage('Build') {
      steps {
        git branch: 'main', url: 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git'
        bat 'npm install'
      }
    }
  }
}
